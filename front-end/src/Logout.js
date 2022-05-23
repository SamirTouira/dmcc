import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        document.cookie = document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
        window.location.reload(false);
    }, [])
}

export default Logout;