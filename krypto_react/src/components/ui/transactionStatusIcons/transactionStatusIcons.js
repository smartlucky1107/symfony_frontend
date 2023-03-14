import React, { useState, useEffect } from "react";
import i18next from "i18next";
import Tooltip from "../tooltip/tooltip";

import "./transactionStatusIcons.scss";

const TransactionStatusIcons = (props) => {
  const [statusColor, setStatusColor] = useState("");
  const [statusName, setStatusName] = useState();
  const [statusIcon, setStatusIcon] = useState();

  //Colors:
  /*
    approved
    waiting
    canceled
*/
  /* planned-orders status
const STATUS_NEW                = 1;    // Created by user as
const STATUS_PENDING            = 2;    // Set by processor as pending
const STATUS_PAYMENT_INIT       = 3;    // Redirected to payment processor
const STATUS_PAYMENT_PROCESSING = 4;    // Returned from payment processor
const STATUS_PAYMENT_SUCCESS    = 5;    // Payment received with success
const STATUS_DEPOSIT_CREATED    = 6;    // After successful payment system will create approved deposit - it needs to be in processor
*/

  const handleSetStatus = (status, type) => {
    if (type === "pos") {
      console.log(status);
      switch (status) {
        case 0:
          setStatusName("NotConfirmed");
          setStatusIcon("highlight_off");
          setStatusColor("canceled");
          break;
        case 1:
          setStatusName("Approved");
          setStatusIcon("check_circle_outline");
          setStatusColor("approved");
          break;
        case 5:
          setStatusName("Rejected");
          setStatusIcon("highlight_off");
          setStatusColor("canceled");
          break;

        case "":
          setStatusName("Undefined");
          setStatusIcon("canceled");
          break;
        default:
      }
    } else if (type === "trade") {
      switch (status) {
        case 0:
          setStatusName("NotConfirmed");
          setStatusIcon("highlight_off");
          setStatusColor("canceled");
          break;
        case 3:
          setStatusName("Filled");
          setStatusIcon("check_circle_outline");
          setStatusColor("approved");
          break;
        case 2:
          setStatusName("Rejected");
          setStatusIcon("highlight_off");
          setStatusColor("canceled");
          break;

        case "":
          setStatusName("Undefined");
          setStatusIcon("canceled");
          break;
        default:
      }
    } else {
      switch (status) {
        case 1:
          setStatusName("New");
          setStatusIcon("new_releases");
          setStatusColor("waiting");
          break;
        case 2:
          setStatusName("Rejected");
          setStatusIcon("highlight_off");
          setStatusColor("canceled");
          break;
        case 3:
          setStatusName("Pending");
          setStatusIcon("hourglass_full");
          setStatusColor("waiting");
          break;
        case 4:
          setStatusName("Redirected");
          setStatusIcon("open_in_new");
          setStatusColor("waiting");
          break;
        case 5:
          setStatusName("Returned");
          setStatusIcon("payments");
          setStatusColor("approved");
          break;
        case 6:
          setStatusName("Approved");
          setStatusIcon("check_circle_outline");
          setStatusColor("approved");
          break;
        case 7:
          setStatusName("Processing");
          setStatusIcon("hourglass_full");
          setStatusColor("waiting");
          break;
        case 8:
          setStatusName("DepositCreated");
          setStatusIcon("hourglass_full");
          setStatusColor("waiting");
          break;
        case 100:
          setStatusName("Completed");
          setStatusIcon("check_circle_outline");
          setStatusColor("approved");
          break;
        case "New":
          setStatusName("New");
          setStatusIcon("hourglass_full");
          setStatusColor("waiting");
          break;
        case "isApproved":
          setStatusName("Approved");
          setStatusIcon("check_circle_outline");
          setStatusColor("approved");
          break;
        case "isDeclined":
          setStatusName("isDeclined");
          setStatusIcon("highlight_off");
          break;
        case "isRequest":
          setStatusName("isRequest");
          setStatusIcon("history");
          break;
        case "isReverted":
          setStatusName("isReverted");
          setStatusIcon("reply_all");
          break;
        case "isExternalApproval":
          setStatusName("isExternalApproval");
          setStatusIcon("rotate_left");
          break;
        case "isKantorWithdrawal":
          setStatusName("isKantorWithdrawal");
          setStatusIcon("rotate_left");
          break;
        case "isRejected":
          setStatusName("isRejected");
          setStatusIcon("rotate_left");
          break;
        case "isTransferred":
          setStatusName("isTransferred");
          setStatusIcon("rotate_left");
          break;
        default:
      }
    }
  };
  useEffect(() => {
    handleSetStatus(props.status, props?.type);
  }, []);

  return (
    <>
      <div className={`tooltipWrapper ${statusColor} transactionStatusIcons`}>
        <span className="material-icons">{statusIcon}</span>
        <Tooltip text={i18next.t(statusName)} side={props.side ?? "left"} />
      </div>
    </>
  );
};

export default TransactionStatusIcons;
