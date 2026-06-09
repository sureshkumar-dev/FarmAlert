import type { JSX } from "react";
import "@/styles/Docs.css";
import logo1 from "@/assets/docs_20dp_.png";
import logo2 from "@/assets/docs_30dp_.png";
import logo3 from "@/assets/jamboard_kiosk_30dp_.png";
import logo4 from "@/assets/docs_30dp_3.png";
import crop1 from "@/assets/crop4.jpg";
import Nav from "@/components/Nav";
import viewlogo from "@/assets/visibility_30dp_.png";
import downlogo from "@/assets/download_30dp_.png";
import { useContext } from "react";
import { Langcontext } from "@/App";
import { docsTranslations } from "@/Locales/Docslang";
import Footer from "@/components/Footer";
function Docs(): JSX.Element {
    const lang = useContext(Langcontext);
    const text = docsTranslations[lang.translation]
    return (
        <>
            <Nav />
            <div className="docs">
                <div className="hero">
                    <div className="web_info">
                        <h1>{text.title}</h1>
                        <h4>{text.description}</h4>
                        <button className="btn-docs-1"> <img src={logo1} alt="logo" /> View Presentation</button>
                    </div>
                    <div className="image_div">
                        <img className="crop1" src={crop1} alt="img" />
                    </div>
                </div>
                <div className="project_docs">
                    <h1>{text.documentsTitle}</h1>
                    <h4>{text.documentsSubtitle}</h4>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <div className="doc_flex">
                            <div className="card-doc">
                                <img className="flex_logo-1" src={logo2} alt="" />
                                <h4>{text.reportTitle}</h4>
                                <h5>{text.reportType}</h5>
                                <div className="doc-btn-div">
                                    <button className="btn-docs" onClick={() => window.open("src/docs/acknowledgementSlip_S1334615804190.pdf", "_blank")} ><img src={viewlogo} alt="" /> {text.view}</button>
                                    <button className="btn-docs-2"> <img src={downlogo} alt="" /> {text.download}</button>
                                </div>
                            </div>
                            <div className="card-doc">
                                <img className="flex_logo-2" src={logo3} alt="" />
                                <h4>{text.pptTitle}</h4>
                                <h5>{text.pptType}</h5>
                                <div className="doc-btn-div">
                                    <button className="btn-docs" onClick={() => window.open("@/docs/project_report.pdf", "_blank")}> <img src={viewlogo} alt="" /> {text.view}</button>
                                    <button className="btn-docs-2"><img src={downlogo} alt="" /> {text.download}</button>
                                </div>
                            </div>
                            <div className="card-doc">
                                <img className="flex_logo-3" src={logo4} alt="" />
                                <h4>{text.srsTitle}</h4>
                                <h5>{text.srsType}</h5>
                                <div className="doc-btn-div">
                                    <button className="btn-docs"> <img src={viewlogo} alt="" onClick={() => window.open("@/docs/project_report.pdf", "_blank")} /> {text.view}</button>
                                    <button className="btn-docs-2"><img src={downlogo} alt="" /> {text.download}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Docs;