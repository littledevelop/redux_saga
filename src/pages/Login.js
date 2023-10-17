import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginStart } from "../redux/Actions/actions";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        // username: "admin",
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const users = useSelector((state) => state?.data);
    const loginData=useSelector((state) => state.userDetails)
    console.log('loginData~~~~~~~>',loginData)
    const isSucess = loginData?.isSuccess;
    const isLoading = loginData?.isLoading;

    useEffect(() => {
        if(isSucess) {
            history.push("/admindashboard")
            window.location.reload()
        }
    },[isSucess])
    useEffect(()=>{
        if (users?.users?.status==200) {
            window.location.reload();
        }
    })

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setData(data);
        if(data.email !='' && data.password !=''){
            dispatch(adminLoginStart(data));
        }
    };
    return (
        <div className="flex justify-content-center border-round pt-8">
            <div className="card w-30rem ">
                <div className="flex justify-content-center">
                    <img src="assets/layout/images/koli-logo.png" alt="logo" style={{ width: "65%" }} />
                </div>

                <h3 className="text-center mb-8">LOG IN</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Email Address</label>
                        </div>

                        <div className="field col p-input-icon-right">
                            <InputText
                                className={classNames({ "p-invalid": submitted && !data.email && !validateEmail(data.email) })}
                                id="email"
                                name="email"
                                label="Email Address"
                                placeholder="Enter email"
                                value={data.email}
                                onChange={handleChange}
                                autoFocus />
                            {submitted && !data.email && <small className="p-error">Email is required.</small> || submitted && !validateEmail(data.email) && <small className="p-error">Please Enter Valid Email!</small>}
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Enter Password</label>
                        </div>

                        <div className="field col">
                            <Password placeholder="Enter password" className={classNames({ "p-invalid": submitted && !data.password })} id="password" name="password" label="password" type="password" value={data.password} onChange={handleChange} toggleMask feedback={false} />
                            {submitted && !data.password && <small className="p-error">Password is required.</small>}
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Log In" loading={isLoading} icon="pi pi-check" className="p-button-success mr-2 mb-2" />
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col" style={{ display: "flex" }}>
                            <p>New User?</p>
                            <Link to="/register">
                                <p style={{ marginLeft: 5 }}>Sign Up</p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
