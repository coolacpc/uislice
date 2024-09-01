import React, { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import {
  atelierSulphurpoolLight,
  stackoverflowLight,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useAppContext } from "@/app/ContextApi";
import { Component, Project } from "@/app/allData";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton } from "@mui/material";

function AllComponents({ searchInput }: { searchInput: string }) {
  const {
    selectedProjectObject: { selectedProject },
  } = useAppContext();

  console.log(searchInput);

  const filteredComponents = selectedProject?.components.filter(
    (component: Component) =>
      searchInput
        ? component.name.toLowerCase().includes(searchInput.toLowerCase())
        : true
  );

  return (
    <div className=" mt-10 flex flex-col gap-3">
      {filteredComponents?.map((component: Component, index: number) => (
        <div key={index}>
          <SingleComponent component={component} />
        </div>
      ))}
    </div>
  );

  function SingleComponent({ component }: { component: Component }) {
    const [tabMenu, setTabMenu] = useState([
      {
        id: 1,
        icon: <PreviewIcon className="text-[19px]" />,
        name: "Preview",
        isSelected: true,
      },
      {
        id: 2,
        icon: <CodeIcon className="text-[19px]" />,
        name: "Jsx",
        isSelected: false,
      },
    ]);

    const {
      allProjectsObject: { allProjects, setAllProjects },
      selectedProjectObject: { setSelectedProject, selectedProject },
      dropDownPositionObject: { setDropDownPositions },
      openDropDownObject: { setOpenDropDown },
      selectedComponentObject: { setSelectedComponent },
      openComponentEditorObject: { setOpenComponentEditor },
    } = useAppContext();

    const [copySuccess, setCopySuccess] = useState(false);
    //
    const [isFavorite, setFavorite] = useState(component.isFavorite);
    const iconRef = useRef<HTMLDivElement>(null);
    //
    function changeTabState(index: number) {
      setTabMenu((prevTabMenu) => {
        return prevTabMenu.map((singleItem, i) => {
          return i === index
            ? { ...singleItem, isSelected: true }
            : { ...singleItem, isSelected: false };
        });
      });
    }

    async function updateFavoriteState(
      projectId: string,
      component: Component
    ) {
      try {
        const response = await fetch(
          `/api/projects?projectId=${projectId}&componentId=${component._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "updateFavoriteState",
              isFavorite: !component.isFavorite,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update favorite state");
        }

        const { project: updatedProject } = await response.json();

        // Update the components array in allProjects
        const newAllProjects = allProjects.map((project: Project) => {
          if (project._id === projectId) {
            const updatedComponents = project.components.map(
              (comp: Component) => {
                if (comp._id === component._id) {
                  return {
                    ...comp,
                    isFavorite: !comp.isFavorite,
                  };
                }
                return comp;
              }
            );
            return { ...project, components: updatedComponents };
          }
          return project;
        });

        // Update the components array in the selectedProject
        if (selectedProject && selectedProject._id === projectId) {
          setSelectedProject(updatedProject);
        }

        setAllProjects(newAllProjects);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    function openTheDropDown(event: React.MouseEvent) {
      event.stopPropagation();
      if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;

        //Open The Drop Down
        setOpenDropDown(true);
        //Update the dropDownPositions
        setDropDownPositions({ top: top, left: left });
      }
      //Select the component
      setSelectedComponent(component);
    }

    function openTheComponentEditor() {
      setSelectedComponent(component);
      setOpenComponentEditor(true);
    }

    function copyTheCode(code: string) {
      //Copy the code to clipboard
      setCopySuccess(true);
      toast.success("Code has been copied to clipboard");
      setTimeout(() => {
        navigator.clipboard.writeText(code);
        setCopySuccess(false);
      }, 1400);
    }

    return (
      <div className="bg-white w-full rounded-lg p-8 pt-8 pb-10 mb-3">
        {/* Component Title */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span
              onClick={openTheComponentEditor}
              className="font-bold text-[19px] cursor-pointer hover:text-sky-500"
            >
              {component.name}
            </span>
            <Checkbox
              onChange={() =>
                updateFavoriteState(selectedProject?._id as string, component)
              }
              checked={isFavorite}
              icon={
                <FavoriteBorderIcon className="text-slate-400 text-[20px]" />
              }
              checkedIcon={<FavoriteIcon className="text-red-500" />}
            />
          </div>
          <div onClick={openTheDropDown} ref={iconRef}>
            <IconButton>
              <MoreVertIcon className="text-slate-400 text-[20px]" />
            </IconButton>
          </div>
        </div>

        {/* Component Preview and Code Buttons */}
        <div className="flex gap-2 mt-8 text-[13px] ">
          {/* Preview */}
          {tabMenu.map((item, index) => (
            <div
              key={index}
              onClick={() => changeTabState(index)}
              className={`flex gap-1 items-center cursor-pointer select-none  text-slate-400 px-3 py-[4px]
              rounded-md  ${item.isSelected ? "bg-sky-500 text-white" : " hover:bg-slate-100"}`}
            >
              {item.icon}
              <span className="mt-[2px]">{item.name}</span>
            </div>
          ))}
        </div>

        {/* The Component */}

        {tabMenu[0].isSelected ? (
          <div className="w-full border rounded-md border-slate-200 mt-6 ">
            <LiveProvider code={component.code} noInline={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LiveError className="rounded-lg border-gray-200 p-4 text-red-600" />
                <LivePreview className="rounded-lg border-gray-200 p-4" />
              </div>
            </LiveProvider>
          </div>
        ) : (
          <div className="border rounded-md mt-6 w-full relative">
            <div className="absolute top-4 right-4 z-50 rounded-full bg-slate-200">
              <IconButton onClick={() => copyTheCode(component.code)}>
                {!copySuccess ? (
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                ) : (
                  <DoneAllIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </div>

            <SyntaxHighlighter
              language={"javascript"}
              style={atelierSulphurpoolLight}
            >
              {truncateString(component.code, 600)}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    );
  }
}

export default AllComponents;

function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
