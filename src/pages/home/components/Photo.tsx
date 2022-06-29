import Image from "next/image";
import Container from "src/shared/components/container";
import RecentFightBox from "./RecentFightBox";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useTheme } from "@mui/system";
import { useState } from "react";

const Photo = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const theme = useTheme();

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    fontSize: "5rem",
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    setImageSrc(URL.createObjectURL(file));
  };

  const list = [
    {
      state: "solved",
      content: "설거지를 제때 안함",
    },
    {
      state: "willSolve",
      content: "빨래를 제때 안함",
    },
    {
      state: "unsolved",
      content: "청소를 제때 안함",
    },
  ];

  return (
    <>
      <div className="photo">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="커플사진"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <form method="post" encType="multipart/form-data">
            <label htmlFor="file-input">
              <ImageSearchIcon sx={{ ...iconStyle }} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleImageChange}
            />
          </form>
        )}
        <Container>
          <div className="recent">
            <RecentFightBox recent={list[1]} />
          </div>
        </Container>
      </div>
      <style jsx>{`
        form {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        input {
          visibility: hidden;
        }

        .photo {
          position: relative;
          display: flex;
          height: 21rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .recent {
          position: absolute;
          display: flex;
          bottom: 1rem;
          width: calc(100% - 2rem);
          height: 5rem;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Photo;
