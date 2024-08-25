import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "../component/Footer";
import QuestList from "../component/QuestList";
export default function Quest() {
    return (_jsxs("div", { className: "h-full w-full flex flex-col justify-between items-center", children: [_jsx(QuestList, {}), _jsx(Footer, {})] }));
}
