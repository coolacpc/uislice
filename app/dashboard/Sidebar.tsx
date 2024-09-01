"use client";
import React, { useEffect, useRef } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { SiReact } from "react-icons/si";
import { useAppContext } from "../ContextApi";
import { MenuItem } from "../ContextApi";
import DrawIcon from "@mui/icons-material/Draw";
export default function SideBar() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
    isMobileViewObject: { isMobileView },
    showSideBarObject: { showSideBar, setShowSideBar },
  } = useAppContext();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMobileView
      ) {
        setShowSideBar(false);
      }
    }

    if (showSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideBar, setShowSideBar, isMobileView]);

  useEffect(() => {
    // If the user is on mobile view, stretch the sidebar to full width
    if (isMobileView) {
      //stretch the sidebar
      setOpenSideBar(true);
      //hide the sidebar
      setShowSideBar(false);
    } else {
      //If the user is not on mobile view, show the sidebar
      setShowSideBar(true);
    }
  }, [isMobileView]);

  return (
    <div
      ref={menuRef}
      style={{ position: isMobileView ? "fixed" : "relative" }}
      className={`${openSideBar ? "w-[300px] p-6" : "w-[100px] p-4"} h-screen  pt-12   
      transition-all duration-300 z-30 bg-white ${showSideBar ? "block" : "hidden"}  `}
    >
      <RoundedArrowIcon />
      <Logo />
      <Links />
      <LogOutButton />
    </div>
  );

  function RoundedArrowIcon() {
    const {
      openSideBarObject: { openSideBar, setOpenSideBar },
      isMobileViewObject: { isMobileView },
    } = useAppContext();

    function handleClick() {
      setOpenSideBar(!openSideBar);
    }

    return (
      <div
        onClick={handleClick}
        className={` w-7 h-7 z-40  rounded-full    right-[-11px] top-[95px] flex items-center justify-center ${!isMobileView ? "absolute" : "hidden"}`}
      >
        <div className="bg-sky-500 rounded-full w-[70%] h-[70%] flex items-center justify-center cursor-pointer">
          {openSideBar ? (
            <KeyboardArrowLeftIcon
              fontSize="small"
              className="text-white text-[12px]"
            />
          ) : (
            <KeyboardArrowRightIcon
              fontSize="small"
              className="text-white text-[12px]"
            />
          )}
        </div>
      </div>
    );
  }
  function Logo() {
    const {
      openSideBarObject: { openSideBar },
    } = useAppContext();
    return (
      <div className="flex gap-2 items-center">
        <div
          className={`bg-sky-500 p-[6px] rounded-md w-12 h-12 flex items-center justify-center`}
        >
          <DrawIcon sx={{ fontSize: 28 }} className="text-white text-[28px]" />
        </div>
        {openSideBar && (
          <div className="flex gap-1 text-[23px] ">
            <span className={`font-bold text-sky-500`}>UI</span>
            <span className="text-slate-600">Shelf</span>
          </div>
        )}
      </div>
    );
  }

  function Links() {
    const {
      menuItemsObject: { menuItems, setMenuItems },
      openSideBarObject: { openSideBar },
    } = useAppContext();

    function handleLinkClick(item: MenuItem) {
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((prevMenuItem) =>
          prevMenuItem.id === item.id
            ? { ...prevMenuItem, isSelected: true }
            : { ...prevMenuItem, isSelected: false }
        )
      );
    }
    return (
      <div
        className={`mt-44 ${openSideBar ? "ml-3" : "ml-0"} flex flex-col gap-2 text-[15px]`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleLinkClick(item)}
            className={`${item.isSelected ? "bg-sky-500 text-white" : " text-slate-400 hover:text-sky-500 "} 
            p-[7px] select-none cursor-pointer rounded-lg flex items-center gap-2 w-[65%]  `}
          >
            {item.icon}
            {openSideBar && <span className="mt-0.5">{item.name}</span>}
          </div>
        ))}
      </div>
    );
  }

  function LogOutButton() {
    const {
      openSideBarObject: { openSideBar },
    } = useAppContext();
    return (
      <div
        className={`p-[7px] hover:text-sky-500 select-none cursor-pointer ${openSideBar ? "ml-3" : "ml-0"} mt-14 text-[15px] rounded-lg flex
      items-center gap-2 w-[80%] text-slate-400`}
      >
        <LogoutIcon />
        {openSideBar && <span className="mt-0.5">Log Out</span>}
      </div>
    );
  }
}
