import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "@/components/Nav";
import "@/styles/RegFarm.css";
import { translations } from "@/Locales/Regfarm";
import { Langcontext } from "@/App";
import { useContext, useState } from "react";
import farmlogo from "@/assets/home_30dp.png";
import maplogo from "@/assets/location_on_30dp.png";
import plantlogo from "@/assets/local_florist_30dp.png";
import waterlogo from "@/assets/water_drops_30dp.png";
import droplogo from "@/assets/stat_minus_1_35dp_.png";
import FarmMap from "@/components/satelitemap";
import { tanjoreData } from "@/Locales/tanjoreData";
import { districtData } from "@/Locales/districtdata";
import axios from "axios";

function RegFarm(): JSX.Element {
  const navigate = useNavigate();
  const lang = useContext(Langcontext);
  const text = translations[lang.translation];
  const [farmerName, setFarmerName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [mobile, setMobile] = useState("");
  const [smsLang, setSmsLang] = useState("");

  const [district, setDistrict] = useState(text.seldis);
  const [taluk, setTaluk] = useState(text.selectTaluk);
  const [village, setVillage] = useState(text.selectVillage);

  const [farmSize, setFarmSize] = useState("");
  const [soilType, setSoilType] = useState("");
  const [waterSource, setWaterSource] = useState("");

  const [cropName, setCropName] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [growthStage, setGrowthStage] = useState("");

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [farms, setFarms] = useState<any[]>([]);

  const taluks = district !== text.seldis
    ? Object.keys(districtData[district as keyof typeof districtData] || {})
    : [];
  const villages =
    district !== text.seldis &&
      taluk !== text.selectTaluk
      ? districtData[district as keyof typeof districtData]?.[taluk as keyof typeof districtData[keyof typeof districtData]] || []
      : [];


  const toggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const registerFarm = async () => {

    if (
      !farmerName ||
      !farmName ||
      !mobile ||
      !smsLang ||
      district === text.seldis ||
      taluk === text.selectTaluk ||
      village === text.selectVillage ||
      !farmSize ||
      !soilType ||
      !waterSource ||
      !cropName ||
      !cropVariety ||
      !plantingDate ||
      !growthStage ||
      !lat ||
      !lng
    ) {
      alert("Please fill all fields")
      return
    }

    const farm = {
      farmerName,
      farmName,
      mobile,
      smsLang,
      district,
      taluk,
      village,
      farmSize,
      latitude: lat,
      longitude: lng,
      soilType,
      waterSource,
      cropName,
      cropVariety,
      plantingDate,
      growthStage
    }

    setFarms(prev => [...prev, farm])

    console.log("Saved farm:", farm)
    const token = localStorage.getItem("token")
    try {
      await axios.post("http://localhost:5000/farm/register", farm, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      navigate("/myfarm")
    }
    catch (err) {
      console.log(err)
    }

  }

  console.log(farms)
  return (

    <>
      <Nav />

      <main className="Reg_farm_page">

        <div className="detail-col">

          <div className="detail-div">

            <div className="content-ip">

              <h1>
                <img src={farmlogo} /> {text.farmDetails}
              </h1>

              <div className="ip-grid">

                <div>
                  <h4>{text.farmerName}</h4>
                  <input placeholder={text.enterFarmerName} required className="ip-type-2" onChange={(e) => setFarmerName(e.target.value)} />
                </div>

                <div>
                  <h4>{text.farmName}</h4>
                  <input placeholder={text.enterFarmName} required className="ip-type-2" onChange={(e) => setFarmName(e.target.value)} />
                </div>

                <div>
                  <h4>{text.mobileNumber}</h4>
                  <input placeholder={text.enterMobileNumber} required className="ip-type-2" onChange={(e) => setMobile(e.target.value)} />
                </div>

                {/* SMS LANGUAGE FIXED */}

                <div style={{ position: "relative" }}>

                  <h4>{text.smsLanguage}</h4>

                  <button className="ip-drop-1" onClick={() => toggle("lang")}>
                    {smsLang || text.selectLanguage}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "lang" && (

                    <div className="dropdown-dis">

                      <div
                        className="item"
                        onClick={() => {
                          setSmsLang("EN")
                          setOpenDropdown(null)
                        }}
                      >
                        English
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setSmsLang("TA")
                          setOpenDropdown(null)
                        }}
                      >
                        Tamil
                      </div>

                    </div>

                  )}

                </div>

              </div>

              <div className="ip-grid" style={{ paddingTop: "20px" }}>

                {/* DISTRICT */}

                <div style={{ position: "relative" }}>

                  <h4>{text.district}</h4>

                  <button className="ip-drop-1" onClick={() => toggle("district")}>
                    {district}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "district" && (

                    <div className="dropdown-dis">

                      {Object.keys(districtData).map((d) => (
                        <div
                          key={d}
                          className="item"
                          onClick={() => {
                            setDistrict(d)
                            setTaluk(text.selectTaluk)
                            setVillage(text.selectVillage)
                            setOpenDropdown(null)
                          }}
                        >
                          {d}
                        </div>
                      ))}

                    </div>

                  )}

                </div>
                {/* TALUK */}

                <div style={{ position: "relative" }}>

                  <h4>{text.taluk}</h4>

                  <button className="ip-drop-1" onClick={() => toggle("taluk")}>
                    {taluk}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "taluk" && (

                    <div className="dropdown-dis">

                      {taluks.map((t) => (
                        <div
                          key={t}
                          className="item"
                          onClick={() => {
                            setTaluk(t)
                            setVillage(text.selectVillage)
                            setOpenDropdown(null)
                          }}
                        >
                          {t}
                        </div>
                      ))}

                    </div>

                  )}

                </div>

                {/* VILLAGE */}

                <div style={{ position: "relative" }}>

                  <h4>{text.village}</h4>

                  <button className="ip-drop-1" onClick={() => toggle("village")}>
                    {village}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "village" && (

                    <div className="dropdown-dis">

                      {villages.map((v: any) => (
                        <div
                          key={v}
                          className="item"
                          onClick={() => {
                            setVillage(v)
                            setOpenDropdown(null)
                          }}
                        >
                          {v}
                        </div>
                      ))}

                    </div>

                  )}

                </div>

                <div>
                  <h4>{text.farmSize}</h4>
                  <input placeholder={text.enterFarmSize} required className="ip-type-2" onChange={(e) => setFarmSize(e.target.value)} />
                </div>

              </div>

            </div>

          </div>

          {/* MAP */}

          <div className="detail-div">

            <div className="content-ip">

              <h1>
                <img src={maplogo} /> {text.farmLocation}
              </h1>

              <p>{text.mapClick}</p>

              <div className="map-div">
                <FarmMap setLat={setLat} setLng={setLng} />
              </div>

              <div className="ip-grid-1">

                <div>
                  <h4>{text.longitude}</h4>
                  <input placeholder={text.autoFilled} className="ip-type-2" value={lng ?? ""} readOnly />
                </div>

                <div>
                  <h4>{text.latitude}</h4>
                  <input placeholder={text.autoFilled} className="ip-type-2" value={lat ?? ""} readOnly />
                </div>

              </div>

            </div>

          </div>

          {/* SOIL */}

          <div className="detail-div">

            <div className="content-ip">

              <h1>
                <img src={waterlogo} /> {text.soilWaterDetails}
              </h1>

              <div className="ip-grid-1" style={{ paddingTop: "20px" }}>

                <div style={{ position: "relative" }}>

                  <h4>{text.soilType}</h4>

                  <button
                    className="ip-drop-1"
                    onClick={() => toggle("soil")}
                  >
                    {soilType || text.selectSoilType}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "soil" && (

                    <div className="dropdown-dis">

                      <div
                        className="item"
                        onClick={() => {
                          setSoilType(text.clay)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.clay}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setSoilType(text.sandy)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.sandy}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setSoilType(text.loamy)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.loamy}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setSoilType(text.black_soil)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.black_soil}
                      </div>

                    </div>

                  )}

                </div>

                <div style={{ position: "relative" }}>

                  <h4>{text.waterSource}</h4>

                  <button
                    className="ip-drop-1"
                    onClick={() => toggle("water")}
                  >
                    {waterSource || text.selectWaterSource}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "water" && (

                    <div className="dropdown-dis">

                      <div
                        className="item"
                        onClick={() => {
                          setWaterSource(text.canal)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.canal}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setWaterSource(text.borewell)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.borewell}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setWaterSource(text.river)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.river}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setWaterSource(text.rainfed)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.rainfed}
                      </div>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* CROP */}

          <div className="detail-div">

            <div className="content-ip">

              <h1>
                <img src={plantlogo} /> {text.cropDetails}
              </h1>

              <div className="ip-grid" style={{ paddingTop: "20px" }}>

                <div style={{ position: "relative" }}>

                  <h4>{text.cropName}</h4>

                  <button
                    className="ip-drop-1"
                    onClick={() => toggle("crop")}
                  >
                    {cropName || text.selectCrop}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "crop" && (

                    <div className="dropdown-dis">

                      <div
                        className="item"
                        onClick={() => {
                          setCropName(text.paddy)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.paddy}
                      </div>




                    </div>

                  )}

                </div>

                <div>
                  <h4>{text.cropVariety}</h4>
                  <input placeholder={text.cropVariety} required className="ip-type-2" onChange={(e) => setCropVariety(e.target.value)} />
                </div>

                <div>
                  <h4>{text.plantingDate}</h4>
                  <input required type="date" className="ip-type-2" onChange={(e) => setPlantingDate(e.target.value)} />
                </div>

                <div style={{ position: "relative" }}>

                  <h4>{text.cropGrowthStage}</h4>

                  <button
                    className="ip-drop-1"
                    onClick={() => toggle("stage")}
                  >
                    {growthStage || text.selectGrowthStage}
                    <img src={droplogo} />
                  </button>

                  {openDropdown === "stage" && (

                    <div className="dropdown-dis">

                      <div
                        className="item"
                        onClick={() => {
                          setGrowthStage(text.seedling)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.seedling}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setGrowthStage(text.vegetative)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.vegetative}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setGrowthStage(text.flowering)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.flowering}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setGrowthStage(text.fruiting)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.fruiting}
                      </div>

                      <div
                        className="item"
                        onClick={() => {
                          setGrowthStage(text.harvesting)
                          setOpenDropdown(null)
                        }}
                      >
                        {text.harvesting}
                      </div>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

          <div className="submit">

            <button className="btn-submit-1">{text.cancel}</button>
            <button className="btn-submit-2" onClick={registerFarm}>{text.registerFarm}</button>

          </div>

        </div>

      </main>

    </>

  )

}

export default RegFarm;