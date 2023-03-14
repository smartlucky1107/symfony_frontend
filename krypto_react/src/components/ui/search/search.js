import React, { useEffect } from "react";

import PropTypes from "prop-types";
import i18next from "i18next";
import "./search.scss";
import Input from "../input/input";

// <Search
//     filterIn={props.listRef} // Ref wskazuje bezpośredniego rodzica filtrowanych elementów
//     filterBy={props.filter} // objekty z value i name po których będzie filtrować data-filter
//     id={"searchWallet"}
//     name={"searchWallet"}
//     placeholder={i18next.t("Wyszukaj...")} // Placeholder wyświetlany w inpucie
// />

// Dodać do bezpośredniego potomka
// data-search={`${props.name},${props.shortName}`}  -- dane po których będzie wyszukiwanie z inputa searchContainer (STRING)
// data-filter={props.type} -- dodatkowe filtrowanie po -- selectedElement (object {value:0,name: filterBy})
//
const Search = (props) => {
    const onChangeSearch = (e, value) => {
        let childrenList = props.filterIn.current?.children;
        let filterBy = props.filterBy;
        if (childrenList) {
            for (let i = 0; i < childrenList.length; i++) {
                let a = childrenList[i].dataset;
                if (filterBy && filterBy.value != 0) {
                    if (
                        a.search?.toUpperCase().indexOf(value?.toUpperCase()) >
                            -1 &&
                        filterBy.value === a.filter.toUpperCase()
                    ) {
                        childrenList[i].style.display = "";
                    } else {
                        childrenList[i].style.display = "none";
                    }
                } else {
                    if (
                        a.search?.toUpperCase().indexOf(value.toUpperCase()) >
                        -1
                    ) {
                        childrenList[i].style.display = "";
                    } else {
                        childrenList[i].style.display = "none";
                    }
                }
            }
        }
    };

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className="searchContainer searchbox">
            <button
                // onClick={(e) => props.onChange(props.id, e.target.value)}
                className="material-icons"
            >
                search
            </button>
            <Input
                id={props.id}
                name={props.id}
                placeholder={props.placeholder ?? i18next.t("Wyszukaj...")}
                onChange={onChangeSearch}
            />
        </div>
    );
};

Search.propTypes = {
    /**
     * Ref to parent DOM object of list
     * filterIn={listRef}
     */
    filterIn: PropTypes.object,
    /**
     * Id for input
     * id={"searchWallet"}
     */
    id: PropTypes.string,
    /**
     * Name for input
     * name={"searchWallet"}
     */
    name: PropTypes.string,
    /**
     * Placeholder for input
     * placeholder={"Wyszukaj"}
     */
    placeholder: PropTypes.string,
    /**
     * Extra filters for match in serching
     * filterBy={value: 0, name: "Wszystkie waluty"}
     */
    filterBy: PropTypes.object,
};

export default Search;
