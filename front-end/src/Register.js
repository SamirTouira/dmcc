import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    function register() {
        if (email === null || email === "") {
            alert("Please fill an email and password");
            return false;
        }
        if (password === null || password === "") {
            alert("Please fill an email and password");
            return false;
        }
        let item = { email, password, cookie };
        fetch("http://localhost:8000/api/v1/user/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)

        }).then(res => res.json()).then(data => {
            if (data.message === "User created successfully.") {
                alert(data.message)
                navigate("/")
            } 
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div className="col-sm-6 offset-sm-3">
            <br />
            <h1>Create your account</h1>
            <br />
            <div>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <br />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={register} className="btn btn-primary">Register</button>
            </div>
        </div>
    )
}

export default Register;