import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import i18next from "i18next";

import { UserContext } from "../../../../user/userContext";
import PostThis from "../../../../../scripts/post";

import Infobox from "../../../../ui/infobox/infobox";
import Pagination from "../../../../ui/pagination/pagination";
import CustomList, {
    CustomListItem,
} from "../../../../ui/customList/customList";

import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";

import "./confirmedReferralList.scss";

const ConfirmedReferralList = (props) => {
    const user = useContext(UserContext);
    const [referralEarningsList, setReferralEarningsList] = useState();
    const [referralEarningsListError, setReferralEarningsListError] = useState(
        false
    );
    const [
        referralEarningsListErrorType,
        setReferralEarningsListErrorType,
    ] = useState();
    const [
        referralEarningsListErrorMsg,
        setReferralEarningsListErrorMsg,
    ] = useState("");
    const [
        boxPlaceholderreferralEarningsList,
        setBoxPlaceholderreferralEarningsList,
    ] = useState(true);

    const [referralNumber, setReferralNumber] = useState(0);
    const [apiFilterUrl, setApiFilterUrl] = useState(
        "/api/users/me/affiliates"
    );

    const handleBuildList = (list) => {
        setBoxPlaceholderreferralEarningsList(true);
        setReferralEarningsList("");
        setReferralEarningsListError(false);
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <CustomListItem key={index} id={item.id} data={item}>
                        <div className="customListItemCol">{item.email}</div>
                    </CustomListItem>
                );
            });
            if (dom) {
                setReferralEarningsList(dom);
            }
        } else {
            setReferralEarningsList(null);
            setReferralEarningsListError(true);
            setReferralEarningsListErrorMsg(i18next.t("Brak wyników"));
        }

        setBoxPlaceholderreferralEarningsList(false);
    };

    const handleConfirmedReferrals = async (cancelToken) => {
        const response = await PostThis(
            `/api/users/me/affiliates?page=1`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user.authToken,
            },
            "",
            cancelToken
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleBuildList(response.data.affiliates);
                setReferralNumber(response.data?.affiliates.length);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        handleConfirmedReferrals(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <div className="confirmedReferralListContainer">
            <h3 className="stdDashboardHeader">
                {i18next.t("Aktywne polecenia")}
            </h3>

            <div className="confirmedReferralListFilterBar">
                <div className="confirmedReferralNumber">
                    {i18next.t("Ilość polecanych")}:
                    <span>{referralNumber}</span>
                </div>
            </div>
            <div className="confirmedReferralList ">
                <BoxPlaceholder
                    type={"line"}
                    count={5}
                    show={boxPlaceholderreferralEarningsList}
                />

                {referralEarningsList ? (
                    <CustomList>
                        <div className="customListHeader">
                            <div className="customListItemCol">
                                {i18next.t("Polecasz użytkownikowi")}:
                            </div>
                        </div>
                        {referralEarningsList}
                    </CustomList>
                ) : (
                    // <div className="confirmedReferralListBody">
                    //     {referralEarningsList}
                    // </div>
                    ""
                )}
                {referralEarningsListError ? (
                    <Infobox icon={referralEarningsListErrorType ?? "info"}>
                        {i18next.t(referralEarningsListErrorMsg)}
                    </Infobox>
                ) : (
                    ""
                )}
            </div>
            <div className="paginationRow">
                {
                    <Pagination
                        handleBuildList={handleBuildList}
                        URL={apiFilterUrl}
                        setList={setReferralEarningsList}
                        setListPreloader={setBoxPlaceholderreferralEarningsList}
                    />
                }
            </div>
        </div>
    );
};

export default ConfirmedReferralList;
