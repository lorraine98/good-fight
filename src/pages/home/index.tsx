import Container from "../../shared/components/container";
import Photo from "./components/Photo";
import Banner from "./components/Banner";
import Board from "./components/Board";
import Router from "next/router";
import { useEffect, useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { useQuery } from "react-query";
import { getMyFightsLimitData } from "src/api/my-fights";
import { getYourFightsLimitData } from "src/api/your-fights";

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
  const { isLoading: isLoadingYourFightsData, data: yourFightsData } = useQuery(
    "yourFightsLimitData",
    () => getYourFightsLimitData(3),
  );
  const { isLoading: isLoadingMyFinghtsData, data: myFightsData } = useQuery(
    "myFightsLimitData",
    () => getMyFightsLimitData(3),
  );

  const handleYourFightClick = () => {
    Router.push("/your-fights");
  };

  const handleMyFightClick = () => {
    Router.push("/my-fights");
  };

  const getYourFightsData = () => {
    return yourFightsData?.map((item) => ({
      content: item.content,
      likes: item.likes,
      hates: item.likes,
    }));
  };

  const getMyFightsData = () => {
    return myFightsData?.map((item) => ({
      content: item.content,
      state: item.solved,
    }));
  };

  return (
    <>
      <Container marginX={1}>
        <Photo />
        <Banner />
        <Board
          content="니쌈"
          onClick={handleYourFightClick}
          data={yourFightsData}
          isLoading={isLoadingYourFightsData}
        />
        <Board
          content="내쌈"
          onClick={handleMyFightClick}
          data={getMyFightsData()}
          isLoading={isLoadingMyFinghtsData}
        />
      </Container>
    </>
  );
};

export default index;
