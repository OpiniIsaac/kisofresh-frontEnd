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

  const [cropType, setCropType] = useState("");
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleNextClick = () => {
    const totalPages = Math.ceil(farmers.length / rowsPerPage);
    setPage((prevPage) =>
      prevPage + 1 < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchFarmersByCriteria({ cropType });
      setFarmers(response);
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

  const handleCropInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCropType(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCropType(suggestion);
    setShowSuggestions(false);
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
      <section className="py-8 px-4">
        <div className="flex w-full justify-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-500/10 flex flex-col md:flex-row justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
          >
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={cropType}
                onChange={handleCropInputChange}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSuggestions(true);
                }}
                placeholder="Crop Type"
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
            <Button type="submit">Find Farmers</Button>
          </form>
        </div>

        {hasLoaded && farmers.length > 0 && (
          <div className="farmers-table bg-white rounded-md shadow-md mt-4 overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b">
              Farmers Matching Criteria:
            </h2>
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Farmer Name</th>
                  <th className="p-2 text-left">District</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((farmer) => (
                    <tr key={farmer._id} className="hover:bg-gray-50">
                      <td className="p-2">{`${farmer.familyName} ${farmer.otherName}`}</td>
                      <td className="p-2">{farmer.Districk}</td>
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
        )}

        {hasLoaded && farmers.length > 0 && (
          <div className="flex justify-between my-4 px-4">
            <Button
              onClick={handlePrevClick}
              className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2"
            >
              Previous
            </Button>
            <p className="flex items-center">
              Showing {page * rowsPerPage + 1} to{" "}
              {Math.min((page + 1) * rowsPerPage, farmers.length)} of{" "}
              {farmers.length}
            </p>
            <Button
              onClick={handleNextClick}
              className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </Container>
  );
}
