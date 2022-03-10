import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const route = {
        home: "홈",
        "your-fights": "니쌈",
        "my-fights": "내쌈",
        "my-page": "마이 페이지",
    };
    console.log(router);
    return <div>hi</div>;
};

export default Header;
