"use client"
import { useRouter } from "next/navigation";

const ProductDetail = ( { params }: { params: { id: any} }) => {
  const router = useRouter();
 

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1>Product Detail for ID: {params.id}</h1>
      {/* Fetch and display product details based on the ID */}
    </div>
  );
};

export default ProductDetail;
