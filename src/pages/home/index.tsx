import Container from "../../shared/components/container";
import Photo from "./components/Photo";
import Banner from "./components/Banner";
import Board from "./components/Board";
import Router from "next/router";
import { useEffect, useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { useQuery } from "react-query";
import { getMyFightsLimitData } from "../my-fights/api/get-my-fights-data";

type Props = {
  content: string;
  state: fightStatusType;
};

export interface FightsInfo {
  content: string;
  likes?: number;
  hates?: number;
  state?: fightStatusType;
}

export interface StateType {
  recent: Props;
}

const index = () => {
  const [yourFightsData, setYourFightsData] = useState<FightsInfo[]>([]);
  const { isLoading, data: myFightsData } = useQuery("myFightsLimitData", () =>
    getMyFightsLimitData(3),
  );

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
      state: item.solved,
    }));
  };

  useEffect(() => {
    setYourFightsData(getYourFightsData()); //type에러 니쌈 통신할 때 챙기기
  }, []);

  return (
    <>
      <Container marginX={1}>
        <Photo />
        <Banner />
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
