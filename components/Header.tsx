"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Login, Logout } from "@/lib/features/loginSlice";
import { useRouter, usePathname } from "next/navigation";
import { hedvig, outfit } from "./Fonts";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLinkCollection: { title: string; route: string }[] = [
  {
    title: "market trends",
    route: "/PriceAnalysis&Tracking/trends",
  },
  {
    title: "Analysis",
    route: "/PriceAnalysis&Tracking/price",
  },
  { title: "Source produce", route: "/SourceProduce" },
];

export default function Header() {
  const [isScrolled, setisScrolled] = useState(false);
  const dispatch = useDispatch();
  const { user } = useKindeBrowserClient();
  const image: any = user?.picture;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY >= 100;
      setisScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (window) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      router.push("/");
      dispatch(Logout());
    } catch (e) {
      console.error(e);
    }
    
  };

  const handleSignIn = () =>{
    router.push('/sign-up')
  }

  return (
    <div>
      <header
        className={` z-10 w-full fixed  top-0 left-0 text-black border ${
          isScrolled ? "bg-blue-500 border-none " : "bg-white"
        }`}
      >
        <Container>
          <div className="flex justify-between">
            <Link
              href="/"
              className={`ps-4 md:ps-0 text-blue-500 font-extrabold transition-all ease-in-out ${
                isScrolled
                  ? "text-white text-4xl py-1"
                  : "text-blue-500 text-4xl py-4 "
              } ${hedvig.className}`}
            >
              <h1>KisoIndex</h1>
            </Link>

            <div className="flex gap-20 items-center ">
              <nav
                className={`flex gap-10 text-sm ${
                  isScrolled ? "text-black" : "text-slate-500"
                }`}
              >
                {NavLinkCollection.map((item) => (
                  <Link
                    key={item.title}
                    href={item.route}
                    className={clsx(
                      `${
                        isScrolled
                          ? "relative hover:text-white transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                          : "relative hover:text-black transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                      } ${outfit.className}`,
                      {
                        "text-black": pathname === item.route && !isScrolled,
                      },
                      {
                        "text-white": pathname === item.route && isScrolled,
                      }
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              {/*The button below will navigate to the auth route on which the user will find login page, no need for signup button as there will be option to sign up on login page, two buttons looked ugly  */}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <div
                        className={`${"text-xl flex-col ps-5 items-center hidden md:flex "}`}
                      >
                        <Image
                          src={image}
                          alt={""}
                          width={1000}
                          className="w-10 rounded-full"
                          height={1000}
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-60">
                    <div>
                      <br />
                      <h1 className="justify-center flex">
                        {user?.family_name}
                      </h1>
                      <br />
                      <p className="px-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quidem, unde vitae! Ipsa aspernatur amet laborum
                        omnis, veniam deserunt commodi enim?
                      </p>
                    </div>
                    <br />
                    <div className="flex justify-end">
                      <LogoutLink>
                        <Button onClick={handleLogout} className="m-2">
                          Logout
                        </Button>
                      </LogoutLink>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:block">
                  <LoginLink>
                    <Button className="" onClick={handleSignIn}>Sign in</Button>
                  </LoginLink>
                </div>
              )}
              <div className="md:absolute">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <IoIosMenu
                        className={`${
                          isScrolled
                            ? "md:hidden mr-4 text-4xl text-white"
                            : "block md:hidden mr-4 text-4xl"
                        }`}
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col justify-between px-4 h-96 w-72 py-4">
                    <div>
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col items-center">
                          {user?<Image
                            src={image}
                            alt={""}
                            width={1000}
                            className="w-20 rounded-full"
                            height={1000}
                          />:""}
                          <p>
                            {user?.given_name} {user?.family_name}
                          </p>
                        </div>
                      </div>

                      <Link href="/">
                        <Button
                          className={clsx(
                            "bg-blue-500/5 w-full mt-4 mb-3 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white",
                            { "bg-blue-500 text-white": pathname === "/" }
                          )}
                        >
                          Home
                        </Button>
                      </Link>
                      {NavLinkCollection.map((item) => (
                        <Link key={item.title} href={item.route}>
                          <Button
                            className={clsx(
                              "bg-blue-500/5 w-full my-3 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white",
                              {
                                "bg-blue-500 text-white":
                                  pathname === item.route,
                              }
                            )}
                          >
                            {item.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <LogoutLink>
                        <Button
                          onClick={
                            user
                              ? () => dispatch(Logout())
                              : () => dispatch(Login())
                          }
                        >
                          {user ? <div>Logout</div> : <div>Login</div>}
                        </Button>
                      </LogoutLink>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}
