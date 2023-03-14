import React, { useRef, useContext, useEffect, useState } from "react";
import axios from "axios";
import i18next from "i18next";

import PostThis from "../../../../scripts/post";
import UserDashboard from "./../userDashboard";
import WalletsList from "./../walletsList/walletsList";
import SearchBar from "./../searchBar/searchBar";

import { UserContext } from "../../../user/userContext";
import InputCopyFrom from "../../../ui/inputCopyFrom/inputCopyFrom";
import "./dashboardWallets.scss";
import bit from "../../../../img/bitcoin.png";
import Button from "../../../ui/button/button";
import swap from "../../../../img/swapmachine.png";
import SuggestCurrencyForm from "../suggestCurrencyForm/suggestCurrencyForm";
import CustomList from "../../../ui/customList/customList";
import { CustomListItem } from "../../../ui/customList/customList";

const DashboardWallets = () => {
    const user = useContext(UserContext);
    const [filter, setFilter] = useState({
        value: 0,
        name: i18next.t("Wszystkie waluty"),
    });
    const [walletsList, setWalletsList] = useState();
    const [walletsListError, setWalletsListError] = useState();
    const [walletsListErrorMsg, setWalletsListErrorMsg] = useState(
        i18next.t("Brak wyników")
    );
    const [boxPlaceholder, setBoxPlaceholder] = useState(true);

    const listRef = useRef();
    const getWalletsList = async (cancelToken) => {
        setBoxPlaceholder(true);
        const response = await PostThis(
            "/api/users/me/wallets?pageSize=0",
            "GET",
            "",
            {
                Authorization: `Bearer ${user.data.user?.authToken}`,
            },
            "",
            cancelToken
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                return setWalletsList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setWalletsListError(true);
                setWalletsListErrorMsg(i18next.t(response.data.message));
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        getWalletsList(source.token);
        return () => {
            source.cancel();
        };
    }, []);

   return (
        <UserDashboard>
            <section className="dashboardWallets ">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Twoje portfele")}
                </h1>

                <div className="bg-w">
                    <SearchBar
                        listRef={listRef}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    <div className="preloaderWrapper">
                        {/* <Preloader show={preloader} /> */}
                        <WalletsList
                            walletsList={walletsList}
                            listRef={listRef}
                            walletsListError={walletsListError}
                            walletsListErrorMsg={walletsListErrorMsg}
                            // showAddFunds={true}
                            showWidthdrowFunds={true}
                            boxPlaceholder={boxPlaceholder}
                            setBoxPlaceholder={setBoxPlaceholder}
                            showBuy={true}
                        />
                    </div>
                </div>
                {/* <div>
                    <p>
                        {i18next.t(
                            "Nie znalazłeś interesującej Cię waluty? Zaproponuj nam wybraną przez siebie walutę, a my postaramy się dodać ją do naszej oferty!"
                        )}
                    </p>
                    <Button to="" rightIcon={"queue"}>
                        {i18next.t("Zaproponuj walutę")}
                    </Button>
                </div> */}
            </section>
        </UserDashboard>
    );
};
export default DashboardWallets;
