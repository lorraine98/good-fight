import { app } from "../shared/FireBase";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export type LikesType = {
  like: number;
  hate: number;
};

type OptionListType = {
  optionValue: string;
  votes: number;
};

type UserType = {
  uid: string;
  nickname: string;
};

type DataType = {
  content: string;
  likes: LikesType;
  optionList: IOptionListType;
};

interface DocType {
  createdAt: Date;
  data: DataType;
  user: UserType;
}

export interface IOptionListType extends Array<OptionListType> {}
export interface IDocType extends Array<DocType> {}

const db = getFirestore(app);

export const getYourFightsOrderByDate = async () => {
  try {
    const q = query(collection(db, "yourFights"), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const result: IDocType = [];

    data.forEach((doc) => {
      const { createdAt, data, user } = doc.data();

      result.push({
        createdAt: new Date(createdAt),
        data,
        user,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get data ordered by date!", e);
  }
};

export const getYourFightsOrderByPopularity = async () => {
  try {
    const q = query(
      collection(db, "yourFights"),
      orderBy("data.likes.like", "desc"),
    );
    const data = await getDocs(q);
    const result: IDocType = [];

    data.forEach((doc) => {
      const { createdAt, data, user } = doc.data();

      result.push({
        createdAt: new Date(createdAt),
        data,
        user,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get data ordered by popularity!", e);
  }
};
