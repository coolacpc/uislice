"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import AddProjectWindow from "./Components/AddProjectWindow";
import { useAppContext } from "../ContextApi";
import IconsWindow from "./Components/IconWindow";
import CodeIcon from "@mui/icons-material/Code";

import { IconData } from "../AllIconsData";
import toast, { Toaster } from "react-hot-toast";
import ComponentPage from "./ComponentPage";
import { DropDown } from "./Components/DropDown";
import ConfirmationDeleteWindow from "./Components/DeleteWindow";
import { ComponentEditor } from "./Components/ComponentPage/ComponentEditor";
import AllProjectsWindow from "./Components/AllProjectsWindow";
import SortingDropDown from "./Components/SortingDropDown";
import AllFavoriteComponents from "./Components/AllFavoriteComponents";
import FilterDropDown from "./Components/FilterDropDown";
import { useEffect } from "react";
import { Component, Project } from "../allData";
export interface SelectedIcon {
  icon: React.ReactNode;
  name: string;
}
function Dashboard() {
  //Variables from useAppContext
  const {
    openProjectWindowObject: { openProjectWindow },
    showComponentPageObject: { showComponentPage },
    openDeleteWindowObject: { openDeleteWindow },
    openComponentEditorObject: { openComponentEditor },
    openAllProjectsWindowObject: { openAllProjectsWindow },
    openAllFavoriteComponentsWindowObject: { openAllFavoriteComponentsWindow },
    showSearchBarObject: { showSearchBar },
    mainSearchQueryObject: { mainSearchQuery },
  } = useAppContext();

  //local Variables
  const [selectedIcon, setSelectedIcon] = React.useState<SelectedIcon>({
    icon: <CodeIcon />,
    name: "CodeIcon",
  });

  //Get the icon from the callback function and set it in the selectedIcon state
  function getTheIconSelected(icon: IconData) {
    setSelectedIcon({ icon: icon.icon, name: icon.name });
  }

  //Jsx
  return (
    <div className="flex poppins relative border  ">
      {showSearchBar && mainSearchQuery && <LiveSearchBar />}

      <FilterDropDown />
      <AllFavoriteComponents />
      <SortingDropDown />
      <AllProjectsWindow />
      <ComponentEditor />
      <ConfirmationDeleteWindow />
      <DropDown />
      <Toaster />
      <IconsWindow onUpdateIconSelected={getTheIconSelected} />
      <AddProjectWindow
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
      />
      {(openProjectWindow ||
        openDeleteWindow ||
        openComponentEditor ||
        openAllProjectsWindow ||
        openAllFavoriteComponentsWindow) && <SoftLayer />}
      <Sidebar />
      {!showComponentPage ? <ContentArea /> : <ComponentPage />}
    </div>
  );
}

export default Dashboard;

function SoftLayer() {
  return (
    <div className="w-full h-full fixed top-0 z-40 right-0 bg-black opacity-30"></div>
  );
}

function LiveSearchBar() {
  const {
    openLiveSearchBarObject: { openLiveSearchBar, setOpenLiveSearchBar },
    liveSearchPositionsObject: { liveSearchPositions },
    isMobileViewObject: { isMobileView },
    mainSearchQueryObject: { mainSearchQuery, setMainSearchQuery },
    allProjectsObject: { allProjects },
    selectedProjectObject: { selectedProject, setSelectedProject },
    showComponentPageObject: { setShowComponentPage },
    showSearchBarObject: { showSearchBar, setShowSearchBar },
    openAllProjectsWindowObject: { setOpenAllProjectsWindow },
  } = useAppContext();

  const liveSearchBarRef = React.useRef<HTMLDivElement>(null);

  // Filter projects and components based on the search query
  const filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(mainSearchQuery.toLowerCase())
  );

  const filteredComponents = allProjects.flatMap((project) =>
    project.components.filter((component) =>
      component.name.toLowerCase().includes(mainSearchQuery.toLowerCase())
    )
  );

  function openTheProject(project: Project) {
    //Find the project
    const findProject = allProjects.find((p) => p._id === project._id);

    if (findProject) {
      //Set the project in the selectedProject state
      setSelectedProject(findProject);
      //Open the component page
      setShowComponentPage(true);
      //Close the live search bar
      setOpenLiveSearchBar(false);
      //Hide the search bar
      setShowSearchBar(false);
      //Reset the search query
      setMainSearchQuery("");
    }
  }

  function showMoreFunction() {
    //1 - Hide the search bar
    setShowSearchBar(false);
    //2 - Open the all projects window
    setOpenAllProjectsWindow(true);
  }

  function openClickedComponent(component: Component) {
    //We need to find the project by using the projectName in the component
    const findProject = allProjects.find(
      (project) => project.name === component.projectName
    );
    setSelectedProject(findProject!);
    //Close the live search bar
    setOpenLiveSearchBar(false);
    //Hide the search bar
    setShowSearchBar(false);
    //Open the component page
    setShowComponentPage(true);

    setMainSearchQuery(component.name);
  }
  return (
    <div
      style={{
        top: liveSearchPositions.top + 50,
        left: liveSearchPositions.left,
      }}
      ref={liveSearchBarRef}
      className={`fixed p-5 ${isMobileView ? "w-[70%]" : "w-[26%]"}  flex-col gap-3 flex shadow-md border border-slate-50  bg-white rounded-lg top-14 left-96 z-50`}
    >
      {filteredComponents.length === 0 && filteredProjects.length === 0 && (
        <span className="text-slate-500 text-[12px]">
          No matched results...
        </span>
      )}
      {/*Projects Results  */}
      {filteredProjects.length > 0 && (
        <div>
          <span className="font-bold text-[14px] text-slate-800">Projects</span>
          <div className="flex gap-1 mt-3 flex-col ml-1">
            {filteredProjects.slice(0, 3).map((project) => (
              <div
                key={project._id}
                onClick={() => openTheProject(project)}
                className="flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 select-none cursor-pointer"
              >
                {/* Icon */}
                <div className="w-[21px] h-[21px] bg-sky-200 rounded-full flex items-center justify-center">
                  <CodeIcon
                    sx={{ fontSize: "15px" }}
                    className="text-sky-500 text-[18px]"
                  />
                </div>
                {/* Name */}
                <span className="text-[12px] text-slate-700">
                  {project.name}
                </span>
              </div>
            ))}
          </div>

          {/* More */}
          {filteredProjects.slice(3).length > 0 && (
            <div
              onClick={showMoreFunction}
              className="w-full flex items-center justify-center mt-1"
            >
              <div className="text-[12px] text-sky-500 hover:text-sky-700 cursor-pointer">
                {filteredProjects.length - 3} more project
                {filteredProjects.length - 3 > 1 ? "s" : ""} available
              </div>
            </div>
          )}
        </div>
      )}

      {/*Components Results  */}
      {filteredComponents.length > 0 && (
        <div>
          <span className="font-bold text-[14px] mt-3 text-slate-800">
            Components
          </span>
          <div className="flex mt-3 flex-col ml-1">
            {filteredComponents.slice(0, 3).map((component) => (
              <div
                onClick={() => openClickedComponent(component)}
                key={component._id}
                className="flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 select-none cursor-pointer"
              >
                {/* Icon */}
                <div className="w-[21px] h-[21px] bg-slate-200 rounded-full flex items-center justify-center">
                  <CodeIcon
                    sx={{ fontSize: "15px" }}
                    className="text-slate-500 text-[18px]"
                  />
                </div>
                {/* Name */}
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[12px]">{component.name}</span>
                  <span className="text-[10px] text-slate-400 italic">
                    {component.projectName}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* More Components */}
          {filteredComponents.length > 3 && (
            <div className="w-full flex items-center justify-center mt-1">
              <div className="text-[12px] text-sky-500 hover:text-sky-700 cursor-pointer">
                {filteredComponents.length - 3} more component
                {filteredComponents.length - 3 > 1 ? "s" : ""} available
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
