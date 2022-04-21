import Container from "../../shared/components/container";
import Photo from "./components/Photo";
import Board from "./components/Board";
import Router from "next/router";
import { useEffect, useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { useQuery } from "react-query";
import { getMyFightsLimitData } from "src/api/my-fights";
import RecentFightBox from "./components/RecentFightBox";
import Ad from "./components/Ad";
import { useTheme } from "@mui/system";

export interface FightsInfo {
  content: string;
  likes?: number;
  hates?: number;
  solved?: fightStatusType;
}

const index = () => {
  const theme = useTheme();
  const [yourFightsData, setYourFightsData] = useState<FightsInfo[]>([]);
  const { isLoading, data: myFightsData } = useQuery("myFightsLimitData", () =>
    getMyFightsLimitData(3),
  );
  const recentMyFightsData = Object.values(myFightsData ?? "")[0];

  const handleYourFightClick = () => {
    Router.push("/your-fights");
  };

  const handleMyFightClick = () => {
    Router.push("/my-fights");
  };

  // API async await 필요
  const getYourFightsData = () => {
    const data = [
      {
        content: "늦잠 자서 약속에 늦은 여자친구, 어떻게 할까요?",
        likes: 14,
        hates: 1,
        state: null,
      },
      {
        content: "늦잠 자서 약속에 늦은 남자친구, 어떻게 할까요?",
        likes: 11,
        hates: 3,
        state: null,
      },
      {
        content: "늦잠 자서 약속에 늦은 외국인친구, 어떻게 할까요?",
        likes: 8,
        hates: 5,
        state: null,
      },
    ];

    return data;
  };

  const getMyFightsData = () => {
    return myFightsData?.map((item) => ({
      content: item.content,
      solved: item.solved,
    }));
  };

  useEffect(() => {
    setYourFightsData(getYourFightsData()); //type에러 니쌈 통신할 때 챙기기
  }, []);

  return (
    <>
      <Container marginX={1}>
        <div style={{ position: "relative" }}>
          <Photo />
          <RecentFightBox
            style={{ position: "absolute", bottom: "0" }}
            content={recentMyFightsData?.content}
            solved={recentMyFightsData?.solved}
          />
        </div>
        <Ad />
        <Board
          content="니쌈"
          onClick={handleYourFightClick}
          data={yourFightsData}
        />
        <Board
          content="내쌈"
          onClick={handleMyFightClick}
          data={getMyFightsData()}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
};

export default index;
