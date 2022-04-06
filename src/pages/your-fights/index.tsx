import OrderBy from "./components/OrderBy";
import NissamBoard from "./components/NissamBoard";

const index = () => {
  const dummy = [
    {
      content:
        "제가 늦잠을 잤는데 여자친구가 깨워주기로 했어요. 같이 늦잠 잔 여자친구의 잘못이 있나요?",
      like: 226,
      hate: 25,
      options: [
        {
          value: "남자 잘못",
          votes: 25,
        },
        {
          value: "여자 잘못",
          votes: 52,
        },
      ],
    },
    {
      content:
        "제가 늦잠을 잤는데 여자친구가 깨워주기로 했어요. 같이 늦잠 잔 여자친구의 잘못이 있나요?",
      like: 226,
      hate: 25,
      options: [
        {
          value: "남자 잘못",
          votes: 25,
        },
        {
          value: "여자 잘못",
          votes: 52,
        },
      ],
    },
    {
      content:
        "제가 늦잠을 잤는데 여자친구가 깨워주기로 했어요. 같이 늦잠 잔 여자친구의 잘못이 있나요?",
      like: 226,
      hate: 25,
      options: [
        {
          value: "남자 잘못",
          votes: 25,
        },
        {
          value: "여자 잘못",
          votes: 52,
        },
      ],
    },
    {
      content:
        "제가 늦잠을 잤는데 여자친구가 깨워주기로 했어요. 같이 늦잠 잔 여자친구의 잘못이 있나요?",
      like: 226,
      hate: 25,
      options: [
        {
          value: "남자 잘못",
          votes: 25,
        },
        {
          value: "여자 잘못",
          votes: 52,
        },
      ],
    },
    {
      content:
        "제가 늦잠을 잤는데 여자친구가 깨워주기로 했어요. 같이 늦잠 잔 여자친구의 잘못이 있나요?",
      like: 226,
      hate: 25,
      options: [
        {
          value: "남자 잘못",
          votes: 25,
        },
        {
          value: "여자 잘못",
          votes: 52,
        },
      ],
    },
  ];

  return (
    <>
      <OrderBy />
      <NissamBoard data={dummy}/>
    </>
  );
};

export default index;
