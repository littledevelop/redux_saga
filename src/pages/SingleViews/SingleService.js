import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
// import { getSingleMediaFileApi } from "../../redux/APIs/mediaFileApi";
// import { getSingleMediaFileStart } from "../../redux/Actions/mediaFileActions";
import { getSingleServiceStart } from "../../redux/Actions/ourServicesActions";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingleService = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const Single = useSelector((state) => state);
    console.log('Single~~~~~>',Single)
    const serviceSingle = useSelector((state) => state?.serviceData);
    const serviceSingleData = serviceSingle?.SingleService?.ourServiceData;
    console.log('serviceSingle~~~~~>',serviceSingleData)
    const isSuccess = serviceSingle?.isSuccess;
    const isLoading = serviceSingle?.isLoading;

    useEffect(() => {
        dispatch(getSingleServiceStart(id));
    }, [id]);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">Media Information</div>
                </div>
            </React.Fragment>
        );
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Title</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{serviceSingleData?.title}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Description</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{serviceSingleData?.description}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Image</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        <img src={serviceSingleData?.icon} width={"150"} />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SingleService;
