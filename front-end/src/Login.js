import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    function login() {
        if (email === null || email === "") {
            alert("Please fill your email and password");
            return false;
        }
        if (password === null || password === "") {
            alert("Please fill your email and password");
            return false;
        }
        let item = { email, password, cookie };
        fetch("http://localhost:8000/api/v1/user/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)

        }).then(res => res.json()).then(data => {
            if (data.message === "User logged in.") {
                document.cookie = `sessionid=${data.token}`;
                window.location.reload(false);
                navigate("/");
            } else {
                alert(data.message)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div className="col-sm-6 offset-sm-3">
            <br />
            <h1>Login with your DMCC account</h1>
            <br />
            <div>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <br />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={login} className="btn btn-primary">Login</button>
            </div>
        </div>
    )
}

export default Login;