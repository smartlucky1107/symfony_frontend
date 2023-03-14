import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import getRoute from "../../../../routing/routingService";
import i18next from "i18next";
import { UserContext } from "../../../../user/userContext";

import "./checkoutOrders.scss";

import SearchByApi from "../../../../ui/searchByApi/searchByApi";
import Infobox from "../../../../ui/infobox/infobox";
import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";
import Pagination from "../../../../ui/pagination/pagination";
import HistoryListItem from "../historyListItem/historyListItem";
import CheckoutOrdersTabIntroduce from "./checkoutOrdersTabIntroduce";

import { handleConvertDateFormatFilter } from "../../../../../scripts/dateTransformations";

const CheckoutOrders = (props) => {
    const user = useContext(UserContext);
    const [historyList, setHistoryList] = useState();
    const [historyListError, setHistoryListError] = useState();
    const [historyListErrorType, setHistoryListErrorType] = useState();
    const [historyListErrorMsg, setHistoryListErrorMsg] = useState();

    const handleBuildList = (list) => {
        console.log(list);
        props.setBoxPlaceholderHistoryList(true);
        setHistoryList("");
        setHistoryListError(false);

        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <HistoryListItem item={item} index={index} key={index} />
                );
            });
            if (dom) {
                setHistoryList(dom);
            }
        } else {
            setHistoryList(null);
            setHistoryListError(true);
            setHistoryListErrorMsg(i18next.t("Brak wyników"));
        }

        props.setBoxPlaceholderHistoryList(false);
    };

    return (
        <>
            <CheckoutOrdersTabIntroduce />
            <SearchByApi
                handleFilter={props.handleCheckoutOrdersFilter}
                selectedDateFrom={props.selectedDateFrom}
                setSelectedDateFrom={props.setSelectedDateFrom}
                selectedDateTo={props.selectedDateTo}
                setSelectedDateTo={props.setSelectedDateTo}
                typeList={props.typeList}
                activeType={props.activeType}
                setActiveType={props.setActiveType}
                pairsList={props.pairsList}
                activePair={props.activePair}
                setActivePair={props.setActivePair}
            />

            <div className="historyListRow">
                <div className="historyListTable ">
                    <div className="historyListHeader">
                        <div className="historyListCol time">
                            {i18next.t("Czas")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Data")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Para")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Ilość")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Cena")}
                        </div>
                        <div className="historyListCol priceAmount">
                            {i18next.t("Razem")}
                        </div>
                        <div className="historyListCol status">
                            {i18next.t("Status")}
                        </div>
                    </div>
                    <div className="historyListBody ">
                        <BoxPlaceholder
                            type={"line"}
                            count={10}
                            show={props.boxPlaceholderHistoryList}
                        />
                        {historyList ? historyList : ""}
                    </div>

                    {historyListError ? (
                        <Infobox icon={historyListErrorType ?? "info"}>
                            {i18next.t(historyListErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="paginationRow">
                {
                    <Pagination
                        handleBuildList={handleBuildList}
                        URL={props.apiCheckoutOrdersUrl}
                        activePair={props.activePair}
                        activeType={props.activeType}
                        setList={setHistoryList}
                        setListPreloader={props.setBoxPlaceholderHistoryList}
                        dateFrom={handleConvertDateFormatFilter(
                            props.selectedDateFrom
                        )}
                        dateTo={handleConvertDateFormatFilter(
                            props.selectedDateTo
                        )}
                    />
                }
            </div>
        </>
    );
};

export default CheckoutOrders;
