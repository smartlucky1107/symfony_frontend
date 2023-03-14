import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import { getChartData, getChartOptions } from "../../../../../charts/charts";

import { Line } from "react-chartjs-2";
import i18next from "i18next";
import getRoute from "../../../../routing/routingService";
import PostThis from "../../../../../scripts/post";

import "./markets.scss";

import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";
import Infobox from "../../../../ui/infobox/infobox";

const Markets = () => {
  const chartOptions = getChartOptions();

  const [marketsList, setMarketsList] = useState();
  const [marketsListError, setMarketsListError] = useState(null);
  const [marketsListErrorMsg, setMarketsListErrorMsg] = useState();

  const [marketChartData, setMarketChartData] = useState();

  const [boxPlaceholderList, setBoxPlaceholderList] = useState(true);
  const [boxPlaceholderChart, setBoxPlaceholderChart] = useState(true);

  const listRef = useRef(null);

  const handleToggleList = () => {
    listRef.current.classList.toggle("showAll");
  };
  const handleLoadChartData = (chartData, e) => {
    if (e) {
      for (let j = 0; j < listRef.current.childNodes.length; j++) {
        if (listRef.current.childNodes[j].classList?.contains("active")) {
          listRef.current.childNodes[j].classList.remove("active");
        }
      }
      e.currentTarget.classList.add("active");
      let labelArray = [];
      if (chartData && chartData.length > 0) {
        for (let i = 0; i < chartData.length; i++) {
          labelArray.push("");
        }

        const chartDataFromDataset = e.currentTarget.dataset.chart.split(",");

        setMarketChartData(getChartData(chartDataFromDataset));
      }
    } else {
      let labelArray = [];
      if (chartData && chartData.length > 0) {
        for (let i = 0; i < chartData.length; i++) {
          labelArray.push("");
        }
        setMarketChartData(getChartData(chartData));
      }
    }
  };

  const handleBuildList = (list) => {
    if (list && list.length > 0) {
      const dom = list.map((item, index) => {
        const chartData = item?.currencyPair["1hPoints"];

        return (
          <div
            key={index}
            className="market"
            data-chart={chartData}
            onClick={(e) => handleLoadChartData(chartData, e)}
          >
            <div className="wrapper">
              <div className="marketName">
                <img
                  src={
                    getRoute("assets/currencies") +
                    item.currencyPair.baseCurrency.shortName +
                    ".svg"
                  }
                  alt=""
                />
                {item?.currencyPair?.baseCurrency.shortName}
              </div>
            </div>
            <div className="ratesWrapper">
              <div className="marketRates">
                {item?.rate}
                <span
                  className={item?.growth > 0 ? "growth rise" : "growth loose"}
                >
                  <span className="material-icons">
                    {item?.growth > 0
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down"}
                  </span>
                  {item?.growth}%
                </span>
              </div>
              <div className="marketVolume">
                {item?.price}
                <span className="material-icons">keyboard_arrow_right</span>
              </div>
            </div>
          </div>
        );
      });
      if (dom) {
        setMarketsList(dom);
      }
    }
    setBoxPlaceholderList(false);
  };

  const getMarketsList = async (cancelToken) => {
    let currencyArray = [];
    // let convertToArray = Object.values(exampleData["PLN"]);
    // handleBuildList(convertToArray);
    // handleLoadChartData(convertToArray[0].chartData);

    try {
      const response = await PostThis(
        "/charting/currencies",
        "GET",
        "",
        "",
        cancelToken
      );
      if (response) {
        if (response.status >= 200 && response.status < 300) {
          Object.keys(response.data).map((shortName, key) => {
            response.data[shortName].map((item, keyb) => {
              currencyArray.push(item);
            });
          });
          handleBuildList(currencyArray);
          handleLoadChartData(currencyArray[0].currencyPair["1hPoints"]);
        } else {
          setMarketsListError(true);
          setMarketsListErrorMsg(i18next.t(response.data.message));
        }
        setBoxPlaceholderList(false);
        setBoxPlaceholderChart(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getMarketsList(source.token);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      {marketsListError ? (
        <div className="marketsContent">
          <Infobox icon={"info"}>{i18next.t(marketsListErrorMsg)}</Infobox>
        </div>
      ) : (
        <div className="marketsContent">
          <h3 className="title">{i18next.t("Rynki PLN")}</h3>
          <div className="chartWrapper">
            <BoxPlaceholder type={"box"} count={1} show={boxPlaceholderChart} />
            <div className={marketChartData ? "chart loaded" : "chart"}>
              {marketChartData ? (
                <Line
                  data={marketChartData}
                  options={chartOptions}
                  width={339}
                  height={80}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="marketsBox">
            <div className="marketsListHeader">
              <div className="wrapper"></div>
              <div className="ratesWrapper">
                <div className="marketRate">{i18next.t("Zmiana 24H")}</div>
                <div className="marketVolume">{i18next.t("Kurs")}</div>
              </div>
            </div>
            <div ref={listRef} className="marketsList">
              <BoxPlaceholder
                type={"line"}
                count={5}
                show={boxPlaceholderList}
              />
              {marketsList}
            </div>
            {marketsList?.length > 5 ? (
              <button
                className="btnShowMore"
                onClick={() => handleToggleList()}
              >
                {i18next.t("Zobacz wszystkie")}
                <span className="material-icons">keyboard_arrow_down</span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Markets;
