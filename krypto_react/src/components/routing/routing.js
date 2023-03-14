import React from "react";
import { Route, Switch } from "react-router-dom";
import getRoute from "./routingService";
import LoginPage from "../pages/loginPage/loginPage";
import MainPage from "../pages/mainPage/mainPage";
import NotfoundPage from "../pages/notfoundPage";
import { Redirect } from 'react-router';
import AllCurrenciesPage from "../pages/allCurrenciesPage/allCurrenciesPage";
// import UserDashboard from "../pages/userDashboard/userDashboard";
import DashboardHistory from "../pages/userDashboard/dashboardHistory/dashboardHistory";
import DashboardSingleHistory from "../pages/userDashboard/dashboardSingleHistory/dashboardSingleHistory";
// import DashboardWorkers from "../pages/userDashboard/dashboardWorkers/dashboardWorkers";
import DashboardSingleWorker from "../pages/userDashboard/dashboardSingleWorker/dashboardSingleWorker";
import DashboardReferrals from "../pages/userDashboard/dashboardReferrals/dashboardReferrals";
import DashboardSettings from "../pages/userDashboard/dashboardSettings/dashboardSettings";
import DashboardVerification from "../pages/userDashboard/dashboardVerification/dashboardVerification";
import DashboardWallets from "../pages/userDashboard/dashboardWallets/dashboardWallets";
import DashboardSingleWallet from "../pages/userDashboard/dashboardSingleWallet/dashboardSingleWallet";
import DashboardWorkspace from "../pages/userDashboard/dashboardWorkspace/dashboardWorkspace";
import DashboardSinglePos from "../pages/userDashboard/dashboardSinglePos/dashboardSinglePos";
import DashboardWelcome from "../pages/userDashboard/dashboardWelcome/dashboardWelcome";
import DashboardPaymentcards from "../pages/userDashboard/dashboardPaymentcards/dashboardPaymentcards";
import RegisterPage from "../pages/registerPage/registerPage";
import BuyTransactionPage from "../pages/transactionPages/buyTransactionPage/buyTransactionPage";
import SellTransactionPage from "../pages/transactionPages/sellTransactionPage/sellTransactionPage";
import ExchangeTransactionPage from "../pages/transactionPages/exchangeTransactionPage/exchangeTransactionPage";
import AuthChecker from "../user/authChecker/authChecker";
import RedeemPage from "../pages/redeemPage/redeemPage";
import { RedeemContextProvider } from "../pages/redeemPage/redeemContext";
import RegisterConfirmPage from "../pages/registerConfirmPage/registerConfirmPage";
import CryptoCurrencyDirectory from "../pages/cryptocurrencydirectory/cryptocurrencydirectory";
import PasswordResetPage from "../pages/passwordResetPage/passwordResetPage";
import PasswordResetConfirmPage from "../pages/passwordResetConfirmPage/passwordResetConfirmPage";
import HowToBuyCryptocurrenciesPage from "../pages/howToBuyCryptocurrencies/howToBuyCryptocurrencies";
import HowToBuyBitcoinPage from "../pages/howToBuyCryptocurrencies/bitcoin/bitcoin";
import HowToBuyEthereumPage from "../pages/howToBuyCryptocurrencies/ethereum/ethereum";
import TermsPage from "../pages/termsPage/termsPage";
import PrivacyPolicyPage from "../pages/privacyPolicyPage/privacyPolicyPage";
import FeesPage from "../pages/feesPage/feesPage";
import ContactPage from "../pages/contactPage/contactPage";
import AboutUsPage from "../pages/aboutUs/aboutUs";
import HelpPage from "../pages/helpPage/helpPage";
import ForPartners from "../pages/forPartners/forPartners";
import HowToCreateAccountPage from "../pages/howToCreateAccountPage/howToCreateAccountPage";
import StatusTransactionPage from "../pages/transactionPages/statusTransactionPage/statusTransactionPage";
import { TransactionContextProvider } from "../transaction/transactionContext";

console.log(getRoute("main", true));

const Routing = (props) => {
    return (
        <Switch>
            <Route
                exact
                path={getRoute("login", true)}
                render={(props) => <LoginPage {...props} />}
            />
            <Route
                exact
                path={getRoute("passwordreset", true)}
                render={(props) => <PasswordResetPage {...props} />}
            />
            <Route
                exact
                path={getRoute("passwordreset", true) + "/:email/:hash"}
                render={(props) => <PasswordResetConfirmPage {...props} />}
            />

            <Route
                exact
                path={getRoute("main", true)}
                render={(props) => (
                    <TransactionContextProvider>
                        {/* <ForPartners {...props} /> */}
                        <MainPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("transactionBuy", true)}
                render={(props) => (
                    <TransactionContextProvider>
                        <BuyTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("partnerBuy", true)}
                render={(props) => (
                    <TransactionContextProvider>
                        <BuyTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("transactionBuy", true) + "/:baseCurrency"}
                render={(props) => (
                    <TransactionContextProvider>
                        <BuyTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={
                    getRoute("transactionBuy", true) +
                    "/:baseCurrency/:quotedCurrency"
                }
                render={(props) => (
                    <TransactionContextProvider>
                        <BuyTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("transactionSell", true)}
                render={(props) => (
                    <TransactionContextProvider>
                        <SellTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("transactionSell", true) + "/:baseCurrency"}
                render={(props) => (
                    <TransactionContextProvider>
                        <SellTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={
                    getRoute("transactionSell", true) +
                    "/:baseCurrency/:quotedCurrency"
                }
                render={(props) => (
                    <TransactionContextProvider>
                        <SellTransactionPage {...props} />
                    </TransactionContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("transactionExchange", true)}
                render={(props) => <ExchangeTransactionPage {...props} />}
            />

            <Route
                exact
                path={getRoute("register", true)}
                render={(props) => <RegisterPage {...props} />}
            />
            <Route
                exact
                path={getRoute("referral", true) + "/:refCode"}
                render={(props) => <RegisterPage {...props} />}
            />
            <Route
                exact
                path={
                    getRoute("registerConfirm", true) +
                    "/:email/:confirmationHash"
                }
                render={(props) => <RegisterConfirmPage {...props} />}
            />
            <Route
                exact
                path={getRoute("howToRegister", true)}
                render={(props) => <HowToCreateAccountPage {...props} />}
            />
            <Route
                exact
                path={getRoute("howToBuy", true)}
                render={(props) => <HowToBuyCryptocurrenciesPage {...props} />}
            />
            <Route
                exact
                path={getRoute("howToBuyBitcoin", true)}
                render={(props) => <HowToBuyBitcoinPage {...props} />}
            />
            <Route
                exact
                path={getRoute("howToBuyEthereum", true)}
                render={(props) => <HowToBuyEthereumPage {...props} />}
            />
            <Route
                exact
                path={getRoute("allCurrencies", true)}
                render={(props) => <AllCurrenciesPage {...props} />}
            />
            <Route
                exact
                path={getRoute("redeem", true) + "/:signature/:redeemHash"}
                render={(props) => (
                    <RedeemContextProvider>
                        <RedeemPage {...props} />
                    </RedeemContextProvider>
                )}
            />
            <Route
                exact
                path={getRoute("terms", true)}
                render={(props) => <TermsPage {...props} />}
            />
            <Route
                exact
                path={getRoute("privacyPolicy", true)}
                render={(props) => <PrivacyPolicyPage {...props} />}
            />
            <Route
                exact
                path={getRoute("fees", true)}
                render={(props) => <FeesPage {...props} />}
            />
            <Route
                exact
                path={getRoute("contact", true)}
                render={(props) => <ContactPage {...props} />}
            />
            <Route
                exact
                path={getRoute("help", true)}
                render={(props) => <HelpPage {...props} />}
            />
            <Route
                exact
                path={getRoute("aboutUs", true)}
                render={(props) => <AboutUsPage {...props} />}
            />
            <Route
                exact
                path={getRoute("forPartners", true)}
                render={(props) => <ForPartners {...props} />}
            />
            <Route
                exact
                path={getRoute("cryptocurrencydirectory", true)}
                render={(props) => <CryptoCurrencyDirectory {...props} />}
            />
            <AuthChecker>
                <Route
                    exact
                    path={
                        getRoute("transactionStatus", true) + "/:transactionId"
                    }
                    render={(props) => <StatusTransactionPage {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardWelcome", true)}
                    render={(props) => <DashboardWelcome {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardHistory", true)}
                    render={(props) => <DashboardHistory {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardHistory", true) + "/:id"}
                    render={(props) => <DashboardSingleHistory {...props} />}
                />

                {/* <Route
                    exact
                    path={getRoute("userDashboardWorkers", true)}
                    render={(props) => <DashboardWorkers {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardWorkers", true) + "/:id"}
                    render={(props) => <DashboardSingleWorker {...props} />}
                /> */}

                <Route
                    exact
                    path={getRoute("userDashboardWorkspace", true)}
                    render={(props) => <DashboardWorkspace {...props} />}
                />
                <Route
                    exact
                    path={
                        getRoute("userDashboardWorkspace", true) +
                        "/employee/:id"
                    }
                    render={(props) => <DashboardSingleWorker {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardWorkspace", true) + "/pos/:id"}
                    render={(props) => <DashboardSinglePos {...props} />}
                />

                <Route
                    exact
                    path={getRoute("userDashboardReferral", true)}
                    render={(props) => <DashboardReferrals {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardSettings", true)}
                    render={(props) => <DashboardSettings {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardVerification", true)}
                    render={(props) => <DashboardVerification {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardWallets", true)}
                    render={(props) => <DashboardWallets {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardWallets", true) + "/:walet"}
                    render={(props) => <DashboardSingleWallet {...props} />}
                />
                <Route
                    exact
                    path={getRoute("userDashboardPaymentcards", true)}
                    render={(props) => <DashboardPaymentcards {...props} />}
                />
            </AuthChecker>

            <Route render={(props) => <NotfoundPage {...props} />} />
            {/* <Redirect exact from={'/'} to={getRoute('forPartners', true)} /> */}
            <Redirect to={getRoute('forPartners')} />
        </Switch>
    );
};

export default Routing;
