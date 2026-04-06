import "@/styles/Monitoring.css";
import type { JSX } from "react";
import { useContext, useEffect, useState } from "react";
import { Langcontext } from "@/App";
import { Monitorlang } from "@/Locales/Monitorlang";
import Nav from "@/components/Nav";
import templogo from "@/assets/thermometer_50dp_FFFFFF.png";
import humiditylogo from "@/assets/water_drops_50dp_FFFFFF.png";
import plantlogo from "@/assets/psychiatry_50dp_FFFFFF.png";
import rainlogo from "@/assets/thunderstorm_50dp_FFFFFF.png";
import alertlogo from "@/assets/crisis_alert_40dp_FFFFFF.png";
import weatheralertlogo from "@/assets/rainy_40dp_FFFFFF.png";
import irrlogo from "@/assets/water_pump_40dp_FFFFFF.png";
import windlogo from "@/assets/wind_power_50dp_FFFFFF.png";
import cloudlogo from "@/assets/cloud_50dp_FFFFFF_.png";
import dewlogo from "@/assets/dew_point_50dp_FFFFFF.png";
import daylogo from "@/assets/brightness_6_50dp_FFFFFF.png";
import AirQuality from "@/components/Airquality";
import blast from "@/assets/RiceBlast1.jpg"
import brownspot from "@/assets/brown-spot-3.jpg"
import blight from "@/assets/bacterial-leaf-blight-1.jpeg"
import tungro from "@/assets/tungro-plant.jpg"
import sheathrot from "@/assets/sheath-rot-1.jpg"
import sheathblight from "@/assets/sheath-blight-2.jpg"
import falsesmut from "@/assets/false-smut-black-spores.jpg"
import grain from "@/assets/Screenshot 2026-04-04 135845.png";


import {
    CartesianGrid
} from "recharts";
import { useParams } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import axios from "axios";



function Monitoring(): JSX.Element {
    const { id } = useParams();
    const lang = useContext(Langcontext);
    const text = Monitorlang[lang.translation];
    const [farmdata, setfarmdata] = useState<any[]>([]);
    const [temp, settemp] = useState<any>();
    const [humidity, sethumidity] = useState<any>();
    const [soilmoiz, setsoilmoiz] = useState<any>();
    const [rainprob, setrainprob] = useState<any>();
    const [windspeed, setwindspeed] = useState<any>();
    const [dewpoint, setdewpoint] = useState<any>();
    const [cloudcover, setcloudcover] = useState<any>();
    const [daysts, setdaysts] = useState<any>();
    const [datagraphs, setdatagraphs] = useState<any>();
    const [tempData, setTempData] = useState<any>();
    const [data, setdata] = useState<any>();
    const [disease, setdisease] = useState<string>();
    const [diseases, setdiseases] = useState<any[]>([])
    const [rainAlert, setRainAlert] = useState({
        level: "",
        msg: ""
    })
    const [waterAlert, setWaterAlert] = useState({
        level: "",
        msg: ""
    })


    const fetchdetail = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:5000/farm/monitor/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setfarmdata(res.data.data)

        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchdetail();
    }, [])
    const getWaterAlert = (soil: number, rain: number, temp: number) => {

        if (soil <= 0.10 && rain <= 2) {
            setWaterAlert({
                level: "High",
                msg: "Soil moisture very low. Immediate irrigation required."
            })
        }

        else if (soil <= 0.15 && rain <= 3) {
            setWaterAlert({
                level: "Medium",
                msg: "Soil moisture decreasing. Plan irrigation."
            })
        }

        else if (soil >= 0.15 && rain >= 2) {
            setWaterAlert({
                level: "Safe",
                msg: "Soil moisture adequate. No irrigation needed."
            })
        }

        else if (rain >= 5) {
            setWaterAlert({
                level: "Low",
                msg: "Rain expected. Avoid irrigation."
            })
        }

        else {
            setWaterAlert({
                level: "Safe",
                msg: "Water level normal."
            })
        }

    }
    const fetchtemp = async () => {
        try {

            const lat = farmdata[0]?.latitude;
            const lan = farmdata[0]?.longitude;
            const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lan}&hourly=temperature_2m,relative_humidity_2m,precipitation,precipitation_probability,soil_moisture_9_to_27cm,wind_speed_10m,cloud_cover,dew_point_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,cloud_cover,wind_speed_10m,snowfall,showers`)
            console.log(res.data)
            const resair = await axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lan}&current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust`)
            console.log(resair.data)
            setdata(resair.data)
            const data = res.data;
            const avg = (arr: any, start: any, end: any) => {
                const slice = arr.slice(start, end)
                return slice.reduce((a: any, b: any) => a + b, 0) / slice.length
            }
            const threeday = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lan}&daily=apparent_temperature_max,temperature_2m_max,rain_sum,wind_speed_10m_max,precipitation_hours,precipitation_probability_max,et0_fao_evapotranspiration,shortwave_radiation_sum,wind_direction_10m_dominant,wind_gusts_10m_max,showers_sum,snowfall_sum,precipitation_sum,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,weather_code,temperature_2m_min,apparent_temperature_min&hourly=soil_moisture_27_to_81cm,soil_moisture_9_to_27cm,soil_moisture_3_to_9cm,soil_moisture_1_to_3cm,soil_moisture_0_to_1cm,soil_temperature_54cm,soil_temperature_18cm,soil_temperature_6cm,soil_temperature_0cm,temperature_180m,temperature_120m,temperature_80m,wind_gusts_10m,wind_direction_180m,wind_direction_120m,wind_direction_80m,wind_direction_10m,wind_speed_180m,wind_speed_120m,wind_speed_80m,wind_speed_10m,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_mid,cloud_cover_low,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,snow_depth,snowfall,showers,rain,precipitation,precipitation_probability,apparent_temperature,dew_point_2m,relative_humidity_2m,temperature_2m&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=3`)
            console.log("tereeday data", threeday.data)
            const avgdata = threeday.data
            const tempAvg = avg(avgdata.hourly.temperature_2m, 0, 72)
            const humidityAvg = avg(avgdata.hourly.relative_humidity_2m, 0, 72)
            const rainSum = avgdata.hourly.precipitation.slice(0, 72).reduce((a: any, b: any) => a + b)
            const windAvg = avg(avgdata.hourly.wind_speed_10m, 0, 72)
            const cloudAvg = avg(avgdata.hourly.cloud_cover, 0, 72)
            const soilAvg = avg(avgdata.hourly.soil_moisture_0_to_1cm, 0, 72);
            console.log("avg data", tempAvg, humidityAvg, rainSum, windAvg, cloudAvg, soilAvg)
            let score = 0

            // Temperature
            if (temp >= 26 && temp <= 32) score += 15

            // Humidity
            if (humidity >= 80) score += 15
            else if (humidity >= 70) score += 8

            // Rain
            if (rainSum >= 15) score += 15
            else if (rainSum >= 5) score += 8

            // Wind
            if (windAvg <= 5) score += 10
            else if (windAvg <= 8) score += 5

            // Cloud
            if (cloudAvg >= 85) score += 10
            else if (cloudAvg >= 60) score += 5

            // Soil
            if (soilAvg >= 0.12) score += 10
            else if (soilAvg >= 0.08) score += 5
            let risk = "Low"

            if (score > 60) risk = "High"
            else if (score > 30) risk = "Medium"
            console.log(risk, score);

            const getRiskLevel = (score: number) => {
                if (score >= 70) return "High"
                if (score >= 40) return "Medium"
                return "Low"
            }
            const detectDiseases = () => {
                const diseasesList: any[] = []

                const MIN_THRESHOLD = 50



                // Rice Blast
                let blast = 0

                if (tempAvg >= 24 && tempAvg <= 28) blast += 20
                if (humidityAvg >= 85) blast += 30
                if (rainSum >= 8) blast += 20
                if (cloudAvg >= 85) blast += 15
                if (soilAvg >= 0.18) blast += 15

                if (blast >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Blast",
                        score: blast,
                        risk: getRiskLevel(blast)
                    })
                }

                // Brown Spot
                let brown = 0

                if (tempAvg >= 28 && tempAvg <= 36) brown += 25
                if (humidityAvg <= 70) brown += 25
                if (rainSum <= 3) brown += 25
                if (soilAvg <= 0.12) brown += 25

                if (brown >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Brown Spot",
                        score: brown,
                        risk: getRiskLevel(brown)
                    })
                }

                // Bacterial Leaf Blight
                let blight = 0

                if (tempAvg >= 25 && tempAvg <= 34) blight += 20
                if (humidityAvg >= 85) blight += 30
                if (rainSum >= 8) blight += 25
                if (windAvg <= 5) blight += 15

                if (blight >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Bacterial Leaf Blight",
                        score: blight,
                        risk: getRiskLevel(blight)
                    })
                }

                // Rice Tungro (vector disease → weaker weight)
                let tungro = 0

                if (tempAvg >= 26 && tempAvg <= 32) tungro += 15
                if (humidityAvg >= 80) tungro += 15
                if (windAvg <= 5) tungro += 10

                if (tungro >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Rice Tungro",
                        score: tungro,
                        risk: getRiskLevel(tungro)
                    })
                }

                // Sheath Rot
                let sheathRot = 0

                if (tempAvg >= 25 && tempAvg <= 30) sheathRot += 20
                if (humidityAvg >= 85) sheathRot += 30
                if (cloudAvg >= 80) sheathRot += 20
                if (rainSum >= 5) sheathRot += 15
                if (soilAvg >= 0.15) sheathRot += 15

                if (sheathRot >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Sheath Rot",
                        score: sheathRot,
                        risk: getRiskLevel(sheathRot)
                    })
                }

                // Sheath Blight
                let sheathBlight = 0

                if (tempAvg >= 28 && tempAvg <= 32) sheathBlight += 25
                if (humidityAvg >= 85) sheathBlight += 30
                if (soilAvg >= 0.18) sheathBlight += 25
                if (rainSum >= 8) sheathBlight += 20

                if (sheathBlight >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Sheath Blight",
                        score: sheathBlight,
                        risk: getRiskLevel(sheathBlight)
                    })
                }

                // False Smut
                let falseSmut = 0

                if (tempAvg >= 20 && tempAvg <= 30) falseSmut += 20
                if (humidityAvg >= 85) falseSmut += 30
                if (cloudAvg >= 80) falseSmut += 20
                if (rainSum >= 8) falseSmut += 15

                if (falseSmut >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "False Smut",
                        score: falseSmut,
                        risk: getRiskLevel(falseSmut)
                    })
                }

                // Bacterial Leaf Streak
                let leafStreak = 0

                if (tempAvg >= 25 && tempAvg <= 35) leafStreak += 20
                if (humidityAvg >= 85) leafStreak += 25
                if (rainSum >= 8) leafStreak += 25
                if (windAvg <= 5) leafStreak += 15

                if (leafStreak >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Bacterial Leaf Streak",
                        score: leafStreak,
                        risk: getRiskLevel(leafStreak)
                    })
                }

                // Bakanae (seed borne → weak)
                let bakanae = 0

                if (tempAvg >= 28 && tempAvg <= 32) bakanae += 15
                if (humidityAvg >= 80) bakanae += 15

                if (bakanae >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Bakanae",
                        score: bakanae,
                        risk: getRiskLevel(bakanae)
                    })
                }

                // Rice Yellow Dwarf
                let yellowDwarf = 0

                if (tempAvg >= 25 && tempAvg <= 32) yellowDwarf += 15
                if (humidityAvg >= 80) yellowDwarf += 15
                if (windAvg <= 5) yellowDwarf += 10

                if (yellowDwarf >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Rice Yellow Dwarf",
                        score: yellowDwarf,
                        risk: getRiskLevel(yellowDwarf)
                    })
                }

                // Rice Grassy stunt
                let grassy = 0

                if (tempAvg >= 26 && tempAvg <= 32) grassy += 15
                if (humidityAvg >= 85) grassy += 15
                if (windAvg <= 5) grassy += 10

                if (grassy >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Rice Grassy stunt",
                        score: grassy,
                        risk: getRiskLevel(grassy)
                    })
                }

                // Grain discolouration
                let grain = 0

                if (tempAvg >= 25 && tempAvg <= 32) grain += 20
                if (humidityAvg >= 85) grain += 30
                if (rainSum >= 8) grain += 25
                if (cloudAvg >= 80) grain += 15

                if (grain >= MIN_THRESHOLD) {
                    diseasesList.push({
                        name: "Grain discolouration",
                        score: grain,
                        risk: getRiskLevel(grain)
                    })
                }

                // Sort highest first
                diseasesList.sort((a: any, b: any) => b.score - a.score)

                // Show top 3 only
                const finalDiseases = diseasesList.slice(0, 3)

                console.log("Disease Prediction", finalDiseases)
                setdiseases(finalDiseases)
                return diseasesList

            }
            console.log("sentaleret", farmdata)

            const diseaseList = detectDiseases();
            if (diseaseList.length > 0) {

                setRainAlert({
                    level: "Risk",
                    msg: "Weather conditions favorable for crop disease development."
                })
            }

            console.log("Disease Prediction", diseaseList)
            const maxScore = Math.max(...diseaseList.map((d: any) => d.score))

            let overallRisk = "Low"

            if (maxScore >= 70) overallRisk = "High"
            else if (maxScore >= 40) overallRisk = "Medium"
            console.log(overallRisk)

            const prepareTempData = (dataRes: any) => {
                const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                const weeklyTemp = []
                for (let i = 0; i < 168; i += 24) {
                    const temp = dataRes.hourly.temperature_2m.slice(i, i + 24)
                    const avgTemp = temp.reduce((a: any, b: any) => a + b, 0) / temp.length
                    weeklyTemp.push({
                        day: days[i / 24],
                        temperature: avgTemp.toFixed(1)
                    })

                }



                return weeklyTemp

            }
            setTempData(prepareTempData(data));
            const getRainAlert = (rainProb: number) => {

                if (rainProb >= 80) {
                    setRainAlert({
                        level: "High",
                        msg: "Heavy rain expected. High risk of crop disease. Ensure drainage."
                    })
                }

                else if (rainProb >= 60) {
                    setRainAlert({
                        level: "Medium",
                        msg: "Moderate rain expected. Disease risk increasing."
                    })
                }

                else if (rainProb >= 40) {
                    setRainAlert({
                        level: "Low",
                        msg: "Light rain possible."
                    })
                }

                else {
                    setRainAlert({
                        level: "Safe",
                        msg: "No significant rainfall expected."
                    })
                }

            }
            getRainAlert(data.hourly.precipitation[0])
            const dailyRain = []

            for (let i = 0; i < 168; i += 24) {
                const day: any = data.hourly.precipitation.slice(i, i + 24)
                const avg = day.reduce((a: number, b: number) => a + b, 0)
                dailyRain.push(avg)
            }
            const dataGraph = [
                { day: "Mon", rain: dailyRain[0] },
                { day: "Tue", rain: dailyRain[1] },
                { day: "Wed", rain: dailyRain[2] },
                { day: "Thu", rain: dailyRain[3] },
                { day: "Fri", rain: dailyRain[4] },
                { day: "Sat", rain: dailyRain[5] },
                { day: "Sun", rain: dailyRain[6] },
            ];
            setdatagraphs(dataGraph)
            console.log(dailyRain)
            const current = res.data.current;
            const soil = res.data.hourly.soil_moisture_9_to_27cm[0];
            settemp(current.temperature_2m);
            sethumidity(current.relative_humidity_2m)
            setsoilmoiz(soil);
            setrainprob(data.hourly.precipitation[0]);
            setwindspeed(current.wind_speed_10m);
            setcloudcover(current.cloud_cover);
            const day = () => {
                const day = current.is_day;
                if (day) {
                    setdaysts("Day");
                }
                else
                    setdaysts("Night");
            }
            day();
            setdewpoint(res.data.hourly.dew_point_2m[0]);
            getWaterAlert(
                soil,
                data.hourly.precipitation[0],
                current.temperature_2m
            )

        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log("farmdata:", farmdata)
        if (farmdata.length > 0) {
            fetchtemp()
        }

    }, [farmdata])
    const diseaseFertilizer: any = {

        Blast: [
            {
                name: "Silicon Fertilizer",
                desc: "Used for Blast disease prevention",
                recommended: "20 kg/acre"
            },
            {
                name: "Potassium (K)",
                desc: "Used for Blast disease resistance",
                recommended: "16 kg/acre"
            }
        ],

        "Brown Spot": [
            {
                name: "Nitrogen (Urea)",
                desc: "Used for Brown Spot recovery",
                recommended: "40 kg/acre"
            },
            {
                name: "Zinc Sulphate",
                desc: "Used for Brown Spot nutrient correction",
                recommended: "10 kg/acre"
            }
        ],

        "Bacterial Leaf Blight": [
            {
                name: "Calcium Nitrate",
                desc: "Used for Bacterial Leaf Blight control",
                recommended: "10 kg/acre"
            }
        ],

        "Rice Tungro": [
            {
                name: "Balanced NPK",
                desc: "Used for Rice Tungro plant recovery",
                recommended: "50:25:16 kg/acre"
            }
        ],

        "Sheath Rot": [
            {
                name: "Calcium Nitrate",
                desc: "Used for Sheath Rot disease control",
                recommended: "10 kg/acre"
            },
            {
                name: "Potassium (K)",
                desc: "Used for Sheath Rot resistance",
                recommended: "16 kg/acre"
            }
        ],

        "Sheath Blight": [
            {
                name: "Silicon Fertilizer",
                desc: "Used for Sheath Blight prevention",
                recommended: "16 kg/acre"
            }
        ],

        "False Smut": [
            {
                name: "Boron",
                desc: "Used for False Smut grain protection",
                recommended: "4 kg/acre"
            },
            {
                name: "Potassium (K)",
                desc: "Used for False Smut resistance",
                recommended: "12 kg/acre"
            }
        ],

        "Grain discolouration": [
            {
                name: "Boron",
                desc: "Used for Grain Discolouration control",
                recommended: "4 kg/acre"
            },
            {
                name: "Potassium (K)",
                desc: "Used for Grain Discolouration resistance",
                recommended: "16 kg/acre"
            }
        ]


    }

    const fertilizerMap = new Map()

    diseases.forEach((d: any) => {
        if (diseaseFertilizer[d.name]) {

            diseaseFertilizer[d.name].forEach((f: any) => {
                fertilizerMap.set(f.name, f)
            })

        }
    })

    const fertilizerList = Array.from(fertilizerMap.values())
    const diseaseImages: any = {

        "Blast": blast,

        "Brown Spot": brownspot,

        "Bacterial Leaf Blight": blight,

        "Rice Tungro": tungro,

        "Sheath Rot": sheathrot,

        "Sheath Blight": sheathblight,

        "False Smut": falsesmut,

        "Grain discolouration": grain

    }
    const sentalert = async () => {

        console.log("alert function called")

        if (!farmdata[0] || diseases.length === 0) return

        const diseaseMsg = diseases
            .map((d: any) => `${d.name} (${d.score}%)`)
            .join(", ")

        const message = `
Disease Detected:
${diseaseMsg}

 Action Required:
Check field immediately and apply recommended treatment.`

        try {

            const res = await axios.post("http://localhost:5000/sent-alert", {
                phone: farmdata[0].mobile,
                message: message
            })

            console.log("SMS Response:", res.data)

        } catch (error) {

            console.log("SMS Error:", error)

        }

    }
    useEffect(() => {

        if (
            farmdata.length > 0 &&
            diseases.length > 0
        ) {
            console.log("Sending SMS now")
            sentalert()
        }

    }, [farmdata, diseases])
    return (
        <>
            <div className="monitoring">
                <Nav />

                <div className="monitor_section">
                    <h2>{text.liveEnvironment}</h2>
                    <div className="monitor_cards">
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#f5615d" }} src={templogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.temperature}</p>
                                <h1 className="mon_value">{temp}°C</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#3fa2f2" }} src={humiditylogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.humidity}</p>
                                <h1 className="mon_value">{humidity}%</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#43bf59" }} src={plantlogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.soilMoisture}</p>
                                <h1 className="mon_value">{soilmoiz}%</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>
                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#6366F1" }} src={windlogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.windSpeed}</p>
                                <h1 className="mon_value">{windspeed} km/h</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#14B8A6" }} src={dewlogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.dewPoint}</p>
                                <h1 className="mon_value">{dewpoint} °C</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#0EA5E9" }} src={rainlogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.rainProbability}</p>
                                <h1 className="mon_value">{rainprob} %</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#64748B" }} src={cloudlogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.cloudCover}</p>
                                <h1 className="mon_value">{cloudcover} %</h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>
                        <div className="monitor_card">
                            <img style={{ backgroundColor: "#F59E0B" }} src={daylogo} className="monitor_logo" />
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <p className="mon_title">{text.daystatus}</p>
                                <h1 className="mon_value">{daysts} </h1>
                                <p className="mon_warning">{text.good}</p>
                            </div>

                        </div>

                    </div>
                    <AirQuality data={data} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gridTemplateRows: "repeat(2,1fr", height: "400px", paddingTop: "50px" }}>
                        <div className="graph">
                            <h2 style={{ paddingBottom: "20px", paddingTop: "10px" }}>{text.raingraph}</h2>
                            <ResponsiveContainer width="100%" height={300} >
                                <LineChart data={datagraphs}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="rain" stroke="#0EA5E9" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>

                        <div className="tempgraph">
                            <h2 style={{ paddingBottom: "20px", paddingTop: "10px" }}>{text.wt}</h2>


                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={tempData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="temperature"
                                        stroke="#f5615d"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />

                                </LineChart>
                            </ResponsiveContainer>



                        </div>
                    </div>

                    <div className="farm_info">
                        <h2 style={{ paddingBottom: "10px" }}>{text.farmInfo}</h2>
                        <div className="info_cards">
                            <div className="info_card">
                                <p className="info_p">{text.farmNameh}</p>
                                <h3 className="info_h3">{farmdata[0]?.farmName}</h3>
                            </div>
                            <div className="info_card">
                                <p className="info_p">{text.farmerName}</p>
                                <h3 className="info_h3">{farmdata[0]?.farmerName}</h3>
                            </div>
                            <div className="info_card">
                                <p className="info_p">{text.soilType}</p>
                                <h3 className="info_h3">{farmdata[0]?.soilType}</h3>
                            </div>
                            <div className="info_card">
                                <p className="info_p">{text.farmSize}</p>
                                <h3 className="info_h3">{farmdata[0]?.farmSize}</h3>
                            </div>
                            <div className="info_card">
                                <p className="info_p">{text.createdDate}</p>
                                <h3 className="info_h3">{new Date(farmdata[0]?.plantingDate).toDateString()}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="monitor_alert">
                        <h2>{text.alerts}</h2>
                        <div className="alert_cards">
                            <div className="alert_card" style={{ background: " linear-gradient(135deg, #ff6b6b, #ff4b4b)" }}>
                                <img src={alertlogo} alt="" className="alert_logo" />
                                <div style={{ width: "80%", float: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                    <h3 className="alert_h3">{text.diseaseAlert}</h3>
                                    {diseases.map((disease: any, index: number) => (
                                        <div key={index}>
                                            <p className="alert_desc">{disease.name}   {disease.score}%</p>

                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="alert_card" style={{ background: "linear-gradient(135deg, #ff9f43, #ff7a18)" }}>
                                <img src={weatheralertlogo} alt="" className="alert_logo" />
                                <div style={{ width: "80%", float: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                    <h3 className="alert_h3">{text.weatherAlert}</h3>
                                    <p className="alert_desc">{rainAlert.msg}</p>
                                </div>
                            </div>
                            <div className="alert_card" style={{ background: "linear-gradient(135deg, #ffd93d, #f4c430)" }}>
                                <img src={irrlogo} alt="" className="alert_logo" />
                                <div style={{ width: "80%", float: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                    <h3 className="alert_h3">{text.waterAlert}</h3>
                                    <p className="alert_desc">{waterAlert.msg}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="disease-section">

                    <h2 style={{ paddingBottom: "10px" }}>Detected Diseases</h2>

                    <div className="disease-container">

                        {
                            diseases.map((d: any, index: number) => (
                                <div className="disease-card" key={index}>

                                    <img
                                        src={diseaseImages[d.name]}
                                        alt={d.name}
                                        className="disease-img"
                                    />

                                    <h3>{d.name}</h3>

                                    <p>{d.risk} Risk</p>

                                </div>
                            ))
                        }

                    </div>

                </div>
                <section className="fertilizer-section">

                    <h2 className="section-title">
                        {text.fertilizer}
                    </h2>

                    <div className="fertilizer-container">

                        {
                            fertilizerList.map((item, index) => (
                                <div className="fertilizer-card" key={index}>

                                    <h3>{item.name}</h3>

                                    <p>{item.desc}</p>

                                    <span>
                                        Recommended: {item.recommended}
                                    </span>

                                    <button>
                                        {text.apply}
                                    </button>

                                </div>
                            ))
                        }

                    </div>

                </section>

            </div>
        </>
    )
}
export default Monitoring;