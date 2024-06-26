import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SlUser } from "react-icons/sl";
import Image from "next/image";

export default async function User() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  function getPicture(){
    const image:any =  user?.picture
    return image;
  } 

  return (
    <div className="text-sm outline-none">
      {user?.picture !== null ? (
        <div>
          <Image src = {getPicture()} alt={""} width={1000} height={1000} className="w-10 rounded-full"/>
        </div>
      ) : (
        <div>
          <SlUser />
        </div>
      )}
      {user?.family_name}
    </div>
  );
}
