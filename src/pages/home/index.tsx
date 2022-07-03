import Container from "src/shared/components/container";
import Photo from "src/components/home/Photo";
import Board from "src/components/home/Board";
import Router from "next/router";
import Ad from "src/components/home/Ad";
import RecentFightBox from "src/components/home/RecentFightBox";

import { useEffect, useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { useQuery } from "react-query";
import { getMyFightsLimitData } from "src/api/my-fights";
import { useTheme } from "@mui/system";
import { useAuth } from "../auth/hook/useAuth";
import LoginTextButton from "src/components/common/LoginTextButton";

export interface FightsInfo {
  content: string;
  likes?: number;
  hates?: number;
  solved?: fightStatusType;
}

const index = () => {
  const theme = useTheme();
  const isAuthorized = useAuth();
  const [yourFightsData, setYourFightsData] = useState<FightsInfo[]>([]);
  const {
    isLoading,
    data: myFightsData,
    refetch,
  } = useQuery("myFightsLimitData", () => getMyFightsLimitData(3));
  const recentMyFightsData = Object.values(myFightsData ?? "")[0];

  const handleYourFightClick = () => {
    Router.push("/your-fights");
  };

  const handleMyFightClick = () => {
    Router.push("/my-fights");
  };

  useEffect(() => {
    if (isAuthorized) {
      refetch();
    }
  }, [isAuthorized]);

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
    setYourFightsData(getYourFightsData());
  }, []);

  return (
    <>
      <Container marginX={1}>
        {!isAuthorized && (
          <LoginTextButton
            style={{
              position: "absolute",
              top: "240px",
              left: "200px",
              color: "black",
            }}
          />
        )}
        <div
          className={isAuthorized ? "" : "overlay"}
          style={{ position: "relative" }}
        >
          <Photo />
          <RecentFightBox
            style={{ position: "absolute", bottom: "0" }}
            content={recentMyFightsData?.content || "로그인해서 확인하기."}
            solved={recentMyFightsData?.solved || "willSolve"}
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
      <style jsx>{`
        .overlay {
          height: 21rem;
          filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default index;
