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

const NavBar = () => {
    const router = useRouter();

    return (
        <nav>
            <Link href="/">
                <a>
                    {router.pathname === "/" ? (
                        <HomeIcon fontSize="large" />
                    ) : (
                        <HomeOutlinedIcon fontSize="large" />
                    )}
                    <h3>홈</h3>
                </a>
            </Link>
            <Link href="/your-fights">
                <a>
                    {router.pathname === "/your-fights" ? (
                        <ThumbsUpDownIcon fontSize="large" />
                    ) : (
                        <ThumbsUpDownOutlinedIcon fontSize="large" />
                    )}
                    <h3>니쌈</h3>
                </a>
            </Link>
            <div></div>
            <Link href="/my-fights">
                <a>
                    {router.pathname === "/my-fights" ? (
                        <LibraryBooksIcon fontSize="large" />
                    ) : (
                        <LibraryBooksOutlinedIcon fontSize="large" />
                    )}
                    <h3>내쌈</h3>
                </a>
            </Link>
            <Link href="/my-page">
                <a>
                    {router.pathname === "/my-page" ? (
                        <PersonIcon fontSize="large" />
                    ) : (
                        <PersonOutlineOutlinedIcon fontSize="large" />
                    )}
                    <h3>마이페이지</h3>
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
                    font-size: 15px;
                    border: 1px solid black;
                    width: 30vw;
                    height: 60px;
                    justify-content: space-evenly;
                    align-items: center;
                    min-width: 500px;
                }

                nav a {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
