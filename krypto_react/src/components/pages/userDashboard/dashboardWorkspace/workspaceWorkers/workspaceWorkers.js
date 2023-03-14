import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import i18next from "i18next";

import WorkerTile from "../../workerTile/WorkerTile";

import { UserContext } from "../../../../user/userContext";

import PostThis from "../../../../../scripts/post";

import Search from "./../../../../ui/search/search";
import Infobox from "./../../../../ui/infobox/infobox";
import Button from "./../../../../ui/button/button";
import Input from "./../../../../ui/input/input";

import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "./../../../../ui/popup/popup";

import "./workspaceWorkers.scss";

import CreateEmployee from "../createEmployee/createEmployee";
import BoxPlaceholder from "./../../../../ui/boxPlaceholder/boxPlaceholder";

const WorkspaceWorkers = (props) => {
    const user = useContext(UserContext);
    const [workersList, setWorkersList] = useState();
    const [workersListError, setWorkersListError] = useState(false);
    // const [workersListErrorType, setWorkersListErrorType] = useState();
    const [workersListErrorMsg, setWorkersListErrorMsg] = useState("");

    const [boxPlaceholder, setBoxPlaceholder] = useState();

    const listRef = useRef(null);
    const popupRef = useRef(null);

    const handleGetWorkersList = async (cancelToken) => {
        setWorkersListError(false);
        setWorkersListErrorMsg("");
        setBoxPlaceholder(true);
        const response = await PostThis(
            "/api/users/me/pos/workspace/employees",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleBuildList(response.data.employees);
            } else if (response.status === 400) {
                props.setIsPosAllowed(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setWorkersListError(true);
                setWorkersListErrorMsg(
                    "Wsytąpił problem z pobieraniem danych, proszę spróbować później."
                );
            }
        }
    };

    const handleBuildList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <WorkerTile
                        fullName={`${item.firstName} ${item.lastName}`}
                        name={item.firstName}
                        lastName={item.lastName}
                        id={item.id}
                        key={index}
                    />
                );
            });
            if (dom) {
                setWorkersList(dom);
            }
        } else {
            setWorkersList(null);

            setWorkersListError(true);
            setWorkersListErrorMsg("Brak wyników");
        }

        setBoxPlaceholder(false);
    };

    // useEffect(() => {
    //     console.log("empty useEffect");
    //     const source = axios.CancelToken.source();
    //     handleGetWorkersList(source.token);
    //     return () => {
    //         source.cancel();
    //     };
    // }, []);

    useEffect(() => {
        if (props.activeTab === "pos") {
            const source = axios.CancelToken.source();
            handleGetWorkersList(source.token);
            return () => {
                source.cancel();
            };
        }
    }, [props.activeTab]);

    return (
        <>

        <div>
           <form className="preloaderWrapper">
                {/* <Preloader show={preloader} /> */}
                <div className="row">
                    <div className="col coll-xl-6 p10">
                     <Input type={"text"}
                        label={i18next.t("Nazwa firmy")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Nazwa workspace")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Nip")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Kod pocztowy")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Kraj prowadzenia dzialanosci")}
                        required
                    ></Input>

                    </div>
                    
                    <div className="col coll-xl-6 p10">
                    <Input type={"text"}
                        label={i18next.t("Wybierz walute FIAT do ktorej beda przeliczane kursy")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Glowny Pin do workspace")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Ulica")}
                        required
                    ></Input>

                    <Input type={"text"}
                        label={i18next.t("Miasto")}
                        required
                    ></Input>
                    <div className="addbtn">
                      <Button type="submit" rightIcon={"person_add"}>
                        {i18next.t("Create an account")}
                      </Button>
                     </div>
                    

                    </div>
                </div>
                    
                 
          </form>
        </div>

            {/* <div className="workspaceWorkers">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Pracownicy")}
                </h1>
                <div className="row searchRow">
                    <Search
                        filterIn={listRef}
                        id={"searchWallet"}
                        name={"searchWallet"}
                        placeholder={i18next.t("Wyszukaj...")}
                    />
                    <div className="addNew">
                        <Button
                            onClick={() => handleShowPopup(popupRef)}
                            rightIcon={"person_add"}
                        >
                            {i18next.t("Dodaj pracownika")}
                        </Button>
                    </div>
                </div>
                <div ref={listRef} className="row rowBox workersList">
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />
                    <BoxPlaceholder
                        type="box"
                        count={1}
                        show={boxPlaceholder}
                    />

                    {workersList}
                    {workersListError ? (
                        // <Infobox icon={workersListErrorType ?? "info"}>
                        <Infobox icon={"info"}>
                            {i18next.t(workersListErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}
                </div>
            </div> */}

            <Popup
                handleClosePopup={() => handleClosePopup(popupRef)}
                ref={popupRef}
            >
                <CreateEmployee handleClosePopup={handleClosePopup} />
            </Popup>
        </>
    );
};

export default WorkspaceWorkers;
