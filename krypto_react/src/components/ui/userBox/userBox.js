import React, { useContext } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import { UserContext } from "./../../user/userContext";
import "./userBox.scss";

import circle from "./../../../img/circle-right.svg";

const UserBox = (props) => {
    const userContext = useContext(UserContext);
    const userData = userContext.data.user;

    return (
        <>
            <div className="userBox">
                {props.to ? (
                    <Link to={props.to} className="userBoxIcon">
                        <img
                            className="circle"
                            src={circle}
                            alt="circle-right"
                        />
                        <span className="material-icons">person</span>
                    </Link>
                ) : (
                    <div className="userBoxIcon">
                        <img
                            className="circle"
                            src={circle}
                            alt="circle-right"
                        />
                        <span className="material-icons">person</span>
                    </div>
                )}

                {props.to ? (
                    <Link to={props.to} className="userBoxData">
                        <div className="userBoxName">{userData?.fullName}</div>
                        <div
                            className={
                                !userData?.isTier2Approved &&
                                !userData?.isTier3Approved
                                    ? "userBoxVerify error"
                                    : "userBoxVerify success"
                            }
                        >
                            {!userData?.isTier3Approved
                                ? i18next.t("Dokończ weryfikację!")
                                : i18next.t(userData?.verificationStatusName)}
                        </div>
                    </Link>
                ) : (
                    <div className="userBoxData">
                        <div className="userBoxName">
                            {userData?.firstName} {userData?.lastName}
                        </div>
                        <div
                            className={
                                !userData?.isTier2Approved &&
                                !userData?.isTier3Approved
                                    ? "userBoxVerify error"
                                    : "userBoxVerify success"
                            }
                        >
                            {!userData?.isTier2Approved
                                ? i18next.t("Dokończ weryfikację!")
                                : i18next.t(userData?.verificationStatusName)}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserBox;
