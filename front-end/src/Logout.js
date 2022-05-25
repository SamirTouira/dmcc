import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        // localStorage.clear();
        // document.cookie = document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // navigate("/");
        // window.location.reload(false);
        fetch("http://localhost:8000/api/v1/user/logout", {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then(res => res.json()).then(data => {
            if (data.message === "User logged out.") {
                document.cookie = document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                localStorage.clear();
                navigate("/")
            } else {
                alert(data.message)
            }
        }).catch(err => {
            console.error(err)
        })
    }, [])
}

export default Logout;