import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { RadioButton } from "primereact/radiobutton";
import { addOurServiceStart,getSingleServiceStart,loadOurServicesStart,updateOurServiceStart } from "../../redux/Actions/ourServicesActions";

let emptyMediaFile = {
    title: "",
    description: "",
    icon: "",
    file: "",
    type_of_av: "",
};

const AddEditOurServices = () => {
    const [ourService, setOurService] = useState(emptyMediaFile);
    var { id, title, description, image, file, type_of_av } = ourService;
    const formData = new FormData();
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [mediaError, setMediaError] = useState(false);
    const [fileError, setFileError] = useState(false);
    const mediaFileSelector = useSelector((state) => state?.serviceData)
    const ServiceSelector = useSelector((state) => state?.serviceData )
    const ServiceData = mediaFileSelector?.OurServices?.data?.data?.rows;
    const isSucess = ServiceSelector?.isSuccess;
    const isLoading = ServiceSelector?.isLoading;

    useEffect(() => {
        dispatch(loadOurServicesStart());
        dispatch(getSingleServiceStart(id))
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
            setOurService({ ...singlestatus });
        } else {
            setEditMode(false);
            setOurService({ ...ourService })
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdatestatus = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setOurService(ourService)
        if (title &&
            description &&
            image &&
            !mediaError) 
            if (!editMode) {
                console.log("title~~~~.",title,"descript~~~~>",description,' image!~~~~~~.',image)
                formData.append("title", title)
                formData.append("description", description)
                formData.append("icon", image)
                dispatch(addOurServiceStart(formData));
            } else {
                formData.append("id", id)
                formData.append("title", title)
                formData.append("description", description)
                formData.append("icon", image)
                dispatch(updateOurServiceStart(formData));
            }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value);
        setOurService({ ...ourService, [name]: val });
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
            setOurService({ ...ourService, [e.target.name]: e.target.files[0] })
            return false;
        }
    }

    const handleFileSelect = (e) => {
        let audioFile = e.target.files[0];
        if (!audioFile) {
            setFileError('Please select video.');
            return false;
        } else if (!audioFile.name.match(/\.(mp4|mp3)$/)) {
            setFileError('Please select valid video.');
            return false;
        } else {
            setFileError('');
            setOurService({ ...ourService, [e.target.name]: e.target.files[0] })
            return false;
        }
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Service" : `Update Service`}</div>
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
                        <label htmlFor="name">Title</label>
                        <InputText id="title" value={ourService?.title} onChange={(e) => onInputChange(e, "title")} className={classNames({ "p-invalid": submitted && !ourService.title })} required autoFocus />
                        {submitted && !ourService.title && <small className="p-error">Media title is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Description</label>
                        <InputText id="description" value={ourService?.description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !ourService.description })} required autoFocus />
                        {submitted && !ourService.description && <small className="p-error">Media description is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Image</label>
                        <InputText
                            className={classNames({ "p-invalid": submitted && mediaError || submitted && !ourService.image })}
                            id="image"
                            type="file"
                            accept="/image/*"
                            name="image"
                            placeholder="Select an Image"
                            onChange={handleImageSelect}
                            required autoFocus
                        />
                        {(submitted && mediaError && <small className="p-error">{mediaError}</small>) || (submitted && !ourService.image && <small className="p-error">Add an image</small>)}
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

export default AddEditOurServices;
