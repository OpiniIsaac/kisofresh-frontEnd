import Image from "next/image";

type HeroCardProps = {
  details: {
    image: string;
    title: string;
    desc: string;
  };
};

export default function HeroCard({ details }: HeroCardProps) {
  const { image, title, desc } = details;


  return (
    <div className="flex flex-col md:flex-row cursor-grab ">
      <Image
        src={image}
        alt=""
        width={1000}
        height={1000}
        className=" h-[500px] w-screen md:w-full object-cover object-center rounded-md"
      />
      <div className="absolute h-[500px] w-screen bg-gradient-to-b from-transparent via-transparent to-black block md:hidden"/>
      <div className="absolute md:relative flex flex-col justify-end md:justify-center w-full md:max-w-[500px]  h-[500px] md: px-4 md:ps-40 text-white md:text-black pb-4 md:">
        <h1 className="text-4xl font-extrabold pb-4">
          {title}
        </h1>
        <p className="">{desc}</p>
      </div>
    </div>
  );
}
