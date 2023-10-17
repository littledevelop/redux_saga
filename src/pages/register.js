import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { adminRegisterStart } from "../redux/Actions/actions";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom/cjs/react-router-dom";
import moment, { months } from "moment/moment";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
// import { Calendar } from 'primereact/calendar';

import { Calendar } from "primereact/calendar";

const Register = () => {
    const [submitted, setSubmitted] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);
    const [address, setAddress] = useState('');
    const [data, setData] = useState({
        email: "",
        password: "",
        confirm_password: "",
        full_name: "",
        designation: "",
        phone_number: "",
        // gender: selectedGender,
        address: "",
        is_admin: true,
    });
    const today = new Date();
    let in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 3);
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector((state) => state?.data);

    const Gender = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Other' },
    ];

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = () => {
        // Define your password validation criteria
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

        if (!data?.password.match(passwordRegex)) {
            setPasswordError(
                'Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).'
            );
        } else {
            setPasswordError('');
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
        validatePassword();
    };
    useEffect(() => {
        if (users?.users?.status == 200) {
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }
        return () => { };
    }, [users]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setData(data);
        // validatePassword();
        if (
            !passwordError &&
            data.email &&
            data.designation &&
            data.full_name &&
            data.phone_number &&
            data.address &&
            selectedGender &&
            validateEmail(data.email) 
            // &&
            // validatePassword(data.password) == true
        ) {
            const payload = {
                userName: data.full_name,
                phone: data.phone_number,
                email: data.email,
                password: data.password,
                confirmPassword: data.password,
                role: data.designation,
                address: data.address,
                gender: selectedGender,

                // is_admin: true,
            };
            console.log('register~~~~~~~>', payload)
            // dispatch(adminRegisterStart(payload));
        }
    };

    return (
        <div className="flex justify-content-center border-round pt-8">
            <div className="card w-30rem ">
                <div className="flex justify-content-center">
                    <img src="assets/layout/images/koli-logo.png" alt="logo" style={{ width: "65%" }} />
                </div>
                <h3 className="text-center mb-8">SIGN UP</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    {/* full name */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>User Name</label>
                        </div>
                        <div className="field col">
                            <InputText className={classNames({ "p-invalid": submitted && !data.full_name })} id="full_name" name="full_name" label="fullname" type="text" placeholder="Enter fullname" value={data.full_name} onChange={handleChange} toggleMask feedback={false} />
                            {submitted && !data.full_name && <small className="p-error">Fullname is required.</small>}
                        </div>
                    </div>
                    {/* phone number */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Phone Number</label>
                        </div>
                        <div className="field col">
                            <InputText
                                className={classNames({ "p-invalid": submitted && !data.phone_number })}
                                id="phone_number"
                                name="phone_number"
                                label="phone_number"
                                type="text"
                                placeholder="Phone number"
                                value={data.phone_number}
                                onChange={handleChange}
                                toggleMask
                                feedback={false}
                                maxLength={10}
                                minLength={10}
                            />
                            {submitted && !data.phone_number && <small className="p-error">Phone Number is required.</small>}
                        </div>
                        <div></div>
                    </div>
                    {/* email */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Email Address</label>
                        </div>

                        <div className="field col p-input-icon-right">
                            <InputText className={classNames({ "p-invalid": submitted && !data.email && !validateEmail(data.email) })} id="email" name="email" label="Email Address" placeholder="Enter email" value={data.email} onChange={handleChange} autoFocus />
                            {(submitted && !data.email && <small className="p-error">Email is required.</small>) || (submitted && !validateEmail(data.email) && <small className="p-error">Please Enter Valid Email!</small>)}
                        </div>
                    </div>
                    {/* password */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Enter Password</label>
                        </div>

                        <div className="field col">
                            <Password className={classNames({ "p-invalid": submitted && !data.password || submitted && passwordError })} id="password" name="password" label="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} toggleMask feedback={false} />
                            {(submitted && !data.password && <small className="p-error">password is required.</small>) || (submitted && passwordError && <small className="p-error">{passwordError}.</small>)}
                        </div>
                    </div>
                    {/*confirm password */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Confirm Password</label>
                        </div>

                        <div className="field col">
                            <Password className={classNames({ "p-invalid": submitted && !data.confirm_password })} id="password" name="confirm_password" label="confirm_password" type="password" placeholder="Confirm Password" value={data.confirm_password} onChange={handleChange} toggleMask feedback={false} />
                            {(submitted && !data.confirm_password && <small className="p-error">confirm is required.</small>) || (submitted && data.password !== data.confirm_password && <small className="p-error">Password dose not matched!</small>)}
                        </div>
                    </div>

                    {/* designation */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Designation</label>
                        </div>
                        <div className="field col">
                            <InputText className={classNames({ "p-invalid": submitted && !data.designation })} id="designation" name="designation" label="designation" type="designation" placeholder="Designation" value={data.designation} onChange={handleChange} toggleMask feedback={false} />
                            {submitted && !data.designation && <small className="p-error">Designation is required.</small>}
                        </div>
                    </div>
                    {/* gender */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Gender</label>
                        </div>

                        <div className="field col">
                            <Dropdown
                                className={classNames({ "p-invalid": submitted && !selectedGender })}
                                value={selectedGender}
                                onChange={(e) => {
                                    setSelectedGender(e.value)
                                    setData({
                                        ...data,
                                        [data.gender]: e.value,
                                    });
                                }
                                }
                                options={Gender}
                                optionLabel="name"
                                optionValue="name"
                                name="gender"
                                showClear
                                placeholder="Select a Gender"
                            />
                            {submitted && !selectedGender && <small className="p-error">Gender is required.</small>}
                        </div>
                    </div>
                    {/* address */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Address</label>
                        </div>
                        <div className="field col">
                            <InputTextarea className={classNames({ "p-invalid": submitted && !data.address })} value={data.address} placeholder="Address" name="address" onChange={handleChange} rows={4} cols={30} />
                            {submitted && !data.address && <small className="p-error">Address is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Sign Up" icon="pi pi-check" className="p-button-success mr-2 mb-2" />
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col" style={{ display: "flex" }}>
                            <p>Already have an account?</p>
                            <Link to="/login">
                                <p style={{ marginLeft: 5 }}>Login</p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
