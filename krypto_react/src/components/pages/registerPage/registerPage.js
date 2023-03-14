import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import i18next from "i18next";
import Header from "../../head/header";
import UnderHeader from "../../ui/underHeader/underHeader";
import Footer from "../../foot/footer";
import RegisterForm from "./registerForm/registerForm";
import BusinessRegisterForm from "./businessRegisterForm/businessRegisterForm";
import "./registerPage.scss";
import { setCookie } from "../../../scripts/cookies";
import createacct from "../../../img/createacct.png";
import RegisterTypeSelector from "./registerTypeSelector/registerTypeSelector";
import SuccessImg from "../../../img/mail.svg";
import Button from "../../ui/button/button";

const RegisterPage = (props) => {
    const currentUrl = window.location.href.includes("?")
        ? window.location.href.split("?")[0]
        : window.location.href;
    const [wWidth, setWWidth] = useState();
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerType, setRegisterType] = useState(1);
    const [userMail, setUserMail] = useState(null);

    useEffect(() => {
        function handleResize() {
            setWWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [wWidth]);

    const updateUserMail = (email) => {
        setUserMail(email);
    }
    const goToMailbox = () => {
        if(userMail !== null) {
            let mailbox = userMail.split("@")[1];
            window.open("http://" + mailbox, "_blank");
        }
    };


    const renderRegisterSuccess = () => {
        let mailBtn = <Button big blue onClick={goToMailbox}>
            {i18next.t("Kliknij by przejść do swojej skrzynki")}
        </Button>

        if(userMail !== null){
            let mailbox = userMail.split("@")[1];
            const mailProviders = [
                'gmail.com',
                'o2.pl',
                'onet.pl',
                'interia.pl',
                'wp.pl',
                'yahoo.com',
                'icloud.com',
                'outlook.com',
                'mail.com'
            ]
            if(!mailProviders.includes(mailbox)){
                mailBtn = null;
            }
        }
        if(registerSuccess) {
            if(registerType === 1) {
                return (
                    <>
                        <div className={"registerSuccessImg"}>
                            <img src={SuccessImg}/>
                        </div>
                        <div className={"registerSuccess"}>
                            <div className={"registerSuccessHeader"}>
                                {i18next.t("Potwierdź swoje konto")}
                            </div>
                            <div className={"registerSuccessContent"}>
                                {i18next.t(
                                    "Przejdź do swojej skrzynki mailowej i potwierdź rejestrację."
                                )}
                            </div>
                            <div className={"registerSuccessButton"}>
                                {mailBtn}
                            </div>
                        </div>
                    </>
                );
            }else{
                return (
                    <>
                        <div className={"registerSuccessImg"}>
                            <img src={SuccessImg}/>
                        </div>
                        <div className={"registerSuccess"}>
                            <div className={"registerSuccessHeader"}>
                                {i18next.t("Dane przekazane do weryfikacji")}
                            </div>
                            <div className={"registerSuccessContent"}>
                                {i18next.t(
                                    "Dziękujemy za rejestrację, nasi pracownicy skontaktują się w celu weryfikacji danych oraz założenia konta firmowego."
                                )}
                            </div>
                            <div className={"registerSuccessButton"}>
                                {mailBtn}
                            </div>
                        </div>
                    </>
                );
            }
        }
    }

    return (
        <div className={"registerPage"}>
            <Helmet>
                <title>{i18next.t("REGISTER_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("REGISTER_PAGE_DESC")}
                />
                <link rel="canonical" href={currentUrl} />
                <link
                    rel="alternate"
                    hrefLang={i18next.language}
                    href={currentUrl}
                />
            </Helmet>
            <Header />
            {wWidth > 480 ? (
                !registerSuccess ? (
                    <UnderHeader
                        title={i18next.t("Utwórz darmowe konto")}
                        description={i18next.t(
                            "Aby rozpocząć proces tworzenia konta uzupełnij potrzebne dane, a następnie potwierdź swój adres e-mail, korzystając z linku aktywacyjnego wysłanego na Twoją skrzynkę pocztową. Rejestracja jest całkowicie darmowa i niesie ze sobą szereg korzyści - w tym możliwość wymiany kryptowalut po korzystnym kursie."
                        )}
                    />
                ) : null
            ) : (
                ""
            )}
           
             <div className={"container"}>
            
                  <div className="row rowBox flexno">
                  
                    <div className="col col-xl-6 order order-xl-1 imgdiv ">
                        
                     <div className="imgBlock centerbox"> <img src={createacct} className="imgOffset" alt="" /></div>
                    </div>
                    <div className="col col-xl-6 order order-xl-2">
                    <div className="h900"> 
                    <div className={"narrowContainer registerContainer"}>
                    {renderRegisterSuccess()}
                    {!registerSuccess ?
                    <RegisterTypeSelector
                        active={registerType}
                        changeType={setRegisterType}
                    /> : null}
                    {registerType === 1 ? (
                        <div className="individualRegistration registerType">
                            <RegisterForm
                                setRegisterSuccess={() =>
                                    setRegisterSuccess(true)
                                }
                                updateUserEmail={updateUserMail}
                                {...props}
                            />
                        </div>
                    ) : (
                        <div className="businessRegistration registerType">
                            <BusinessRegisterForm
                                setRegisterSuccess={() =>
                                    setRegisterSuccess(true)
                                }
                                updateUserEmail={updateUserMail}
                                {...props}
                            />
                        </div>
                    )}
                </div>
                </div>
            </div>
                    </div>
                    </div>
                 
               
                {/* <div className={"narrowContainer registerContainer"}>
                    {renderRegisterSuccess()}
                    {!registerSuccess ?
                    <RegisterTypeSelector
                        active={registerType}
                        changeType={setRegisterType}
                    /> : null}
                    {registerType === 1 ? (
                        <div className="individualRegistration registerType">
                            <RegisterForm
                                setRegisterSuccess={() =>
                                    setRegisterSuccess(true)
                                }
                                updateUserEmail={updateUserMail}
                                {...props}
                            />
                        </div>
                    ) : (
                        <div className="businessRegistration registerType">
                            <BusinessRegisterForm
                                setRegisterSuccess={() =>
                                    setRegisterSuccess(true)
                                }
                                updateUserEmail={updateUserMail}
                                {...props}
                            />
                        </div>
                    )}
                </div>
            </div> */}
            <Footer />
        </div>
    );
};

export default RegisterPage;
