import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import {
  getLikesAndHates,
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

  useEffect(() => {
    const timer = setInterval(() => {
      getLikesAndHates(pid).then((res) => {
        setPostLikes(res?.likes);
        setPostHates(res?.hates);
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [postLikes, postHates]);

  const handleClickLike = () => {
    postLike(pid, uid).then((res) => {
      if (isHating) {
        setIsHating(false);
        setPostHates(postHates - 1);
        postCancelHate(pid, uid);
      }

      setIsLiking(res);
      setPostLikes(postLikes + (res ? 1 : -1));
    });
  };

  const handleClickHate = () => {
    postHate(pid, uid).then((res) => {
      if (isLiking) {
        setIsLiking(false);
        setPostLikes(postLikes - 1);
        postCancelLike(pid, uid);
      }

      setIsHating(res);
      setPostHates(postHates + (res ? 1 : -1));
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
