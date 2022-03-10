import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();

    return (
        <nav>
            <div>
                <Link href="/">
                    <a className={router.pathname === "/" ? "active" : ""}>Home</a>
                </Link>
                <Link href="/your-fights">
                    <a className={router.pathname === "/" ? "active" : ""}>니쌈</a>
                </Link>
                <Link href="/my-fights">
                    <a className={router.pathname === "/" ? "active" : ""}>내쌈</a>
                </Link>
                <Link href="/my-page">
                    <a className={router.pathname === "/" ? "active" : ""}>마이 페이지</a>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
