import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import { IceSkatingOutlined } from "@mui/icons-material";
import { useAppContext } from "@/app/ContextApi";
import { useRef } from "react";
import { useEffect } from "react";
import CodeIcon from "@mui/icons-material/Code";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";
import { Project } from "@/app/allData";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { TextToIcon } from "@/app/utils/textToIcon";
//
//
export default function AddProjectWindow({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: {
    icon: React.ReactNode;
    name: string;
  };
  setSelectedIcon: React.Dispatch<
    React.SetStateAction<{
      icon: React.ReactNode;
      name: string;
    }>
  >;
}) {
  const {
    isMobileViewObject: { isMobileView },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openIconWindowObject: { setOpenIconWindow, openIconWindow },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { selectedProject, setSelectedProject },
  } = useAppContext();

  //Variables for the add project window
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const { user } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);

  //This useEffect handles the input focus and error message
  useEffect(() => {
    //If the selectedProject is not null, it means we are going to create a new project
    if (!selectedProject) {
      //Reset the project name
      setProjectName("");

      //Set the default icon
      const iconObject = {
        icon: TextToIcon({
          text: "CodeIcon",
          className: "text-white",
        }),
        name: "CodeIcon",
      };

      //Update the selectedIco
      setSelectedIcon(iconObject);
    } else {
      //Update the input name when we want to edit the project
      setProjectName(selectedProject.name);
      const iconObject = {
        icon: TextToIcon({
          text: selectedProject.icon,
          className: "text-white",
        }),
        name: selectedProject.icon,
      };

      setSelectedIcon(iconObject);
    }
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    // Schedule focus setting for the next render
    setTimeout(focusInput, 0);
    setErrorMessage("");
  }, [openProjectWindow]);

  //This function handles the input update
  function handleInputUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    //Empty the error Message
    setErrorMessage("");
    //Update the project name
    setProjectName(e.target.value);
  }

  //This function add a new project
  async function addNewProject() {
    // Check if the project name is not empty
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }

    // Check if the project name already exists
    if (
      allProjects.find(
        (project) => project.name.toLowerCase() === projectName.toLowerCase()
      )
    ) {
      setErrorMessage("Project name already exists");
      inputRef.current?.focus();
      return;
    }

    // Creating a new project object
    const newProject = {
      clerkUserId: user?.id as string,
      name: projectName,
      icon: selectedIcon.name,
      components: [],
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }

      const addedProject = await response.json();

      // Adding the new project to allProjects
      setAllProjects([...allProjects, addedProject.project]);
      toast.success("Project added successfully");
      setOpenProjectWindow(false);
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    }
  }

  async function editTheProject() {
    // Check if the project name is not empty
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }

    if (!selectedProject) {
      toast.error("No project selected for editing");
      return;
    }

    try {
      const response = await fetch(
        `/api/projects?projectId=${selectedProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: projectName,
            icon: selectedIcon.name,
            clerkUserId: selectedProject.clerkUserId, // Assuming you want to keep the same user
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      const updatedProject = await response.json();

      const updateAllProjects = allProjects.map((singleProject) => {
        return singleProject._id === selectedProject._id
          ? updatedProject.project
          : singleProject;
      });

      setAllProjects(updateAllProjects);
      setOpenProjectWindow(false);
      setSelectedProject(null);
      toast.success("Project has been updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  }

  //Jsx
  return (
    <div
      className={`${isMobileView ? "w-[80%]" : "w-[40%]"}   border border-slate-50  bg-white rounded-md shadow-md left-1/2 top-40
    -translate-x-1/2 z-50 ${openProjectWindow ? "absolute" : "hidden"} `}
    >
      {/*  */}
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[12px]"
            />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg">
            {!selectedProject ? "New Project" : "Edit Project"}
          </span>
        </div>
        <CloseIcon
          onClick={() => {
            //Close the window
            setOpenProjectWindow(false);
            //Reset the selectedComponent to null
            setSelectedProject(null);
          }}
          sx={{ fontSize: 16 }}
          className="text-slate-400 text-[18px] cursor-pointer"
        />
      </div>

      {/* Body */}
      <div className=" flex flex-col gap-2 mt-11 px-7 w-full  ">
        <span className="text-[13px] font-medium">Project Name</span>
        <div className="flex gap-3 w-full">
          {/* Input */}
          <div className="flex flex-col w-full">
            <input
              value={projectName}
              onChange={handleInputUpdate}
              placeholder="Enter Project Name..."
              ref={inputRef}
              className="p-[10px] text-[12px] w-full rounded-md border outline-none"
            />
            {/* Error Message */}
            <div
              className={`flex items-center gap-2 mt-2 ${errorMessage ? "" : "hidden"}`}
            >
              <ErrorOutlineIcon
                sx={{ fontSize: 14 }}
                className="text-red-500"
              />
              <span className="text-[12px] text-red-500 mt-[2px]">
                {errorMessage}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div
            onClick={() => setOpenIconWindow(true)}
            className="w-12 h-10 text-white  flex items-center justify-center bg-sky-500 rounded-lg cursor-pointer hover:bg-sky-600"
          >
            {selectedIcon?.icon}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full mt-12 mb-10   flex gap-3 justify-end px-7 items-center">
        {/* Cancel Button */}
        <button
          onClick={() => {
            setOpenProjectWindow(false);
            setSelectedProject(null);
          }}
          className="border border-slate-200 text-slate-400 text-[12px] p-2 px-6 rounded-md hover:border-slate-300 
        transition-all hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          onClick={selectedProject ? editTheProject : addNewProject}
          className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 px-3 rounded-md transition-all"
        >
          {!selectedProject ? "Add Project" : "Editing Project"}
        </button>
      </div>
    </div>
  );
}
