import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
interface buttonprops{
    text:string,
    bgcolor:string,
    textcolor:string,
    bordercolor:string,
    width:string,
    pathname?:string,
    onclick?:any
}

function Button_primary({onclick,text,bgcolor,textcolor,bordercolor,width,pathname}:buttonprops):JSX.Element{
    const navigate = useNavigate();
    return(
        <>

        <button
  onClick={() => {
    if (onclick) onclick();   // run your function
    if (pathname) navigate(pathname); // then navigate if needed
  }}
  className="btn_primary"
  style={{
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "medium",
    fontWeight: "600",
    outline: "none",
    letterSpacing: "0.5px",
    height: "47px",
    width: width,
    backgroundColor: bgcolor,
    color: textcolor,
    border: `2px solid ${bordercolor}`
  }}
>
  {text}
</button>
        
        
        </>
    )
}
export default Button_primary