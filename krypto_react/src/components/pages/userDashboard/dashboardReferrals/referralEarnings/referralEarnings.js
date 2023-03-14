import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import i18next from "i18next";

import getRoute from "../../../../routing/routingService";
import { UserContext } from "../../../../user/userContext";

import PostThis from "../../../../../scripts/post";
import Button from "../../../../ui/button/button";
import Infobox from "../../../../ui/infobox/infobox";
import CustomList, {
  CustomListItem,
} from "../../../../ui/customList/customList";
import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";

import "./referralEarnings.scss";

const ReferralEarnings = (props) => {
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

  const handleAffiliateRewards = async (cancelToken) => {
    const response = await PostThis(
      `/api/users/me/affiliate-rewards`,
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
        handleBuildList(response.data.affiliateRewards);
      } else if (response.status === 403) {
        user.logout();
      } else {
      }
    }
  };

  const handleBuildList = (list) => {
    setBoxPlaceholderreferralEarningsList(true);
    setReferralEarningsList("");
    setReferralEarningsListError(false);
    if (list && list.length > 0) {
      const dom = list.map((item, index) => {
        return (
          <CustomListItem key={index}>
            <div className="customListItemCol">
              <NavLink
                to={getRoute("userDashboardWallets") + "/" + item.shortName}
              >
                {item.fullName}
              </NavLink>
            </div>
            <div className="customListItemCol">
              {item.amount} <span className="short">{item.shortName}</span>
            </div>
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

  const handleTransferEarnings = () => {
    console.log("Transfer earnings to wallets");
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    handleAffiliateRewards(source.token);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="referralEarnings">
      <h3 className="stdDashboardHeader">{i18next.t("Twoje zyski")}</h3>

      <div className="referralFilterBar">
        <Button
          rightIcon={"account_balance_wallet"}
          onClick={() => handleTransferEarnings()}
        >
          {i18next.t("Prześlij zyski na portfele")}
        </Button>
      </div>
      <div className="referralEarningsList ">
        <BoxPlaceholder
          type={"line"}
          count={5}
          show={boxPlaceholderreferralEarningsList}
        />

        {referralEarningsList ? (
          <CustomList>
            <div className="customListHeader">
              <div className="customListItemCol">
                {i18next.t("Nazwa waluty")}:
              </div>
              <div className="customListItemCol">{i18next.t("Zysk")}:</div>
            </div>
            {referralEarningsList}
          </CustomList>
        ) : (
          // <div className="referralEarningsListBody ">
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
    </div>
  );
};

export default ReferralEarnings;

/*----------------------*/
