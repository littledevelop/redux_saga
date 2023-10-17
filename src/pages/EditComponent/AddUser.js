import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadUsersStart, userRegisterStart, userUpdateStart } from "../../redux/Actions/actions";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputTextarea } from "primereact/inputtextarea";
import ClassNameGenerator from '@mui/utils/ClassNameGenerator';

let emptyData = {
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    gender: "",
    address: "",
};

const AddUser = () => {
    const [user, setUser] = useState(emptyData);
    var { id, userName, phone, email, password, role, gender, address, confirmPassword } = user;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const formData = new FormData();
    const usersData = useSelector((state) => state?.userDetails);
    const createStatus = usersData?.users?.data?.status
    const users = useSelector((state) => state?.userDetails);
    const usersList = users?.users?.data?.data?.rows
    const isLoading = usersData?.isLoading;
    const isSuccess = usersData?.isSuccess;


    const Gender = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Other' },
    ];
    const Role = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'User' },
    ];

    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };


    const validatePhone = (phone) => {
        const phoneRe = /^(([0-9]{10}))$/;
        return phoneRe.test(String(phone));
    }

    const validatePassword = (password, confirmPassword) => {
        const stengthreg = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/;
        return stengthreg.test(String(password, confirmPassword));
    }

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    useEffect(() => {
        if (isSuccess === true) {
            history.push('/admindashboard/users-list/')
        }
    }, [isSuccess])

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleuser = usersList ? usersList.find((item) => item.id === Number(id)) : null;
            setUser({ ...singleuser });
        } else {
            setEditMode(false);
            setUser({ ...user });
        }
    }, [id]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New user" : `Update user`}</div>
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }

    const addNewuser = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (user.userName && validateEmail(user.email) && validatePhone(user.phone) && user.role && user.gender && user.address && validatePassword(user.password) && validatePassword(user.confirmPassword))
            setUser(user);
            if (!editMode) {
                dispatch(userRegisterStart(user));
            } else {
                console.log('user update paytload~~dddd~~~>')
                formData.append('id',id)
                formData.append('userName',userName)
                formData.append('phone',phone)
                formData.append('password',password)
                formData.append('confirmPassword',password)
                formData.append('email',email)
                formData.append('address',address)
                formData.append('gender',gender)
                formData.append('role',role)
                dispatch(userUpdateStart(formData));
            }
       
    };

    const gotoPrevious = () => {
        history.goBack();
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setUser({ ...user, [name]: val });
    };

    return (
        <div className="surface-section card" style={{ margin: '1%', padding: '1%' }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">User Name</label>
                        <InputText id="userName" value={user.userName} onChange={(e) => onInputChange(e, "userName")} className={classNames({ "p-invalid": submitted && !user.userName })} required autoFocus />
                        {submitted && !user.userName && <small className="p-error">User Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Phone Number</label>
                        <InputText id="phone" value={user.phone} onChange={(e) => onInputChange(e, "phone")} className={classNames({ "p-invalid": submitted && !user.phone && !validatePhone(user.phone) })} required maxLength={10} minLength={10} />
                        {submitted && !user.phone && <small className="p-error">Contact Number is required</small> || submitted && !validatePhone(user.phone) && <small className="p-error">Enter Valid Contact Number</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Email Address</label>
                        <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, "email")} className={classNames({ "p-invalid": submitted && !user.email && !validateEmail(user.email) })} required />
                        {submitted && !user.email && <small className="p-error">Email is required</small> || submitted && !validateEmail(user.email) && <small className="p-error">Please Enter Valid Email!</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Select Role</label>
                            <Dropdown id="description" value={user.role} onChange={(e) => onInputChange(e, "role")} className={classNames({ "p-invalid": submitted && !user.role })} required
                                options={Role}
                                optionValue="name"
                                placeholder="Choose a Role"
                                optionLabel="name"> </Dropdown>
                            {submitted && !user.role && <small className="p-error">Please Select Role</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Select Gender</label>
                            <Dropdown id="description" value={user.gender} onChange={(e) => onInputChange(e, "gender")} className={classNames({ "p-invalid": submitted && !user.gender })} required
                                options={Gender}
                                optionValue="name"
                                placeholder="Choose a Gender"
                                optionLabel="name"> </Dropdown>
                            {submitted && !user.gender && <small className="p-error">Please Select Gender</small>}
                        </div>
                    </div>
                    <div style={editMode ? { display: "none" } : null} className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Password</label>
                            <Password id="password" value={user.password} onChange={(e) => onInputChange(e, "password")} className={classNames({ "p-invalid": submitted && !user.password && !validatePassword(user.password) })} toggleMask
                                feedback={false} required />
                            {submitted && !user.password && <small className="p-error">Password is Required!</small> || submitted && !validatePassword(user.password) && <small className="p-error">Must contains upper case, lower case, digit, special character</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Confirm Password</label>
                            <Password id="confirmPassword" value={user.confirmPassword} onChange={(e) => onInputChange(e, "confirmPassword")} className={classNames({ "p-invalid": submitted && !user.confirmPassword })} toggleMask
                                feedback={false} required />
                            {submitted && !user.confirmPassword && <small className="p-error">Re-enter Password!</small> || submitted && user.password !== user.confirmPassword && <small className="p-error">password and Confirm Password not matched!</small>}
                        </div>
                    </div>
                    <div className="field">
                        <InputTextarea className={classNames({ "p-invalid": submitted && !user.address })} value={user.address} placeholder="Address" name="address" onChange={(e) => onInputChange(e, "address")} rows={4} cols={30} />
                        {submitted && !user.address && <small className="p-error">Address is required.</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} isLoading={isLoading} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addNewuser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser;
