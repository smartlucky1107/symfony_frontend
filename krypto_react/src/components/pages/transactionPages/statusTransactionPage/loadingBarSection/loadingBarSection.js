import React from "react";
import "./loadingBarSection.scss";
import { TimerBar } from "../../../../ui/timerBar/timerBar";
import i18next from "i18next";

export const LoadingBarSection = ({ ticker }) => {
    return (
        <div className={"loadingBarSection"}>
            <TimerBar
                label={i18next.t("Status zostanie odświezony za 10s")}
                ticker={ticker}
                time={10}
            />
        </div>
    );
};
