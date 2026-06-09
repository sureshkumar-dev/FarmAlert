import type { JSX } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "@/pages/Home";
import Authentication from "@/components/Authentication";
import AccContainer from "@/components/acc_container";
import Monitoring from "@/pages/Monitoring";
import Myfarm from "@/pages/Myfarm";
import FarmDashboard from "@/pages/Farm_dashboard";
import RegFarm from "@/pages/RegFarm";
import Aiscan from "@/pages/Ai_scan";
import CropPlanner from "@/pages/Crop_planner";
import Docs from "@/pages/Docs";
import NotFound from "./pages/Not_found";
import  { createContext, useState } from "react";
interface context{
  translation:Language,
  toggle:() => void
}
type Language = "en" | "ta"
export const Langcontext = createContext<context>({ translation: "en", toggle: () => {} })

function App():JSX.Element{
  
  const[translation,settranslation] = useState<Language>("en")
  function toggle():void{
    settranslation(translation === "en"? "ta" : "en")
  }
  return(
    <>  
        <Langcontext.Provider value={{translation, toggle}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/select-service" element={<Myfarm/>} />
            <Route path="/myfarm" element={<FarmDashboard/>} />
            <Route path="/reg-farm" element={<RegFarm />} />
            <Route path="/ai-scan" element={<Aiscan />} />
            <Route path="/crop-planner" element={<CropPlanner/>} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/account" element={ <AccContainer />} />
            <Route path= "/farm/monitor/:id" element={ <Monitoring />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Langcontext.Provider>
        
    </>
  )
}

export default App
