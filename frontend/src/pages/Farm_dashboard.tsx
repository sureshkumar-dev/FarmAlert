import type { JSX } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import "@/styles/Farm_dashboard.css";
import addlogo from "@/assets/add_circle_25.png";
import scanlogo from "@/assets/photo_camera_25dp_.png";
import plantlogo from "@/assets/agriculture_40dp.png";
import croplogo from "@/assets/nature_40dp_.png";
import healthlogo from "@/assets/add_task_40dp_.png";
import risklogo from "@/assets/warning_40dp_.png";
import axios from "axios"
import dellogo from "@/assets/delete_22dp_.png";
import eyelogo from "@/assets/visibility_16dp_.png"
import { useContext } from "react";
import { Langcontext } from "@/App";
import { Farmlang } from "@/Locales/Myfarmlang";
import { useNavigate } from "react-router-dom";


function FarmDashboard(): JSX.Element {
    const navigate = useNavigate();
    const [totalfarms, settotalfarms] = useState<number>(0);
    const [totalcrops, settotalcrops] = useState<number>(0);
    const [healthycrops, sethealthycrops] = useState<number>(0);
    const [riskcrops, setriskcrops] = useState<number>(0);
    const [name, setname] = useState<string>("")
    const [farmdata, setfarmdata] = useState<any[]>([]);
    const lang = useContext(Langcontext);
    const text = Farmlang[lang.translation]
    useEffect(() => {
        settotalfarms(farmdata.length)
        const unique = new Set(farmdata.map(f => f.cropName));
        const totalUnique = unique.size;
        settotalcrops(totalUnique)
        const totalhealth = farmdata.length;
        sethealthycrops(totalhealth)
        console.log(name,setname,setriskcrops);
        
    }, [farmdata])
    const fetchuser = async () => {
        const user_name = await axios.get("http://localhost:5000/api/profile", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(user_name);
        


    }
    const fetchfarm = async () => {
        try {
            console.log("FETCH START");

            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);

            const res = await axios.get("http://localhost:5000/farm/all", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setfarmdata(res.data.data)
            console.log(res.data)



        } catch (err) {
            console.log("ERROR:", err);
        }
    }
    useEffect(() => {
        console.log("useeffect running");
        fetchuser();
        fetchfarm();
    }, []);
    const deleteFarm = async (id: string) => {
        try {
            const delmsg = window.confirm("Are you sure you want to delete this farm?");
            if (!delmsg) {
                return;
            }
            await axios.delete(`http://localhost:5000/farm/delete/${id}`);
            setfarmdata(prev => prev.filter(farm => farm._id !== id));
        } catch (err) {
            console.log(err);
        }
    }
    const uname = localStorage.getItem("uname");
    console.log(uname);
    return (
        <>
            <Nav />
            <section className="farm-dash">
                <center>
                    <div className="welcome">
                        <h1 style={{ color: "#44a635" }}>{text.welcome}</h1>
                        <h1>{uname}</h1>
                    </div>
                    <div className="QuickSec">

                        <h2 style={{ float: "left", fontWeight: "500" }}>{text.quickAction}</h2>
                        <div style={{ display: "flex", columnGap: "20px", paddingTop: "20px" }}>
                            <button onClick={() => { navigate("/reg-farm") }} className="btn-quick-1"><img src={addlogo} alt="add" />{text.registerNewFarm}</button>
                            <button onClick={() => { navigate("/ai-scan") }} className="btn-quick-2"><img src={scanlogo} alt="scan" />{text.scanCropDisease}</button>
                        </div>
                    </div>
                </center>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="analyze">
                        <div className="grid_cards">
                            <img className="cardlogo" src={plantlogo} alt="plant" />
                            <h3 className="card-h3">{text.totalFarms}</h3>
                            <h2 className="count">{totalfarms}</h2>
                            <h4 className="card-h4">{text.registeredFarms}</h4>
                        </div>
                        <div className="grid_cards">
                            <img className="cardlogo" src={croplogo} alt="crop" />
                            <h3 className="card-h3">{text.totalCrops}</h3>
                            <h2 className="count">{totalcrops}</h2>
                            <h4 className="card-h4">{text.registeredCrops}</h4>
                        </div>
                        <div className="grid_cards">
                            <img className="cardlogo" src={healthlogo} alt="health" />
                            <h3 className="card-h3">{text.healthyCrops}</h3>
                            <h2 className="count">{healthycrops}</h2>
                            <h4 className="card-h4">{text.inGoodCondition}</h4>
                        </div>
                        <div className="grid_cards">
                            <img className="cardlogo" src={risklogo} alt="risk" />
                            <h3 className="card-h3">{text.diseaseAlerts}</h3>
                            <h2 className="count">{riskcrops}</h2>
                            <h4 className="card-h4">{text.requireAttention}</h4>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                    <div className="regFarms">
                        <h2 style={{ fontWeight: "500" }}>{text.registeredFarms}</h2>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="farm_cards">
                        {farmdata.map((farm) => {
                            console.log("FARM OBJECT:", farm);
                            return (
                                <div key={farm._id} className="dynamic_card">
                                    <div className="card_cont">
                                        <h2>{farm.farmname}</h2>
                                        <div className="dn_grid">
                                            <div>
                                                <h4>{text.cropName}</h4>
                                                <h5>{farm.cropName}</h5>
                                            </div>
                                            <div>
                                                <h4>{text.soilType}</h4>
                                                <h5>{farm.soilType}</h5>
                                            </div>
                                            <div>
                                                <h4>{text.farmSize}</h4>
                                                <h5>{farm.farmSize}</h5>
                                            </div>
                                            <div>
                                                <h4>{text.plantingDate}</h4>
                                                <h5>{new Date(farm.plantingDate).toLocaleDateString()}</h5>
                                            </div>

                                        </div>
                                        <center>
                                            <div className="dn_btn">
                                                <button onClick={()=> { navigate(`/farm/monitor/${farm._id}`) }} className="vd_btn"><img src={eyelogo} alt="logo" /> VIEW DETAILS</button>
                                                <button onClick={() => deleteFarm(farm._id)} className="del_btn"><img className="dell_img" src={dellogo} alt="dellogo" /></button>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            )
                        }

                        )}
                    </div>
                </div>
            </section >
        </>
    )
}
export default FarmDashboard;