import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useTheme } from "@mui/system";

const NavBar = () => {
  const { pathname } = useRouter();
  const theme = useTheme();

  return (
    <nav>
      <Link href="/home">
        <a>
          {pathname === "/home" ? <HomeIcon /> : <HomeOutlinedIcon />}
          <h3 className="title">홈</h3>
        </a>
      </Link>
      <Link href="/your-fights">
        <a>
          {pathname === "/your-fights" ? (
            <ThumbsUpDownIcon />
          ) : (
            <ThumbsUpDownOutlinedIcon />
          )}
          <h3 className="title">니쌈</h3>
        </a>
      </Link>
      <Link href="/my-fights">
        <a>
          {pathname === "/my-fights" ? (
            <LibraryBooksIcon />
          ) : (
            <LibraryBooksOutlinedIcon />
          )}
          <h3 className="title">내쌈</h3>
        </a>
      </Link>
      <Link href="/my-page">
        <a>
          {pathname === "/my-page" ? (
            <PersonIcon />
          ) : (
            <PersonOutlineOutlinedIcon />
          )}
          <h3 className="title">마이페이지</h3>
        </a>
      </Link>
      <style jsx>{`
        nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: flex;
          height: 60px;
          justify-content: space-around;
          align-items: center;
          max-width: 30rem;
          background: ${theme.palette.white};
          box-shadow: 0 -1px 3px rgba(57, 63, 72, 0.1);
        }

        nav a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 0.8rem;
          margin-top: 5px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
