import { useRouter } from "next/router";

interface Title {
    [key: string]: string;
}

const Header = () => {
    const router = useRouter();

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
                    <div className="backbutton">뒤로가기</div>
                    <div className="route">{currentRoute}</div>
                </div>
                <div className="wrapper">
                    <div className="notification">알림</div>
                </div>
            </div>
            <style jsx>{`
                .header {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 50px;
                    font-size: 1.2rem;
                    font-weight: bold;
                    justify-content: space-between;
                }

                .header .wrapper {
                    display: flex;
                }

                .header .wrapper div {
                    margin: 0 0.5rem;
                }
            `}</style>
        </>
    );
};

export default Header;
