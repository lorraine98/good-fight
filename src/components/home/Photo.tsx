import Image from "next/image";
import { getHomeBannerImageByUID, postImageToStorage } from "src/api/home";
import { useQuery } from "react-query";
import { FileUpload } from "@mui/icons-material";
import { useAuth } from "src/shared/hooks/useAuth";

const Photo = () => {
  const { uid } = useAuth();
  const { data, refetch } = useQuery(
    "homeBannerImage",
    getHomeBannerImageByUID,
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    postImageToStorage(file).then(() => refetch());
  };

  return (
    <>
      <div className="photo">
        {data ? (
          <Image src={data} alt="커플사진" layout="fill" objectFit="cover" />
        ) : (
          <form method="post" encType="multipart/form-data">
            <label htmlFor="file-input">
              <div className="icon">
                <FileUpload fontSize="large" />
                <p>대표 사진을 등록해보세요.</p>
              </div>
              {uid && (
                <input
                  type="file"
                  accept="image/*"
                  id="file-input"
                  onChange={handleImageChange}
                />
              )}
            </label>
          </form>
        )}
      </div>
      <style jsx>{`
        form {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        input {
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .photo {
          position: relative;
          display: flex;
          height: 21rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .icon {
          display: flex;
          align-items: center;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .icon p {
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default Photo;
