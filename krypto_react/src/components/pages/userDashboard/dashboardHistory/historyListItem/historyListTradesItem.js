import React, { useState } from "react";
import i18next from "i18next";

import TransactionStatusIcons from "../../../../ui/transactionStatusIcons/transactionStatusIcons";
import {
  handleConvertTimeFormat,
  handleConvertDateFormat,
  handleConvertDateFormatFilter,
} from "../../../../../scripts/dateTransformations";

const HistoryListTradesItem = (props) => {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className={`listItemRow ${isActive ? "show" : "hide"}
            `}
      key={props.index}
      onClick={() => setActive(!isActive)}
    >
      <div className="historyListCol time">
        {/* <span className="material-icons">
                    //             query_builder
                    //         </span> */}
        {handleConvertTimeFormat(props.item?.createdAt)}
      </div>
      <div className="historyListCol date">
        {handleConvertDateFormat(props.item?.createdAt)}
      </div>
      {props.item?.orderBuy ? (
        <div className="historyListCol pair">
          {props.item?.orderBuy?.currencyPair?.pairShortName}
          <span className={props.item?.orderBuy?.typeName.toLowerCase()}>
            {i18next.t("Zakup")}
          </span>
        </div>
      ) : (
        <div className="historyListCol pair">
          {props.item?.orderSell?.currencyPair?.pairShortName}
          <span className={props.item?.orderSell?.typeName.toLowerCase()}>
            {i18next.t("Sprzedaż")}
          </span>
        </div>
      )}
      <div className="historyListCol amount">
        {props.item?.amount}{" "}
        <span>
          {props.item?.orderBuy
            ? props.item?.orderBuy?.currencyPair?.baseCurrency.shortName
            : props.item?.orderSell?.currencyPair?.baseCurrency.shortName}
        </span>
      </div>
      <div className="historyListCol price">
        {props.item?.price}{" "}
        <span>
          {props.item?.orderBuy
            ? props.item?.orderBuy?.currencyPair?.quotedCurrency.shortName
            : props.item?.orderSell?.currencyPair?.quotedCurrency.shortName}
        </span>
      </div>
      <div className="historyListCol priceAmount">
        {props.item?.totalValue}{" "}
        <span>
          {props.item?.orderBuy
            ? props.item?.orderBuy?.currencyPair?.quotedCurrency.shortName
            : props.item?.orderSell?.currencyPair?.quotedCurrency.shortName}
        </span>
      </div>
      <div className="historyListCol status">
        <TransactionStatusIcons
          status={
            props.item?.orderBuy
              ? props.item?.orderBuy?.status
              : props.item?.orderSell?.status
          }
          type={"trade"}
          side={"right"}
        />
      </div>
      <div className="historyDetails">
        <div className="historyDetailsTitle">
          {i18next.t("Transakcja id")}: {props.item.id}
        </div>
        <div className="row rowBox">
          <div className="col col-6 col-xl-6 ">
            <div className="detailsRow">
              <div>{i18next.t("Rodzaj transakcji")}</div>
              <div>
                {props.item?.orderBuy
                  ? i18next.t("zakup")
                  : i18next.t("Sprzedaż")}
              </div>
            </div>
            <div className="detailsRow">
              <div>{i18next.t("Para zakupu")}</div>
              <div>
                {props.item?.orderBuy
                  ? props.item?.orderBuy?.currencyPair?.pairShortName
                  : props.item?.orderSell?.currencyPair?.pairShortName}
              </div>
            </div>

            <div className="detailsRow">
              <div>{i18next.t("Utworzono")}</div>
              <div>
                {handleConvertTimeFormat(props.item?.createdAt)}{" "}
                {handleConvertDateFormat(props.item?.createdAt)}
              </div>
            </div>
            <div className="detailsRow">
              <div>{i18next.t("Status transakcji")}</div>
              <div>
                {props.item?.orderBuy
                  ? i18next.t(props.item?.orderBuy?.statusName)
                  : i18next.t(props.item?.orderSell?.statusName)}
              </div>
            </div>
          </div>
          <div className="col col-6 col-xl-6 ">
            <div className="detailsRow">
              <div>{i18next.t("Cena")}</div>
              <div>{props.item?.price}</div>
            </div>
            <div className="detailsRow">
              <div>{i18next.t("Ilość")}</div>
              <div>{props.item?.amount}</div>
            </div>
            {/* <div className="detailsRow">
                            <div>{i18next.t("Kurs zlecenia")}</div>
                            <div></div>
                        </div> */}
            {/* <div className="detailsRow">
                            <div>{i18next.t("Całkowity koszt transakcji")}</div>
                            <div>{props.item?.totalPaymentValue}</div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryListTradesItem;
