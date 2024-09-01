import React from "react";
import TopBar from "./Components/TopBar";
import { useAppContext } from "../ContextApi";
import StatsBar from "./Components/StatsBar";
import AllProjects from "./Components/AllProjects";
import FavoriteComponents from "./Components/FavoriteComponents";

function ContentArea() {
  const {
    showSideBarObject: { showSideBar },
    isMobileViewObject: { isMobileView },
    showComponentPageObject: { showComponentPage },
    openProjectWindowObject: { openProjectWindow },
  } = useAppContext();

  return (
    <div className="w-full  bg-slate-50 p-5">
      <TopBar />
      <StatsBar />
      <AllProjects />
      <FavoriteComponents />
      {showSideBar && isMobileView && <SoftLayer />}
    </div>
  );
}

export default ContentArea;

export function SoftLayer() {
  return (
    <div className="w-full h-full fixed top-0 right-0 bg-black opacity-30"></div>
  );
}
