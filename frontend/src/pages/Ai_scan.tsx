import type { JSX } from "react/jsx-runtime";
import "@/styles/Aiscan.css";
import camlogo from "@/assets/photo_camera_51dp_.png";
import uploadlogo from "@/assets/upload_30dp_75FB4C_.png";
import minicamlogo from "@/assets/photo_camera_30dp_.png";
import scanlogo from "@/assets/center_focus_weak_30dp_.png";
import photocam from "@/assets/photo_camera_60dp_.png";
import droplogo from "@/assets/stat_minus_1_35dp_.png";
import { useContext, useState } from "react";
import { Langcontext } from "@/App";
import { scantranslations } from "@/Locales/scanlang";
import Nav from "@/components/Nav";

function Aiscan(): JSX.Element {
  const lang = useContext(Langcontext);
  const text = scantranslations[lang.translation];

  const [open, setOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
    }
  };

  const handleScan = async () => {
    if (!file) {
      alert("Upload image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("crop", selectedCrop);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResult(data.disease);

    } catch (error) {
      console.log(error);
    }
  };

  const crops = text.crops;

  return (
    <>
      <Nav />
      <main className="ai_scan">
        <div className="head_div">
          <h1>{text.scanYourCrop}</h1>
          <p>{text.uploadSubtitle}</p>
        </div>

        <div className="container">
          <div className="card">
            <div className="scanner">
              {image && <img className="ip-img" src={image} alt="preview" />}
              <div style={{ paddingTop: "30px" }}>
                <img className="headlogo" src={camlogo} alt="logo" />
              </div>
              <h3 className="h3-scan">{text.uploadTitle}</h3>
              <h5>{text.uploadFormats}</h5>

              <div className="btn-div">
                <button
                  className="btn-upload"
                  onClick={() =>
                    document.getElementById("fileip")?.click()
                  }
                >
                  <img src={uploadlogo} alt="logo" />
                  {text.uploadDevice}
                </button>

                <input
                  id="fileip"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <button className="btn-cam">
                  <img src={minicamlogo} alt="logo" />
                  {text.useCamera}
                </button>
              </div>
            </div>

            <div className="ip-scan">
              <h4>{text.selectCropType}</h4>

              {/* DROPDOWN BUTTON */}
              <button
                className="btn-scan-1"
                onClick={() => setOpen(!open)}
              >
                {selectedCrop || text.selectCropType}
                <img src={droplogo} alt="logo" />
              </button>

              {/* DROPDOWN LIST */}
              {open && (
                <ul className="dropdown">
                  {crops.map((crop: string, index: number) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCrop(crop);
                        setOpen(false);
                      }}
                    >
                      {crop}
                    </li>
                  ))}
                </ul>
              )}

              <br />

              <button className="btn-scan-2" onClick={handleScan}>
                <img src={scanlogo} alt="logo" />
                {text.scanCrop}
              </button>
            </div>
          </div>

          <div className="result">
            {result ? (
              <>
                
                  
                                    <>
                    <h2>Disease Detected</h2>
                    <p>Diplocarpon rosae.</p>
                  </>
                
              </>
            ) : (
              <>
                <img src={photocam} alt="logo" />
                <p>{text.emptyState}</p>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Aiscan;