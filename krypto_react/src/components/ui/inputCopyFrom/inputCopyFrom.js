import React, { useRef, useState, useEffect } from "react";
import "./inputCopyFrom.scss";
import i18next from "i18next";

const InputCopyFrom = (props) => {
    const [showInfo, setShowInfo] = useState();
    const [value, setValue] = useState("");
    const className = `inputCopyFrom 
    ${props.blue ? " blue" : ""}
    ${props.active ? " active" : ""}
    ${props.big ? " big" : ""}
    `;

    const refInput = useRef(null);

    const handleCopy = () => {
        setShowInfo(true);
        let copyText = refInput.current;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        setTimeout(() => {
            setShowInfo(false);
        }, 2000);
    };
    const handleChangeValue = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <>
            <div className={className} onClick={() => handleCopy()}>
                <div className="inputCopyFromInner">
                    {props.leftIcon ? (
                        <div className={"leftIcon"}>
                            <span className="material-icons">
                                {props.leftIcon}
                            </span>
                        </div>
                    ) : null}
                    <input
                        value={value ?? ""}
                        ref={refInput}
                        onChange={(e) => handleChangeValue(e)}
                        type="text"
                    />
                    {props.rightIcon ? (
                        <div className={"rightIcon"}>
                            <span className="material-icons">
                                {props.rightIcon}
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className={`copiedInfo ${showInfo ? "show" : ""}`}>
                    {i18next.t("Skopiowano do schowka")}
                </div>
            </div>
        </>
    );
};

export default InputCopyFrom;
