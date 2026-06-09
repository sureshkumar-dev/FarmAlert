import type { JSX } from "react"
import axios from "axios"
import "@/styles/Authentication.css"
import Left_logo from "@/assets/green_leaf_logo.png"
import { useContext, useState } from "react"
import { Langcontext } from "@/App"
import { Langdata } from "@/Locales/language"
import infologo from "@/assets/info_logo.png"
import ailogo from "@/assets/mystery_logo.png"
import monilogo from "@/assets/monitor_logo.png"
import close from "@/assets/close_icon_auth.png"
import Button_primary from "./Button_primary"
import { useNavigate } from "react-router-dom"

const Authentication = (): JSX.Element => {
    const API = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    const lang = useContext(Langcontext)
    const text = Langdata[lang.translation]
    const [method, setmethod] = useState<boolean>(true)
    const [langbg, setlangbg] = useState<boolean>(true)
    const [username, setusername] = useState<string>("")
    const [email, setemail] = useState<string>("")
    const [pwd, setpwd] = useState<string>("")
    const [conpwd, setconpwd] = useState<string>("")
    const [user, setuser] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [errormsg, seterrormsg] = useState<string>("")
    const [dash_name, setdash_name] = useState("");
const handlesubmit = async () => {
    console.log(dash_name);
    
    console.log("click working");
    if (!username || !email || !pwd || !conpwd ) {
        alert("please fill all fields");
        return;
    }
    try {
        await axios.post(`${API}/auth/signup`, {
            username,
            email,
            pwd
        })
        setmethod(true);
        alert("Account created successfully please login with ur credentials");
        
    }
    catch (err) {
        console.log(err)
    }
}

function changelang() {
    lang.toggle()
    setlangbg(langbg ? false : true)
}
const handlesignup = async () => {

    if (loading) return;

    setLoading(true)
    console.log("login hit")
    const signupdata = {
        email: user,
        pwd: password
    }
    try {
        await axios.post(`${API}/auth/signin`, signupdata)
            .then(() => {

                console.log("login hit")


            })


    }
    catch (error) {
        console.log(error)
        alert(error);
    }
    setLoading(false)
    const response = await axios.post(`${API}/auth/signin`, signupdata);
    console.log(response.data);
    seterrormsg(response.data.message);
    if (response.data.message == "login success") {
        navigate("/myfarm")
    }
    const token = response.data.token;


    console.log(token)
    localStorage.setItem("token", token);
    const user_name = await axios.get("${API}/api/profile", {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    console.log(user_name.data.userdata.username);
    const user_dash = user_name.data.userdata.username;
    localStorage.setItem("uname",user_dash);
    const uname = localStorage.getItem("uname")
    console.log(uname)
    setdash_name(user_dash);
}
return (
    <>
        <div className="Account">
            <div className="close_icon" >
                <img style={{ cursor: "pointer" }} onClick={() => { navigate("/") }} src={close} alt="close icon" />
            </div>
            <div className="swap_lang" >
                <p onClick={changelang} className="english" style={{ backgroundColor: langbg ? "white" : "transparent" }}>EN</p>
                <p onClick={changelang} className="tamil" style={{ backgroundColor: !langbg ? "white" : "transparent" }}>TA</p>
            </div>
            <div className="Left_side">
                <div className="Left_title">
                    <img className="Left_logo" src={Left_logo} alt="title" />
                    <h1 style={{ fontSize: "35px", color: "white" }}>FarmGuard</h1>
                </div>
                <h3 style={{ fontWeight: "400", paddingTop: "20px" }}>{text.brand_tagline}</h3>
                <div className="Desc_left">
                    <p style={{ fontWeight: "200", fontSize: "16px" }}>{text.left_desc}</p>
                </div>
                <div style={{ paddingTop: "50px" }}>
                    <div className="Fea1">
                        <img className="Fealogo" src={infologo} alt="ai" />
                        <div>
                            <h3 style={{ fontWeight: "500" }}>{text.feature_title_1}</h3>
                            <p style={{ width: "300px", fontWeight: "200", fontSize: "12px" }}>{text.feature_desc_1}</p>
                        </div>
                    </div>
                    <div className="Fea2">
                        <img className="Fealogo" src={ailogo} alt="ai" />
                        <div>
                            <h3 style={{ fontWeight: "500" }} >{text.feature_title_2}</h3>
                            <p style={{ width: "300px", fontWeight: "200", fontSize: "12px" }}>{text.feature_desc_2}</p>
                        </div>
                    </div>
                    <div className="Fea3">
                        <img className="Fealogo" src={monilogo} alt="ai" />
                        <div>
                            <h3 style={{ fontWeight: "500" }}>{text.feature_title_3}</h3>
                            <p style={{ width: "300px", fontWeight: "200", fontSize: "12px" }}>{text.feature_desc_3}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Right_side">
                <div className="auth-center-wrapper">
                    <div className="login_container" style={{ display: method ? "block" : "none" }}>
                        <div className="Acc_title">
                            <h2 style={{ fontSize: "35px", fontWeight: "600", color: "#14542e" }}>{text.login_title}</h2>
                            <p style={{ fontWeight: "300", paddingBottom: "30px" }}>{text.login_subtitle}</p>
                        </div>
                        <div className="Input_sec">
                            <h4 style={{ fontWeight: "450", paddingBottom: "10px" }}>{text.email_label}</h4>
                            <input onChange={(e) => { setuser((e.target as HTMLInputElement).value) }} className="ip_right" type="email" placeholder={text.email_placeholder} />
                            <h4 style={{ fontWeight: "450", paddingBottom: "10px" }}>{text.password_label}</h4>
                            <input onChange={(e) => { setpassword((e.target as HTMLInputElement).value) }} className="ip_right" type="password" name="" id="" placeholder={text.password_placeholder} />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", columnGap: "4px", paddingBottom: "15px" }}><input type="checkbox" name="" id="" /><p style={{ fontSize: "15px", fontWeight: "300" }}>{text.remember_me}</p></div>
                                <p style={{ fontSize: "15px", color: "#468e3e" }}>{text.forgot_password}</p>
                            </div>
                            <p style={{ padding: "5px", color: "red" }}>{errormsg}</p>
                            <div >
                                <Button_primary onclick={handlesignup} text={text.sign_in_button} bgcolor="#186b38" textcolor="white" bordercolor="#4CAF50" width="450px" />
                            </div>
                        </div>
                        <div className="Secondary">
                            <center>
                                <p style={{ paddingTop: "5px", paddingBottom: "5px" }}>{text.divider_text}</p>
                            </center>
                            <Button_primary text={text.google_button} bgcolor="#ffffff" textcolor="black" bordercolor="#4CAF50" width="450px" />
                            <center>
                                <p style={{ paddingTop: "30px", paddingBottom: "10px" }}>{text.no_account_text} <span onClick={() => { setmethod(false) }} style={{ color: "#4caf50", cursor: "pointer" }}>{text.sign_up_link}</span> </p>
                            </center>
                            <center>
                            </center>
                        </div>
                    </div>
                </div>
                <div className="register-container" style={{ display: !method ? "block" : "none" }}>
                    <h2 style={{ color: "#14542e" }}>{text.create_account_title}</h2>

                    <label>{text.full_name}</label>
                    <input
                        onChange={(e) => { setusername(e.target.value) }}
                        type="text"
                        placeholder={text.full_name_placeholder}
                    />

                    <label>{text.email}</label>
                    <input
                        onChange={(e) => { setemail(e.target.value) }}
                        type="email"
                        placeholder={text.email_placeholder}
                    />

                    <label>{text.password}</label>
                    <input
                        onChange={(e) => { setpwd(e.target.value) }}
                        type="password" />

                    <label>{text.confirm_password}</label>
                    <input onChange={(e)=>{ setconpwd(e.target.value) }} type="password" />
                    <br />
                    <div style={{ paddingTop: "15px" }}>
                        <Button_primary
                            onclick={() => handlesubmit()}
                            text={text.create_account_btn} bgcolor="#186b38" textcolor="white" bordercolor="#4CAF50" width="460px" />
                    </div>
                    <div className="divider">
                        <span>{text.or_text}</span>
                    </div>

                    <Button_primary text={text.continue_google} bgcolor="white" textcolor="black" bordercolor="#4CAF50" width="460px" />
                    <center>
                        <p style={{ paddingTop: "15px" }}>
                            {text.already_account} <a className="signinBtn" style={{ cursor: "pointer", color: "green" }} onClick={() => { setmethod(!method ? true : false) }}>{text.sign_in}</a>
                        </p>
                    </center>
                </div>
            </div>
        </div>

    </>

)
}

export default Authentication