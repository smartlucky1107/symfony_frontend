import React from "react";
import Tooltip from "../tooltip/tooltip";

import FlexRow from "./flexRow/flexRow";
import FlexCol from "./flexCol/flexCol";

import "./flexTable.scss";

// Przykład użycia:
// tableClass
// Przekazujemy tablicę headItems z objektami {name:"", value: ""}
// name jest używany jako klasa
// Przekazujemy tablicę bodyItems z objektami lub tablicą objektów {name:"", value: ""} lub [{},{}]
// Ogarnięte w body tablica z objektami [{name: "String",icon: "String", tooltip: "String",tooltipSide: "String",}]
//
/* <FlexTable
    headItems={[
        {
            name: "time",
            value: i18next.t("Czas"),
        },
        {
            name: "date",
            value: i18next.t("Data"),
        },
        {
            name: "amount",
            value: i18next.t("Wartość"),
        },
        {
            name: "status",
            value: "",
        },
    ]}
    bodyItems={walletDepositsHistory}
></FlexTable>; */

const FlexTable = (props) => {
    const { tableClass, headItems, bodyItems } = props;

    return (
        <>
            <div className={`flexTable ${tableClass ? tableClass : ""}`}>
                <div className="flexTableHeader">
                    {headItems?.map((item, index) => {
                        return (
                            <FlexCol key={index} name={item?.name}>
                                {item?.value}
                            </FlexCol>
                        );
                    })}
                </div>
                <div className="flexTableBody">
                    {bodyItems?.map((item, index) => {
                        return (
                            <FlexRow key={index}>
                                {item.map((item, index) => {
                                    return (
                                        <FlexCol key={index} name={item?.name}>
                                            {Array.isArray(item.value)
                                                ? item.value.map(
                                                      (item, index) => {
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className={`tooltipWrapper ${item?.name}`}
                                                              >
                                                                  {item.icon ? (
                                                                      <div className="material-icons">
                                                                          {
                                                                              item.icon
                                                                          }
                                                                      </div>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                                  {item.tooltip ? (
                                                                      <Tooltip
                                                                          text={
                                                                              item.tooltip
                                                                          }
                                                                          side={
                                                                              item.tooltipSide
                                                                          }
                                                                      />
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                              </div>
                                                          );
                                                      }
                                                  )
                                                : item.value}
                                        </FlexCol>
                                    );
                                })}
                            </FlexRow>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FlexTable;
