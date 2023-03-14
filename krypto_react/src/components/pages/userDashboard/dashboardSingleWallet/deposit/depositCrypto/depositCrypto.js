import React, { useContext, useState, useEffect } from "react";
import i18next from "i18next";
import axios from "axios";

import { UserContext } from "../../../../../user/userContext";

import PostThis from "../../../../../../scripts/post";

import Infobox from "../../../../../ui/infobox/infobox";
import Button from "../../../../../ui/button/button";
import BoxPlaceholder from "../../../../../ui/boxPlaceholder/boxPlaceholder";
import InputCopyFrom from "../../../../../ui/inputCopyFrom/inputCopyFrom";

import "./depositCrypto.scss";

const DepositCrypto = (props) => {
    const user = useContext(UserContext);

    const [depositWalletAddress, setDepositWalletAddress] = useState();
    const [depositWalletAddressError, setDepositWalletAddressError] = useState(
        false
    );
    const [
        depositWalletAddressErrorMsg,
        setDepositWalletAddressErrorMsg,
    ] = useState();

    const [
        depositWalletAddressPreloader,
        setDepositWalletAddressPreloader,
    ] = useState(false);

    const getDepositWalletAddress = async (shortName, cancelToken) => {
        setDepositWalletAddressPreloader(true);
        setDepositWalletAddress("");
        setDepositWalletAddressError(false);
        if (shortName) {
            const response = await PostThis(
                `/api/wallets/${shortName.toUpperCase()}/address`,
                "GET",
                "",
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                },
                "",
                cancelToken
            );
            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    setDepositWalletAddress(response.data.address.address);
                    // setDepositWalletAddress(response.data.message.address);
                } else if (response.status === 403) {
                    user.logout();
                } else {
                }
                setDepositWalletAddressPreloader(false);
            }
        }
    };

    const handleCreateDepositWalletAddress = async (shortName, cancelToken) => {
        setDepositWalletAddressPreloader(true);
        if (shortName) {
            const response = await PostThis(
                `/api/wallets/${shortName.toUpperCase()}/address`,
                "POST",
                "",
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                },
                "",
                cancelToken
            );
            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    // setDepositWalletAddress(response.data.address.address);
                    setDepositWalletAddress(response.data.message.address);
                } else if (response.status === 403) {
                    user.logout();
                } else if (response.status === 400) {
                    setDepositWalletAddressError(true);
                    setDepositWalletAddressErrorMsg(response?.data?.message);
                } else {
                    setDepositWalletAddressError(true);
                    setDepositWalletAddressErrorMsg(response?.data?.message);
                }
                setDepositWalletAddressPreloader(false);
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        getDepositWalletAddress(props?.walletShortName, source.token);
        return () => {
            source.cancel();
        };
    }, [props.walletShortName]);

    return (
        <>
            <p>
                {i18next.t(
                    "Aby zdeponować środki, musisz użyć adresu podanego poniżej. Przetransferuj środki na podany adres, a po udanej walidacji będą one dostępne w Twoim portfelu."
                )}
            </p>

            <div className="depositInfo">
                <Infobox animation={"wobble"} icon={"info"} type={"info"}>
                    {i18next.t("Uwaga! To jest adres depozytowy")}{" "}
                    <span>{props.walletShortName}</span>.{" "}
                    {i18next.t(
                        "Jeśli zdeponujesz tutaj inną walutę, Twoje środki przepadną bezpowrotnie! Tworząc depozyt akceptujesz ten warunek."
                    )}
                </Infobox>
            </div>

            <div className="content">
                <BoxPlaceholder
                    type={"walletPlaceholder"}
                    count={1}
                    show={depositWalletAddressPreloader}
                />
                {/* <Preloader show={depositWalletAddressPreloader} /> */}
                {!depositWalletAddress ? (
                    <div className="textCenter">
                        <Button
                            big
                            onClick={(e) =>
                                handleCreateDepositWalletAddress(
                                    props.walletShortName
                                )
                            }
                        >
                            {i18next.t("Generuj adres do wpłaty")}
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                {depositWalletAddress ? (
                    <InputCopyFrom
                        value={depositWalletAddress}
                        rightIcon={"add_to_photos"}
                    />
                ) : (
                    ""
                )}

                {depositWalletAddressError ? (
                    <Infobox type={"error"} icon={"sync_problem"}>
                        {depositWalletAddressErrorMsg}
                    </Infobox>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default DepositCrypto;
