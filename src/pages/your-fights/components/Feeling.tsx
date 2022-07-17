import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import {
  getUserHatingPost,
  getUserLikingPost,
  postHate,
  postLike,
} from "src/api/your-fights";
import { useEffect, useState } from "react";

type Props = {
  pid: string;
  uid: string;
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

const Feeling = ({ pid, uid }: Props) => {
  const theme = useTheme();
  const [postLikes, setPostLikes] = useState(0);
  const [postHates, setPostHates] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isHating, setIsHating] = useState(false);

  useEffect(() => {
    const isUserLiking = async () => {
      await getUserLikingPost(pid, uid).then((res) => {
        if (res) {
          setIsLiking(res);
        }
      });
    };

    const isUserHating = async () => {
      await getUserHatingPost(pid, uid).then((res) => {
        if (res) {
          setIsHating(res);
        }
      });
    };

    isUserLiking();
    isUserHating();
  }, []);

  const handleClickLike = async () => {
    await postLike(pid, uid).then((res) => {
      setIsLiking(res);
    });
  };

  const handleClickHate = async () => {
    await postHate(pid, uid).then((res) => {
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
