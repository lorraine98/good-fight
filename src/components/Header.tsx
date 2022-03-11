import { useRouter } from "next/router";

interface Title {
    [key: string]: string;
}

const Header = () => {
    const router = useRouter();

    const title: Title = {
        "/home": "홈",
        "/your-fights": "니쌈",
        "/my-fights": "내쌈",
        "/my-page": "마이 페이지",
    };

    const currentRoute = title[router.pathname];

    return <div>{currentRoute}</div>;
};

export default Header;
