import React, { useContext } from "react";
import i18next from "i18next";

import UserDashboard from "./../userDashboard";
import "./dashboardWelcome.scss";

import WalletsToggleList from "./walletsToggleList/walletsToggleList";
import Markets from "./markets/markets";
import AccountData from "./accountData/accountData";

import TradesHistory from "./tradesHistory/tradesHistory";
import VerificationStatus from "./verificationStatus/verificationStatus";
import CustomList from "../../../ui/customList/customList";
import { CustomListItem } from "../../../ui/customList/customList";
import { UserContext } from "./../../../user/userContext";
import paymentCardChip from "../../../../img/chip.png"

const DashboardWelcome = () => {
  const userContext = useContext(UserContext);
  const userData = userContext.data.user;
  return (
    <UserDashboard>
      <>
        <div className="dashboardWelcome">
          <h1 className="stdDashboardHeader">
            {i18next.t("Witaj")} {userData.fullName}
          </h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div className="bg-w">

            {/* <div className="dashboardIntroduce">
                            <p>
                                {i18next.t(
                                    "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60."
                                )}
                            </p>
                        </div> */}
            <div className="row rowBox">
              <div className="col col-xl-12">
                <WalletsToggleList />
                {/* <Markets /> */}
                {/* <AccountData /> */}
              </div>
              <div className="col col-xl-6">
                  <Markets />
              </div>
              <div className="col col-xl-6">
                  <AccountData />
              </div>
              
              {/* <div className="col col-xl-12">
                <TradesHistory />
                <VerificationStatus />
              </div> */}
              <div className="col col-xl-6">
                <div className="cstCard">
                   <div className="toppart">
                    <h3>Credit Card</h3><h4>Bank Name</h4>
                   </div>
                   <div className="paymentcard-chip">
                    <img src={paymentCardChip} alt={""} />
                </div>
                   <div className="degits"><h3>1234 &nbsp; 5678  &nbsp; 9012  &nbsp; 3456</h3><small>0123</small></div>
                   <div className="bottompart">
                    <h3>Name Surname</h3>
                    <div className="expirecard"><div className="w-60"><small>VALID THRU </small></div><h5>01/80</h5></div>
                   </div>
                </div>
              </div>
              <div className="col col-xl-6">
              <div className="cstCard">
              <div className="toppart">
                    <h3>Credit Card</h3><h4>Bank Name</h4>
                   </div>
                   <div className="paymentcard-chip">
                    <img src={paymentCardChip} alt={""} />
                </div>
                   <div className="degits"><h3>1234 &nbsp; 5678  &nbsp; 9012  &nbsp; 3456</h3><small>0123</small></div>
                   <div className="bottompart">
                    <h3>Name Surname</h3>
                    <div className="expirecard"><div className="w-60"><small>VALID THRU </small></div><h5>01/80</h5></div>
                   </div>
              </div>
              </div>
              <div className="col col-xl-12">
              <div className="dashBox">
                 <p>{i18next.t("Dodaj nowq karte")}+</p>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* {userData?.isTier3Approved ? (
                <DashboardNews />
            ) : (
                <DashboardVerifyAccount />
            )} */}
      </>
    </UserDashboard>
  );
};

export default DashboardWelcome;
