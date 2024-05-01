"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchFarmersByCriteria,
  fetchUploadedData,
} from "@/lib/actions/source.actions";
import React from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";


export default function CropInterestForm() {
  interface Farmer {
    _id: string;
    "Farm Code": string;
    "Family Name": string;
    "Christian Name": string;
    "Phone Number": number;
    Districk: string;
    Subcounty: string;
    Village: string;
    "Acres for Cotton": number;
    "Yield Estimation ": {
      result: number;
    };
    "Crop Type": string;
    Country: string;
    Region: string;
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
  const pathname = useRouter



  const [showPhone, setShowPhone] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [hasLoaded, SetHasLoaded] = useState(false);


const LoadingIndicator = () => (
  <div
    className={`${
      !hasLoaded
        ? "min-h-screen bg-blue-500/5 rounded-md flex flex-col gap-4 justify-center border items-center "
        : "hidden"
    }`}
  >
    <p className={`${isLoading ? "block pb-20": "hidden"}`}>Finding farmers...</p>
    <Image
      src="/images/logo.png"
      alt=""
      width={1000}
      height={1000}
      className={`${isLoading?" animate-bounce w-40 pb-40":"w-40 pb-40"}`}
    />
    
  </div>
);
//Function to show phone numbers of farmers
  const handleTogglePhone = () => setShowPhone(!showPhone);

  //Function to handle submitted state to conditionally render the table of farmers returned by db
  const handlePage = () => {
    setSubmitted(true);
  }


  handlePage;

  //Function to handle next page click
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
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      SetHasLoaded(false);
      SetIsLoading(true);
      const response = await fetchFarmersByCriteria({
        country,
        region,
        cropType,
        quantity,
      });

      console.log(country, region, cropType, quantity);
      setFarmers(response);
      SetIsLoading(false);
      SetHasLoaded(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handlePage
  }, []);

  //??
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

  
  if (isLoading) return (
    <Container>
      <div className="flex w-full justify-center mt-20">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-500/10 flex justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
        >
          {/* Form inputs */}
          <div className="flex gap-4">
            {/* Select Country */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Select Country
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option value="Uganda">Uganda</option>
                <option value="Kenya">Kenya</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>
            {/* Select Region */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="region"
              >
                Select Region
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option value="Northern">Northern</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
                <option value="Western">Western</option>
              </select>
            </div>
            {/* Select Crop Type */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cropType"
              >
                Select Crop Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cropType"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option value="cotton">Cotton</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
              </select>
            </div>
            {/* Quantity input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity(tons)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-end">
            <Button type="submit" onClick={handlePage}>
              Find Farmers
            </Button>
          </div>
        </form>
      </div>
      <LoadingIndicator />
    </Container>
  );
  return (
    <Container>
    <section className={`${isLoading?"hidden":"block"}`}>
        <div className="flex w-full justify-center mt-20">
          {" "}
          <form
            onSubmit={handleSubmit}
            className="bg-blue-500/10 flex justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
          >
            {/* Form inputs */}
            <div className="flex gap-4">
              {/* Select Country */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Select Country
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                </select>
              </div>
              {/* Select Region */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="region"
                >
                  Select Region
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="Northern">Northern</option>
                  <option value="Central">Central</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                </select>
              </div>
              {/* Select Crop Type */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cropType"
                >
                  Select Crop Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cropType"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="cotton">Cotton</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>
              {/* Quantity input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Quantity(tons)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-end">
              <Button type="submit" onClick={handlePage}>
                Find Farmers
              </Button>
            </div>
          </form>
        </div>
        <LoadingIndicator/>
        {farmers.length > 0 && (
          <div className=" bg-blue-500/5 px-4 border rounded-md mb-10">
            <h2 className="text-2xl font-bold mb-4 pt-20">
              Farmers Matching Criteria:
            </h2>
            <table className="min-w-full h-screen divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Surname
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
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
                    Acres for Cotton
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Yield Estimation Result
                  </th>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((farmer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer["Family Name"]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer["Christian Name"]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {showPhone ? (
                          <a href={`tel:${farmer["Phone Number"]}`}>
                            {farmer["Phone Number"]}
                            <i className="fas fa-phone-alt"></i>
                          </a>
                        ) : (
                          <button onClick={handleTogglePhone}>
                            <i className="fas fa-eye"></i> View Phone Number
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer.Districk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer.Subcounty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer.Village}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer["Acres for Cotton"]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {farmer["Yield Estimation "].result}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button>
                          <Link href="/SourceForm/Form">Request Quot</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="flex justify-between my-4">
              <Button onClick={handlePrevClick}>Previous</Button>
              <p className="flex items-center">
                Showing {page * rowsPerPage + 1} to{" "}
                {Math.min((page + 1) * rowsPerPage, farmers.length)} of{" "}
                {farmers.length}
              </p>
              <Button onClick={handleNextClick}>Next</Button>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
}
