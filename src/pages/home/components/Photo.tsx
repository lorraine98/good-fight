import Image from "next/image";
import Container from "src/shared/components/container";
import FightBox from "./FightBox";
import { useTheme } from "@mui/system";

const Photo = () => {
  const theme = useTheme();

  const list = [
    {
      state: "solved",
      title: "설거지를 제때 안함",
    },
    {
      state: "ongoing",
      title: "빨래를 제때 안함",
    },
    {
      state: "unresolved",
      title: "청소를 제때 안함",
    },
  ];

  return (
    <>
      <div className="photo">
        <Image
          src="/static/test.jpg"
          alt="커플사진"
          layout="fill"
          objectFit="cover"
        />
        <Container>
          <div className="recent">
            <FightBox recent={list[1]} />
          </div>
        </Container>
      </div>
      <style jsx>{`
        .photo {
          position: relative;
          display: flex;
          height: 21rem;
          background-color: ${theme.palette.white};
          border-radius: 0.375rem;
          overflow: hidden;
        }
        
        .recent {
          position: absolute;
          display: flex;
          bottom: 1rem;
          width: calc(100% - 2rem);
          height: 5rem;
          background-color: ${theme.palette.white};
          border-radius: 0.375rem;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Photo;
