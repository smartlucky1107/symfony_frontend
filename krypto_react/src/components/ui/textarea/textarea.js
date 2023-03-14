import React, { useRef } from "react";
import "./textarea.scss";
import i18next from "i18next";

const Textarea = (props) => {
    const textareaRef = useRef(null);
    const copyToClipboard = () => {
        //console.log(textareaRef.current);
        textareaRef.current.select();
        textareaRef.current.setSelectionRange(0, 99999);
        document.execCommand("copy");
        textareaRef.current.setSelectionRange(0, 0);
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

    const renderHidden = () => {
        if (props.hidden) {
            return <div className={"hiddenBox"}>{props.hidden}</div>;
        } else {
            return null;
        }
    };

    return (
        <div className={`kTextarea ${props.className ?? ""}`}>
            <>
                {props.label ? (
                    <label htmlFor={props.id}>
                        {props.label}:{" "}
                        {props.required ? (
                            <div className={"isRequired"}>
                                <span className="material-icons">error</span>
                                <div className={"isRequiredText"}>
                                    {i18next.t("wymagane")}
                                </div>
                            </div>
                        ) : null}
                    </label>
                ) : null}
                <div className={"kTextareaInside"}>
                    <textarea
                        id={props.id}
                        name={props.id}
                        value={props.value}
                        type={props.type ?? "text"}
                        ref={textareaRef}
                        className={`
                            ${props.children ? "hasChildren" : ""} 
                            ${props.fontSize ?? ""} 
                            ${
                                props.fontWeight
                                    ? "weight" + props.fontWeight
                                    : ""
                            }
                            ${props?.resize ? "" : "noresize"}
                            ${props?.copy ? "copy" : ""}
                            ${props?.hidden ? "hidden" : ""}
                            `}
                        rows={props.rows ?? "4"}
                        onChange={
                            props.onChange
                                ? (e) =>
                                      props.onChange(props.id, e.target.value)
                                : () => {}
                        }
                        onFocus={props?.onFocus}
                        onBlur={props?.onBlur}
                        placeholder={props?.placeholder}
                        required={props?.required}
                    />
                    {props.children}
                    {renderCopyToClipboard()}
                    {renderHidden()}
                </div>
            </>
        </div>
    );
};

export default Textarea;
