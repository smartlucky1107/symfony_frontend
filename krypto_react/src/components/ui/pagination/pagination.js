import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import getRoute from "../../routing/routingService";

import PostThis from "./../../../scripts/post";

import { UserContext } from "../../user/userContext";

import "./pagination.scss";

const Pagination = (props) => {
  const user = useContext(UserContext);
  const [paginationLength, setPaginationLength] = useState();
  const [paginationList, setPaginationList] = useState();
  const [activePage, setActivePage] = useState();

  const handleBuildPaginationList = (paginationLength, activePage) => {
    let ItemsArray = [];

    for (let i = 1; i <= paginationLength; i++) {
      ItemsArray.push(i);
    }

    let brakeItem = ["..."];
    let firstItems = ItemsArray.slice(0, 1);
    let lastItems = ItemsArray.slice(Math.max(ItemsArray.length - 1, 0));
    let middleItems = [];

    if (activePage > 3) {
      if (activePage > 3) {
        middleItems = middleItems.concat(brakeItem);
      }
      if (activePage < ItemsArray.length - 2) {
        middleItems = middleItems
          .concat(ItemsArray[activePage - 2])
          .concat(ItemsArray[activePage - 1])
          .concat(ItemsArray[activePage]);
      } else {
        middleItems = middleItems
          .concat(ItemsArray[ItemsArray.length - 3])
          .concat(ItemsArray[ItemsArray.length - 2]);
      }

      if (activePage > 3 && activePage < ItemsArray.length - 2) {
        middleItems = middleItems.concat(brakeItem);
      }
    } else {
      if (paginationLength > 4) {
        if (ItemsArray[1] && ItemsArray[2]) {
          middleItems = middleItems
            .concat(ItemsArray[1])
            .concat(ItemsArray[2])
            .concat(brakeItem);
        }
      } else if (paginationLength === 4) {
        if (ItemsArray[1] && ItemsArray[2]) {
          middleItems = middleItems.concat(ItemsArray[1]).concat(ItemsArray[2]);
        }
      } else {
        if (ItemsArray[1] && ItemsArray[2]) {
          middleItems = middleItems.concat(ItemsArray[1]);
          // .concat(brakeItem);
        }
      }
    }

    let list = [];
    if (lastItems[0] > 1) {
      list = list.concat(firstItems).concat(middleItems).concat(lastItems);
    } else {
      list = list.concat(firstItems).concat(middleItems);
    }

    list = list.map((item, index) => {
      return (
        <li
          key={index}
          className={activePage === item ? "active" : ""}
          data-page={!isNaN(item) ? item : ""}
          onClick={(e) => {
            handleSwitchPage(e.currentTarget.dataset.page);
          }}
        >
          {item}
        </li>
      );
    });
    setPaginationList(list);
  };

  const handleSwitchPage = (to) => {
    handleGetList(to);
  };

  const handleGetList = async (page, cancelToken) => {
    if (props.setBoxPlaceholder) {
      props.setBoxPlaceholder(true);
    }
    if (props.setList) {
      props.setList(null);
    }
    if (props.setListPreloader) {
      props.setListPreloader(true);
    }
    let splitedUrl;

    if (props.URL) {
      splitedUrl = props.URL.split("?");

      let seatchFragments;
      let buildApiUrl;
      let link = "";

      if (splitedUrl && splitedUrl.length > 1) {
        seatchFragments = splitedUrl[splitedUrl.length - 1].split("&");
        buildApiUrl = seatchFragments.map((item, index) => {
          if (index === 0) {
            if (page) {
              return `?page=${page}`;
            } else {
              return `?page=1`;
            }
          } else {
            return `&${item}`;
          }
        });

        link = splitedUrl[0];
        for (let i = 0; i < buildApiUrl.length; i++) {
          link += `${buildApiUrl[i]}`;
        }
      }

      let API;
      if (link) {
        API = `${link}`;
      } else {
        API = `${props.URL}${page ? `?page=${page}` : ""}`;
      }

      const response = await PostThis(
        API,
        "GET",
        "",
        {
          Authorization: `Bearer ${user.data.user?.authToken}`,
        },
        "",
        cancelToken
      );

      if (response) {
        if (response.status >= 200 && response.status < 300) {
          props.handleBuildList(response.data.result);

          const paginationLength = Math.ceil(
            response.data.totalItems / response.data.pageSize
          );
          setActivePage(response.data.page);
          setPaginationLength(paginationLength);
          handleBuildPaginationList(paginationLength, response.data.page);
        } else {
          props.handleBuildList("");
        }
      }
    }
  };

  const handleChangePage = (side) => {
    if (side === "prev" && activePage > 1) {
      handleGetList(activePage - 1);
    }
    if (side === "next" && paginationLength > activePage) {
      handleGetList(activePage + 1);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    handleGetList(1, source.token);
    return () => {
      source.cancel();
    };
  }, [props.URL]);

  return (
    <>
      {paginationLength > 1 ? (
        <div className="paginationBox">
          <ul>
            <li
              className="prev"
              onClick={() => {
                handleChangePage("prev");
              }}
            >
              <span className="material-icons">keyboard_arrow_left</span>
            </li>
            {paginationList}
            <li
              className="next"
              onClick={() => {
                handleChangePage("next");
              }}
            >
              <span className="material-icons">keyboard_arrow_right</span>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pagination;
