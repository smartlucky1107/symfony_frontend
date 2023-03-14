import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing";
import { UserContextProvider } from "./user/userContext";
import { TransactionContextProvider } from "./transaction/transactionContext";
import { AppContextProvider } from "./appContext";
import DemoVersionModal from "./modals/demoVersion/demoVersion";
import { ModalControllerContextProvider } from "./modals/modalControllerContext";
import ScrollToTop from "./scrollToTop/scrollToTop";
import NotificationsWebsocket from "./notifications/notificationsWebsocket/notificationsWebsocket";

import CookiesModal from "./modals/cookiesModal/cookiesModal";

var DEBUG = true;
if (process.env.NODE_ENV !== "development") {
    DEBUG = false;
}
if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = [
        "log",
        "debug",
        "warn",
        "info",
        "error",
        "dir",
        "dirxml",
        "trace",
        "profile",
    ];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {};
    }
}

function App() {
    return (
        <Router>
            <ScrollToTop>
                <CookiesModal />
                <div className="App">
                    <AppContextProvider>
                        <UserContextProvider>
                            {/*<TransactionContextProvider>*/}
                            <ModalControllerContextProvider>
                                <Routing />
                            </ModalControllerContextProvider>
                            {/*</TransactionContextProvider>*/}
                        </UserContextProvider>
                    </AppContextProvider>
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
