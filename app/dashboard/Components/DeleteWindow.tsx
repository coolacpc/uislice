import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "@/app/ContextApi";
import { Component, Project } from "@/app/allData";
import toast from "react-hot-toast";

export default function ConfirmationDeleteWindow() {
  const {
    openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
    selectedComponentObject: { selectedComponent, setSelectedComponent },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { selectedProject, setSelectedProject },
    openAllProjectsWindowObject: { openAllProjectsWindow },
  } = useAppContext();

  async function deleteProjectFunction() {
    if (!selectedProject?._id) {
      toast.error("No project selected for deletion");
      return;
    }

    try {
      const response = await fetch(
        `/api/projects?projectId=${selectedProject._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete project");
      }

      const updatedAllProjects = allProjects.filter(
        (project: Project) => project._id !== selectedProject._id
      );
      setAllProjects(updatedAllProjects);
      setOpenDeleteWindow(false);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }

  async function deleteComponentFunction() {
    // Delete Component from the selectedProject
    try {
      if (selectedProject && selectedComponent) {
        const response = await fetch(
          `/api/projects?projectId=${selectedProject._id}&componentId=${selectedComponent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "deleteComponent",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete component");
        }

        const updatedProject = await response.json();

        // Update the state with the updated project
        setSelectedProject(updatedProject.project);

        // Delete Component from allProjects
        const updatedAllProjects = allProjects.map((project: Project) => {
          if (project._id === selectedProject._id) {
            return {
              ...project,
              components: project.components.filter(
                (component: Component) =>
                  component._id !== selectedComponent._id
              ),
            };
          }
          return project;
        });

        setAllProjects(updatedAllProjects);
        setSelectedComponent(null);
        setOpenDeleteWindow(false);

        toast.success("Component deleted successfully");
      } else {
        throw new Error("Selected project or component is missing");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div
      style={{ visibility: openDeleteWindow ? "visible" : "hidden" }}
      className=" w-[40%] max-sm:w-[90%] absolute  p-8 px-9 border border-slate-100  bg-white shadow-md  left-1/2 top-44 rounded-lg -translate-x-1/2 z-50"
    >
      {/* Header Icon */}
      <div className="flex justify-between items-start">
        <div className="w-[42px] h-[42px] bg-red-200 rounded-full flex items-center justify-center">
          <DeleteIcon className="text-red-500 text-[24px]" />
        </div>
        <CloseIcon
          onClick={() => setOpenDeleteWindow(false)}
          sx={{ fontSize: 18 }}
          className="text-slate-400 text-[18px] cursor-pointer"
        />
      </div>
      {/* Messages */}
      <div className="flex flex-col mt-7">
        {/* Main Message */}
        <span className="font-bold">
          Permanently delete this{" "}
          {openAllProjectsWindow ? "project" : "component"}?
        </span>
        {/* Second message */}
        <span className="text-slate-400 text-[13px] mt-2">
          Are you sure you want to permanently delete this{" "}
          {openAllProjectsWindow ? "project" : "component"}?
        </span>
        <span className="text-red-500 font-semibold mt-4 text-[13px]">
          This section cannot be undone
        </span>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-9 mb-2 text-[12px]">
        <button
          onClick={() => setOpenDeleteWindow(false)}
          className="px-4 py-2 text-slate-500 border border-slate-200 rounded-md hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          onClick={
            openAllProjectsWindow
              ? deleteProjectFunction
              : deleteComponentFunction
          }
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete {openAllProjectsWindow ? "Project" : "Component"}
        </button>
      </div>
    </div>
  );
}
