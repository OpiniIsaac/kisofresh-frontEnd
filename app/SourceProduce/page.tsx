'use client'
import { Button } from "@/components/ui/button";
import { fetchUploadedData } from "@/lib/actions/source.actions";
import React from "react";

export default  async function CropInterestForm() {
  const results:any = await fetchUploadedData() ;
  console.log(results) ;
  return (
    <div className="w-screen h-screen flex justify-center items-center">
    {results.length > 0 && ( // Check if results are available before mapping
      results.map((result:any) => (
        <h1 key={result.Village || Math.random().toString(36).slice(2, 7)}>
          {result.Village}
        </h1>
      ))
    )}
    <Button>Submit Interest</Button> {/* Assuming Button component */}
  </div>
  );
}
