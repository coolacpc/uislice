import React from "react";

import { useState, useCallback, useRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useAppContext } from "@/app/ContextApi";
import { Component } from "@/app/allData";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { openComponent, openTheDeleteWindow } from "./FavoriteComponents";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
function AllFavoriteComponents() {
  const {
    openAllFavoriteComponentsWindowObject: {
      openAllFavoriteComponentsWindow,
      setOpenAllFavoriteComponentsWindow,
    },
    menuItemsObject: { menuItems, setMenuItems },
    selectedComponentObject: { selectedComponent, setSelectedComponent },
    selectedProjectToFilterObject: {
      selectedProjectToFilter,
      setSelectedProjectToFilter,
    },
  } = useAppContext();

  const [searchInput, setSearchInput] = useState("");

  function closeTheWindow() {
    //Set the first item to selected as true and other as a false
    const newMenuItems = menuItems.map((item) => {
      return { ...item, isSelected: false };
    });

    newMenuItems[0].isSelected = true;
    setMenuItems(newMenuItems);
    setSelectedComponent(null);
    setOpenAllFavoriteComponentsWindow(false);
  }

  return (
    <div
      style={{ display: openAllFavoriteComponentsWindow ? "block" : "none" }}
      className="w-[77%]  max-sm:w-[90%] p-9 border border-slate-50 h-[700px] bg-white rounded-xl shadow-md absolute left-1/2 top-8 -translate-x-1/2 z-50"
    >
      <Header />
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <ComponentsNumber />
      <ComponentsList searchInput={searchInput} />
    </div>
  );

  function Header() {
    return (
      <div className="flex justify-between items-center  ">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <FavoriteRoundedIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[17px]"
            />
          </div>

          <span className="text-lg font-bold  ">Favorite Components</span>
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

  function SearchBar({
    searchInput,
    setSearchInput,
  }: {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  }) {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const {
      openAllFavoriteComponentsWindowObject: {
        openAllFavoriteComponentsWindow,
      },
      openFilterDropDownObject: { openFilterDropDown, setOpenFilterDropDown },
      filterDropDownPositionsObject: { setFilterDropDownPositions },
      allFavoriteComponentsObject: { allFavoriteComponents },
    } = useAppContext();

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      // Focus the input only when openAllProjectsWindow opens (true)
      if (openAllFavoriteComponentsWindow) {
        const focusInput = () => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        };

        if (!openFilterDropDown) {
          // Schedule focus setting for the next render
          setTimeout(focusInput, 0);
        }
      }
    }, [openAllFavoriteComponentsWindow]);

    function openFilterDropDownFx() {
      setOpenFilterDropDown(!openFilterDropDown);
      if (buttonRef.current) {
        const rect = buttonRef?.current.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setFilterDropDownPositions({ top: top, left: left });
      }
    }

    return (
      <div className="flex  gap-5 items-center justify-between mt-12 relative ">
        <div
          className={`h-[42px] bg-slate-50 flex items-center text-sm  rounded-md  pl-3 gap-1 w-[80%]    `}
        >
          <SearchRoundedIcon className="text-slate-400" />
          <input
            ref={searchInputRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a component..."
            className="bg-transparent outline-none w-full font-light"
          />
        </div>
        <button
          ref={buttonRef}
          onClick={openFilterDropDownFx}
          style={{ opacity: allFavoriteComponents.length > 0 ? 1 : 0.5 }}
          disabled={allFavoriteComponents.length > 0 ? false : true}
          className="bg-sky-500 ml-2 p-[10px] px-3 flex gap-2 w-[20%] text-sm rounded-md text-white items-center justify-center  max-lg:w-[25%]"
        >
          <FilterListRoundedIcon sx={{ fontSize: 17 }} />
          <span className="max-md:hidden">
            Filter By: <span className="font-semibold">Project</span>
          </span>
          {openFilterDropDown ? (
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 17 }} />
          ) : (
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 17 }} />
          )}
        </button>
      </div>
    );
  }

  function ComponentsNumber() {
    const {
      allFavoriteComponentsObject: { allFavoriteComponents },
      isLoadingObject: { isLoading },
      selectedProjectToFilterObject: {
        selectedProjectToFilter,
        setSelectedProjectToFilter,
      },
    } = useAppContext();
    return (
      <div className="mt-11 mb-[13px] flex gap-2 items-center justify-between text-[13px]">
        <div className="flex gap-1">
          <span className="text-slate-400">{`You've set`}</span>
          <span className="text-sky-500 font-semibold">
            {allFavoriteComponents.length}
          </span>
          <span className="text-slate-400">components as favorite!</span>
        </div>
        {selectedProjectToFilter && (
          <div>
            <span className="text-slate-400">You are filtering by : </span>
            <span className="text-[12px] rounded-lg bg-sky-100 text-sky-500 p-[6px] px-2">
              {selectedProjectToFilter}
              <CloseIcon
                onClick={() => setSelectedProjectToFilter(null)}
                sx={{ fontSize: 16 }}
                className="text-sky-500 pl-1 cursor-pointer"
              />
            </span>
          </div>
        )}
      </div>
    );
  }

  function ComponentsList({ searchInput }: { searchInput: string }) {
    const {
      allFavoriteComponentsObject: { allFavoriteComponents },
      isLoadingObject: { isLoading },
      selectedProjectToFilterObject: { selectedProjectToFilter },
    } = useAppContext();

    const filterBySearchInput = selectedProjectToFilter
      ? allFavoriteComponents
          .filter((item) => {
            return item.name.toLowerCase().includes(searchInput.toLowerCase());
          })
          .filter((item) => {
            return item.projectName === selectedProjectToFilter;
          })
      : allFavoriteComponents.filter((item) => {
          return item.name.toLowerCase().includes(searchInput.toLowerCase());
        });

    return (
      <div className="w-full overflow-auto bg-slate-50 h-[64%] rounded-lg p-3 flex flex-col gap-3">
        {isLoading && (
          <div className="flex flex-col gap-3 justify-center items-center w-full  mt-28">
            <CircularProgress value={100} />
            <span className="text-slate-400 text-sm">Loading...</span>
          </div>
        )}

        {allFavoriteComponents.length === 0 && !isLoading ? (
          <EmptyProjectsPlaceholder />
        ) : (
          <>
            {filterBySearchInput.length > 0 ? (
              <>
                {filterBySearchInput.map((component, index) => (
                  <SingleComponent key={index} item={component} />
                ))}
              </>
            ) : (
              <>{!isLoading && <NoFoundPojectsSearched />}</>
            )}
          </>
        )}
      </div>
    );

    function SingleComponent({ item }: { item: Component }) {
      const {
        allProjectsObject: { allProjects },
        selectedComponentObject: { setSelectedComponent },
        selectedProjectObject: { setSelectedProject },
        openDeleteWindowObject: { setOpenDeleteWindow },
        openComponentEditorObject: { setOpenComponentEditor },
      } = useAppContext();
      return (
        <div className="w-full bg-white rounded-md flex gap-3 items-center justify-between p-3 px-5 ">
          <div className="flex gap-3 items-center">
            {/* Blue Circle*/}
            <div>
              <div className="w-[10px] h-[10px] bg-sky-500 rounded-full flex items-center justify-center"></div>
            </div>
            {/* Component Name */}
            <div className="flex flex-col">
              <span
                onClick={() =>
                  openComponent({
                    component: item,
                    allProjects: allProjects,
                    setSelectedComponent: setSelectedComponent,
                    setOpenComponentEditor: setOpenComponentEditor,
                    setSelectedProject: setSelectedProject,
                  })
                }
                className="font-bold cursor-pointer hover:text-sky-500"
              >
                {item.name}
              </span>
              <div>
                <span className=" text-[11px]  p-1 px-2 bg-sky-100 text-sky-500 rounded-lg">
                  {item.projectName}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* Edit Button */}
            <div
              onClick={() =>
                openComponent({
                  component: item,
                  allProjects: allProjects,
                  setSelectedComponent: setSelectedComponent,
                  setOpenComponentEditor: setOpenComponentEditor,
                  setSelectedProject: setSelectedProject,
                })
              }
              className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
            >
              <EditRoundedIcon
                className=" text-slate-400"
                sx={{ fontSize: 15 }}
              />
            </div>

            {/* Delete Button */}
            <div
              onClick={() =>
                openTheDeleteWindow({
                  component: item,
                  allProjects: allProjects,
                  setSelectedComponent: setSelectedComponent,
                  setSelectedProject: setSelectedProject,
                  setOpenDeleteWindow: setOpenDeleteWindow,
                })
              }
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

export default AllFavoriteComponents;

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
    <div className=" p-1 gap-5 flex flex-col  justify-center pt-[150px]   items-center">
      <div className="">
        <p className="text-gray-400  w-64  text-center text-[15px]">
          {`It seems like you haven't set a component as favorite yet.`}
        </p>
      </div>
    </div>
  );
}
