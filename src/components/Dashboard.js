import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { countStart, loadUsersStart } from "../redux/Actions/actions";
import Banner from '../assets/demo/Images/WhoWeAreImage-1.png'

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const [lineOptions, setLineOptions] = useState(null);
    const logindata = useSelector((state) => state);
    console.log('dashboard logindata~>',logindata)

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);


    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };
        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (props.colorMode === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);


    return (
        <div style={{ overflowY: "hidden", overflowX: "hidden" }}>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-4">
                    {/* <Link to="/admindashboard/articles-list"> */}
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">ARTICALS</span>
                                    {/* <div className="text-900 font-medium text-xl">{Count?.news_articles_count ? Count?.news_articles_count : 0}</div> */}
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                    <i className="pi pi-list text-purple-500 text-xl" />
                                </div>
                            </div>
                        </div>
                    {/* </Link> */}
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    {/* <Link to="/admindashboard/users-list"> */}
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">USERS</span>
                                    {/* <div className="text-900 font-medium text-xl">{Count?.users_count ? Count?.users_count : 0}</div> */}
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                    <i className="pi pi-users text-blue-500 text-xl" />
                                </div>
                            </div>
                        </div>
                    {/* </Link> */}
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    {/* <Link to="/admindashboard/categories-list"> */}
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">CATEGORY</span>
                                    {/* <div className="text-900 font-medium text-xl">{Count?.categories_count ? Count?.categories_count : 0}</div> */}
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                    <i className="pi pi-inbox text-cyan-500 text-xl" />
                                </div>
                            </div>
                        </div>
                    {/* </Link> */}
                </div>
            </div>
            <div className="card align-items-center justify-content-center flex mt-3">
                <img src={Banner} alt="Image" className="align-items-center dashboard-banner" style={{ borderRadius: "2%" }} />
            </div>

        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
