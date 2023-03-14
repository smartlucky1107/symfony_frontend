import React, { useEffect, useRef, useState } from "react";
import "./input.scss";
import i18next from "i18next";
import { SelectedCurrencyTooltip } from "../../transaction/selectedCurrencyTooltip/selectedCurrencyTooltip";

const Input = (props) => {
    const inputRef = useRef(null);
    const [clicked, setClicked] = useState(false);
    const [isActive, setActive] = useState(false);
    const copyToClipboard = () => {
        //console.log(textareaRef.current);
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 99999);
        document.execCommand("copy");
        inputRef.current.setSelectionRange(0, 0);
        setClicked(true);
    };
    const renderCopyToClipboard = () => {
        if (props?.copy === true) {
            return (
                <button
                    className={"copyToClipboard"}
                    onClick={() => copyToClipboard()}
                >
                    <span className="material-icons">content_copy</span>
                </button>
            );
        } else {
            return null;
        }
    };

    const renderCopiedToClipboard = () => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false);
            }, 1100);
            return (
                <div className={"copiedToClipboard"}>
                    <span className="material-icons">content_copy</span>
                    {i18next.t("Skopiowano")}
                </div>
            );
        } else {
            return null;
        }
    };

    const renderHidden = () => {
        if (props.hidden) {
            return <div className={"hiddenBox"}>{props.hidden}</div>;
        } else {
            return null;
        }
    };

    const renderAfterLabel = () => {
        if (props.afterLabel) {
            return props.afterLabel;
        }
    };

    const renderMinMax = () => {
        if (typeof props.minMax !== "undefined") {
            if (props.minMax !== true) {
                return (
                    <div className={`inputMinMax ${props.minMax}`}>
                        {props.minMaxComponent}
                    </div>
                );
            }
        }
        return;
    };

    const renderLoading = () => {
        return (
            <div className={`loading ${props?.loading ? "show" : "hide"}`}>
                <div className={"dots"}>
                    <div className={"dot dot1"}></div>
                    <div className={"dot dot2"}></div>
                </div>
            </div>
        );
    };

    const renderError = () => {
        if (props?.error) {
            return <div className={"inputError"}>{props?.error}</div>;
        } else {
            return null;
        }
    };

    const renderHelpTooltip = () => {
        if (props.helpTooltip) {
            return (
                <div className={"helpTooltip"}>
                    <span className="material-icons">help</span>
                    <div className={"helpTooltipText"}>{props.helpTooltip}</div>
                </div>
            );
        }
    };

    const handleFocus = () => {
        setActive(true);
        if (typeof props.onFocus === "function") {
            props.onFocus();
        }
    };

    const handleBlur = () => {
        setActive(false);
        if (typeof props.onFocus === "function") {
            props.onBlur();
        }
    };

    const isPrecisionOk = (val) => {
        let precision = props.precision ?? 8;

        if (val.includes(".")) {
            let decimals = val.split(".")[1];
            if (decimals.length <= precision) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };
    const handleChange = (e) => {
        if (props.numeric) {
            let val = e.target.value.replaceAll(",", ".");
            val = val.replaceAll(" ", "");
            if (!isNaN(val) && isPrecisionOk(val)) {
                props.onChange(props.id, val);
            }
        } else {
            props.onChange(props.id, e.target.value);
        }
    };

    return (
        <div
            className={`kInput 
        ${props.className ?? ""} 
        ${props?.type === "checkbox" ? "checkbox" : ""}
        ${props?.error ? "error" : ""}
        ${props?.type === "hidden" ? "hidden" : ""}
        ${isActive ? "active" : ""}
        ${props?.value === "" && props.numeric ? "invalid" : ""}
        `}
        >
            {props?.type !== "checkbox" ? (
                // REGULAR INPUTS
                <>
                    {props.label ? (
                        <label htmlFor={props.id}>
                            {props.label}:{" "}
                            {props.required ? (
                                <div className={"isRequired"}>
                                    <span className="material-icons">
                                        error
                                    </span>
                                    <div className={"isRequiredText"}>
                                        {i18next.t("wymagane")}
                                    </div>
                                </div>
                            ) : null}
                            {renderHelpTooltip()}
                        </label>
                    ) : null}
                    {renderAfterLabel()}
                    <div
                        className={"kInputInside"}
                        onClick={
                            props.copyOnClick
                                ? () => copyToClipboard()
                                : () => {}
                        }
                    >
                        <div className={"invalidAmount"}>
                            {i18next.t("Nieprawidłowa kwota")}
                        </div>
                        {renderLoading()}
                        <input
                            id={props.id}
                            name={props.id}
                            type={props.type ?? "text"}
                            ref={inputRef}
                            className={`
                            ${props.children ? "hasChildren" : ""} 
                            ${props.fontSize ?? ""} 
                            ${
                                props.fontWeight
                                    ? "weight" + props.fontWeight
                                    : ""
                            }
                            ${props?.copy ? "copy" : ""}
                            ${props?.copyOnClick ? "copyOnClick" : ""}
                            ${props?.hidden ? "hidden" : ""}
                            `}
                            value={props.value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={props?.placeholder}
                            autoComplete={
                                props?.autocomplete === false ? "off" : "on"
                            }
                            required={props?.required}
                            disabled={props?.disabled}
                        />
                        {props.children}
                        {renderCopyToClipboard()}
                        {renderHidden()}
                        {renderCopiedToClipboard()}
                    </div>
                </>
            ) : (
                // CHECKBOX INPUT
                <>
                    <input
                        id={props.id}
                        name={props.id}
                        type={props.type}
                        value={props.value}
                        onChange={(e) => props.onChange(props.id, !props.value)}
                        required={props?.required}
                        disabled={props?.disabled}
                    />

                    <label
                        htmlFor={props.id}
                        className={props.label ? "hasLabel" : "noLabel"}
                    >
                        <div
                            className={`kBox ${
                                props.value ? "checked" : ""
                            }    ${props?.disabled ? "disabled" : ""} `}
                        >
                            <span className="material-icons">check</span>
                        </div>
                        {props.label ? (
                            <div className={"labelText"}>
                                {props.label}
                                {props.required ? (
                                    <div className={"isRequired"}>
                                        <span className="material-icons">
                                            error
                                        </span>
                                        <div className={"isRequiredText"}>
                                            {i18next.t("wymagane")}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </label>
                </>
            )}
            {renderError()}
            {renderMinMax()}
        </div>
    );
};

export default Input;
