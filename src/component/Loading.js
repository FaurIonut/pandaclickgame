import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Loading.css";
import "../css/font.css";
const Loading = () => {
    const imgURL = ["/image/social/instagram.png", "/image/social/telegram.png", "/image/social/twitter.png", "/image/social/youtubu.png"];
    return (_jsxs("div", { className: "flex flex-col justify-around items-center w-full h-screen p-5", style: { background: "radial-gradient(68.4% 68.4% at 51.16% 53.22%, #00647F 0%, #020304 100%)" }, children: [_jsx("h1", { className: "text-4xl text-white", style: { fontFamily: " spicy" }, children: "Monsters Mystery World!" }), _jsxs("div", { className: "loadingspinner", children: [_jsx("div", { id: "square1", style: {
                            backgroundImage: "url('image/mike1.png')",
                            backgroundSize: "cover",
                        } }), _jsx("div", { id: "square2", style: {
                            backgroundImage: "url('image/mike2.png')",
                            backgroundSize: "cover",
                        } }), _jsx("div", { id: "square3", style: {
                            backgroundImage: "url('image/mike3.png')",
                            backgroundSize: "cover",
                        } }), _jsx("div", { id: "square4", style: {
                            backgroundImage: "url('image/mike4.png')",
                            backgroundSize: "cover",
                        } }), _jsx("div", { id: "square5", style: {
                            backgroundImage: "url('image/mike5.png')",
                            backgroundSize: "cover",
                        } })] }), _jsxs("div", { className: "flex flex-col justify-center items-center", children: [_jsx("h3", { className: "text-white mb-2", children: "Meet The Worldwide Community" }), _jsx("div", { className: "flex gap-2", children: imgURL.map((item) => {
                            return (_jsx("img", { src: item, alt: "", className: " w-8 h-8" }));
                        }) })] })] }));
};
export default Loading;
