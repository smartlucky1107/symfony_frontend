import React, { useEffect, useRef, useState } from "react";
import "./howToCreateAccountPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";

import img1 from "../../../img/createAccountSteps/customUser/step1.gif";
import img1mobile from "../../../img/createAccountSteps/customUser/step1mobile.gif";
import img2 from "../../../img/createAccountSteps/customUser/step2.gif";
import img3 from "../../../img/createAccountSteps/customUser/potwierdzenie.jpg";
import img4 from "../../../img/createAccountSteps/customUser/email-potwierdzenie.png";
import img5 from "../../../img/createAccountSteps/customUser/gratulacje.png";

const HowToCreateAccountPage = () => {
    //return <Redirect to={getRoute('main')}/>

    const [wWidth, setWWidth] = useState();

    const pointRef2 = useRef(null);
    const pointRef3 = useRef(null);
    const pointRef4 = useRef(null);
    const pointRef5 = useRef(null);
    const pointRef6 = useRef(null);

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
                <title>{i18next.t("HOWTOREGISTER_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("HOWTOREGISTER_PAGE_DESC")}
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
            <div className={"container subPage howToCreateAccountPage"}>
                <div className={"miniSection"}>
                    <h1>{i18next.t("Jak utworzyć konto?")}</h1>
                    <div className="videoContainer">
                        <div className="iframeBox">
                            <iframe
                                title={"howTOCreateAccount"}
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/9IZy9jr0MHw"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="row rowBox">
                        <div className="col col-xl-8 order order-2 order-xl-2">
                            <div className="createAccountSteps">
                                <div
                                    className="createAccountStep step1"
                                    ref={pointRef2}
                                >
                                    <div className="stepCount">1</div>
                                    <div className="stepImg">
                                        {wWidth < 1198 ? (
                                            <img src={img1mobile} alt="" />
                                        ) : (
                                            <img src={img1} alt="" />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step2"
                                    ref={pointRef3}
                                >
                                    <div className="stepCount">2, 3, 4</div>
                                    <div className="stepImg">
                                        <img src={img2} alt="" />
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step3"
                                    ref={pointRef4}
                                >
                                    <div className="stepCount">5</div>
                                    <div className="stepImg">
                                        <img src={img3} alt="" />
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step4"
                                    ref={pointRef5}
                                >
                                    <div className="stepCount">6</div>
                                    <div className="stepImg">
                                        <img src={img4} alt="" />
                                    </div>
                                </div>
                                <div
                                    className="createAccountStep step5"
                                    ref={pointRef6}
                                >
                                    <div className="stepCount">7</div>
                                    <div className="stepImg">
                                        <img src={img5} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-xl-4 order order-xl-1 ">
                            <div className="sticky">
                                <ul className="customList numberList">
                                    {/* <li>
                            <span>1</span>
                            {i18next.t("Wejdź na stronę www.kryptowaluty.pl")}
                        </li> */}
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef2)
                                        }
                                        className="anchor"
                                    >
                                        <span>1</span>
                                        {i18next.t(
                                            "W prawym górnym rogu naciśnij przycisk 'Załóż konto'"
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef3)
                                        }
                                        className="anchor"
                                    >
                                        <span>2</span>
                                        {i18next.t(
                                            "Wypełnij dane formularza - wpisz swoje imię, nazwisko i adres mailowy."
                                        )}
                                        <br />
                                        {i18next.t(
                                            "Następnie podaj hasło, które będzie zawierać przynajmniej jedną dużą literę, jeden znak specjalny, jedną cyfrę oraz mieć minimum 8 znaków."
                                        )}
                                        <br />
                                        {i18next.t(
                                            "Zaznacz wymagane pola - potwierdzenie zapoznania się z regulaminem oraz polityką prywatności."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef3)
                                        }
                                        className="anchor"
                                    >
                                        <span>3</span>
                                        {i18next.t(
                                            "Zaznacz pole „Nie jestem robotem”, a później wybierz wszystkie poprawne kwadraty.  Następnie kliknij „Wybierz” lub „Pomiń”."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef3)
                                        }
                                        className="anchor"
                                    >
                                        <span>4</span>
                                        {i18next.t(
                                            "Po wypełnieniu formularza przejdź dalej przyciskiem 'Załóż konto'."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef4)
                                        }
                                        className="anchor"
                                    >
                                        <span>5</span>
                                        {i18next.t(
                                            "Następnie wyświetlony zostanie komunikat z informacją o wysłanym e-mailu."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef5)
                                        }
                                        className="anchor"
                                    >
                                        <span>6</span>
                                        {i18next.t(
                                            "Aby potwierdzić rejestrację, przejdź do swojej poczty i kliknij link aktywacyjny."
                                        )}
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleScrollToView(pointRef6)
                                        }
                                        className="anchor"
                                    >
                                        <span>7</span>
                                        {i18next.t(
                                            "Gratulacje! Twoje konto zostało aktywowane."
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HowToCreateAccountPage;
