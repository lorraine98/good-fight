import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import {
  getUserHatingPost,
  getUserLikingPost,
  postCancelHate,
  postCancelLike,
  postHate,
  postLike,
} from "src/api/your-fights";
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
    const isUserLiking = () => {
      getUserLikingPost(pid, uid).then((res) => {
        if (res) {
          setIsLiking(res);
        }
      });
    };

    const isUserHating = () => {
      getUserHatingPost(pid, uid).then((res) => {
        if (res) {
          setIsHating(res);
        }
      });
    };

    isUserLiking();
    isUserHating();
  }, []);

  const handleClickLike = async () => {
    await postLike(pid, uid).then(async (res) => {
      if (isHating) {
        await postCancelHate(pid, uid);
        setIsHating(false);
      }

      setIsLiking(res);
    });
  };

  const handleClickHate = async () => {
    await postHate(pid, uid).then(async (res) => {
      if (isLiking) {
        await postCancelLike(pid, uid);
        setIsLiking(false);
      }

      setIsHating(res);
    });
  };

  return (
    <Container>
      <Wrapper onClick={() => handleClickLike()}>
        {isLiking ? (
          <ThumbsUpIcon size="1.7rem" color={theme.palette.custom.blue} />
        ) : (
          <ThumbsUpIcon size="1.7rem" />
        )}
        <p>{postLikes}</p>
      </Wrapper>
      <Wrapper onClick={() => handleClickHate()}>
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
