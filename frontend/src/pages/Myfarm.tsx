import Nav from "@/components/Nav";
import logo1 from "@/assets/farm_logo.png";
import logo2 from "@/assets/green_leaf_logo.png";
import Button_primary from "@/components/Button_primary";
import { useContext } from "react";
import { Langcontext } from "@/App";
import { Langdata } from "@/Locales/language";
import "@/styles/Myfarm_overlay.css"
import type { JSX } from "react";
function Myfarm(): JSX.Element {
    const lang = useContext(Langcontext)
    const text = Langdata[lang.translation]
    return (
        <>
            <Nav/>
            <div className="farm_option">
                <div className="overlay"></div>
                <div className="maincon">
                    <div className="headline">
                        <h1 style={{color:"black"}}>{text.myFarm}</h1>
                        <h5 style={{ color: "black", fontSize: "20px",fontWeight:"400" }}>{text.chooseOptionFarm}</h5>
                    </div>
                    <div className="card_div">
                        <div className="cards">
                            <div className="card1">
                                <div className="div">
                                    <img className="Card_logo" src={logo1} alt="logo" />
                                    <h2 style={{ paddingTop: "20px", paddingBottom: "10px",color:"black" }}>{text.registerMyCropFarm}</h2>
                                    <h5 style={{ paddingBottom: "40px", lineHeight: "20px", color: "gray" }}>{text.registerCropFarmDesc}</h5>
                                    <div className="btn_pri">
                                        <center>
                                            <Button_primary pathname="/myfarm" text={text.continue} textcolor="white" width="100%" bordercolor="rgba(68, 85, 68, 0)" bgcolor="#44a635" />
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div className="card2">
                                <div className="div" >
                                    <img className="Card_logo" src={logo2} alt="logo" />
                                    <h2 style={{ paddingTop: "20px", paddingBottom: "10px",color:"black" }}>{text.cropPlanner}</h2>
                                    <h5 style={{ paddingBottom: "40px", lineHeight: "20px", color: "gray" }}>{text.cropPlannerDesc}</h5>
                                    <div className="btn_pri">
                                        <center>
                                            <Button_primary pathname="/crop-planner" text={text.continue} textcolor="white" width="100%" bordercolor="rgba(68, 68, 170, 0)" bgcolor="#44a635" />
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Myfarm