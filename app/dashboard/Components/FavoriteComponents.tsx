import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppContext } from "@/app/ContextApi";
import { Component, Project } from "@/app/allData";
import { formatDate } from "@/app/utils/formatDate";
import CircularProgress from "@mui/material/CircularProgress";
import AllProjects from "./AllProjects";
import toast from "react-hot-toast";

function FavoriteComponents() {
  const {
    allFavoriteComponentsObject: { allFavoriteComponents },
    isLoadingObject: { isLoading },
    openAllFavoriteComponentsWindowObject: {
      setOpenAllFavoriteComponentsWindow,
    },
  } = useAppContext();
  return (
    <div className="bg-white  w-full p-8 rounded-lg mt-4 ">
      {/* Main Header */}
      <div className="flex justify-between">
        <span className="font-bold text-lg">Favorite Components</span>
        {/* Button */}

        <button
          onClick={() => setOpenAllFavoriteComponentsWindow(true)}
          disabled={allFavoriteComponents.length === 0}
          style={{ opacity: allFavoriteComponents.length === 0 ? 0.5 : 1 }}
          className="bg-sky-500 flex gap-2 items-center text-white text-[12px] p-2 px-3 rounded-md"
        >
          <VisibilityIcon fontSize="small" />
          <span className="max-sm:hidden">View All</span>
        </button>
      </div>

      {/* Header's List */}
      <div className="grid grid-cols-4 mt-6 mb-4 text-sm items-center text-slate-400 px-4 max-sm:grid-cols-2">
        <span className="">Component Name</span>
        <span className="max-sm:hidden">Created At</span>
        <span className="max-sm:hidden">Project</span>
        <span className="">Actions</span>
      </div>

      {/* Components */}

      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full  mt-[70px] mb-7">
          <CircularProgress value={100} />
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      )}

      {!isLoading && allFavoriteComponents.length === 0 ? (
        <div className="flex justify-center items-center  mt-[70px] mb-8 text-slate-400 text-sm">
          No favorite components set yet...
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-1 mt-1">
          {allFavoriteComponents.slice(0, 5).map((component, index) => (
            <div key={index}>
              <SingleFavoriteComponent component={component} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function SingleFavoriteComponent({ component }: { component: Component }) {
    const {
      selectedComponentObject: { setSelectedComponent, selectedComponent },
      openComponentEditorObject: { setOpenComponentEditor },
      selectedProjectObject: { setSelectedProject, selectedProject },
      allProjectsObject: { allProjects, setAllProjects },
      openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
    } = useAppContext();

    return (
      <div className="grid grid-cols-4 gap-4 text-sm items-center rounded-lg p-2 max-sm:grid-cols-2">
        {/* Component Name */}
        <span
          onClick={() =>
            openComponent({
              component,
              allProjects,
              setSelectedComponent,
              setOpenComponentEditor,
              setSelectedProject,
            })
          }
          className="hover:text-sky-500 cursor-pointer"
        >
          {component.name}
        </span>
        {/* Component date */}
        <span className="max-sm:hidden">{formatDate(component.createdAt)}</span>

        {/* Project */}
        <span className="justify-self-start max-sm:hidden">
          <span className="inline-block rounded-2xl  bg-sky-500 text-white text-[12px]  px-4 py-1 whitespace-nowrap">
            {component.projectName}
          </span>
        </span>
        {/* Actions button */}
        <div className="flex gap-2   ">
          {/* Modify Button */}
          <div
            onClick={() =>
              openComponent({
                component,
                allProjects,
                setSelectedComponent,
                setOpenComponentEditor,
                setSelectedProject,
              })
            }
            className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-600 cursor-pointer"
          >
            <EditIcon fontSize="small" className="text-white text-[13px]" />
          </div>

          <div
            onClick={() =>
              openTheDeleteWindow({
                component,
                setOpenDeleteWindow,
                allProjects,
                setSelectedComponent,
                setSelectedProject,
              })
            }
            className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-600 cursor-pointer"
          >
            <DeleteIcon fontSize="small" className="text-white text-[13px]" />
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteComponents;

export function openComponent({
  component,
  allProjects,
  setSelectedComponent,
  setOpenComponentEditor,
  setSelectedProject,
}: {
  component: Component;
  allProjects: Project[];
  setSelectedComponent: React.Dispatch<React.SetStateAction<Component | null>>;
  setOpenComponentEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
  // Scroll to the top of the page or to the component editor
  window.scrollTo({ top: 0, behavior: "smooth" });
  setSelectedComponent(component);
  setOpenComponentEditor(true);

  // Get the project and set it in the selectedProject state
  const project = allProjects.find(
    (project) =>
      project.name.toLowerCase() === component.projectName.toLowerCase()
  );

  if (project) {
    setSelectedProject(project);
  } else {
    console.error(`Project not found for component: ${component.name}`);
  }
}

export function openTheDeleteWindow({
  component,
  allProjects,
  setSelectedComponent,
  setSelectedProject,
  setOpenDeleteWindow,
}: {
  component: Component;
  allProjects: Project[];
  setSelectedComponent: (component: Component) => void;
  setSelectedProject: (project: Project) => void;
  setOpenDeleteWindow: (open: boolean) => void;
}) {
  // Get the project and set it in the selectedProject state
  const project = allProjects.find(
    (project) =>
      project.name.toLowerCase() === component.projectName.toLowerCase()
  );

  if (project) {
    setSelectedProject(project);
  } else {
    console.error(`Project not found for component: ${component.name}`);
  }
  setSelectedComponent(component);
  setOpenDeleteWindow(true);
}
