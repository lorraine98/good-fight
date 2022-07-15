import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import { getUserLikingPost, postLike } from "src/api/your-fights";
import { useEffect, useState } from "react";

type Props = {
  pid: string;
  uid: string;
  likes: number;
  hates: number;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  & > p {
    margin: 0 1rem 0 0.5rem;
  }
`;

const Feeling = ({ pid, uid, likes, hates }: Props) => {
  const theme = useTheme();
  const [postLikes, setPostLikes] = useState(likes);
  const [postHates, setPostHates] = useState(hates);
  const [isLiking, setIsLiking] = useState(false);
  const [isHating, setIsHating] = useState(false);

  useEffect(() => {
    const isUserLiking = async () => {
      await getUserLikingPost(pid, uid).then((res) => {
        if (res) {
          setIsLiking(true);
        }
      });
    };

    const isUserHating = async () => {};

    isUserLiking();
  }, [isLiking]);

  const handleClickLike = async (pid: string) => {
    await postLike(pid, uid).then((res) => {
      if (res) {
        setIsLiking(true);
      }
    });
  };

  const handleClickHate = (pid: string) => {
    console.log("hate", pid);
  };

  return (
    <Container>
      <Wrapper onClick={() => handleClickLike(pid)}>
        {isLiking ? (
          <ThumbsUpIcon size="1.7rem" color={theme.palette.custom.blue} />
        ) : (
          <ThumbsUpIcon size="1.7rem" />
        )}
        <p>{postLikes}</p>
      </Wrapper>
      <Wrapper onClick={() => handleClickHate(pid)}>
        {isHating ? (
          <ThumbsDownIcon size="1.7rem" color={theme.palette.custom.blue} />
        ) : (
          <ThumbsDownIcon size="1.7rem" />
        )}
        <p>{postHates}</p>
      </Wrapper>
    </Container>
  );
};

export default Feeling;
