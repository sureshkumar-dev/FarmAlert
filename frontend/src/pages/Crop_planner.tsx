import "@/styles/Crop_planner.css";
import Nav from "@/components/Nav";
import type { JSX } from "react";
import { useContext, useState } from "react";
import { Langcontext } from "@/App";
import { cropPlannerTranslations } from "@/Locales/plannerlang";
import droplogo from "@/assets/stat_minus_1_35dp_.png";
import starlogo from "@/assets/event_available_45dp_.png"

function CropPlanner(): JSX.Element {
  const lang = useContext(Langcontext);
  const text = cropPlannerTranslations[lang.translation];

  const [formData, setFormData] = useState({
    district: "",
    soilType: "",
    waterSource: "",
    season: "",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [error, setError] = useState("");

  const options = text.options;

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpenDropdown(null);
    setError("");
  };

  const validateForm = () => {
    if (!formData.district) return "Select district";
    if (!formData.soilType) return "Select soil type";
    if (!formData.waterSource) return "Select water source";
    if (!formData.season) return "Select season";
    return "";
  };

  const handleGetPlan = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    localStorage.setItem("cropPlanData", JSON.stringify(formData));

    console.log("Saved Data:", formData);

    alert("Plan saved successfully 🚀");
  };

  const renderDropdown = (
    field: keyof typeof options,
    label: string,
    placeholder: string
  ) => (
    <div className="dropdown-container">
      <h4 className="grid-h4">{label}</h4>

      <button
        className="btn-type-1"
        onClick={() =>
          setOpenDropdown(openDropdown === field ? null : field)
        }
      >
        {formData[field] || placeholder}
        <img src={droplogo} alt="logo" />
      </button>

      {openDropdown === field && (
        <div className="dropdown">
          {options[field].map((item) => (
            <div
              key={item}
              className="dropdown-item"
              onClick={() => handleSelect(field, item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <main className="Crop_planner">
      <Nav />

      <div className="planner">
        <h1>Agriculture <span style={{color:"#44a635"}}>Planner</span> </h1>

        <div className="plan_card">
          <p>{text.subtitle}</p>

          <div className="ip-grid">
            {renderDropdown("district", text.district, text.selectDistrict)}
            {renderDropdown("soilType", text.soilType, text.selectSoilType)}
            {renderDropdown("waterSource", text.waterSource, text.selectWaterSource)}
            {renderDropdown("season", text.season, text.selectSeason)}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="btn-type-2" onClick={handleGetPlan}>
            {text.getPlan}
          </button>
        </div>
        <div className="plan">
            <img src={starlogo} alt="logo" />
            <h3>{text.emptyState}</h3>
        </div>
      </div>
      
    </main>
  );
}

export default CropPlanner;