import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from 'primereact/dropdown';
import classNames from "classnames";
import { loadOurServicesStart} from "../../redux/Actions/ourServicesActions";
import { addOurProductStart } from "../../redux/Actions/ourProductsActions";

let emptyMediaFile = {
    title: "",
    description: "",
    our_service_id: "",
};

const AddEditOurProducts = () => {
    const [ourProduct, setOurProduct] = useState(emptyMediaFile);
    var { id, title, description, image, our_service_id } = ourProduct;
    const formData = new FormData();
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [mediaError, setMediaError] = useState(false);
    const [fileError, setFileError] = useState(false);
    const mediaFileSelector = useSelector((state) => state?.serviceData)
    const ServiceSelector = useSelector((state) => state?.serviceData)
    const ProductSelector = useSelector((state) => state?.productsDetail)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~>>>>>',ProductSelector)
    const ServiceData = ServiceSelector?.OurServices?.data?.data?.rows;
    const isSucess = ProductSelector?.isSuccess;
    const isLoading = ProductSelector?.isLoading;
    

    useEffect(() => {
        dispatch(loadOurServicesStart());
    }, []);

    useEffect(() => {
        if (isSucess === true) {
            history.push('/admindashboard/our-services-list')
        }
    }, [isSucess])

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singlestatus = ServiceData ? ServiceData.find((item) => item.id === Number(id)) : null;
            setOurProduct({ ...singlestatus });
        } else {
            setEditMode(false);
            setOurProduct({ ...ourProduct })
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdatestatus = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setOurProduct(ourProduct)
        if (title &&
            description &&
            image &&
            !mediaError)
            console.log('produst create ~~~~~~~~~.', ourProduct)
            if (!editMode) {
                formData.append("our_service_id", our_service_id)
                formData.append("title", title)
                formData.append("description", description)
                formData.append("image", image)
                dispatch(addOurProductStart(formData));
            } else {
                formData.append("id", id)
                formData.append("title", title)
                formData.append("description", description)
                formData.append("icon", image)
                // dispatch(updateOurServiceStart(formData));
            }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value);
        setOurProduct({ ...ourProduct, [name]: val });
    };

    const handleImageSelect = (e) => {
        let imageFile = e.target.files[0];
        if (!imageFile) {
            setMediaError('Please select image.');
            return false;
        } else if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setMediaError('Please select valid image.');
            return false;
        } else {
            setMediaError('');
            setOurProduct({ ...ourProduct, [e.target.name]: e.target.files[0] })
            return false;
        }
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Product" : `Update Product`}</div>
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

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">Select Service</label>
                        <Dropdown id="description" value={ourProduct?.our_service_id} onChange={(e) => onInputChange(e, "our_service_id")} className={classNames({ "p-invalid": submitted && !ourProduct.our_service_id })} required
                            options={ServiceData}
                            optionValue="id"
                            placeholder="Choose a Service"
                            optionLabel="title"> </Dropdown>
                        {submitted && !ourProduct.our_service_id && <small className="p-error">Please Select Service.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Title</label>
                        <InputText id="title" value={ourProduct?.title} onChange={(e) => onInputChange(e, "title")} className={classNames({ "p-invalid": submitted && !ourProduct.title })} required autoFocus />
                        {submitted && !ourProduct.title && <small className="p-error">Media title is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Description</label>
                        <InputText id="description" value={ourProduct?.description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !ourProduct.description })} required autoFocus />
                        {submitted && !ourProduct.description && <small className="p-error">Media description is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Image</label>
                        <InputText
                            className={classNames({ "p-invalid": submitted && mediaError || submitted && !ourProduct.image })}
                            id="image"
                            type="file"
                            accept="/image/*"
                            name="image"
                            placeholder="Select an Image"
                            onChange={handleImageSelect}
                            required autoFocus
                        />
                        {(submitted && mediaError && <small className="p-error">{mediaError}</small>) || (submitted && !ourProduct.image && <small className="p-error">Add an image</small>)}
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} loading={isLoading} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdatestatus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditOurProducts;
