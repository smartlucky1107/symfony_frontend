import React, { useState } from "react";
import i18next from "i18next";
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Button from "../button/button";
import Select from "../select/select";

import "./searchByApi.scss";

const localeMap = {
    pl: plLocale,
};
const localeCancelLabelMap = {
    en: "cancel",
    pl: "anuluj",
};

const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2684fe",
        },
    },
    overrides: {
        MuiIconButton: {
            root: {
                fontSize: "10px",
                padding: "0",
            },
        },

        MuiSvgIcon: {
            root: {
                fontSize: "18px",
            },
        },
        MuiInput: {
            input: {
                padding: "0",
            },
            underline: {
                marginTop: "8px",
                border: "2px",
                borderStyle: "solid",
                borderColor: "#f0f3f8",
                borderRadius: "5px",
                padding: "9px 14px",
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: "500",
                fontSize: "12px",
                boxSizing: "border-box",
                "&&&&:before": {
                    borderBottom: "0",
                },
                "&&&&:after": {
                    borderBottom: "0",
                },
            },
        },
    },
});

const SearchByApi = (props) => {
    const [locale, setLocale] = useState("pl");

    return (
        <div className="searchRow">
            <div className={"filterBar"}>
                <div className="filters">
                    <form onSubmit={(e) => props.handleFilter(e)}>
                        <label>
                            {i18next.t("Zakres od")}
                            <div className="miDatepickerContainer">
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={localeMap[locale]}
                                >
                                    <ThemeProvider theme={materialTheme}>
                                        <KeyboardDatePicker
                                            value={props.selectedDateFrom}
                                            onChange={props.setSelectedDateFrom}
                                            format="dd-MM-yyyy"
                                            cancelLabel={
                                                localeCancelLabelMap[locale]
                                            }
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </label>
                        <label>
                            {i18next.t("Zakres do")}
                            <div className="miDatepickerContainer">
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={localeMap[locale]}
                                >
                                    <ThemeProvider theme={materialTheme}>
                                        <KeyboardDatePicker
                                            value={props.selectedDateTo}
                                            onChange={props.setSelectedDateTo}
                                            format="dd-MM-yyyy"
                                            cancelLabel={
                                                localeCancelLabelMap[locale]
                                            }
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </label>
                        {props.typeList ? (
                            <div className="selectWrapper">
                                <Select
                                    options={props.typeList}
                                    activeElement={props.activeType}
                                    onChangeActiveElement={(e) =>
                                        props.setActiveType(e)
                                    }
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {props.pairsList ? (
                            <div className="selectWrapper pairs">
                                <Select
                                    options={props.pairsList}
                                    activeElement={props.activePair}
                                    onChangeActiveElement={(e) =>
                                        props.setActivePair(e)
                                    }
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        <Button rightIcon="filter_list">
                            {i18next.t("Filtruj")}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchByApi;
