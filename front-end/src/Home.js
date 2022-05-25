import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import voiceAnimation from './assets/voice.gif'

function Home() {
    const [userInfo, setUserInfo] = useState({});
    const token = document.cookie ? document.cookie.split('=')[1] : null;
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
        const userRender = () => {
        if (token) {
            fetch("http://localhost:8000/api/v1/user/me", {
                credentials: "include",
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
                .then(response => response.json())
                .then(response => localStorage.setItem("user-info", JSON.stringify(response)))
                .then(() => {
                    setUserInfo(JSON.parse(localStorage.getItem("user-info")));
                })
                .catch(error => console.log(error));
        }
    }
    userRender();
    }, [])


    return (

        <div className="Home">
            <header className="App-header">
                <img src={voiceAnimation} width={250} height={100} />
                {token !== null ? (
                    <>
                        <p>Hi {userInfo.email}</p>
                        <h1>Welcome to the new DMCC app!</h1>
                        <br />
                        <div>
                            <Button onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    navigate('/logout')
                                } else {
                                    return;
                                }
                            }} variant="danger" size="lg">
                                <strong>LOGOUT</strong>
                            </Button>{' '}
                        </div>
                    </>)
                    : (
                        <>
                            <h1>Welcome to the new DMCC app!</h1>
                            <br />
                            <div>
                                <Button className="btn-light" onClick={(e) => { navigate('/login'); }} variant="light" size="lg">
                                    <strong>LOGIN</strong>
                                </Button>{' '}
                            </div>
                        </>
                    )}
                <br />
            </header>
        </div>
    );
}

export default Home;
