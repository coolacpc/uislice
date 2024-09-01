import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppContext } from "@/app/ContextApi";
import { useRef, useEffect } from "react";
import { Component } from "@/app/allData";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
export function DropDown() {
  const {
    dropDownPositionObject: { dropDownPositions },
    openDropDownObject: { openDropDown, setOpenDropDown },
    openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
    selectedComponentObject: { setSelectedComponent, selectedComponent },
    selectedProjectObject: { selectedProject, setSelectedProject },
    allProjectsObject: { allProjects, setAllProjects },
    openComponentEditorObject: { setOpenComponentEditor, openComponentEditor },
  } = useAppContext();

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenDropDown(false);
        if (openDeleteWindow) {
          setSelectedComponent(null);
        }
      }
    }

    function handleScroll() {
      setOpenDropDown(false);
    }

    function handleWheel(event: WheelEvent) {
      if (event.deltaY !== 0) {
        setOpenDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setOpenDropDown]);

  //Make sure that the selected component is null when the dropdown is closed and component editor is closed
  useEffect(() => {
    if (openDropDown === false) {
      if (!openDeleteWindow) {
        if (!openComponentEditor) {
          setSelectedComponent(null);
        }
      }
    }
  }, [openDropDown]);

  function deleteComponentFunction() {
    setOpenDeleteWindow(true);
    setOpenDropDown(false);
  }

  async function duplicateComponentFunction() {
    if (selectedComponent && selectedProject) {
      try {
        // Step 1: Create a new component object with a new id and a new name based on the selected component
        const newComponentObject: Component = {
          ...selectedComponent,
          _id: uuidv4(),
          name: `${selectedComponent.name} Copy`,
          createdAt: new Date().toISOString(),
        };

        // Step 2: Add the new component to the database
        const response = await fetch(
          `/api/projects?projectId=${selectedProject._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "addComponent",
              component: newComponentObject,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to duplicate component in the database");
        }

        const { project: updatedProject } = await response.json();

        // Step 3: Sort the components by createdAt
        updatedProject.components.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        // Step 4: Update the selected project in the selectedProject state
        setSelectedProject(updatedProject);

        // Step 5: Update allProjects state
        const updatedAllProjects = allProjects.map((project) => {
          if (project._id === selectedProject._id) {
            return updatedProject;
          }
          return project;
        });
        setAllProjects(updatedAllProjects);

        toast.success("Component has been duplicated successfully");
      } catch (error) {
        toast.error("Failed to duplicate component");
      }
    }

    setOpenDropDown(false);
  }

  return (
    <div
      ref={dropDownRef}
      style={{
        top: dropDownPositions.top + 54,
        left: dropDownPositions.left - 135,
        visibility: openDropDown ? "visible" : "hidden",
      }}
      className="bg-white  z-50 px-5 border border-slate-50  fixed py-4 w-[160px] select-none    shadow-md rounded-lg flex flex-col gap-5"
    >
      {/* Edit Icon */}
      <div
        onClick={() => {
          setOpenComponentEditor(true);
          setOpenDropDown(false);
        }}
        className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-sky-500"
      >
        <EditOutlinedIcon sx={{ fontSize: 21 }} className="text" />
        <span className="text-[14px]">Edit</span>
      </div>
      {/* Duplicate Icon */}
      <div
        onClick={duplicateComponentFunction}
        className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-sky-500"
      >
        <ContentCopyIcon sx={{ fontSize: 21 }} className="text-[21px]" />
        <span className="text-[14px]">Duplicate</span>
      </div>
      {/* Divider Line */}
      <hr className="border-t border-slate-200" />
      {/* Remove Icon */}
      <div
        onClick={deleteComponentFunction}
        className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-red-500 "
      >
        <DeleteOutlineOutlinedIcon
          sx={{ fontSize: 21 }}
          className="text-[21px]"
        />
        <span className="text-[14px]">Delete</span>
      </div>
    </div>
  );
}
