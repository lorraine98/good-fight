import Container from "../../shared/components/container";
import Photo from "./components/Photo";
import Banner from "./components/Banner";
import Board from "./components/Board";
import Router from "next/router";
import { useEffect, useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";

type Props = {
  title: string;
  state: fightStatusType;
};

interface FightsInfo {
  title: string;
  likes: number | null;
  hates: number | null;
  state: fightStatusType | null;
}

export interface StateType {
  recent: Props;
}

export interface ArrFightsInfo extends Array<FightsInfo> {}

const index = () => {
  const [yourFightsData, setYourFightsData] = useState<FightsInfo[]>([]);
  const [myFightsData, setMyFightsData] = useState<FightsInfo[]>([]);

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
        title: "늦잠 자서 약속에 늦은 여자친구, 어떻게 할까요?",
        likes: 14,
        hates: 1,
        state: null,
      },
      {
        title: "늦잠 자서 약속에 늦은 남자친구, 어떻게 할까요?",
        likes: 11,
        hates: 3,
        state: null,
      },
      {
        title: "늦잠 자서 약속에 늦은 외국인친구, 어떻게 할까요?",
        likes: 8,
        hates: 5,
        state: null,
      },
    ];

    return data;
  };

  const getMyFightsData = () => {
    const data = [
      {
        title: "늦잠 자서 약속에 늦은 여자친구, 어떻게 할까요?",
        likes: null,
        hates: null,
        state: "solved",
      },
      {
        title: "늦잠 자서 약속에 늦은 남자친구, 어떻게 할까요?",
        likes: null,
        hates: null,
        state: "willSolve",
      },
      {
        title: "늦잠 자서 약속에 늦은 외국인친구, 어떻게 할까요?",
        likes: null,
        hates: null,
        state: "unsolved",
      },
    ];

    return data;
  };

  useEffect(() => {
    setYourFightsData(getYourFightsData());
    setMyFightsData(getMyFightsData());
  }, []);

  return (
    <>
      <Container marginX={1}>
        <Photo />
        <Banner />
        <Board
          title="니쌈"
          onClick={handleYourFightClick}
          data={yourFightsData}
        />
        <Board title="내쌈" onClick={handleMyFightClick} data={myFightsData} />
      </Container>
    </>
  );
};

export default index;
