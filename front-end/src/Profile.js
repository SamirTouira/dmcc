import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    React.useEffect(() => {
        setEmail(userInfo.email)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === null || email === "") {
            alert("Please fill an address mail");
            return false;
        }
        else {
            let item = { email };
            fetch("http://localhost:8000/api/v1/user/update", {
                credentials: "include",
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)

            }).then(response => response.json())
                .then((data) => {
                    const obj = {
                        ...userInfo,
                        email
                    }
                    localStorage.setItem('user-info', JSON.stringify(obj))
                    setEmail(email)
                    alert(data.message)
                })
                .catch(err => console.log(err))

        }
    }

    const deleteUser = () => {
        fetch("http://localhost:8000/api/v1/user/delete/"+userInfo.id, {
            credentials: "include",
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then(response => response.json())
            .then((data) => {
                document.cookie = document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                localStorage.clear();
                alert(data.message)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="col-sm-6 offset-sm-3">
                <br />
                <h1>Profile</h1>
                <br />

                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <p style={{ marginBottom: '24px' }}><strong>Email: {email}</strong></p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Your current email account</Form.Label>
                                    <Form.Control type='email' onChange={(e) => { setEmail(e.target.value) }} defaultValue={userInfo ? userInfo.email : ""} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                            <br />
                            <Button onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                deleteUser();
                                } else {
                                    return;
                                }
                            }}
                                variant="danger" type="submit">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;