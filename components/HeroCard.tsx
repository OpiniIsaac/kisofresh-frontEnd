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
    <div className="flex cursor-grab ">
      <Image
        src={image}
        alt=""
        width={1000}
        height={1000}
        className="w-full h-[500px] max-w-[700px] object-cover object-center rounded-md"
      />
      <div className="flex flex-col justify-center max-w-[500px] ps-40">
        <h1 className="text-4xl font-extrabold pb-4 hidden md:block">
          {title}
        </h1>
        <p className="hidden md:block">{desc}</p>
      </div>
    </div>
  );
}
