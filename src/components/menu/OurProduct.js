import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { deleteOurProductStart, loadOurProductsStart } from "../../redux/Actions/ourProductsActions";

const OurProducts = () => {
    let emptyMediaFile = {
        title: "",
        description: "",
        image: "",
        file: "",
        type_of_av: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const [ourProduct, setOurProduct] = useState(emptyMediaFile);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageNo, setPageNo] = useState(1)
    const OurProductsSelectorData = useSelector((state) => state?.productsDetail);
    const OurProducts=OurProductsSelectorData?.OurProducts?.data?.data?.rows
    console.log("!Q~~~~~~~~~~~~~~~~~",OurProductsSelectorData)
    const isSuccess = OurProductsSelectorData?.isSuccess;
    const isLoading = OurProductsSelectorData?.isLoading;

    useEffect(() => {
        dispatch(loadOurProductsStart());
    }, [isSuccess]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const confirmDeleteProduct = (ourProduct) => {
        setOurProduct(ourProduct);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        setOurProduct(ourProduct);
        dispatch(deleteOurProductStart(ourProduct?.id));
        setDeleteProductDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-our-products/`}>
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

    const cIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">File Id</span>
                {rowData.id}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img width={"50"} src={`${rowData.image}`} alt={rowData?.content} />
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-our-servive/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/productSingle/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
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
            <h5 className="m-0">List Of Our Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    // const next = () => {
    //     setPageNo(pageNo + 1)
    // }
    // const previouse = () => {
    //     pageNo >= 2 ? setPageNo(pageNo - 1) : setPageNo(1)
    // }
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        loading={isLoading}
                        value={OurProducts}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Media-files"
                        globalFilter={globalFilter}
                        emptyMessage="No Media-files found."
                        header={header}
                        responsiveLayout="scroll" >
                        <Column body={idBodyTemplate} header="Sr no." headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                        <Column field="title" header="Title" sortable headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                        <Column field="description" header="Description" sortable headerStyle={{ width: "10%", minWidth: "25rem" }}></Column>
                        <Column field="icon" header="Image" alt='image' body={imageBodyTemplate} headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={deleteProductDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {ourProduct && (
                                <span>
                                    Are you sure you want to delete <b>{ourProduct.title}</b>?
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

export default React.memo(OurProducts, comparisonFn);
