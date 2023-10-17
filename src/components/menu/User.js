import React, { useState, useEffect, useRef, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsersStart, deleteUsersStart } from "../../redux/Actions/actions";
import { Link } from "react-router-dom";
import { ToggleButton } from "primereact/togglebutton";

const baseUrl = process.env.REACT_APP_BASE_URL;

const User = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const [userValue, setUserValue] = useState();
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const usersListData = useSelector((state) => state?.userDetails);
    const isSuccess = usersListData?.isSuccess;
    const isLoading = usersListData?.isLoading;

    useEffect(() => {
        dispatch(loadUsersStart());
    }, [isSuccess]);

    const usersList = usersListData?.users?.data?.data?.rows;


    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const confirmDeleteUsers = (userValue) => {
        console.log("value delete", userValue.id);
        setUserValue(userValue.id);
        setDeleteUserDialog(true);
    };

    const deleteUsers = async () => {
        setUserValue(userValue);
        dispatch(deleteUsersStart(userValue));
        setDeleteUserDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-user/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-user/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/singleusers/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteUsers(rowData)} />
            </div>
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
    const idBodyTemplate = (rowData, index) => {
        return (
            <>
                <div className="actions">
                    <p>
                        <b>{index.rowIndex + 1}</b>
                    </p>
                </div>
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUsers} />
        </>
    );

    // const next = () => {
    //     setPageNo(pageNo + 1);
    // };
    // const previouse = () => {
    //     pageNo >= 2 ? setPageNo(pageNo - 1) : setPageNo(1);
    // };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={usersList}
                        loading={isLoading}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                        globalFilter={globalFilter}
                        emptyMessage="No Users found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column body={idBodyTemplate} header="Sr no." headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                        <Column style={{ display: "none" }} field="uniqueId" header="UNIQUEID" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="userName" header="User Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="email" header="Email " sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="phone" header="Phone" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="role" header="Role" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>
                    <Dialog visible={deleteUserDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {userValue && (
                                <span>
                                    Are you sure you want to delete <b>{userValue.id}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(User, comparisonFn);
