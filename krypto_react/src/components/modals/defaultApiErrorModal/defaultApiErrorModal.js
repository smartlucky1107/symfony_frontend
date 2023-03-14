import React from "react";
import i18next from "i18next";

import "./defaultApiErrorModal.scss";

import ErrorImg from "./../../../img/error.svg";
import Button from "../../ui/button/button";

const DefaultApiErrorModal = () => {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <>
            <div className={"defaultApiErrorModal"}>
                <div className={"defaultApiErrorModalWrapper"}>
                    <div className={"defaultApiErrorModalImg"}>
                        <img src={ErrorImg} />
                    </div>
                    <div className={"defaultApiErrorModalBox error"}>
                        <div className={"title"}>{i18next.t("Oops!")}</div>
                        <div className={"content"}>
                            {i18next.t(
                                "Wystąpił problem, odśwież stronę i spróbuj ponownie!"
                            )}
                        </div>
                        <div className={"buttons"}>
                            <Button big blue onClick={() => refreshPage()}>
                                {i18next.t("Odśwież")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultApiErrorModal;
