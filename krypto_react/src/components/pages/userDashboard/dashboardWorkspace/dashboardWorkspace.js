import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
} from "react";
import axios from "axios";
import i18next from "i18next";

import UserDashboard from "./../userDashboard";
import PostThis from "../../../../scripts/post";
import { ChangeTabs, ShowTabs } from "../../../../scripts/changeTabs";

import { UserContext } from "../../../user/userContext";

import "./dashboardWorkspace.scss";

import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";

import WorkspaceData from "./workspaceData/workspaceData";
import WorkspaceForm from "./workspaceForm/workspaceForm";
import WorkspaceHistory from "./workspaceHistory/workspaceHistory";
import WorkspacePos from "./workspacePos/workspacePos";

import WorkspaceDeniedNotification from "./workspaceDeniedNotification/workspaceDeniedNotification";

const DashboardWorkspace = (props) => {
    const user = useContext(UserContext);

    const [workspace, setWorkspace] = useState(null);
    const [registerForm, setRegisterForm] = useState(false);
    const [boxPlaceholder, setBoxPlaceholder] = useState(false);

    const [isPosAllowed, setIsPosAllowed] = useState(null);

    const refTabs = useRef(null);
    const refTabsContent = useRef(null);
    const [activeTab, setActiveTab] = useState("pos");

    const handleCheckPosData = async (cancelToken) => {
        setBoxPlaceholder(true);
        const response = await PostThis(
            "/api/users/me/pos/workspace",
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
                setWorkspace(response.data.workspace);
                setIsPosAllowed(true);
            } else if (response.status === 400) {
                setIsPosAllowed(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setRegisterForm(true);
            }

            setBoxPlaceholder(false);
        }
    };

    const handeExtraRefreshTab = (e, refTabs, refTabsContent) => {
        setActiveTab(e);
        ChangeTabs(e, refTabs, refTabsContent);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        handleCheckPosData(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    //ustawienie aktywności taba z url
    useLayoutEffect(() => {
        let tabFromLink = document.location.search.split("?");
        if (tabFromLink[1]) {
            tabFromLink = tabFromLink[1].split("=");

            if (workspace) {
                if (isPosAllowed && tabFromLink[0]) {
                    handeExtraRefreshTab(
                        tabFromLink[0],
                        refTabs,
                        refTabsContent
                    );
                    // ChangeTabs(tabFromLink[0], refTabs, refTabsContent);
                }
            }
        }
    }, [workspace, isPosAllowed]);

    useEffect(() => {
        if (user.data.user.type !== 3) {
            window.location.href = `${window.location.origin}/dashboard`;
        }
    }, []);

    return (
        <>
            {user.data.user.type === 3 ? (
                <UserDashboard>
                    <section className="dashboardWorkspace">
                        {isPosAllowed === false ? (
                            <WorkspaceDeniedNotification />
                        ) : (
                            <>
                                {/* <h1 className="stdDashboardHeader">
                                    {i18next.t("Workspace")} {workspace?.name}
                                </h1> */}
                                <h1 className="stdDashboardHeader">
                                    {i18next.t("Workspace")}
                                </h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                     when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>


                                <BoxPlaceholder
                                    type={"bptabs"}
                                    count={1}
                                    show={boxPlaceholder}
                                />
                                {registerForm ? <WorkspaceForm /> : ""}

                                {workspace ? (
                                    <div className="row">
                                        <div className="tabs">
                                            <button
                                                className="show-tabs"
                                                onClick={(e) =>
                                                    ShowTabs(refTabs)
                                                }
                                            >
                                                <div className="innerTab">
                                                    <span className="material-icons">
                                                        list
                                                    </span>
                                                </div>
                                            </button>
                                            <div
                                                className="tabsHeader"
                                                ref={refTabs}
                                            >
                                                <div className="tabsHeaderHelper">
                                                    <button
                                                        className="tab active"
                                                        data-tab="pos"
                                                        onClick={(e) =>
                                                            handeExtraRefreshTab(
                                                                e.currentTarget
                                                                    .dataset
                                                                    .tab,
                                                                refTabs,
                                                                refTabsContent
                                                            )
                                                        }
                                                    >
                                                        <div className="innerTab">
                                                            <div className="text">
                                                                {i18next.t(
                                                                    "POS"
                                                                )}
                                                            </div>
                                                            <div className="icon">
                                                                <span className="material-icons">
                                                                    store
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className="tab"
                                                        data-tab="company"
                                                        onClick={(e) =>
                                                            handeExtraRefreshTab(
                                                                e.currentTarget
                                                                    .dataset
                                                                    .tab,
                                                                refTabs,
                                                                refTabsContent
                                                            )
                                                        }
                                                    >
                                                        <div className="innerTab">
                                                            <div className="text">
                                                                {i18next.t(
                                                                    "Dane firmy"
                                                                )}
                                                            </div>
                                                            <div className="icon">
                                                                <span className="material-icons">
                                                                    verified_user
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className="tab"
                                                        data-tab="transactions"
                                                        onClick={(e) =>
                                                            handeExtraRefreshTab(
                                                                e.currentTarget
                                                                    .dataset
                                                                    .tab,
                                                                refTabs,
                                                                refTabsContent
                                                            )
                                                        }
                                                    >
                                                        <div className="innerTab">
                                                            <div className="text">
                                                                {i18next.t(
                                                                    "Transakcje POS"
                                                                )}
                                                            </div>
                                                            <div className="icon">
                                                                <span className="material-icons">
                                                                    shopping_basket
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="tabsContent"
                                                ref={refTabsContent}
                                            >
                                                <div
                                                    className="tabContent active"
                                                    data-tab="pos"
                                                >
                                                    <WorkspacePos
                                                        workspace={workspace}
                                                        activeTab={activeTab}
                                                        setIsPosAllowed={
                                                            setIsPosAllowed
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="tabContent"
                                                    data-tab="company"
                                                >
                                                    <WorkspaceData
                                                        workspace={workspace}
                                                        activeTab={activeTab}
                                                        setIsPosAllowed={
                                                            setIsPosAllowed
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="tabContent"
                                                    data-tab="transactions"
                                                >
                                                    <WorkspaceHistory
                                                        activeTab={activeTab}
                                                        setIsPosAllowed={
                                                            setIsPosAllowed
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </>
                        )}
                    </section>
                </UserDashboard>
            ) : (
                ""
            )}
        </>
    );
};
export default DashboardWorkspace;
