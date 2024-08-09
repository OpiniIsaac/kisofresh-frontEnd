// pages/source-produce/page.tsx

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchFarmersByCriteria } from "@/lib/actions/source.actions";
import React from "react";
import Container from "@/components/Container";
import FindingFarmers from "@/components/FindingFarmers";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useAppSelector } from "@/lib/hooks";
import { useSpring, animated } from '@react-spring/web';
import { useRouter } from "next/navigation";

export default function CropInterestForm() {
  interface Farmer {
    _id: string;
    familyName: string;
    otherName: string;
    PhoneNumber: number;
    Districk: string;
    Subcounty: string;
    Village: string;
    AcresCultivation: number;
    YieldEstimation: {
      result: number;
    } | number;
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
      setFarmers(response);
      setIsLoading(false);
      setHasLoaded(true);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleRequestQuote = (crop: string) => {
    if (!user) {
      router.push("/sign-up");
    } else {
      router.push(
        `/buyers/products/form?crop=${crop}&country=${country}&region=${region}&quantity=${quantity}`
      );
    }
  };

  const handleNextClick = () => {
    const totalPages = Math.ceil(farmers.length / rowsPerPage);
    setPage((prevPage) => (prevPage + 1 < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const tableSpring = useSpring({
    opacity: hasLoaded ? 1 : 0,
    transform: hasLoaded ? "translateY(0)" : "translateY(-20px)",
    config: { duration: 500 },
  });

  return (
    <Container>
      <section>
        <div className="flex w-full justify-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-500/10 flex flex-col md:flex-row justify-between border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                  Select Region
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="Northern">Northern</option>
                  <option value="Central">Central</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropType">
                  Select Crop Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cropType"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                >
                  <option value="cotton">Cotton</option>
                  <option value="coffee">Coffee</option>
                  <option value="maize">Maize</option>
                  <option value="rice">Rice</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Select Quantity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Search
            </Button>
          </form>
        </div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && hasLoaded && (
          <animated.div style={tableSpring}>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Farmer Name</th>
                  <th className="py-2">Phone Number</th>
                  <th className="py-2">Region</th>
                  <th className="py-2">Subcounty</th>
                  <th className="py-2">Village</th>
                  <th className="py-2">Acres Cultivation</th>
                  <th className="py-2">Yield Estimation</th>
                  <th className="py-2">Request Quote</th>
                </tr>
              </thead>
              <tbody>
                {farmers.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((farmer) => (
                  <tr key={farmer._id}>
                    <td className="py-2">{farmer.name}</td>
                    <td className="py-2">{farmer.PhoneNumber}</td>
                    <td className="py-2">{farmer.Region}</td>
                    <td className="py-2">{farmer.Subcounty}</td>
                    <td className="py-2">{farmer.Village}</td>
                    <td className="py-2">{farmer.AcresCultivation}</td>
                    <td className="py-2">{typeof farmer.YieldEstimation === 'number' ? farmer.YieldEstimation : farmer.YieldEstimation.result}</td>
                    <td className="py-2">
                      <Button onClick={() => handleRequestQuote(farmer.CropType)}>Request Quote</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevClick} disabled={page === 0}>
                Previous
              </Button>
              <Button onClick={handleNextClick} disabled={page + 1 >= Math.ceil(farmers.length / rowsPerPage)}>
                Next
              </Button>
            </div>
          </animated.div>
        )}
      </section>
    </Container>
  );
}

