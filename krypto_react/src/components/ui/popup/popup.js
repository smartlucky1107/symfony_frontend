import React from "react";

import "./popup.scss";

const Popup = React.forwardRef((props, ref) => {
    return (
        <div className="popupWrapper" ref={ref}>
            <div className="popupContent">
                {props?.disableClose ? (
                    ""
                ) : (
                    <button
                        className="closePopup"
                        onClick={() => props.handleClosePopup(ref)}
                    >
                        <span className="material-icons">highlight_off</span>
                    </button>
                )}
                {props.children}
            </div>
        </div>
    );
});

export default Popup;

export const handleClosePopup = (ref) => {
    if (ref && ref.current) {
        ref.current.classList.remove("show");
    }
};
export const handleShowPopup = (ref) => {
    if (ref && ref.current) {
        ref.current.classList.add("show");
    }
};
