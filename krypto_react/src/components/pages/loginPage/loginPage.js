import React, {useContext} from "react";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import IsNotLoggedIn from "./isNotLoggedIn/isNotLoggedIn";
import {UserContext} from "../../user/userContext";
import {Redirect} from "react-router-dom";
import getRoute from "../../routing/routingService";
import "./loginPage.scss";
import i18next from "i18next";
import {Helmet} from "react-helmet";
import createacct from "../../../img/loginpage.png";

const LoginPage = (props) => {
    const user = useContext(UserContext);

    if(user.data.isLoggedIn === true){
        return <Redirect to={getRoute('userDashboardWelcome')} />
    }

    const currentUrl = window.location.href.includes("?")
        ? window.location.href.split("?")[0]
        : window.location.href;

    return (
        <div className={'loginPage'}>
            <Helmet>
                <title>{i18next.t("LOGIN_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("LOGIN_PAGE_DESC")}
                />
                <link
                    rel="canonical"
                    href={currentUrl}
                />
                <link
                    rel="alternate"
                    hrefLang={i18next.language}
                    href={currentUrl}
                />
            </Helmet>
            <Header/>

        <div className={"container"}>
            
            <div className="row rowBox flexno">
            <div className="col col-xl-6 order order-xl-1 imgdiv">
                  <div className="imgBlock centerbox"> 
                    <img src={createacct} className="imgOffset" alt="" />
                  </div>
            </div>
             <div className="col col-xl-6 order order-xl-2">
               <div className={'narrowContainer'}>
                    <IsNotLoggedIn/>
                </div>
            </div>

        </div>
        </div>                  







            {/* <div className={'container minHeightContainer'}>
                <div className={'narrowContainer'}>
                    <IsNotLoggedIn/>
                </div>
            </div> */}
            <Footer/>
        </div>
        
    )
}

export default LoginPage;
