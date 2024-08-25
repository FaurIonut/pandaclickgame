import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { dispatch, useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import { updateBalance, updateEnergy, updateFullEnergy, updateLimit, updateTap, getWallet, } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import Modal from "../component/modal";
import Footer from "../component/Footer";
export default function Boost() {
    const tokenState = useSelector((state) => state.wallet.user?.balance);
    const username_state = useSelector((state) => state.wallet.user?.username);
    const limit_state = useSelector((state) => state.wallet.user?.limit);
    const tap_state = useSelector((state) => state.wallet.user?.tap);
    const full_energy_state = useSelector((state) => state.wallet.user?.full_energy);
    const [token, setToken] = useState(tokenState);
    const [username, setUsername] = useState(username_state);
    const [limit, setLimit] = useState(limit_state);
    const [tap, setTap] = useState(tap_state);
    const [full_energy, setFullEnergy] = useState(full_energy_state);
    useEffect(() => {
        dispatch(getWallet(username));
    }, [username]);
    useEffect(() => {
        setToken(tokenState);
        setUsername(username_state);
        setLimit(limit_state);
        setTap(tap_state);
        setFullEnergy(full_energy_state);
    }, [tokenState, username_state, limit_state, tap_state, full_energy_state]);
    const handleFullEnergy = () => {
        console.log("-----full energy💰🏆💪------>", limit_state);
        if (full_energy + 1 > 6) {
            toast.warning("Full energy limit reached!");
        }
        else {
            dispatch(updateFullEnergy(username, full_energy + 1)).then(() => {
                dispatch(updateEnergy(username, limit));
                toast.success("Successfully updated energy!");
            });
        }
        setIsModalOpen(false);
    };
    const handleMultiTap = () => {
        if (tap >= 32) {
            toast.warning("Tap limit reached!");
        }
        else {
            if (token < 2000) {
                toast.warning("Not enough token!");
            }
            else {
                dispatch(updateTap(username, tap * 2)).then(() => {
                    dispatch(updateBalance(username, token - 2000));
                    toast.success("Successfully updated tap!");
                });
            }
        }
        setIsTapModalOpen(false);
    };
    const handleLimit = () => {
        if (limit >= 5000) {
            toast.warning("Energy limit reached!");
        }
        else {
            if (token < 2000) {
                toast.warning("Not enough token!");
            }
            else {
                dispatch(updateLimit(username, limit + 1000)).then(() => {
                    dispatch(updateBalance(username, token - 2000));
                    toast.success("Successfully updated limit!");
                });
            }
        }
        setIsLimitModalOpen(false);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleMouseClick = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [isTapModalOpen, setIsTapModalOpen] = useState(false);
    const handleMouseTapClick = () => {
        setIsTapModalOpen(true);
    };
    const handleCloseTapModal = () => {
        setIsTapModalOpen(false);
    };
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const handleMouseLimitClick = () => {
        setIsLimitModalOpen(true);
    };
    const handleCloseLimitModal = () => {
        setIsLimitModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "Boost h-full w-full flex flex-col justify-between items-center", children: [_jsxs("div", { className: "w-full mt-11 flex flex-col justify-center p-4", children: [_jsx("div", { className: "flex flex-col justify-center items-center", children: _jsxs("div", { className: "flex px-3 py-1 gap-5 text-white text-lg font-bold justify-center align-middle overflow-y-hidden", children: [_jsx("img", { src: "/image/assets/task.png", alt: "", className: "w-10 h-10" }), _jsx("h1", { className: "text-4xl", children: token })] }) }), _jsx("hr", { className: "my-3 border-[#363636] border-1" }), _jsx("div", { className: "flex justify-start", children: _jsx("h1", { className: "text-white text-xl", children: "Free daily boosters" }) }), _jsxs("div", { className: `flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] hover:bg-[#3a3a3a]`, onClick: handleMouseClick, children: [_jsx("img", { src: "/image/icon/lightning.svg", alt: "", className: "w-10 h-10" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("h3", { className: "text-2xl text-white", children: "Full energy" }), _jsxs("h3", { className: "text-xl text-[#a8a8a7]", children: [full_energy, "/6 available"] })] })] }), _jsx("div", { className: "flex justify-start", children: _jsx("h1", { className: "text-white text-xl", children: "Boosters" }) }), _jsxs("div", { className: `flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`, onClick: handleMouseTapClick, children: [_jsx("img", { src: "/image/double-tap.png", alt: "", className: "w-10 h-10" }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h3", { className: "text-2xl text-white text-left", children: "Multitap" }), _jsxs("div", { className: "flex gap-3 align-middle", children: [_jsx("img", { src: "/image/dollar.png", alt: "", className: "w-5 h-5" }), _jsx("h3", { className: "text-[#a8a8a7] text-xl", children: "2K * 2M" })] })] })] }), _jsxs("div", { className: `flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`, onClick: handleMouseLimitClick, children: [_jsx("img", { src: "/image/battery.png", alt: "", className: "w-10 h-10" }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h3", { className: "text-2xl text-white text-left", children: "Energy limit" }), _jsxs("div", { className: "flex gap-3 align-middle", children: [_jsx("img", { src: "/image/dollar.png", alt: "", className: "w-5 h-5" }), _jsx("h3", { className: "text-[#a8a8a7] text-xl", children: "2K * 2M" })] })] })] })] }), _jsx(Footer, {}), _jsx(Modal, { isOpen: isModalOpen, onClose: handleCloseModal, children: _jsxs("div", { className: "flex flex-col items-center align-middle gap-3", children: [_jsx("img", { src: "image/icon/lightning.svg", alt: "", className: " w-12 h-12" }), _jsx("h1", { className: "text-2xl text-white", children: "Full energy" }), _jsx("p", { className: " text-sm text-white", children: "Recharge your energy to the maximum and do another round of mining" }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: "image/dollar.png", alt: "", className: " w-14 h-14" }), _jsx("h1", { className: "text-white text-2xl", children: "FREE" })] }), _jsx("div", { className: "w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center", onClick: handleFullEnergy, children: _jsx("span", { className: "flex justify-center items-center", children: "Go ahead" }) })] }) }), _jsx(Modal, { isOpen: isTapModalOpen, onClose: handleCloseTapModal, children: _jsxs("div", { className: "flex flex-col items-center align-middle gap-3", children: [_jsx("img", { src: "image/double-tap.png", alt: "", className: " w-12 h-12" }), _jsx("h1", { className: "text-2xl text-white", children: "Multi-Tap" }), _jsx("p", { className: " text-sm text-white", children: "Select the Multi-tap, can get the token x 2" }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: "image/dollar.png", alt: "", className: " w-14 h-14" }), _jsx("h1", { className: "text-white text-2xl", children: "-2000" })] }), _jsx("div", { className: "w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center", onClick: handleMultiTap, children: _jsx("span", { className: "flex justify-center items-center", children: "Go ahead" }) })] }) }), _jsx(Modal, { isOpen: isLimitModalOpen, onClose: handleCloseLimitModal, children: _jsxs("div", { className: "flex flex-col items-center align-middle gap-3", children: [_jsx("img", { src: "image/battery.png", alt: "", className: " w-12 h-12" }), _jsx("h1", { className: "text-2xl text-white", children: "Energy Limit" }), _jsx("p", { className: " text-sm text-white", children: "You can increase the Energy Limit, can get the energy x 2" }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: "image/dollar.png", alt: "", className: " w-14 h-14" }), _jsx("h1", { className: "text-white text-2xl", children: "-2000" })] }), _jsx("div", { className: "w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center", onClick: handleLimit, children: _jsx("span", { className: "flex justify-center items-center", children: "Go ahead" }) })] }) })] })] }));
}
