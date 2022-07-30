import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import { DocType } from "src/api/your-fights";
import Wrapper from "./Wrapper";
import Feeling from "./Feeling";
import Avatar from "boring-avatars";
import DateFormat from "src/shared/functions/DateFormat";
import OptionLists from "./OptionLists";

type Props = {
  data: DocType;
};

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 0.375rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Profile = styled.div`
  display: flex;
`;

const Nickname = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const Date = styled.p<{ color: string }>`
  font-size: 0.9rem;
  color: ${({ color }) => color};
`;

const Content = styled.p`
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Board = ({ data }: Props) => {
  const theme = useTheme();
  const {
    pid,
    createdAt,
    likes,
    hates,
    uid,
    nickname,
    content,
    optionList,
    votes,
  } = data;

  return (
    <Container backgroundColor={theme.palette.custom.white}>
      <Profile>
        <Avatar
          size={40}
          variant="beam"
          name={nickname}
          colors={["#064789", "#427AA1", "#EBF2FA", "#679436", "#A5BE00"]}
        />
        <Wrapper style={{ marginLeft: "0.8rem" }}>
          <Nickname>{nickname}</Nickname>
          <Date color={theme.palette.gray}>{DateFormat(createdAt)}</Date>
        </Wrapper>
      </Profile>
      <Content>{content}</Content>
      <OptionLists lists={optionList} votes={votes} pid={pid} uid={uid} />
      <Feeling pid={pid} uid={uid} likes={likes} hates={hates} />
    </Container>
  );
};

export default Board;
