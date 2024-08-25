import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
export default function RankingList() {
    const users_state = useSelector((state) => state.wallet.users);
    const [usersa, setUsers] = useState(users_state);
    useEffect(() => {
        dispatch(getAllUsers()).then(() => {
            setUsers(users_state);
        });
    }, [users_state]);
    function formatNumberWithCommas(number, locale = "en-US") {
        return new Intl.NumberFormat(locale).format(number);
    }
    return (_jsxs("div", { className: "md:w-full h-[65vh] mx-auto p-4", children: [_jsxs("div", { className: "max-h-[50vh] max-sm:max-h-[50vh] overflow-auto", children: [_jsxs("div", { className: "flex px-3 py-1 text-white text-lg font-bold justify-start align-middle overflow-y-hidden ml-3", children: [_jsx("div", { className: "text-start w-[20%] flex justify-center", children: "Rank" }), _jsx("div", { className: "text-start w-[55%] flex justify-center", children: "User" }), _jsx("div", { className: "text-start w-[20%] flex justify-center", children: "$Mystery" })] }), usersa.map((data, index) => (_jsxs("div", { className: `flex ${index > 0 && "my-3"} px-3 py-2 items-center bg-[#363636] rounded-lg`, children: [_jsx("div", { className: "text-xl text-start pl-2 w-[20%] text-white flex justify-center align-middle", children: index == 0 ? (_jsx("img", { src: "image/crown.png", alt: "", width: 30, height: 30 })) : index == 1 ? (_jsx("img", { src: "image/trophy.png", alt: "", width: 30, height: 30 })) : index == 2 ? (_jsx("img", { src: "image/star.png", alt: "", width: 30, height: 30 })) : (index + 1) }), _jsxs("div", { className: "relative h-10 overflow-hidden w-[60%] flex items-center justify-start", children: [_jsx("img", { src: "/image/mikeT.png", alt: "avatar", className: "w-10 h-10" }), _jsx("p", { className: "text-xl text-start pl-2 text-white", children: data.username })] }), _jsx("p", { className: "text-xl text-start pl-2 w-[30%] text-white", children: formatNumberWithCommas(data.balance) })] }, index)))] }), _jsx("hr", { className: "my-3 border-[#363636] border-2" }), _jsxs("div", { className: `flex my-3 px-3 py-2 items-center bg-[#5A4C3B] rounded-lg`, children: [_jsx("div", { className: "text-xl text-start pl-2 w-[20%] text-white", children: "1" }), _jsxs("div", { className: "relative h-12 overflow-hidden w-[60%] flex items-center", children: [_jsx("img", { src: "/image/mikeT.png", alt: "avatar", className: "w-10 h-10" }), _jsx("p", { className: "text-xl text-start pl-2 text-white", children: usersa[0]?.username })] }), _jsx("p", { className: "text-xl text-start pl-2 w-[30%] text-white", children: formatNumberWithCommas(usersa[0]?.balance) })] })] }));
}
