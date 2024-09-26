"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchFarmersByCriteria } from "@/lib/actions/source.actions";
import React from "react";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import FindingFarmers from "@/components/FindingFarmers";
import { useAppSelector } from "@/lib/hooks";
import { Input } from "@mui/material";

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
    District: string; // Corrected spelling
    Subcounty: string;
    Village: string;
    AcresCultivation: number;
    YieldEstimation: YieldEstimationType | number;
    CropType: string;
    Country: string;
    Region: string;
    name: string;
  }

  const [country, setCountry] = useState("Uganda");
  const [region, setRegion] = useState("Northern");
  const [cropType, setCropType] = useState("cotton");
  const [quantity, setQuantity] = useState(3);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [phoneNumberVisibility, setPhoneNumberVisibility] = useState<{
    [key: string]: boolean[];
  }>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPhone, setShowPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  // Function to show phone numbers of farmers
  const handleTogglePhone = () => setShowPhone(!showPhone);

  // Function to handle submitted state to conditionally render the table of farmers returned by db
  const handlePage = () => {
    setSubmitted(true);
  };

  // Invoke handlePage correctly
  useEffect(() => {
    handlePage();
  }, []);

  // Function to handle next page click
  const handleNextClick = () => {
    const totalPages = Math.ceil(farmers.length / rowsPerPage);
    setPage((prevPage) =>
      prevPage + 1 < totalPages ? prevPage + 1 : prevPage
    );
  };

  // Function to handle previous page click
  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleRequestQuote = (crop: string) => {
    if (!user) {
      router.push('/sign-up');
    } else {
      router.push(`/traders/products/form?crop=${crop}&country=${country}&region=${region}&quantity=${quantity}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setHasLoaded(false);
      setIsLoading(true);
      const response = await fetchFarmersByCriteria({
        country,
        region,
        cropType,
        quantity,
      });
      console.log("Fetched Farmers:", response);
      setFarmers(response);
      setIsLoading(false);
      setHasLoaded(true);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      setIsLoading(false);
      setHasLoaded(false);
    }
  };

  // Toggle phone number visibility
  const togglePhoneNumberVisibility = (
    farmerId: string,
    phoneNumberIndex: number
  ) => {
    setPhoneNumberVisibility((prevState) => ({
      ...prevState,
      [farmerId]: prevState[farmerId]
        ? prevState[farmerId].map((visible, index) =>
            index === phoneNumberIndex ? !visible : visible
          )
        : [true],
    }));
  };

  // Helper function to render Yield Estimation
  const renderYieldEstimation = (yieldEstimation: Farmer['YieldEstimation']) => {
    if (typeof yieldEstimation === 'number') {
      return yieldEstimation;
    } else if (yieldEstimation && typeof yieldEstimation === 'object') {
      return yieldEstimation.result;
    }
    return null; // Fallback value
  };

  // Helper function to safely render any field
  const renderField = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      console.warn("Attempting to render an object:", field);
      return JSON.stringify(field);
    }
    return field;
  };

  if (isLoading)
    return (
      <Container>
        <div className="flex w-full justify-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-500/10 flex flex-col md:flex-row justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
          >
            {/* Input fields with state binding */}
            <Input
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="Crop Type"
            />

            {/* Submit button */}
            <div className="flex items-center justify-end">
              <Button type="submit">Find Farmers</Button>
            </div>
          </form>
        </div>
        <div>
          <FindingFarmers />
        </div>
      </Container>
    );

  return (
    <Container>
      <section className={`${isLoading ? "hidden" : "block"}`}>
        <div className="flex w-full justify-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-500/10 flex flex-col md:flex-row justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
          >
            {/* Input fields with state binding */}
            <Input
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="Crop Type"
            />

            {/* Submit button */}
            <div className="flex items-center justify-end">
              <Button type="submit">Find Farmers</Button>
            </div>
          </form>
        </div>
        <div className={`${hasLoaded ? "hidden" : ""}`}>
          <Icon />
        </div>
        {hasLoaded && (
          <div className="bg-blue-500/5 overflow-auto px-4 border rounded-md mb-10">
            <h2 className="text-2xl font-bold mb-4 pt-20">
              Farmers Matching Criteria:
            </h2>
            <div className="w-screen md:w-full overflow-auto">
              <table className="min-w-full h-screen divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {cropType === "cotton" ? "Name" : "Farmer Name"}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subcounty
                    </th>
                    {cropType === "cotton" && (
                      <>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Village
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Yield Estimation Result
                        </th>
                      </>
                    )}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {farmers
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((farmer) => (
                      <tr key={farmer._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {cropType === "cotton"
                            ? `${farmer.familyName} ${farmer.otherName}`
                            : farmer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderField(farmer.District)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderField(farmer.Subcounty)}
                        </td>
                        {cropType === "cotton" && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderField(farmer.Village)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderYieldEstimation(farmer.YieldEstimation)}
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button onClick={() => handleRequestQuote(farmer.CropType)}>
                            Request Quote
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className={`${hasLoaded ? "flex justify-between my-4 px-4" : "hidden"
            }`}
        >
          <Button onClick={handlePrevClick}>Previous</Button>
          <p className="flex items-center">
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, farmers.length)} of{" "}
            {farmers.length}
          </p>
          <Button onClick={handleNextClick}>Next</Button>
        </div>
      </section>
    </Container>
  );
}
