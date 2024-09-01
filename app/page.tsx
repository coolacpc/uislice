"use client";
import React from "react";
import { SiReact } from "react-icons/si";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ChangeHistoryRoundedIcon from "@mui/icons-material/ChangeHistoryRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import connect from "./lib/connect";
import DrawIcon from "@mui/icons-material/Draw";
import Image from "next/image";
function page() {
  connect();
  return (
    <div className="poppins">
      <Navbar />
      <CTASection />
      <Features />
    </div>
  );

  function Features() {
    const features = [
      {
        id: 1,
        name: "Centralized Component Library",
        icon: <StorageRoundedIcon className="text-sky-500 text-[32px]" />,
        description: ` Organize all your React components in a centralized library.
                Easily browse, search, and access your saved components whenever
                you need them`,
      },
      {
        id: 2,
        name: "Reusable Components",
        icon: <CodeRoundedIcon className="text-sky-500 text-[32px]" />,
        description: ` Create and edit your React components directly within our
                intuitive editor. Write JSX code with syntax highlighting and
                instant previews.`,
      },
      {
        id: 3,
        name: "Version Control and History",
        icon: <ChangeHistoryRoundedIcon className="text-sky-500 text-[32px]" />,
        description: ` Track changes and maintain different versions of your
                components. Revert to previous versions if needed and keep a
                history of modifications.`,
      },
    ];

    return (
      <section className=" py-12 bg-slate-50 mt-12">
        <div className=" mx-auto px-4 ">
          <h2 className="text-2xl font-bold text-center ">Key Features</h2>
          {/*  */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {features.map((feature, index) => (
              <div
                key={index}
                className=" p-6 bg-white rounded-lg shadow-sm flex flex-col items-center "
              >
                <div className="w-20 h-20 rounded-full items-center justify-center flex bg-sky-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-500 mt-6 text-center">
                  {feature.name}
                </h3>
                <p className="text-slate-600 text-[13px] mt-2 text-center w-[80%]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function CTASection() {
    return (
      <div className="flex flex-col mx-16 items-center mt-[120px] gap-6 ">
        {/*  */}
        <h2 className="font-bold text-2xl text-center">
          Manage and Create Your UI Components
          <span className={`text-sky-500`}> Effortlessly!</span>
        </h2>
        {/*  */}
        <p className="text-center text-[15px] w-[510px] max-sm:w-full text-slate-500 ">
          Save time by reusing your favorite components. Store them in a
          centralized database and create new components with ease. Enhance your
          development workflow by having quick access to a library of reusable
          components and ensure consistency across your projects.
        </p>

        <button
          className={`block bg-sky-500 rounded-md  px-9 py-3 text-sm font-medium text-white hover:bg-sky-600    `}
          type="button"
        >
          {`Let's get started!`}
        </button>

        <Image
          src={"/app.png"}
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-xl mt-9 aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full   sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    );
  }
}

function Navbar() {
  return (
    <nav className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col  ">
      <Logo />
      <Buttons />
    </nav>
  );

  function Logo() {
    return (
      <div className="flex gap-2 items-center">
        {/* Icon Container */}
        <div
          className={`bg-sky-500 flex items-center justify-center p-[6px] rounded-md `}
        >
          {/* Icon */}
          <div className="w-[26px] h-[26px] items-center justify-center flex">
            <DrawIcon
              sx={{ fontSize: 20 }}
              className="text-white text-[28px]"
            />
          </div>
        </div>

        {/* App Name */}
        <div className="flex gap-1 text-[22px] ">
          <span className={`font-bold text-sky-500`}>UI</span>
          <span className="text-slate-600">Shelf</span>
        </div>
      </div>
    );
  }

  function Buttons() {
    const { userId } = useAuth();
    return (
      <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
        {!userId ? (
          <>
            <Link href="/sign-in">
              <button
                className={` max-sm:w-full text-sm border border-sky-500 text-white bg-sky-500 
 p-[8px] px-6 rounded-md `}
              >
                Sign In
              </button>
            </Link>

            <Link href="/sign-up">
              <button
                className={` max-sm:w-full text-sm border border-sky-500 text-sky-500 
hover:bg-sky-500 hover:text-white p-[8px] px-6 rounded-md `}
              >
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <button
              className={` max-sm:w-full text-sm border bg-sky-500 text-white
hover:bg-sky-600 hover:text-white p-[8px] px-6 rounded-md `}
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>
    );
  }
}

export default page;
