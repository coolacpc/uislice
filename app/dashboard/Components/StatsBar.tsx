import React, { useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "@/app/ContextApi";
import Skeleton from "@mui/material/Skeleton";

interface StatisticCard {
  id: number;
  name: string;
  icon: React.ReactNode;
  count: number;
}
export default function StatsBar() {
  const [statisticsCards, setStatisticsCard] = React.useState<StatisticCard[]>(
    []
  );

  const {
    allProjectsObject: { allProjects },
    allFavoriteComponentsObject: { allFavoriteComponents },
    isLoadingObject: { isLoading },
  } = useAppContext();
  useEffect(() => {
    setStatisticsCard([
      {
        id: 1,
        name: "Projects Created",
        icon: <AccountTreeIcon className="text-sky-400" />,
        count: allProjects.length,
      },

      {
        id: 2,
        name: "Components Added",
        icon: <CategoryIcon className="text-sky-400" />,
        count: allProjects.reduce((a, b) => a + b.components.length, 0),
      },

      {
        id: 3,
        name: "Favorites components",
        icon: <FavoriteIcon className="text-sky-400" />,
        count: allFavoriteComponents.length,
      },
    ]);
  }, [allProjects, allFavoriteComponents]);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-4 rounded-lg mt-2">
        {statisticsCards.map((card, index) => (
          <div key={index}>
            <CategoriesCard singleCard={card} />
          </div>
        ))}
      </div>
    </div>
  );

  function CategoriesCard({ singleCard }: { singleCard: StatisticCard }) {
    const {
      isLoadingObject: { isLoading },
      allProjectsObject: { allProjects },
    } = useAppContext();

    return (
      <div className="flex gap-4 items-center p-4 bg-white rounded-lg">
        <div className="w-[45px] h-[45px] bg-sky-100 rounded-full flex items-center justify-center max-md:hidden">
          {singleCard.icon}
        </div>
        <div className="flex flex-col max-sm:justify-center ">
          {isLoading ? (
            <Skeleton
              className="mb-2"
              variant="rectangular"
              width={105}
              height={25}
            />
          ) : (
            <span className="font-bold text-2xl max-sm:text-center">
              {singleCard.count}
            </span>
          )}

          <span className="  text-sm font-light text-slate-400 max-sm:text-[11px] max-sm:text-center ">
            {singleCard.name}
          </span>
        </div>
      </div>
    );
  }
}
