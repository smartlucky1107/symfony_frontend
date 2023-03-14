import React, { useRef, useState, useEffect } from "react";
import "./../howToBuyCryptocurrencies.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect, Link } from "react-router-dom";
import getRoute from "../../../routing/routingService";
import Header from "../../../head/header";
import Footer from "../../../foot/footer";

import "../howToBuy.scss";

import walletImg from "../../../../img/pageImg/wallet.svg";
import okImg from "../../../../img/pageImg/ok.svg";
import supportImg from "../../../../img/pageImg/support.svg";
import mailImg from "../../../../img/pageImg/mail.svg";
import img1 from "../../../../img/howTo/step1.gif";
import img2 from "../../../../img/howTo/step2.gif";
import img3 from "../../../../img/howTo/potwierdzenie.png";

const HowToBuyEthereumPage = () => {
    //return <Redirect to={getRoute('main')}/>

    const [wWidth, setWWidth] = useState();

    const pointRef1 = useRef(null);
    const pointRef2 = useRef(null);
    const pointRef3 = useRef(null);

    const handleScrollToView = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    useEffect(() => {
        function handleResize() {
            setWWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [wWidth]);

    return (
        <>
            <Helmet>
                <title>{i18next.t("HOWTOBUYETHEREUM_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("HOWTOBUYETHEREUM_PAGE_DESC")}
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
            <div className={"container subPage howToBuy howToBuyEthereumPage"}>
                <h1>{i18next.t("Jak kupić Ethereum?")}</h1>
                {i18next.t(
                    "Skorzystaj z platformy Kryptowaluty.pl, aby w kilku prostych krokach nabyć najpopularniejsze kryptowaluty po korzystnym kursie. Za pomocą nowoczesnej technologii kupuj i sprzedawaj waluty wirtualne w błyskawiczny sposób. Dbamy o Twoje bezpieczeństwo oraz komfort, dlatego zabezpieczamy dane osobowe klientów. Dodatkowo każda transakcja jest szyfrowana poprzez SSL podobnie jak operacje bankowe."
                )}

                <div className="row rowBox whatDoINeed">
                    <div className="col col-xl-6 alignCenter">
                        <div>
                            <h3>
                                {i18next.t(
                                    "Czego potrzebuję do zakupu Ethereum? "
                                )}
                            </h3>
                            <ul className="customList numberList">
                                {/* <li>
                            <span>1</span>
                            {i18next.t("Wejdź na stronę www.kryptowaluty.pl")}
                        </li> */}
                                <li>
                                    <span>1</span>
                                    {i18next.t("Konta na platformie. ")}
                                    <Link to={getRoute("login")}>
                                        {i18next.t("Możesz je założyć tutaj.")}
                                    </Link>
                                </li>
                                <li>
                                    <span>2</span>
                                    {i18next.t(
                                        "Dostępnych środków w portfelu kantorowym lub na Twoim koncie bankowym. "
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-xl-6">
                        <img src={walletImg} alt="" />
                    </div>
                </div>

                <div className={"miniSection"}>
                    <div className="row rowBox">
                        <div className="col col-xl-8 order order-2 order-xl-2">
                            <div className="createAccountSteps">
                                <div
                                    className="createAccountStep step1"
                                    ref={pointRef1}
                                >
                                    <div className="stepCount">1, 2, 3</div>
                                    <div className="stepImg">
                                        <img src={img1} alt="" />
                                        {/* {wWidth < 1198 ? (
                                    <img src={img1mobile} alt="" />
                                ) : (
                                    <img src={img1} alt="" />
                                )} */}
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step2"
                                    ref={pointRef2}
                                >
                                    <div className="stepCount">4, 5, 6, 7</div>
                                    <div className="stepImg">
                                        <img src={img2} alt="" />
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step3"
                                    ref={pointRef3}
                                >
                                    <div className="stepCount">8</div>
                                    <div className="stepImg">
                                        <img src={img3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-xl-4 order order-xl-1 ">
                            <div className="sticky">
                                <h3>
                                    {i18next.t(
                                        "Jak przeprowadzić transakcję krok po kroku"
                                    )}
                                </h3>
                                <ul className="customList numberList">
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef1)
                                        }
                                        className="anchor"
                                    >
                                        <span>1</span>
                                        {i18next.t(
                                            "Wybierz BTC z rozwijanego panelu “Chcę kupić”."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef1)
                                        }
                                        className="anchor"
                                    >
                                        <span>2</span>
                                        {i18next.t(
                                            " W polu “Zapłacę” wpisz kwotę, którą chcesz przeznaczyć na zakup kryptowaluty. Automat wyświetli ilość wymienianych Ethereum. "
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef1)
                                        }
                                        className="anchor"
                                    >
                                        <span>3</span>
                                        {i18next.t(
                                            "Kliknij przycisk 'Kup ETH'"
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef2)
                                        }
                                        className="anchor"
                                    >
                                        <span>4</span>
                                        {i18next.t(
                                            "Wybierz interesującą Cię formę płatności w panelu dostępnych opcji. "
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef2)
                                        }
                                        className="anchor"
                                    >
                                        <span>5</span>
                                        {i18next.t(
                                            "Jeśli wcześniej wpłaciłeś środki na swoje konto, możesz skorzystać z wbudowanego portfela w kantorze kryptowaluty.pl lub wybrać opcję “Dodaj środki”, aby doładować portfel."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef2)
                                        }
                                        className="anchor"
                                    >
                                        <span>6</span>
                                        {i18next.t(
                                            "Drugą opcją jest zakup kryptowalut za pomocą karty płatniczej. Wystarczy, że wybierzesz opcję “Dodaj kartę”, a zostanie ona przypisana do Twojego konta."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef2)
                                        }
                                        className="anchor"
                                    >
                                        <span>7</span>
                                        {i18next.t(
                                            " Po wybraniu metody płatności potwierdź transakcję klikając przycisk “Kup teraz”. "
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef3)
                                        }
                                        className="anchor"
                                    >
                                        <span>8</span>
                                        {i18next.t("Potwierdzenie transakcji")}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 alignCenter textCenter">
                        <div>
                            <h3>
                                {i18next.t(
                                    "Gratulacje! Właśnie dokonałeś swojego pierwszego zakupu Ethereum. Nie było to takie trudne, prawda?"
                                )}
                            </h3>
                            <p>
                                {i18next.t(
                                    "Następnie postępuj zgodnie z dalszymi wskazówkami na stronie operatora płatności. Ponadto na Twój adres e-mail zostanie wysłana wiadomość ze szczegółami zamówienia. "
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="col col-xl-6">
                        <img src={okImg} alt="" />
                    </div>
                </div>

                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6">
                        <img src={mailImg} alt="" />
                    </div>
                    <div className="col col-xl-6 alignCenter textCenter">
                        <h3>
                            {i18next.t(
                                "Transakcja zostanie przetworzona przez zautomatyzowany system, dlatego Ethereum znajdzie się błyskawicznie na Twoim portfelu. "
                            )}
                        </h3>
                    </div>
                </div>

                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 alignCenter textCenter">
                        <h3>
                            {i18next.t(
                                "Masz dodatkowe pytania lub dany etap jest dla Ciebie niejasny? Skontaktuj się z nami! Jesteśmy do Twojej dyspozycji w godzinach "
                            )}
                            9:00 - 17:00
                            {i18next.t(
                                " i z przyjemnością udzielimy Ci odpowiednich informacji"
                            )}
                        </h3>
                    </div>
                    <div className="col col-xl-6">
                        <img src={supportImg} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HowToBuyEthereumPage;
