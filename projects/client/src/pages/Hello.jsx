import axios from "axios";
import logo from "../logo.svg";
import { useEffect, useState } from "react";

export default function Hello(){
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/greetings`
        );
        setMessage(data?.message || "");
        })();
    }, []);
    return(
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {message}
            </header>
        </div>
    )
}