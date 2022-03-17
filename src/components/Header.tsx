import { useRouter } from "next/router";
import { useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import NotificationAdd from "@mui/icons-material/NotificationAdd";

interface Title {
  [key: string]: string;
}

const Header = () => {
  const router = useRouter();
  const [notification, setNotification] = useState(false);
  const [isRoot, setIsRoot] = useState(false);

  const title: Title = {
    "/": "홈",
    "/your-fights": "니쌈",
    "/my-fights": "내쌈",
    "/my-page": "마이 페이지",
  };

  const currentRoute = title[router.pathname];

  return (
    <>
      <div className="header">
        <div className="wrapper">
          <div className="backbutton">{isRoot ? "" : <ArrowBack />}</div>
          <div className="route">{currentRoute}</div>
        </div>
        <div className="wrapper">
          <div className="notification">
            {notification ? <NotificationAdd /> : <NotificationsNone />}
          </div>
        </div>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          margin: 0 auto;
          align-items: center;
          width: 30vw;
          height: 50px;
          font-size: 1rem;
          font-weight: bold;
          justify-content: space-between;
          border: 1px solid black;
          min-width: 500px;
        }

        .header .wrapper {
          display: flex;
          align-items: center;
        }

        .header .wrapper div {
          margin: 0 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Header;
