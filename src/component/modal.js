import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./modal.css";
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal", children: _jsxs("div", { className: "modal-content", children: [_jsx("span", { className: "close-button", onClick: onClose, children: "\u00D7" }), children] }) }));
};
export default Modal;
