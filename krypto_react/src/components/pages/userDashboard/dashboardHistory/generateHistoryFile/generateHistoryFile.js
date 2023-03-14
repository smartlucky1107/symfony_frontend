import React, { useEffect, useState, useContext } from "react";
import i18next from "i18next";
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Button from "../../../../ui/button/button";
import Select from "../../../../ui/select/select";

import PostThis from "../../../../../scripts/post";
import { handleConvertDateFormatFilter } from "../../../../../scripts/dateTransformations";
import { UserContext } from "../../../../user/userContext";

import "./generateHistoryFile.scss";

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

const GenerateHistoryFile = (props) => {
    const user = useContext(UserContext);

    const [locale, setLocale] = useState("pl");
    const [periodList, setPeriodList] = useState([
        {
            value: "0",
            name: i18next.t("Wybierz"),
        },
        {
            value: "1",
            name: i18next.t("Ostatnie 24 godziny"),
        },
        {
            value: "2",
            name: i18next.t("Ostatnie 7 dni"),
        },
        {
            value: "3",
            name: i18next.t("Ostatnie 14 dni"),
        },
        {
            value: "4",
            name: i18next.t("Bieżący miesiąc"),
        },
        {
            value: "5",
            name: i18next.t("Ostatnie 3 miesiące"),
        },
        {
            value: "6",
            name: i18next.t("Własny zakres"),
        },
    ]);
    const [activePeriod, setActivePeriod] = useState({
        value: "0",
        name: i18next.t("Wybierz"),
    });

    const [minDate, setMinDate] = useState("");

    const [periodDate, setPeriodDate] = useState("");
    const [periodDateCurrent, setPeriodDateCurrent] = useState("");

    const [selectedDateFrom, setSelectedDateFrom] = useState();
    const [selectedDateTo, setSelectedDateTo] = useState();

    const handleCalculatePeriod = (e) => {
        const dateNow = new Date();

        let dateFrom;

        setActivePeriod(e);
        switch (e.value) {
            case "1":
                dateFrom = new Date(dateNow.setDate(dateNow.getDate() - 1));
                console.log(`-----24 hours-----`);
                console.log(dateFrom);
                break;
            case "2":
                dateFrom = new Date(dateNow.setDate(dateNow.getDate() - 7));
                console.log(`-----7days-----`);
                console.log(dateFrom);
                break;
            case "3":
                dateFrom = new Date(dateNow.setDate(dateNow.getDate() - 14));
                console.log(`-----14 days-----`);
                console.log(dateFrom);
                break;
            case "4":
                dateFrom = new Date(dateNow.setDate(1));
                console.log(`----- current month-----`);
                console.log(dateFrom);
                break;
            case "5":
                dateFrom = new Date(dateNow.setMonth(dateNow.getMonth() - 2));
                console.log(`-----3 months-----`);
                console.log(dateFrom);
                break;
            default:
        }

        const stringDateFromat = `${dateFrom.getDate()}-${
            dateFrom.getMonth() + 1
        }-${dateFrom.getFullYear()}`;

        setPeriodDate(stringDateFromat);
        setPeriodDateCurrent(dateNow);
    };

    const handleGenerateHistoryFile = async (e) => {
        e.preventDefault();
        let dateFrom;
        let dateTo;

        if (activePeriod.value === "6") {
            dateFrom = handleConvertDateFormatFilter(selectedDateFrom);
            dateTo = handleConvertDateFormatFilter(selectedDateTo);
        } else {
            dateFrom = periodDate;
            dateTo = handleConvertDateFormatFilter(periodDateCurrent);
        }
        const response = await PostThis(
            `${props.api}?dateStart=${dateFrom}&dateStop=${dateTo}`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                var uri =
                    "data:text/csv;charset=utf-8," + encodeURI(response.data);

                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = "historia-transakcji.csv";

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        }
    };

    useEffect(() => {
        const dateNow = new Date();

        setMinDate(
            `${
                dateNow.getMonth() - 2 < 10
                    ? `0${dateNow.getMonth() - 2}`
                    : dateNow.getMonth() - 2
            }/${
                dateNow.getDate() < 10
                    ? `0${dateNow.getDate()}`
                    : dateNow.getDate()
            }/${dateNow.getFullYear()}`
        );
    });

    return (
        <>
            <div className={"generateHistoryFile"}>
                <h3 className={"header"}>
                    {i18next.t("Wyeksportuj historię za okres")}:
                </h3>

                <form onSubmit={(e) => handleGenerateHistoryFile(e)}>
                    <div className="selectWrapper">
                        <Select
                            options={periodList}
                            activeElement={activePeriod}
                            onChangeActiveElement={(e) =>
                                handleCalculatePeriod(e)
                            }
                        />
                    </div>

                    {activePeriod.value === "6" ? (
                        <>
                            <p>{i18next.t("Zdefiniuj własny zakres")}:</p>
                            <div className="selectOwnPeriod">
                                <label>
                                    {i18next.t("Zakres od")}

                                    <div className="miDatepickerContainer">
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                            locale={localeMap[locale]}
                                        >
                                            <ThemeProvider
                                                theme={materialTheme}
                                            >
                                                <KeyboardDatePicker
                                                    value={selectedDateFrom}
                                                    onChange={
                                                        setSelectedDateFrom
                                                    }
                                                    format="dd-MM-yyyy"
                                                    minDate={
                                                        minDate || "2000-01-01"
                                                    }
                                                    cancelLabel={
                                                        localeCancelLabelMap[
                                                            locale
                                                        ]
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
                                            <ThemeProvider
                                                theme={materialTheme}
                                            >
                                                <KeyboardDatePicker
                                                    value={selectedDateTo}
                                                    onChange={setSelectedDateTo}
                                                    format="dd-MM-yyyy"
                                                    cancelLabel={
                                                        localeCancelLabelMap[
                                                            locale
                                                        ]
                                                    }
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </label>
                            </div>
                            <p className="info">
                                {i18next.t(
                                    "Zakres eksportu historii nie może przekroczyć okresu 3 miesięcy"
                                )}
                            </p>
                        </>
                    ) : (
                        ""
                    )}

                    {activePeriod.value === "0" ? (
                        ""
                    ) : (
                        <Button rightIcon="file_download" type="submit">
                            {i18next.t("Pobierz")}
                        </Button>
                    )}
                </form>
            </div>
        </>
    );
};

export default GenerateHistoryFile;
