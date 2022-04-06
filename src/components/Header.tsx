import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import NotificationAdd from "@mui/icons-material/NotificationAdd";
import { useTheme } from "@mui/system";

interface Title {
  [key: string]: string;
}

const Header = () => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const [notification, setNotification] = useState(false);
  const [isRoot, setIsRoot] = useState(false);

  const title: Title = {
    "/home": "홈",
    "/your-fights": "니쌈",
    "/my-fights": "내쌈",
    "/my-page": "마이 페이지",
  };

  const currentRoute = title[pathname];

  useEffect(() => {
    switch (pathname) {
      case "/home":
      case "/your-fights":
      case "/my-fights":
      case "/my-page":
        setIsRoot(true);
        break;

      default:
        setIsRoot(false);
    }
  }, []);

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
          height: 50px;
          font-size: 1rem;
          font-weight: bold;
          justify-content: space-between;
          width: 100%;
          background: ${theme.palette.custom.white};
          box-shadow: 0 1px 3px rgba(57, 63, 72, 0.1);
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
