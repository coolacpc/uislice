import React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useAppContext } from "@/app/ContextApi";
import { Project } from "@/app/allData";
import { TextToIcon } from "@/app/utils/textToIcon";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

function AllProjectsWindow() {
  const {
    openAllProjectsWindowObject: {
      openAllProjectsWindow,
      setOpenAllProjectsWindow,
    },
    selectedProjectObject: { selectedProject, setSelectedProject },
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, [openAllProjectsWindow]);

  return (
    <div
      style={{ display: openAllProjectsWindow ? "block" : "none" }}
      className="w-[77%]  max-sm:w-[90%] p-9 border border-slate-50 h-[730px] bg-white rounded-xl shadow-md absolute left-1/2 top-8 -translate-x-1/2 z-50"
    >
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortByComponent />
      <ProjectsList searchQuery={searchQuery} />
    </div>
  );

  //Header
  function Header() {
    const {
      openAllProjectsWindowObject: { setOpenAllProjectsWindow },
      menuItemsObject: { menuItems, setMenuItems },
      mainSearchQueryObject: { mainSearchQuery, setMainSearchQuery },
    } = useAppContext();

    function closeTheWindow() {
      //Set the isSelected of the first menu item to true and others to false
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((prevMenuItem) => ({
          ...prevMenuItem,
          isSelected: prevMenuItem.id === menuItems[0].id,
        }))
      );
      setMainSearchQuery("");
      setOpenAllProjectsWindow(false);
    }
    return (
      <div className="flex justify-between items-center  ">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[17px]"
            />
          </div>

          <span className="text-xl font-bold  ">All Projects</span>
        </div>
        <div>
          <CloseIcon
            onClick={closeTheWindow}
            sx={{ fontSize: 16 }}
            className="text-slate-400 cursor-pointer "
          />
        </div>
      </div>
    );
  }
  //Search bar

  function SearchBar({
    searchQuery,
    setSearchQuery,
  }: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }) {
    const {
      openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
      openSortingDropDownObject: { setOpenSortingDropDown },
      mainSearchQueryObject: { mainSearchQuery, setMainSearchQuery },
    } = useAppContext();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      // Focus the input only when openAllProjectsWindow opens (true)
      if (openAllProjectsWindow) {
        const focusInput = () => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        };

        if (!openProjectWindow) {
          // Schedule focus setting for the next render
          setTimeout(focusInput, 0);
        }
      }

      if (mainSearchQuery.trim().length > 0) {
        setSearchQuery(mainSearchQuery);
      }
    }, [openAllProjectsWindow, openProjectWindow]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };

    return (
      <div className="flex  gap-5 items-center justify-between mt-12 relative ">
        <div
          className={`h-[42px] bg-slate-50 flex items-center text-sm  rounded-md  pl-3 gap-1 w-[85%]  relative   `}
        >
          <SearchRoundedIcon className="text-slate-400" />
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search a Project..."
            className="bg-transparent outline-none w-full font-light"
          />
          {/* Close Icon */}
          {searchQuery.length > 0 && (
            <div
              onClick={() => {
                setSearchQuery("");
                setMainSearchQuery("");
              }}
              className="text-slate-400 cursor-pointer absolute right-2 top-3"
            >
              <CloseIcon sx={{ fontSize: 17 }} />
            </div>
          )}
        </div>
        <button className="bg-sky-500 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-[25%]">
          <AddOutlinedIcon sx={{ fontSize: 17 }} />
          <span
            onClick={() => setOpenProjectWindow(true)}
            className="max-md:hidden"
          >
            Create New
          </span>
        </button>
      </div>
    );
  }

  //Sort By
  function SortByComponent() {
    const {
      allProjectsObject: { allProjects },
      openSortingDropDownObject: {
        setOpenSortingDropDown,
        openSortingDropDown,
      },
      sortingDropDownPositionsObject: { setSortingDropDownPositions },
      sortingOptionsObject: { sortingOptions },
    } = useAppContext();

    const nameRef = useRef<HTMLDivElement>(null);

    function openSortingDropDownFunction() {
      if (nameRef.current) {
        const rect = nameRef?.current.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;

        setSortingDropDownPositions({ top: top, left: left });
      }

      setOpenSortingDropDown(true);
    }

    const selectedName = sortingOptions.find((category) =>
      category.options.some((option) => option.selected)
    );
    return (
      <div className="mt-11 mb-[13px] flex gap-2 items-center justify-between text-[13px]">
        <div className="flex gap-1">
          <span className="text-slate-400">You have</span>
          <span className="text-sky-500 font-semibold">
            {allProjects.length}
          </span>
          <span className="text-slate-400">projects!</span>
        </div>

        <div className="flex gap-2 items-center select-none cursor-pointer">
          <span className="text-slate-400">Sort By:</span>
          <div
            ref={nameRef}
            onClick={openSortingDropDownFunction}
            className="text-sky-500 flex items-center"
          >
            <span>{selectedName?.category}</span>
            {openSortingDropDown ? (
              <KeyboardArrowUpRoundedIcon className="text-[13px]" />
            ) : (
              <KeyboardArrowDownRoundedIcon className="text-[13px]" />
            )}
          </div>
        </div>
      </div>
    );
  }

  //Projects List
  function ProjectsList({ searchQuery }: { searchQuery: string }) {
    const {
      allProjectsObject: { allProjects, setAllProjects },
      isLoadingObject: { isLoading },
      sortedProjectsObject: { sortedProjects },
    } = useAppContext();

    const filterAllProjectsBySearchQuery = sortedProjects.filter(
      (singleProject) =>
        singleProject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="w-full overflow-auto bg-slate-50 h-[64%] rounded-lg p-3 flex flex-col gap-3">
        {isLoading && (
          <div className="flex flex-col gap-3 justify-center items-center w-full  mt-28">
            <CircularProgress value={100} />
            <span className="text-slate-400 text-sm">Loading...</span>
          </div>
        )}
        {allProjects.length === 0 && !isLoading ? (
          <EmptyProjectsPlaceholder />
        ) : (
          <>
            {filterAllProjectsBySearchQuery.length > 0 ? (
              <>
                {filterAllProjectsBySearchQuery.map((project, index) => (
                  <SingleProject key={index} project={project} />
                ))}
              </>
            ) : (
              <>{!isLoading && <NoFoundPojectsSearched />}</>
            )}
          </>
        )}
      </div>
    );

    function SingleProject({ project }: { project: Project }) {
      const {
        selectedProjectObject: { selectedProject, setSelectedProject },
        openProjectWindowObject: { setOpenProjectWindow },
        showComponentPageObject: { setShowComponentPage },
        openAllProjectsWindowObject: { setOpenAllProjectsWindow },
        menuItemsObject: { menuItems, setMenuItems },
        openDeleteWindowObject: { setOpenDeleteWindow },
      } = useAppContext();

      function editTheProjectClicked() {
        setOpenProjectWindow(true);
        setSelectedProject(project);
      }

      function openTheProject() {
        //update the selectedProject
        setSelectedProject(project);
        //Close the all project window
        setOpenAllProjectsWindow(false);
        //Show the component Page
        setShowComponentPage(true);
      }

      function openDeleteWindow() {
        setSelectedProject(project);
        setOpenDeleteWindow(true);
      }

      return (
        <div className="w-full bg-white rounded-md flex gap-3 items-center justify-between p-3 px-4 ">
          <div className="flex gap-3 items-center">
            {/* Project Icon */}
            <div>
              <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
                {TextToIcon({
                  text: project.icon,
                  fontSize: 17,
                  className: "text-sky-400 text-[17px]",
                })}
              </div>
            </div>
            {/* Project Name */}
            <div className="flex flex-col">
              <span
                onClick={openTheProject}
                className="font-bold cursor-pointer hover:text-sky-500"
              >
                {project.name}
              </span>
              <span className="text-slate-400 text-[12px]">
                {project.components.length} Components
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* Edit Button */}
            <div
              onClick={editTheProjectClicked}
              className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
            >
              <EditRoundedIcon
                className=" text-slate-400"
                sx={{ fontSize: 15 }}
              />
            </div>

            {/* Delete Button */}
            <div
              onClick={openDeleteWindow}
              className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
            >
              <DeleteIcon className=" text-slate-400" sx={{ fontSize: 15 }} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AllProjectsWindow;

function NoFoundPojectsSearched() {
  return (
    <div className=" p-1 gap-5 flex flex-col  justify-center pt-[90px]   items-center">
      <SearchIcon
        sx={{ fontSize: 80 }}
        className="text-[70px] text-slate-200"
      />
      <div className="">
        <p className="text-gray-400  w-72  text-center text-[13px]">
          {`Oops! That project seems to be missing. Try searching with a different keyword.`}
        </p>
      </div>
    </div>
  );
}

function EmptyProjectsPlaceholder() {
  return (
    <div className=" p-1 gap-5 flex flex-col  justify-center pt-[90px]   items-center">
      <AddModeratorIcon
        sx={{ fontSize: 80 }}
        className="text-[70px] text-slate-200"
      />
      <div className="">
        <h3 className="font-semibold text-[15px] mb-1 text-center ">{`There are no projects Yet...`}</h3>
        <p className="text-gray-400  w-52  text-center text-[13px]">
          Please click above to add your first project.
        </p>
      </div>
    </div>
  );
}
