import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import CodeIcon from "@mui/icons-material/Code";
import AppsIcon from "@mui/icons-material/Apps";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AceEditor from "react-ace";
import prettier from "prettier/standalone";
import { useRef } from "react";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { CheckBox, Save } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { useAppContext } from "@/app/ContextApi";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { v4 as uuidv4 } from "uuid";
import { Component, Project } from "@/app/allData";
export function ComponentEditor() {
  const [code, setCode] = useState(``);
  const [inputName, setInputName] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const aceEditorRef = useRef<AceEditor | null>(null);
  const {
    openComponentEditorObject: { openComponentEditor, setOpenComponentEditor },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { selectedProject, setSelectedProject },
    selectedComponentObject: { selectedComponent, setSelectedComponent },
  } = useAppContext();
  const editorInstanceRef = useRef<any>(null);
  const formatCode = async (codeToFormat: string) => {
    if (aceEditorRef.current) {
      try {
        const formatted = await prettier.format(codeToFormat, {
          parser: "babel",
          plugins: [babelPlugin, estreePlugin],
          singleQuote: true,
          trailingComma: "all",
        });
        setCode(formatted);
        aceEditorRef.current.editor.setValue(formatted, 1);
      } catch (error) {
        console.error("Formatting failed:", error);
      }
    }
  };

  const handleChange = (newValue: string) => {
    setCode(newValue);
  };

  function saveComponent() {
    // Check if the project name is not empty
    if (inputName.trim() === "") {
      toast.error("Please enter a component name");
      inputRef.current?.focus();
      return;
    }

    // Check if code is not empty
    if (code.trim() === "") {
      toast.error("Please enter code");
      aceEditorRef.current?.editor.focus();
      return;
    }

    if (!selectedProject) {
      toast.error("No project selected");
      return;
    }

    if (!selectedComponent) {
      // Creating a new component
      const newComponent: Component = {
        _id: uuidv4(),
        name: inputName,
        code: code,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        projectName: selectedProject.name,
      };

      // Check if the component name already exists in the current project
      if (
        selectedProject.components.some(
          (component) =>
            component.name.toLowerCase() === inputName.toLowerCase()
        )
      ) {
        toast.error("Component name already exists in this project");
        return;
      }

      addNewComponent(newComponent);
      setSelectedComponent(newComponent);
      toast.success("New component created successfully");
      formatCode(newComponent.code);
    } else {
      // Updating an existing component
      const updatedComponent: Component = {
        ...selectedComponent,
        name: inputName,
        code: code,
      };

      // Check if the new name conflicts with other components (excluding the current one)
      if (
        selectedProject.components.some(
          (component) =>
            component._id !== selectedComponent._id &&
            component.name.toLowerCase() === inputName.toLowerCase()
        )
      ) {
        toast.error("Component name already exists in this project");
        return;
      }

      updateExistingComponent(updatedComponent);
      setSelectedComponent(updatedComponent);
      toast.success("Component updated successfully");
    }
  }

  async function addNewComponent(newComponent: Component) {
    if (!selectedProject) {
      toast.error("No project selected");
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
            action: "addComponent",
            component: newComponent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add component");
      }

      const updatedProject = await response.json();

      const updatedAllProjects = allProjects.map((project) =>
        project._id === selectedProject._id ? updatedProject.project : project
      );

      setSelectedProject(updatedProject.project);
      setAllProjects(updatedAllProjects);
      toast.success("Component added successfully");
    } catch (error) {
      console.error("Error adding component:", error);
      toast.error("Failed to add component");
    }
  }

  async function updateExistingComponent(updatedComponent: Component) {
    if (!selectedProject) {
      toast.error("No project selected");
      return;
    }

    try {
      const response = await fetch(
        `/api/projects?projectId=${selectedProject._id}&componentId=${updatedComponent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "updateComponent",
            component: updatedComponent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update component");
      }

      const updatedProject = await response.json();

      const updatedAllProjects = allProjects.map((project) =>
        project._id === selectedProject._id ? updatedProject.project : project
      );

      setSelectedProject(updatedProject.project);
      setAllProjects(updatedAllProjects);
      toast.success("Component updated successfully");
    } catch (error) {
      console.error("Error updating component:", error);
      toast.error("Failed to update component");
    }
  }
  console.log(selectedComponent);

  function copyTheCode() {
    //Copy the code to clipboard
    setCopySuccess(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => {
      navigator.clipboard.writeText(code);
      setCopySuccess(false);
    }, 1400);
  }

  async function updateTheFavoriteState() {
    if (
      selectedComponent !== null &&
      allProjects !== null &&
      selectedProject !== null
    ) {
      try {
        const response = await fetch(
          `/api/projects?projectId=${selectedProject._id}&componentId=${selectedComponent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "updateFavoriteState",
              isFavorite: !selectedComponent.isFavorite,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update favorite state");
        }

        const { project: updatedProject } = await response.json();

        // Update the isFavorite state in the selected Component
        const updatedComponent = {
          ...selectedComponent,
          isFavorite: !selectedComponent.isFavorite,
        };

        // Update the components array in the selectedProject
        const updatedComponents = selectedProject.components.map((component) =>
          component._id === selectedComponent._id ? updatedComponent : component
        );

        const updatedSelectedProject = {
          ...selectedProject,
          components: updatedComponents,
        };

        // Update the selectedProject in the allProjects
        const updatedAllProjects = allProjects.map((project) =>
          project._id === selectedProject._id ? updatedSelectedProject : project
        );

        // Update all the states
        setSelectedComponent(updatedComponent);
        setSelectedProject(updatedProject); // Use the updated project from the response
        setAllProjects(updatedAllProjects);
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      console.error("Selected component, project, or all projects is null");
    }
  }

  //When the component is first rendered, focus on the input and format the code
  //and the empty the fields
  useEffect(() => {
    if (openComponentEditor) {
      inputRef.current?.focus();
      if (!selectedComponent) {
        setIsFavorite(false);
        resetEditor();
      } else {
        setInputName(selectedComponent.name);
        setCode(selectedComponent.code);
        setIsFavorite(selectedComponent.isFavorite);
        if (editorInstanceRef.current) {
          editorInstanceRef.current.setValue(selectedComponent.code, -1);
          // Format the code after setting it
          formatCode(selectedComponent.code);
        }
      }
    } else {
      resetEditor();
    }
  }, [openComponentEditor, selectedComponent]);

  const resetEditor = () => {
    setCode("");
    setInputName("");
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setValue("", -1);
    }
  };

  return (
    <div
      style={{ display: openComponentEditor ? "flex" : "none" }}
      className="w-[96%] h-[735px] max-sm:h-[90%]   max-sm:flex-col  border-slate-100    flex-row overflow-hidden bg-white absolute left-1/2 top-2 rounded-2xl shadow-md -translate-x-1/2 z-50"
    >
      {/* Left Part */}
      <div className="w-1/2 max-sm:w-full  h-full">
        {/* Header */}
        <div className="flex justify-between items-center  pt-7 px-8">
          <div className="flex items-center gap-2">
            {/* Category Icon */}
            <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
              <FormatShapesIcon
                sx={{ fontSize: 17 }}
                className="text-sky-400 text-[17px]"
              />
            </div>
            {/* Category Header */}
            <span className="font-semibold">Component Editor</span>
          </div>
          <CloseIcon
            onClick={() => {
              setOpenComponentEditor(false);
              setSelectedComponent(null);
              resetEditor(); // Reset the input name
            }}
            sx={{ fontSize: 16 }}
            className="text-slate-400 text-[18px] cursor-pointer"
          />
        </div>

        {/* Input Name */}
        <div className=" flex flex-col gap-2 pt-14 px-8 ">
          {/* Input Label */}
          <div className="flex gap-3">
            <span className="flex gap-1 items-center text-[13px] ">
              <TextFieldsIcon className="text-[15px]" />
              <span>Component Name</span>
            </span>
            <div>
              <Checkbox
                icon={<FavoriteBorderIcon sx={{ fontSize: 19 }} />}
                onChange={updateTheFavoriteState}
                checked={isFavorite}
                checkedIcon={
                  <FavoriteIcon
                    sx={{ fontSize: 19 }}
                    className="text-red-500"
                  />
                }
              />
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter Component Name..."
              className="p-[10px] text-[12px] w-full rounded-md border outline-none"
            />
          </div>
        </div>

        {/* Input Code */}
        <div className=" flex flex-col gap-2 pt-6 px-8 ">
          <div className="flex justify-between">
            {/* Input Label */}
            <div className="flex gap-3">
              <span className="flex gap-1 items-center text-[13px] ">
                <CodeIcon className="text-[15px] font-bold" />
                <span>JSX Code</span>
              </span>
              <IconButton onClick={copyTheCode}>
                {!copySuccess ? (
                  <ContentCopyIcon sx={{ fontSize: 17 }} />
                ) : (
                  <DoneAllIcon sx={{ fontSize: 17 }} />
                )}
              </IconButton>
            </div>

            <button
              onClick={saveComponent}
              className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 rounded-md transition-all"
            >
              <Save sx={{ fontSize: 17 }} />
            </button>
          </div>

          <div className="border border-slate-200 rounded-md relative mt-1">
            {/* Copy Button */}
            <AceEditor
              ref={aceEditorRef}
              onLoad={(editorInstance) => {
                editorInstanceRef.current = editorInstance;
              }}
              mode="jsx"
              theme="Dreamweaver"
              onChange={handleChange}
              name="jsxEditor"
              value={code}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              fontSize={14}
              width="100%"
              height="440px"
            />
          </div>
        </div>
      </div>
      {/* Right Part */}
      <div className=" w-1/2 max-sm:w-full max-sm:border-t border-l max-sm:mt-5 border-slate-100 h-full">
        <LiveProvider code={code} noInline={false}>
          <div className="  ">
            <LiveError className="rounded-lg border-gray-200 p-4 text-red-600" />
            <LivePreview className="rounded-lg border-gray-200 p-4" />
          </div>
        </LiveProvider>
      </div>
    </div>
  );
}
