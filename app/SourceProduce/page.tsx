"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchFarmersByCriteria,
  // fetchUploadedData,
} from "@/lib/actions/source.actions";
import React from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { Login } from "@/lib/features/accountHandle/loginSlice";
import Loading from "@/components/Loading";

export default function CropInterestForm() {
  const [user] = useAuthState(auth);
  
  const router = useRouter();
  const dispatch = useDispatch();
  if (!user) {
    router.push("/login");
  } else {
    console.log(user);
    dispatch(Login());
    interface Farmer {
      _id: string;
      familyName: string;
      otherName: string;
      PhoneNumber: number;
      Districk: string;
      Subcounty: string;
      Village: string;
      AcresCultivation: number;
      "YieldEstimation ": {
        result: number;
      };
      CropType: string;
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
    const pathname = useRouter;

    const [showPhone, setShowPhone] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);
    const [hasLoaded, SetHasLoaded] = useState(false);

    
    
    //Function to show phone numbers of farmers
    const handleTogglePhone = () => setShowPhone(!showPhone);

    //Function to handle submitted state to conditionally render the table of farmers returned by db
    const handlePage = () => {
      setSubmitted(true);
    };

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
      //  const response = await fetchUploadedData()
console.log(response)
        console.log(country, region, cropType, quantity);
        setFarmers(response);
        SetIsLoading(false);
        SetHasLoaded(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useEffect(() => {
      handlePage;
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

    if (isLoading)
      return (
        <Container>
          <div className="flex w-full justify-center mt-20">
            {" "}
            <form
              onSubmit={handleSubmit}
              className="bg-blue-500/10 flex flex-col md:flex-row justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
            >
              {/* Form inputs */}
              <div className="flex flex-col md:flex-row gap-4">
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
          <Loading/>
        </Container>
      );
    return (
      <Container>
        <section className={`${isLoading ? "hidden" : "block"}`}>
          <div className="flex  w-full justify-center mt-20 ">
            {" "}
            <form
              onSubmit={handleSubmit}
              className="bg-blue-500/10 flex flex-col md:flex-row  justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
            >
              {/* Form inputs */}
              <div className="flex flex-col md:flex-row gap md:gap-4">
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
                    <option value="Cocoa">Cocoa</option>
                    <option value="Coffee">Coffee</option>
                    
                  </select>
                </div>
                {/* Quantity input */}
                {cropType === "cotton" && (
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
                )}
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-end">
                <Button type="submit" onClick={handlePage}>
                  Find Farmers
                </Button>
              </div>
            </form>
          </div>
          <Loading />
          {
            <div className=" bg-blue-500/5 overflow-auto px-4 border rounded-md mb-10">
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
                        Name
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((farmer, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {farmer["familyName"] + "  " +" " + farmer["otherName"]}
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
                            {farmer["AcresCultivation"]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
  {cropType === "cotton" ? farmer["YieldEstimation "].result : "-"}
</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button>
                              <Link href="/SourceProduce/Form">
                                Request Quote
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
          <div
            className={`${
              hasLoaded ? "flex justify-between my-4 px-4" : "hidden"
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
}
