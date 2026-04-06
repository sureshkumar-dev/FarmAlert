import { useState, type JSX } from "react";
import { Langdata } from "@/Locales/language"
import { useNavigate } from "react-router-dom";
import navLogo from "@/assets/crop_logo.png";
import Home_logo from "@/assets/home_inactive_logo.png"
import Farm_logo from "@/assets/plant_inactive.png"
import Scan_logo from "@/assets/photo_camera_inactive.png"
import Admin_logo from "@/assets/folder_open_30dp_000000_FILL0_wght400_GRAD0_opsz24.png"
import Lang_logo from "@/assets/language_logo.png"
import Menu_logo from "@/assets/menu_bar.png"
import Close_icon from "@/assets/close_icon.png"
import User_logo from "@/assets/account_circle_40dp_.png"
import { useContext } from "react";
import { Langcontext } from "@/App";
import "@/styles/Nav.css";


function Nav(): JSX.Element {
    const navigate = useNavigate();
    const langValue = useContext(Langcontext)
    const [isopen, setisopen] = useState<boolean>(false)
    function openMenu() {
        if (!isopen) {
            setisopen(true)
        }
        else
            setisopen(false)
    }
    const [language, setlanguage] = useState<"en" | "ta">("en")
    const [Lang, setLang] = useState<string>("Tamil")

    function translate(): void {
        if (language === "en") {
            setlanguage("ta")
            setLang("English")
        }
        else {
            setlanguage("en")
            setLang("Tamil")
        }
    }
    function changeui(): void {
        langValue.toggle()
        translate();
    }
    const account = () => {
        const token = localStorage.getItem("token");
        console.log(token)
        if(token){
            navigate("/account")
        }
        else
            navigate("/auth")
    }
    
    const text = Langdata[langValue.translation]
    return (
        <>
            <div style={{ position: "relative" }}>
                <nav>
                    <div className="Web_title">
                        <img className="Navlogo" src={navLogo} alt="navlogo" />
                        <h3 className="Nav_title">FarmGuard</h3>
                    </div>
                    <div className="Nav_links">
                        <ul className="Nav_ul">

                            <li className="Quick_links" onClick={() => {navigate("/")}}> <img className="Navlinks_logo" src={Home_logo} alt="Home_logo" /> {text.home}</li>
                            <li className="Quick_links" onClick={() => {navigate("/select-service")}} > <img className="Navlinks_logo" src={Farm_logo} alt="Farm_logo" /> {text.myfarm}</li>
                            <li className="Quick_links" onClick={() => {navigate("/ai-scan")}} > <img className="Navlinks_logo" src={Scan_logo} alt="Scan_logo" /> {text.detection}</li>
                            <li className="Quick_links" onClick={() => {navigate("/docs")}} > <img className="Navlinks_logo" src={Admin_logo} alt="Admin_logo" /> {text.admin}</li>

                        </ul>

                    </div>
                    <ul className="logo_sec">
                        <span style={{ paddingLeft: "60px", padding: "6px", borderRadius: "10px", backgroundColor: "#48b837", paddingRight: "10px", color: "white",height:"max-content" }}>
                            <li onClick={changeui} > <img className="Navlinks_logo" src={Lang_logo} alt="Lang_logo" /> {Lang}</li>
                        </span>
                        <li onClick={account}><img src={User_logo} alt="acc" /></li>
                    </ul>
                    <div className="Menu_div">
                        <ul style={{ paddingLeft: "60px", padding: "6px", borderRadius: "10px", backgroundColor: "#48b837", paddingRight: "10px", color: "white" }}>
                            <li className="Menu_lang" onClick={changeui} > <img className="Navlinks_logo" src={Lang_logo} alt="Lang_logo" /> {Lang}</li>
                        </ul>
                        <img onClick={openMenu} className="Menu_icon" src={Menu_logo} alt="Menu Bar" />
                    </div>
                </nav>
                <div style={{ display: isopen ? "block" : "none" }} className="Sidebar">
                    <div className="Web_title_side">
                        <div className="Sidebar_title">
                            <img className="Navlogo" src={navLogo} alt="navlogo" />
                            <h3 className="Nav_title">FarmGuard</h3>
                        </div>
                        <img onClick={openMenu} style={{ paddingRight: "20px", height: "20px" }} src={Close_icon} alt="close_menu" />
                    </div>
                    <ul style={{ paddingTop: "30px" }}>
                        <li className="Sidebar_list"> <img className="Sidebar_icons" src={Home_logo} alt="home" /> {text.home}</li>
                        <li className="Sidebar_list"> <img className="Sidebar_icons" src={Farm_logo} alt="farm" /> {text.myfarm}</li>
                        <li className="Sidebar_list"> <img className="Sidebar_icons" src={Scan_logo} alt="scan" /> {text.detection}</li>
                        <li className="Sidebar_list"> <img className="Sidebar_icons" src={Admin_logo} alt="admin" /> {text.admin}</li>
                    </ul>
                </div>
                <div style={{ display: isopen ? "block" : "none" }} className="overlay"></div>
            </div>
        </>
    )
}
export default Nav