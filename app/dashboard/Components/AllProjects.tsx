import React from "react";
import LandslideIcon from "@mui/icons-material/Landslide";
import { AddOutlined } from "@mui/icons-material";
import { useAppContext } from "@/app/ContextApi";
import { Project } from "@/app/allData";
import { TextToIcon } from "@/app/utils/textToIcon";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import CircularProgress from "@mui/material/CircularProgress";

function AllProjects() {
  const {
    allProjectsObject: { allProjects },
    isLoadingObject: { isLoading },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openAllProjectsWindowObject: { setOpenAllProjectsWindow },
  } = useAppContext();

  return (
    // The main container
    <div className=" bg-white  w-full p-8 rounded-lg mt-4">
      {/* Header */}
      <span className="text-lg flex gap-2 justify-between items-center">
        {/*  */}
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">All Projects</span>
          <span
            onClick={() => setOpenAllProjectsWindow(true)}
            className="text-[13px]  text-sky-600 cursor-pointer"
          >
            More
          </span>
        </div>
        {/* New project button */}
        {!isLoading && allProjects.length > 0 && (
          <button
            onClick={() => setOpenProjectWindow(true)}
            className="bg-sky-500 text-white text-[12px] px-3 py-[2px] rounded-md"
          >
            <AddOutlined fontSize="small" />
            <span className="text-[13px] max-sm:hidden">New Project</span>
          </button>
        )}
      </span>

      {/* Showing the projects */}

      {/* If there are no projects */}
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full  mt-16">
          <CircularProgress value={100} />
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      )}
      {!isLoading && allProjects.length === 0 ? (
        <EmptyProjectsPlaceholder />
      ) : (
        <div className="flex flex-wrap gap-4 mt-7 mb-2 max-sm:grid max-sm:grid-cols-1">
          {allProjects?.slice(0, 10).map((project, index) => (
            <div key={index}>
              <SingleProject singleProject={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function SingleProject({ singleProject }: { singleProject: Project }) {
    const {
      showComponentPageObject: { showComponentPage, setShowComponentPage },
      selectedProjectObject: { selectedProject, setSelectedProject },
    } = useAppContext();

    function projectClicked() {
      setSelectedProject(singleProject);
      setShowComponentPage(true);
    }
    return (
      <div
        className="w-[200px] border border-slate-100 rounded-md p-5 flex gap-2 justify-center flex-col 
      items-center max-sm:w-full    "
      >
        {/* The Icon */}
        <div className="w-[70px] h-[70px] bg-sky-100 rounded-full flex items-center justify-center">
          {TextToIcon({ text: singleProject.icon, size: "medium" })}
          {/* <LandslideIcon className="text-[30px] text-sky-400" /> */}
        </div>

        {/* Name and components count */}
        <div className="flex flex-col items-center justify-center">
          <span
            onClick={projectClicked}
            className="font-semibold text-lg text-center cursor-pointer hover:text-sky-500 select-none"
          >
            {singleProject.name}
          </span>
          <span className="text-[12px] text-slate-400 text-center">
            {singleProject.components.length} Components
          </span>
        </div>
      </div>
    );
  }
}

export default AllProjects;

export function EmptyProjectsPlaceholder({
  showButton,
}: {
  showButton?: boolean;
}) {
  return (
    <div className=" p-1 gap-5 flex flex-col  justify-center h-[200px] mt-[68px] mb-[34px] items-center">
      <AddModeratorIcon
        sx={{ fontSize: 80 }}
        className="text-[70px] text-slate-200"
      />
      <div className="">
        <h3 className="font-semibold text-[15px] mb-1 text-center ">{`There are no projects Yet...`}</h3>
        <p className="text-gray-400  w-52  text-center text-[13px]">
          Please click below to add your first project.
        </p>
      </div>
      <button className="bg-sky-500 p-2 rounded-md text-white text-center text-[12px] px-7">
        Add New Project
      </button>
    </div>
  );
}
