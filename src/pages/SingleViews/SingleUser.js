import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { getSingleUsersStart } from "../../redux/Actions/actions";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingleUsers = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const singleuser = useSelector((state) => state);
    console.log("single user~~~>",singleuser)
    const singleuserdata = useSelector((state) => state?.userDetails?.singleUser?.userData);
    console.log("singleuserdata~~~>",singleuserdata)
    useEffect(() => {
        dispatch(getSingleUsersStart(id));
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };
    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img width={"50"} src={`${baseUrl}${rowData.profile_image}`} alt={"frame"} />
            </>
        );
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">{`User Information ${singleuserdata?.userName}`}</div>
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
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Name</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.userName}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Role</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.role}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Gender</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.gender}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Phone Number</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.phone}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Email Address</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.email}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Address</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleuserdata?.address}</div>
                </li>
                
                
            </ul>
        </div>
    );
};

export default SingleUsers;
