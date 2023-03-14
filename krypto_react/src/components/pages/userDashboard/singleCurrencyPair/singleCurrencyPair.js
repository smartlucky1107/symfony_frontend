import React, { useState, useContext } from "react";
import i18next from "i18next";
import "./singleCurrencyPair.scss";
import { UserContext } from "../../../user/userContext";
import PostThis from "../../../../scripts/post";

import Input from "../../../ui/input/input";
import Preloader from "../../../ui/preloader/preloader";

const SingleCurrencyPair = (props) => {
    const user = useContext(UserContext);
    const [blockCurrency, setBlockCurrency] = useState();
    const [allowWithoutAuth, setAllowWithoutAuth] = useState();
    const [preloader, setPreloader] = useState(false);

    const handleBlockCurrencyChange = (inputId, value) => {
        setBlockCurrency(value);
    };
    const handleAllowWithoutAuthChange = (inputId, value) => {
        setAllowWithoutAuth(value);
    };

    // Formularz zablokuj parę/ pozwól na brak autoryzacji
    const handleSendForm = async (e) => {
        e.preventDefault();
        setPreloader(true);
        const response = await PostThis(`/api/workers/`, "GET", "", {
            Authorization: "Bearer " + user.data.user?.authToken,
        });
        setPreloader(false);
        // return setCurrenciesList(response.data.result);

        if (response) {
            if (response.status >= 200 && response.status < 300) {
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    return (
        <>
            <div className="singleCurrencyPair preloaderWrapper">
                <Preloader show={preloader} size="small" />
                <div className="name">{props.name}</div>
                <form onSubmit={(e) => handleSendForm(e)} className="form">
                    <div className="checkboxes">
                        <Input
                            id={`blockCurrency${props.name}`}
                            value={blockCurrency}
                            onChange={handleBlockCurrencyChange}
                            type="checkbox"
                        ></Input>
                        <Input
                            id={`allowWithoutAuth${props.name}`}
                            value={allowWithoutAuth}
                            onChange={handleAllowWithoutAuthChange}
                            type="checkbox"
                        ></Input>
                    </div>

                    <button type="submit">{i18next.t("Zatwierdź")}</button>
                </form>
            </div>
        </>
    );
};

export default SingleCurrencyPair;
