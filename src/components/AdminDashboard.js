import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "../assets/demo/flags/flags.css";
import "../assets/demo/Demos.scss";
import "../assets/layout/layout.scss";
import "../App.scss";
import { Tooltip } from "primereact/tooltip";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import Dashboard from "./Dashboard";
// -----------------------------------List Page--------------------------------------------------
import Users from "./menu/User";
import OurServices from "./menu/OurServices";
import OurProduct from "./menu/OurProduct";
// -----------------------------------Single data page-------------------------------------------
import SinglrUsers from "../pages/SingleViews/SingleUser"
import SingleService from "../pages/SingleViews/SingleService";
import SingleProduct from "../pages/SingleViews/SingleProduct";
// -----------------------------------Add Edit page----------------------------------------------
import AddUser from "../pages/EditComponent/AddUser";
import AddEditOurServices from "../pages/EditComponent/AddEditOurService";
import AddEditOurProducts from "../pages/EditComponent/AddEditOurProducts";
// import AddEditOurServices from "../pages/EditComponent/AddEditOurService";
// import SingleMedia from "../pages/SingleViews/SingleMedia";
// import SingleBanner from "../pages/SingleViews/SingleBanner";
// import NewsSingle from "../pages/SingleViews/NewsSingle";
// import SingleStatusCategory from "../pages/SingleViews/SingleStatusCategory";
// import SingleStatus from "../pages/SingleViews/SingleStatus";
// import SingleSuggestionFeedback from "../pages/SingleViews/SingleSuggestionFeedback";
// import Category from "./menu/Category";
// import LeaderCornerCategory from "./menu/LeaderCornerCategory";
// import LeaderCorner from "./menu/LeaderCorner";
// import Banner from "./menu/Banners";
// import AddEditCategory from "../pages/EditComponent/AddEditCategory";
// import AddEditLeaderCornerCategory from "../pages/EditComponent/AddEditLeaderCornerCategory";
// import AddEditBanner from '../pages/EditComponent/AddEditBanner'
// import AddPlanCategory from "../pages/EditComponent/AddPlanEditCategory";
// import Articals from "./menu/Articals";
// import AddEditArtical from "../pages/EditComponent/AddEditArtical";
// import News from "./menu/News";
// import AddEditNews from "../pages/EditComponent/AddEditNews";
// import Article from "../pages/SingleViews/Article";
// import StatusCategory from "./menu/StatusCategory";
// import Status from "./menu/Status";
// import AddEditStatusCategory from "../pages/EditComponent/AddEditStatusCategory";
// import AddEditStatus from "../pages/EditComponent/AddEditStatus";
// import MediaFile from "./menu/MediaFile";
// import AddEditMediaFile from "../pages/EditComponent/AddEditMediaFile";
// import ProfileFrame from "./menu/ProfileFrame";
// import AddEditProfileFrame from "../pages/EditComponent/AddEditProfileFrame";
// import SingleProfileFrame from "../pages/SingleViews/SingleProfileFrame";
// import TtpmPdf from "./menu/TtpmPdf";
// import AddEditTtpmPdf from "../pages/EditComponent/AddEditTtpmPdf";
// import CatViewAll from "./menu/CatViewAll";
// import AddEditLeaderCorner from "../pages/EditComponent/AddEditLeaderCorner";
// import MarketingSms from "./menu/MarketingSms.js";
// import AddEditMarketingSMS from "../pages/EditComponent/AddEditMarketingSMS";
// import MixPlanCategory from "./menu/MixPlanCategory";
// import AddEditMixPlanCategory from "../pages/EditComponent/AddEditMixPlanCategory";
// import RecentUpoad from "./menu/RecentUpoad"
// import AdminBanner from "./menu/AdminBanner";
// import addEditAdminBaner from "../pages/EditComponent/AddEditAdminBanner";
// import SuggestionFeedback from "./menu/SuggestionFeedback";
// import MixPlan from "./menu/MixPlan";
// import AddEditMixPlan from "../pages/EditComponent/AddEditmixPlan";
// import YoutubeLinks from "./menu/YoutubeLinks";
// import AddEditYoutubeLink from "../pages/EditComponent/AddEditYoutubeLink";

const AdminDashboard = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }
                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Dashboard",
            items: [
                {
                    label: "DASHBOARD",
                    icon: "pi pi-fw pi-home",
                    to: "/admindashboard",
                },
            ],
        },
        {
            label: "Menu Hierarchy",
            icon: "pi pi-fw pi-search",
            items: [
                { label: "USERS INFO", icon: "pi pi-fw pi-users", to: "/admindashboard/users-list" },
                { label: "OUR SERVICES", icon: "pi pi-fw pi-id-card", to: "/admindashboard/our-services-list" },
                { label: "OUR PRODUCTS", icon: "pi pi-fw pi-inbox", to: "/admindashboard/our-products-list" },
                // { label: "MEDIA", icon: "pi pi-fw pi-step-forward-alt", to: "/admindashboard/media-list" },
                // { label: "TTPM PDF", icon: "pi pi-fw pi-file-pdf", to: "/admindashboard/ttpmp-df-list" },
                // {
                //     label: "BANNERS",
                //     icon: "pi pi-fw pi-images",
                //     items: [
                //         {
                //             label: "BANNERS", icon: "pi pi-fw pi-list", to: "/admindashboard/banners-list",
                //         },
                //         {
                //             label: "RECENT BANNERS", icon: "pi pi-fw pi-images", to: "/admindashboard/recentbanner-list"
                //         },
                //     ]
                // },
                // {
                //     label: "LEADERS",
                //     icon: "pi pi-fw pi-sitemap",
                //     items: [
                //         {
                //             label: "LEADERS CATEGORY", icon: "pi pi-fw pi-list", to: "/admindashboard/leader-category-list",
                //         },
                //         {
                //             label: "LEADERS CORNER", icon: "pi pi-fw pi-qrcode", to: "/admindashboard/leader-corner-list"
                //         },
                //     ]
                // },
                // { label: "MARKETING SMS", icon: "pi pi-fw pi-envelope", to: "/admindashboard/marketing-sms-list" },
                // { label: "SUGGESTION FEEDBACK", icon: "pi pi-fw pi-check-square", to: "/admindashboard/suggestion-feedback" },
                // // { label: "MIX PLAN", icon: "pi pi-fw pi-clone", to: "/admindashboard/mix-plan" },
                // {
                //     label: "ARTICALS/NEWS",
                //     icon: "pi pi-fw pi-table",
                //     items: [
                //         {
                //             label: "ARTICLES", icon: "pi pi-fw pi-list", to: "/admindashboard/articles-list",
                //             label: "ARTICLES",
                //             icon: "pi pi-fw pi-list",
                //             to: "/admindashboard/articles-list",
                //         },
                //         {
                //             label: "NEWS",
                //             icon: "pi pi-fw pi-flag-fill",
                //             to: "/admindashboard/news-list",
                //         },

                //     ],
                // },
                // { label: "STATUS", icon: "pi pi-fw pi-list", to: "/admindashboard/status-list" },

                // { label: "ADMIN BANNERS", icon: "pi pi-fw pi-images", to: "/admindashboard/adminBanner-list" },

                // { label: "Youtube Links", icon: "pi pi-fw pi-youtube", to: "/admindashboard/youtube-links" },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
            <div className="layout-sidebar pointer-events-auto" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/admindashboard" exact render={() => <Dashboard location={location} />} />
                    {/* -----------------------------------List Page-------------------------------------------------- */}
                    <Route path="/admindashboard/users-list" component={Users} />
                    <Route path="/admindashboard/our-services-list" component={OurServices} />
                    <Route path="/admindashboard/our-products-list" component={OurProduct} />
                    {/* -----------------------------------Single data page------------------------------------------- */}
                    <Route path="/singleusers/:id" component={SinglrUsers} />
                    <Route path="/serviceSingle/:id/" component={SingleService} />
                    <Route path="/productSingle/:id/" component={SingleProduct} />
                    {/* -----------------------------------Add Edit page---------------------------------------------- */}
                    <Route path="/addnew-ourService" component={AddEditOurServices} />
                    <Route path="/addnew-user" component={AddUser} />
                    <Route path="/update-our-servive/:id" component={AddEditOurServices} />
                    <Route path="/update-user/:id" component={AddUser} />
                    <Route path="/addnew-our-products" component={AddEditOurProducts} />
                    {/* <Route path="/singleBanner/:id" component={SingleBanner} /> */}
                    {/* <Route path="/news/:id" component={NewsSingle} /> */}
                    {/* <Route path="/status-category/:id" component={SingleStatusCategory} /> */}
                    {/* <Route path="/status/:id" component={SingleStatus} /> */}
                    {/* <Route path="/media/:id" component={SingleStatus} /> */}
                    {/* <Route path="/suggestion-feedback/:id" component={SingleSuggestionFeedback} /> */}
                    {/* <Route path="/update-ttpmpdf/:id" component={AddEditTtpmPdf} />
                    <Route path="/addnew-ttpmpdf/" component={AddEditTtpmPdf} />
                    <Route path="/addnew-plancategory" component={AddPlanCategory} />
                    <Route path="/update-plancategory/:id" component={AddPlanCategory} /> */}
                    {/* <Route path="/addnew-news" component={AddEditNews} />
                    <Route path="/update-news/:id" component={AddEditNews} /> */}
                    {/* <Route path="/addnew-status" component={AddEditStatus} />
                    <Route path="/update-status/:id" component={AddEditStatus} /> */}
                    {/* <Route path="/add-mix-plan-category" component={AddEditMixPlanCategory} />
                    <Route path="/update-mix-plan-category/:id/" component={AddEditMixPlanCategory} /> */}
                    {/* <Route path="/add-youtube-links" component={AddEditYoutubeLink} />
                    <Route path="/edit-youtube-links/:id/" component={AddEditYoutubeLink} /> */}
                    {/* <Route path="/addnew-media" component={AddEditMediaFile} />
                    <Route path="/update-media/:id" component={AddEditMediaFile} /> */}
                    {/* <Route path="/add-leader-corner" component={AddEditLeaderCorner} />
                    <Route path="/update-leader-corner/:id" component={AddEditLeaderCorner} /> */}
                    {/* <Route path="/add-marketing-sms" component={AddEditMarketingSMS} />
                    <Route path="/update-marketing-sms/:id" component={AddEditMarketingSMS} /> */}
                    {/* <Route path="/addnew-adminBanner/" component={addEditAdminBaner} />
                    <Route path="/update-admin-banner/:id" component={addEditAdminBaner} /> */}
                    {/* <Route path="/add-mix-plan" component={AddEditMixPlan} />
                    <Route path="/edit-mix-plan/:id/" component={AddEditMixPlan} /> */}
                    {/* <Route path="/admindashboard/mix-plan" component={MixPlan} /> */}
                    {/* <Route path="/admindashboard/ttpmp-df-list" component={TtpmPdf} /> */}
                    {/* <Route path="/admindashboard/categories-list" component={Category} /> */}
                    {/* <Route path="/admindashboard/banners-list" component={Banner} /> */}
                    {/* <Route path="/admindashboard/articles-list" component={Articals} /> */}
                    {/* <Route path="/addnew-article" component={AddEditArtical} />
                    <Route path="/update-article/:id" component={AddEditArtical} /> */}
                    {/* <Route path="/article/:id" component={Article} /> */}
                    {/* <Route path="/admindashboard/news-list" component={News} /> */}
                    {/* <Route path="/addnew-category" component={AddEditCategory} />
                    <Route path="/update-category/:id/" component={AddEditCategory} /> */}
                    {/* <Route path="/admindashboard/status-list-categories" component={StatusCategory} /> */}
                    {/* <Route path="/addnew-status-category" component={AddEditStatusCategory} />
                    <Route path="/update-statuscategory/:id" component={AddEditStatusCategory} /> */}
                    {/* <Route path="/admindashboard/status-list" component={Status} /> */}
                    {/* <Route path="/admindashboard/leader-category-list" component={LeaderCornerCategory} />
                    <Route path="/add-leader-category/" component={AddEditLeaderCornerCategory} />
                    <Route path="/update-leader-category/:id/" component={AddEditLeaderCornerCategory} />
                    <Route path="/admindashboard/leader-corner-list" component={LeaderCorner} /> */}
                    {/* <Route path="/admindashboard/media-list" component={MediaFile} /> */}
                    {/* <Route path="/add-banner" component={AddEditBanner} /> */}
                    {/* <Route path="/addnew-profile-frame-list" component={AddEditProfileFrame} /> */}
                    {/* <Route path="/update-profile-frame/:id" component={AddEditProfileFrame} /> */}
                    {/* <Route path="/profile-frame/:id" component={SingleProfileFrame} /> */}
                    {/* <Route path="/update-banner/:id" component={AddEditBanner} /> */}
                    {/* <Route path="/viewAll-banner/:id" component={CatViewAll} />
                    <Route path="/edit-banner/:id" component={AddEditBanner} />
                    <Route path="/update-banner/:id" component={AddEditBanner} /> */}
                    {/* <Route path="/admindashboard/marketing-sms-list" component={MarketingSms} /> */}
                    {/* <Route path="/admindashboard/mix-plan-category" component={MixPlanCategory} /> */}
                    {/* <Route path="/admindashboard/recentbanner-list" component={RecentUpoad} /> */}
                    {/* <Route path="/admindashboard/adminBanner-list" component={AdminBanner} /> */}
                    {/* <Route path="/admindashboard/suggestion-feedback" component={SuggestionFeedback} /> */}
                    {/* <Route path="/admindashboard/youtube-links" component={YoutubeLinks} /> */}
                </div>
                <AppFooter />
            </div >
            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default AdminDashboard;
