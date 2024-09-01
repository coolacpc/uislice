import { useAppContext } from "@/app/ContextApi";
import { useRef, useEffect, useState } from "react";
import { Project } from "@/app/allData";
function SortingDropDown() {
  const {
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingDropDownPositionsObject: {
      sortingDropDownPositions: { top, left },
    },
    allProjectsObject: { allProjects },
    sortedProjectsObject: { sortedProjects, setSortedProjects },
    sortingOptionsObject: { sortingOptions, setSortingOptions },
  } = useAppContext();

  const DropDownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (categoryIndex: number, optionIndex: number) => {
    setSortingOptions((prevOptions) => {
      const newOptions = prevOptions.map((category, cIndex) => ({
        ...category,
        options: category.options.map((option, oIndex) => ({
          ...option,
          selected: cIndex === categoryIndex && oIndex === optionIndex,
        })),
      }));

      // Find the selected option
      const selectedOption = newOptions
        .flatMap((c) => c.options)
        .find((o) => o.selected);

      if (selectedOption) {
        // Sort the projects based on the selected option
        const sorted = sortProjects(allProjects, selectedOption.value);
        setSortedProjects(sorted);
      }

      // Save to localStorage immediately
      localStorage.setItem("sortingOptions", JSON.stringify(newOptions));

      return newOptions;
    });

    setOpenSortingDropDown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        DropDownRef.current &&
        !DropDownRef.current.contains(event.target as Node)
      ) {
        setOpenSortingDropDown(false);
      }
    }

    function handleScroll() {
      setOpenSortingDropDown(false);
    }

    function handleWheel(event: WheelEvent) {
      if (event.deltaY !== 0) {
        setOpenSortingDropDown(false);
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
  }, [openSortingDropDown]);

  // Save to localStorage whenever sortingOptions changes
  useEffect(() => {
    localStorage.setItem("sortingOptions", JSON.stringify(sortingOptions));
  }, [sortingOptions]);

  useEffect(() => {
    //Find the selected option in the sortingOptions array
    const selectedOption = sortingOptions.find((category) =>
      category.options.find((option) => option.selected)
    );

    const sorted = sortProjects(
      allProjects,
      selectedOption?.options.find((option) => option.selected)?.value as string
    );

    setSortedProjects(sorted);
  }, [allProjects]);

  function sortProjects(projects: Project[], sortOption: string): Project[] {
    const sortedProjects = [...projects];

    switch (sortOption) {
      case "asc":
        sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sortedProjects.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sortedProjects.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        // If no valid sort option is provided, return the original array
        return projects;
    }

    return sortedProjects;
  }

  return (
    <div
      ref={DropDownRef}
      style={{
        display: openSortingDropDown ? "block" : "none",
        top: top + 35,
        left: left - 100,
      }}
      className="bg-white text-sm top-[170px] right-14    z-[60] px-4 border border-slate-50  fixed py-6  w-[160px] select-none 
    shadow-md rounded-lg    flex flex-col  "
    >
      {sortingOptions.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex flex-col gap-1 text-slate-600 cursor-pointer"
        >
          <span
            className={`text-[13px] font-bold ${category.category === "Date" ? "mt-3" : ""}`}
          >
            {category.category}
          </span>
          <div className="flex flex-col gap-2 ml-2 mt-[2px]">
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <span
                  onClick={() => handleOptionClick(categoryIndex, optionIndex)}
                  className={`${option.selected ? "text-sky-500" : ""} cursor-pointer hover:text-sky-500`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SortingDropDown;
