"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchFarmersByCriteria,
  fetchCropSuggestions,
} from "@/lib/actions/source.actions";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import FindingFarmers from "@/components/FindingFarmers";
import { useAppSelector } from "@/lib/hooks";
import { debounce } from "lodash";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function CropInterestForm() {
  interface YieldEstimationType {
    result: number;
    sharedFormula?: string;
  }

  interface Farmer {
    _id: string;
    familyName: string;
    otherName: string;
    PhoneNumber: number;
    Districk: string;
    Subcounty: string;
    Village: string;
    AcresCultivation: number;
    YieldEstimation: YieldEstimationType | number;
    CropType: string;
    Country: string;
    Region: string;
    name: string;
  }

  interface FilterCriteria {
    cropType: string;
    country: string;
    region: string;
    minQuantity: number;
  }

  const SUGGESTED_CROPS = [
    "cotton",
    "maize",
    "rice",
    "wheat",
    "coffee",
    "sugarcane",
    "tea",
    "beans",
    "cassava",
    "sorghum",
  ];

  const REGIONS = ["Eastern", "Western", "Northern", "Southern", "Central"];

  const COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi"];

  const [filters, setFilters] = useState<FilterCriteria>({
    cropType: "",
    country: "",
    region: "",
    minQuantity: 0,
  });
  const [allFarmers, setAllFarmers] = useState<Farmer[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  // Function to apply filters
 const applyFilters = (farmers: Farmer[]): Farmer[] => {
   return farmers.filter((farmer) => {
     const matchesCountry =
       !filters.country ||
       (typeof farmer.Country === "string" &&
         farmer.Country.toLowerCase() === filters.country.toLowerCase());
     const matchesRegion =
       !filters.region ||
       (typeof farmer.Region === "string" &&
         farmer.Region.toLowerCase() === filters.region.toLowerCase());
     const matchesQuantity =
       typeof farmer.AcresCultivation === "number" &&
       farmer.AcresCultivation >= filters.minQuantity;

     return matchesCountry && matchesRegion && matchesQuantity;
   });
 };


  // Update active filters
  useEffect(() => {
    const newActiveFilters: string[] = [];
    if (filters.country) newActiveFilters.push(`Country: ${filters.country}`);
    if (filters.region) newActiveFilters.push(`Region: ${filters.region}`);
    if (filters.minQuantity > 0)
      newActiveFilters.push(`Min Quantity: ${filters.minQuantity} tons`);
    setActiveFilters(newActiveFilters);

    // Apply filters to all farmers
    if (allFarmers.length > 0) {
      const filtered = applyFilters(allFarmers);
      setFilteredFarmers(filtered);
      setPage(0); // Reset to first page when filters change
    }
  }, [filters, allFarmers]);

  const handleNextClick = () => {
    const totalPages = Math.ceil(filteredFarmers.length / rowsPerPage);
    setPage((prevPage) =>
      prevPage + 1 < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.cropType.trim()) {
      return; // Don't submit if no crop type is specified
    }
    setIsLoading(true);
    try {
      const response = await fetchFarmersByCriteria({
        cropType: filters.cropType,
      });
      setAllFarmers(response);
      setFilteredFarmers(applyFilters(response));
      setHasLoaded(true);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestQuote = (crop: string) => {
    if (!user) {
      router.push("/sign-up");
    } else {
      router.push(`/traders/products/form?crop=${crop}`);
    }
  };

  const fetchSuggestions = debounce(async (input: string) => {
    try {
      const dynamicSuggestions = input ? await fetchCropSuggestions(input) : [];
      const filteredStaticSuggestions = SUGGESTED_CROPS.filter((crop) =>
        crop.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions([...filteredStaticSuggestions, ...dynamicSuggestions]);
      setShowSuggestions(input.length > 0);
    } catch (error) {
      console.error("Error fetching crop suggestions:", error);
    }
  }, 300);

 const handleFilterChange = (
   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
   const { name, value } = e.target;
   setFilters((prev) => ({
     ...prev,
     [name]: name === "minQuantity" ? Number(value) : value,
   }));

   if (name === "cropType") {
     fetchSuggestions(value);
   }
 };


  const handleSuggestionClick = (suggestion: string) => {
    setFilters((prev) => ({ ...prev, cropType: suggestion }));
    setShowSuggestions(false);
  };

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      country: "",
      region: "",
      minQuantity: 0,
    }));
  };

  const removeFilter = (filterToRemove: string) => {
    const [type, value] = filterToRemove.split(": ");
    setFilters((prev) => ({
      ...prev,
      [type.toLowerCase()]: type === "Min Quantity" ? 0 : "",
    }));
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    if (showSuggestions) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSuggestions]);

  if (isLoading) {
    return (
      <Container>
        <FindingFarmers />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex w-full justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-500/10 flex flex-col gap-4 border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
        >
          {/* Primary Crop Search */}
          <div className="relative w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Search for Crop
            </label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="cropType"
                  value={filters.cropType}
                  onChange={handleFilterChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSuggestions(true);
                  }}
                  placeholder="Enter crop type"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={!filters.cropType.trim()}
                className="disabled:opacity-50"
              >
                Find Farmers
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div
                  key={filter}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{filter}</span>
                  <button
                    type="button"
                    onClick={() => removeFilter(filter)}
                    className="hover:text-blue-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Advanced Filters Toggle */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showAdvancedFilters ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Advanced Filters
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show Advanced Filters
                </>
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="space-y-4 border-t pt-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Country Select */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country (Optional)
                  </label>
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region Select */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Region (Optional)
                  </label>
                  <select
                    name="region"
                    value={filters.region}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Region</option>
                    {REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum Quantity Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Minimum Quantity (Optional)
                  </label>
                  <input
                    type="number"
                    name="minQuantity"
                    value={filters.minQuantity}
                    onChange={handleFilterChange}
                    min="0"
                    placeholder="Enter minimum quantity (tons)"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Reset Filters Button */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={resetFilters}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
      {hasLoaded && filteredFarmers.length > 0 && (
        <div className="farmers-table bg-white rounded-md shadow-md mt-4 overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b">
            Farmers Matching Criteria: {filteredFarmers.length} results
          </h2>
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Farmer Name</th>
                <th className="p-2 text-left">District</th>
                <th className="p-2 text-left">Country</th>
                <th className="p-2 text-left">Region</th>

                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((farmer) => (
                  <tr key={farmer._id} className="hover:bg-gray-50">
                    <td className="p-2">{`${farmer.familyName} ${farmer.otherName}`}</td>
                    <td className="p-2">{farmer.Districk}</td>
                    <td className="p-2">{farmer.Country ?? "-"}</td>
                    <td className="p-2">{farmer.Region ?? "-"}</td>

                    <td className="p-2">
                      <Button
                        onClick={() => handleRequestQuote(farmer.CropType)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
                      >
                        Request Quote
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}{" "}
      {hasLoaded && filteredFarmers.length > 0 && (
        <div className="flex justify-between my-4 px-4">
          <Button
            onClick={handlePrevClick}
            className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2"
          >
            Previous
          </Button>
          <p className="flex items-center">
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, filteredFarmers.length)} of{" "}
            {filteredFarmers.length}
          </p>
          <Button
            onClick={handleNextClick}
            className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2"
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
}
