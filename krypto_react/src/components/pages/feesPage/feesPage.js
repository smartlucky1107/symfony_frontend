import React, { useState, useEffect } from "react";
import axios from "axios";
import i18next from "i18next";
import { Helmet } from "react-helmet";

import Header from "../../head/header";
import Footer from "../../foot/footer";

import PostThis from "../../../scripts/post";

import "./feesPage.scss";

const FeesPage = () => {
    const [feeTable, setFeeTable] = useState();

    const handleGetFee = async (cancelToken) => {
        const response = await PostThis(
            `/api-public/currencies/basic`,
            "GET",
            "",
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleBuildFeesTable(response.data.currencies);
            } else {
                const fees = [
                    { shortName: "BTC", fee: "0,00075" },
                    { shortName: "ETH", fee: "0,009" },
                    { shortName: "USDT", fee: "68" },
                    { shortName: "LINK", fee: "1,5" },
                    { shortName: "REP", fee: "3" },
                    { shortName: "ZRX", fee: "36" },
                ];
                handleBuildFeesTable(fees);
            }
        }
    };

    const handleBuildFeesTable = (list) => {
        if (list) {
            const dom = list.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.shortName}</td>
                        <td>
                            {item.fee} {item.shortName}
                        </td>
                    </tr>
                );
            });
            if (dom) {
                setFeeTable(dom);
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();

        handleGetFee(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{i18next.t("FEES_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("FEES_PAGE_DESC")}
                />
                <link
                    rel="canonical"
                    href={
                        window.location.href.includes("?")
                            ? window.location.href.split("?")[0]
                            : window.location.href
                    }
                />
                <link
                    rel="alternate"
                    hrefLang={"pl"}
                    href={`${process.env.PUBLIC_URL}`}
                />
            </Helmet>
            <Header />
            <div className={"container subPage feesPage"}>
                <h1>{i18next.t("Tabela opłat")}</h1>

                <h3 className="themecolor">
                    {i18next.t(
                        "Stosowana w serwisie internetowym kryptowaluty.pl przyjęta przez Partneria spółka z ograniczoną odpowiedzialnością na podstawie §3 ust. 4 Regulaminu serwisu internetowego kryptowaluty.pl w dniu 22 lutego 2021 r."
                    )}
                </h3>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§1</h3>
                </div>
                <ol>
                    <li>
                        {i18next.t(
                            "Niniejszy dokument określa wysokość należnych na rzecz Administratora od Użytkowników opłat związanych ze świadczeniem Usług w Serwisie lub innymi czynnościami wykonywanymi przez Użytkownika lub na jego rzecz w ramach korzystania z Serwisu, innych niż cena sprzedaży za Usługę Wymiany."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Pojęcia użyte w niniejszym dokumencie mają znaczenie nadane im w Regulaminie, o ile z treści lub kontekstu ich użycia nie wynika nic innego."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Niniejszy dokument ma zastosowanie od momentu jego przyjęcia do momentu jego zmiany lub uchylenia. O zmianie treści niniejszego dokumentu Użytkownik zostanie każdorazowo powiadomiony w drodze komunikatu wyświetlanego w Serwisie."
                        )}
                    </li>
                </ol>
                <div className="textCenter">
                    <h3 className="themecolor biglabel">§2</h3>
                </div>
                <ol>
                    <li>
                        {i18next.t(
                            "Opłata za przesłanie wolumenu Waluty Wirtualnej z Portfela na zewnętrzy, w stosunku do Serwisu, portfel wirtualny (wallet) wynosi w zależności od rodzaju Waluty Wirtualnej („Opłata Transferowa”)"
                        )}
                        :
                        <div className="textCenter">
                            <table className="currencyTable">
                                <thead>
                                    <tr>
                                        <td>{i18next.t("Waluta wirtualna")}</td>
                                        <td>{i18next.t("Opłata")}</td>
                                    </tr>
                                </thead>
                                <tbody>{feeTable}</tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        {i18next.t(
                            "Opłata Transferowa w wyżej określonej wysokości jest stała i niezależy od wolumenu Waluty Wirtualnej mającego być przedmiotem przesłania."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Nie jest dopuszczalne żądanie Użytkownika przesłania Waluty Wirtualnej na zewnętrzy portfel wirtualny, jeżeli wolumen tej waluty mający być przesłany jest niższy niż należna z tego tytułu Opłata Transferowa."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Zapłata należnej Opłaty Transferowej następuje w drodze umownego potrącenia należności Administratora i Użytkownika przez pomniejszenie przesyłanego wolumenu Waluty Wirtualnej o wysokość tej Opłaty."
                        )}
                    </li>
                </ol>
                <div className="textCenter">
                    <h3 className="themecolor biglabel">§3</h3>
                </div>
                <ol>
                    <li>
                        {i18next.t(
                            "Z tytułu wypłaty środków pieniężnych Użytkownika z tytułu ceny sprzedaży Waluty Wirtualnej w Serwisie na rachunek płatniczy Użytkownika, Administrator pobiera od Użytkownika opłatę w kwocie 10 zł."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Wysokość opłaty określonej w ustępie 1 powyżej jest stała i niezależna od wysokości wypłacanych środków."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Zapłata należnej opłaty następuje w drodze umownego potrącenia należności Administratora i Użytkownika przez pomniejszenie wysokości przelewanych środków o kwotę opłaty."
                        )}
                    </li>
                </ol>
            </div>
            <Footer />
        </>
    );
};

export default FeesPage;
