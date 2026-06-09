import { useEffect } from "react";
import "@/styles/acc_container.css";
import Nav from "@/components/Nav";
import userlogo from "@/assets/user.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const acc_container = () => {
    const API = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    const fetchuser = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(`${API}/api/profile`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.userdata);
            const username = res.data.userdata.username;
            const uemail = res.data.userdata.email;
            localStorage.setItem("uname", username);
            localStorage.setItem("email", uemail);

        }
        catch (error) {
            console.log(error)
        }
    }
    const logout = () =>{
        localStorage.clear();
        navigate("/");
        alert("logout successfull")
    }
    const switchacc = () => {
        localStorage.clear();
        navigate("/auth");
    }
  
    useEffect(() => {
        fetchuser();
    }, [])
    const uname = localStorage.getItem("uname");
    const email = localStorage.getItem("email");
    return (
        <>
            <Nav />
            <div style={{backgroundColor:"#f5f5f5", height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div className="account-container">

                    <div className="profile-section">
                        <img src={userlogo} className="profile-logo" />
                        <h2>{uname}</h2>
                        <p>{email}</p>
                    </div>

                    <div className="account-actions">
                        <button onClick={switchacc} style={{marginTop:"50px"}} >Switch Account</button>
                        <button  onClick={logout} style={{backgroundColor:"red",border:"2px solid red"}} >Logout</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default acc_container;