import type { JSX } from "react";
import "@/styles/Section.css";
import { Link } from "react-router-dom";
import Leaf_logo from "@/assets/leaf-solid-full.svg";
import Green_leaf from "@/assets/farm_logo.png";
import Detect_logo from "@/assets/camera_logo.png";
import Admin_logo from "@/assets/folder_open_50dp_44A635_FILL0_wght400_GRAD0_opsz48.png";
import Button_primary from "@/components/Button_primary";
import { useContext } from "react";
import { Langcontext } from "@/App";
import { Langdata } from "@/Locales/language";
import { useNavigate } from "react-router-dom";


function Section(): JSX.Element {
    const navigate = useNavigate();
    const mozhi = useContext(Langcontext)
    const text = Langdata[mozhi.translation]
    return (
        <>
            <section className="section-home">
                <div className="Hero_section">
                    <div className="Headline">
                        <img style={{ height: "25px", width: "auto" }} src={Leaf_logo} alt="leaf logo" />
                        <h1 style={{ fontSize: "14px", color: "#44a635", fontWeight: "600" }}>{text.sas}</h1>
                    </div>
                    <div className="Main_article">
                        <h1 className="Article_h1">{text.title1}<span style={{ color: "#44a635"  }}>{text.title2}</span> {text.title3}</h1>
                    </div>
                    <div className="Sub_article">
                        <p>{text.desc1}</p>
                        <p>{text.desc2}</p>
                        <p>{text.desc3}</p>
                    </div>
                    
                    <div className="Button_section">
                        <Link to={("/select-service")}>
                        <Button_primary text={text.btn1} bgcolor="#44a635" textcolor="#ffffff" bordercolor="#44a635" width="180px" />
                        </Link>
                        <Link to={("/ai-scan")}>
                        <Button_primary text={text.btn2} bgcolor="white" textcolor="#2e7923" bordercolor="#2e7923" width="180px" />
                        </Link>
                    </div>


                </div>
                <div className="Panels">
                    <div className="Farm_panel">
                        <div className="Panel_logo">
                            <img src={Green_leaf} alt="greenleaf" />
                        </div>
                        <div className="Panel_desc">
                            <h2 style={{ float: "left" }}>{text.myfarm}</h2>
                            <div style={{ paddingBottom: "20px" }}>
                                <p className="Panel_pg">{text.panel_desc11}</p>
                                <p className="Panel_pg">{text.panel_desc12}</p>
                            </div>
                            
                                                        <Button_primary pathname="/select-service" text={text.get_start} bgcolor="#44a635" textcolor="#ffffff" bordercolor="#44a635" width="90%" />
                            

                        </div>
                    </div>
                    <div className="Detection_panel">
                        <div className="Panel_logo">
                            <img src={Detect_logo} alt="detection" />
                        </div>
                        <div className="Panel_desc">
                            <h2>{text.btn2}</h2>
                            <div style={{ paddingBottom: "20px" }}>
                                <p className="Panel_pg">{text.panel_desc21}</p>
                                <p className="Panel_pg">{text.panel_desc22}</p>
                            </div>
                            
                            <Button_primary pathname="/ai-scan" text="Get Started" bgcolor="#44a635" textcolor="#ffffff" bordercolor="#44a635" width="90%" />
                            
                        </div>
                    </div>
                    <div className="Admin_panel">
                        <div className="Panel_logo">
                            <img src={Admin_logo} alt="admin logo" />
                        </div>
                        <div className="Panel_desc">
                            <h2>{text.admin}</h2>
                            <div style={{ paddingBottom: "20px" }}>
                                <p className="Panel_pg">{text.panel_desc31}</p>
                                <p className="Panel_pg">{text.panel_desc32}</p>
                            </div>
                            
                            <Button_primary pathname="/docs" text={text.get_start} bgcolor="#44a635" textcolor="#ffffff" bordercolor="#44a635" width="90%" />
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Section