import { jsx as _jsx } from "react/jsx-runtime";
export default function ProgressBar({ value }) {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx("div", { className: "w-[90vw] h-4 border-[#E39431] bg-[#2F2F2F] border-[1px] rounded-full flex items-center", children: _jsx("div", { className: "bg-gradient-to-r from-[#A07FF1] to-[#06E1F4] h-[14px] rounded-full", style: { width: `${value}%` } }) }) }));
}
