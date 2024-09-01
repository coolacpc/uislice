"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useEffect } from "react";
import AllProjects from "./dashboard/Components/AllProjects";
import { allProjectsData, Component, Project } from "./allData";
import FavoriteComponents from "./dashboard/Components/FavoriteComponents";
import { useUser } from "@clerk/nextjs";

export interface MenuItem {
  id: string;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
}

export interface DarkModeMenu {
  id: string;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
}

export interface DropDownPosition {
  top: number;
  left: number;
}

interface SortingOption {
  category: string;
  options: {
    label: string;
    value: string;
    selected: boolean;
  }[];
}

// Define the shape of the context state
interface AppContextType {
  menuItemsObject: {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  };

  darkModeMenuObject: {
    darkModeMenu: DarkModeMenu[];
    setDarkModeMenu: React.Dispatch<React.SetStateAction<DarkModeMenu[]>>;
  };

  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openDarkModeMenuObject: {
    openDarkModeMenu: boolean;
    setOpenDarkModeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  };

  showSearchBarObject: {
    showSearchBar: boolean;
    setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isMobileViewObject: {
    isMobileView: boolean;
    setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  };

  showSideBarObject: {
    showSideBar: boolean;
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allProjectsObject: {
    allProjects: Project[];
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  };

  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allFavoriteComponentsObject: {
    allFavoriteComponents: Component[];
    setAllFavoriteComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  };

  openProjectWindowObject: {
    openProjectWindow: boolean;
    setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openIconWindowObject: {
    openIconWindow: boolean;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  showComponentPageObject: {
    showComponentPage: boolean;
    setShowComponentPage: React.Dispatch<React.SetStateAction<boolean>>;
  };

  selectedProjectObject: {
    selectedProject: Project | null;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  };

  dropDownPositionObject: {
    dropDownPositions: DropDownPosition;
    setDropDownPositions: React.Dispatch<
      React.SetStateAction<DropDownPosition>
    >;
  };

  openDropDownObject: {
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openDeleteWindowObject: {
    openDeleteWindow: boolean;
    setOpenDeleteWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  selectedComponentObject: {
    selectedComponent: Component | null;
    setSelectedComponent: React.Dispatch<
      React.SetStateAction<Component | null>
    >;
  };

  openComponentEditorObject: {
    openComponentEditor: boolean;
    setOpenComponentEditor: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openAllProjectsWindowObject: {
    openAllProjectsWindow: boolean;
    setOpenAllProjectsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openSortingDropDownObject: {
    openSortingDropDown: boolean;
    setOpenSortingDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sortingDropDownPositionsObject: {
    sortingDropDownPositions: DropDownPosition;
    setSortingDropDownPositions: React.Dispatch<
      React.SetStateAction<DropDownPosition>
    >;
  };

  sortedProjectsObject: {
    sortedProjects: Project[];
    setSortedProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  };

  sortingOptionsObject: {
    sortingOptions: SortingOption[];
    setSortingOptions: React.Dispatch<React.SetStateAction<SortingOption[]>>;
  };

  openAllFavoriteComponentsWindowObject: {
    openAllFavoriteComponentsWindow: boolean;
    setOpenAllFavoriteComponentsWindow: React.Dispatch<
      React.SetStateAction<boolean>
    >;
  };

  openFilterDropDownObject: {
    openFilterDropDown: boolean;
    setOpenFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };

  filterDropDownPositionsObject: {
    filterDropDownPositions: DropDownPosition;
    setFilterDropDownPositions: React.Dispatch<
      React.SetStateAction<DropDownPosition>
    >;
  };

  selectedProjectToFilterObject: {
    selectedProjectToFilter: string | null;
    setSelectedProjectToFilter: React.Dispatch<
      React.SetStateAction<string | null>
    >;
  };

  openLiveSearchBarObject: {
    openLiveSearchBar: boolean;
    setOpenLiveSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  };

  mainSearchQueryObject: {
    mainSearchQuery: string;
    setMainSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  };

  liveSearchPositionsObject: {
    liveSearchPositions: DropDownPosition;
    setLiveSearchPositions: React.Dispatch<
      React.SetStateAction<DropDownPosition>
    >;
  };
}

// Create a default state
const defaultState: AppContextType = {
  menuItemsObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: true,
    setOpenSideBar: () => {},
  },
  openDarkModeMenuObject: {
    openDarkModeMenu: false,
    setOpenDarkModeMenu: () => {},
  },
  darkModeMenuObject: {
    darkModeMenu: [],
    setDarkModeMenu: () => {},
  },

  showSearchBarObject: {
    showSearchBar: false,
    setShowSearchBar: () => {},
  },
  isMobileViewObject: {
    isMobileView: false,
    setIsMobileView: () => {},
  },

  showSideBarObject: {
    showSideBar: true,
    setShowSideBar: () => {},
  },
  allProjectsObject: {
    allProjects: [],
    setAllProjects: () => {},
  },

  allFavoriteComponentsObject: {
    allFavoriteComponents: [],
    setAllFavoriteComponents: () => {},
  },
  isLoadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },

  openProjectWindowObject: {
    openProjectWindow: false,
    setOpenProjectWindow: () => {},
  },

  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
  },
  showComponentPageObject: {
    showComponentPage: false,
    setShowComponentPage: () => {},
  },

  selectedProjectObject: {
    selectedProject: null,
    setSelectedProject: () => {},
  },

  dropDownPositionObject: {
    dropDownPositions: { top: 0, left: 0 },
    setDropDownPositions: () => {},
  },

  openDropDownObject: {
    openDropDown: false,
    setOpenDropDown: () => {},
  },

  openDeleteWindowObject: {
    openDeleteWindow: false,
    setOpenDeleteWindow: () => {},
  },
  selectedComponentObject: {
    selectedComponent: null,
    setSelectedComponent: () => {},
  },
  openComponentEditorObject: {
    openComponentEditor: false,
    setOpenComponentEditor: () => {},
  },

  openAllProjectsWindowObject: {
    openAllProjectsWindow: false,
    setOpenAllProjectsWindow: () => {},
  },
  openSortingDropDownObject: {
    openSortingDropDown: false,
    setOpenSortingDropDown: () => {},
  },

  sortingDropDownPositionsObject: {
    sortingDropDownPositions: { top: 0, left: 0 },
    setSortingDropDownPositions: () => {},
  },

  sortedProjectsObject: {
    sortedProjects: [],
    setSortedProjects: () => {},
  },

  sortingOptionsObject: {
    sortingOptions: [],
    setSortingOptions: () => {},
  },

  openAllFavoriteComponentsWindowObject: {
    openAllFavoriteComponentsWindow: false,
    setOpenAllFavoriteComponentsWindow: () => {},
  },

  openFilterDropDownObject: {
    openFilterDropDown: false,
    setOpenFilterDropDown: () => {},
  },

  filterDropDownPositionsObject: {
    filterDropDownPositions: { top: 0, left: 0 },
    setFilterDropDownPositions: () => {},
  },
  selectedProjectToFilterObject: {
    selectedProjectToFilter: null,
    setSelectedProjectToFilter: () => {},
  },
  openLiveSearchBarObject: {
    openLiveSearchBar: false,
    setOpenLiveSearchBar: () => {},
  },

  mainSearchQueryObject: {
    mainSearchQuery: "",
    setMainSearchQuery: () => {},
  },

  liveSearchPositionsObject: {
    liveSearchPositions: { top: 0, left: 0 },
    setLiveSearchPositions: () => {},
  },
};

// Create the context with default values
const AppContext = createContext<AppContextType>(defaultState);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //Variables
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Home", icon: <HomeIcon />, isSelected: true },
    { id: "2", name: "Projects", icon: <CategoryIcon />, isSelected: false },
    { id: "3", name: "Favorites", icon: <FavoriteIcon />, isSelected: false },
  ]);
  const [openSideBar, setOpenSideBar] = useState(true);

  const [openDarkModeMenu, setOpenDarkModeMenu] = useState(false);
  const [darkModeMenu, setDarkModeMenu] = useState<DarkModeMenu[]>([
    {
      id: "1",
      name: "Light",
      icon: <LightModeIcon fontSize="small" />,
      isSelected: true,
    },
    {
      id: "2",
      name: "Dark",
      icon: <DarkModeIcon fontSize="small" />,
      isSelected: false,
    },
  ]);

  const [openProjectWindow, setOpenProjectWindow] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allFavoriteComponents, setAllFavoriteComponents] = useState<
    Component[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [showComponentPage, setShowComponentPage] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dropDownPositions, setDropDownPositions] = useState({
    left: 0,
    top: 0,
  });

  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );
  const [openComponentEditor, setOpenComponentEditor] = useState(false);
  const [openAllProjectsWindow, setOpenAllProjectsWindow] = useState(false);
  const [openSortingDropDown, setOpenSortingDropDown] = useState(false);
  const [sortingDropDownPositions, setSortingDropDownPositions] = useState({
    left: 0,
    top: 0,
  });
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const { user, isLoaded, isSignedIn } = useUser();

  const [sortingOptions, setSortingOptions] = useState([
    {
      category: "Order",
      options: [
        { label: "A-Z", value: "asc", selected: true },
        { label: "Z-A", value: "desc", selected: false },
      ],
    },
    {
      category: "Date",
      options: [
        { label: "Newest", value: "newest", selected: false },
        { label: "Oldest", value: "oldest", selected: false },
      ],
    },
  ]);

  const [openAllFavoriteComponentsWindow, setOpenAllFavoriteComponentsWindow] =
    useState(false);
  const [openFilterDropDown, setOpenFilterDropDown] = useState(false);
  const [filterDropDownPositions, setFilterDropDownPositions] = useState({
    left: 0,
    top: 0,
  });

  const [selectedProjectToFilter, setSelectedProjectToFilter] = useState<
    string | null
  >(null);

  const [openLiveSearchBar, setOpenLiveSearchBar] = useState(false);
  const [mainSearchQuery, setMainSearchQuery] = useState("");
  const [liveSearchPositions, setLiveSearchPositions] = useState({
    left: 0,
    top: 0,
  });

  //End of variables
  //
  //Update the window size
  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 640);
    }

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Simulate the fetch using setTimeout
  useEffect(() => {
    async function fetchAllProjectsNew() {
      try {
        const response = await fetch(`/api/projects?clerkUserId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: { projects: Project[] } = await response.json();
        if (data.projects) {
          data.projects.forEach((project) => {
            project.components.sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });
          });
          // Update the all Projects
          setAllProjects(data.projects);
          setSortedProjects(data.projects);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchAllProjectsNew();
    }
  }, [user, isLoaded, isSignedIn]);

  // Update favorite components when allProjects changes
  useEffect(() => {
    if (allProjects.length > 0) {
      const favoriteComponents = allProjects.flatMap((project) =>
        project.components.filter((component) => component.isFavorite)
      );
      setAllFavoriteComponents(favoriteComponents);
    }
  }, [allProjects]);

  // Update local storage whenever hideSideBar changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
    }
  }, [openSideBar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Save the dark mode state to localStorage whenever it changes
      const isDarkMode = darkModeMenu[1].isSelected;
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    }
  }, [darkModeMenu]);

  useEffect(() => {
    if (menuItems[0].isSelected) {
      setSelectedProject(null);
      setShowComponentPage(false);
    }
    if (menuItems[1].isSelected) {
      setOpenAllProjectsWindow(true);
      setSelectedProject(null);
      setShowComponentPage(false);
    }

    if (menuItems[2].isSelected) {
      setOpenAllFavoriteComponentsWindow(true);
    }
  }, [menuItems]);

  return (
    <AppContext.Provider
      value={{
        menuItemsObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
        darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
        showSearchBarObject: { showSearchBar, setShowSearchBar },
        isMobileViewObject: { isMobileView, setIsMobileView },
        showSideBarObject: { showSideBar, setShowSideBar },
        allProjectsObject: { allProjects, setAllProjects },
        isLoadingObject: { isLoading, setIsLoading },
        allFavoriteComponentsObject: {
          allFavoriteComponents,
          setAllFavoriteComponents,
        },
        openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
        openIconWindowObject: { openIconWindow, setOpenIconWindow },
        showComponentPageObject: { showComponentPage, setShowComponentPage },
        selectedProjectObject: { selectedProject, setSelectedProject },
        dropDownPositionObject: { dropDownPositions, setDropDownPositions },
        openDropDownObject: { openDropDown, setOpenDropDown },
        openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
        selectedComponentObject: { selectedComponent, setSelectedComponent },
        openComponentEditorObject: {
          openComponentEditor,
          setOpenComponentEditor,
        },
        openAllProjectsWindowObject: {
          openAllProjectsWindow,
          setOpenAllProjectsWindow,
        },
        openSortingDropDownObject: {
          openSortingDropDown,
          setOpenSortingDropDown,
        },
        sortingDropDownPositionsObject: {
          setSortingDropDownPositions,
          sortingDropDownPositions,
        },

        sortedProjectsObject: { sortedProjects, setSortedProjects },
        sortingOptionsObject: { sortingOptions, setSortingOptions },
        openAllFavoriteComponentsWindowObject: {
          openAllFavoriteComponentsWindow,
          setOpenAllFavoriteComponentsWindow,
        },

        openFilterDropDownObject: {
          openFilterDropDown,
          setOpenFilterDropDown,
        },

        filterDropDownPositionsObject: {
          filterDropDownPositions,
          setFilterDropDownPositions,
        },
        selectedProjectToFilterObject: {
          selectedProjectToFilter,
          setSelectedProjectToFilter,
        },

        openLiveSearchBarObject: {
          openLiveSearchBar,
          setOpenLiveSearchBar,
        },
        mainSearchQueryObject: { mainSearchQuery, setMainSearchQuery },
        liveSearchPositionsObject: {
          liveSearchPositions,
          setLiveSearchPositions,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
