import React, { useState } from "react";
import i18next from "i18next";
import "./searchBar.scss";

import Search from "../../../ui/search/search";
import Select from "../../../ui/select/select";

const SearchBar = (props) => {
    // Use it like this:

    // const listRef = useRef(); // ref wskazuje na kontener w którym są bezpośrednio filtrowane elementy

    // <SearchBar listRef={listRef} filter={filter} setFilter={setFilter} />;

    const filterList = (e) => {
        props.setFilter(e);

        let childrenList = props.listRef.current?.children;
        let filter;
        if (e.value != 0) {
            filter = e.value;
        } else {
            filter = "";
        }

        for (let i = 0; i < childrenList.length; i++) {
            let a = childrenList[i].dataset.filter;

            if (a?.toUpperCase().indexOf(filter?.toUpperCase()) > -1) {
                childrenList[i].style.display = "";
            } else {
                childrenList[i].style.display = "none";
            }
        }
    };

    return (
        <>
            <div className="row searchRow">
                <Search
                    filterIn={props.listRef}
                    filterBy={props.filter}
                    id={"searchWallet"}
                    name={"searchWallet"}
                    placeholder={i18next.t("Wyszukaj...")}
                />
                <p>{i18next.t("lub filtruj po")}</p>
                <div className="filterBy">
                    <Select
                        options={[
                            {
                                value: 0,
                                name: i18next.t("Wszystkie waluty"),
                            },
                            {
                                value: "FIAT",
                                name: i18next.t("Waluty FIAT"),
                            },
                            {
                                value: "CRYPTO",
                                name: i18next.t("Waluty KRYPTO"),
                            },
                        ]}
                        activeElement={props.filter}
                        onChangeActiveElement={(e) => filterList(e)}
                    />
                </div>
            </div>
        </>
    );
};

export default SearchBar;
