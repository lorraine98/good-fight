import axios from "axios";

const getRandomNickname = async () => {
  try {
    const result = await axios
      .get("/api/nickname", {
        params: {
          format: "text",
          count: 1,
          max_length: 6,
        },
      })
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.error("Error get random nickname!", e);
  }
};

export default getRandomNickname;
