import type { JSX } from "react";
import { useContext, useState } from "react";
import { Langcontext } from "@/App";
import { Langdata } from "@/Locales/language";
import "@/styles/AuthMobile.css";
import Button_primary from "./Button_primary";

const AuthMobile = (): JSX.Element => {
  const lang = useContext(Langcontext);
  const text = Langdata[lang.translation];

  const [isLogin, setIsLogin] = useState(true);
  const [langBg, setLangBg] = useState(lang.translation === "en");

  function changeLang() {
    lang.toggle();
    setLangBg((prev) => !prev);
  }

  return (
    <div className="auth-page">
      {/* Language Switch */}
      <div className="lang-switch">
        <span
          className={`lang-btn ${langBg ? "active" : ""}`}
          onClick={changeLang}
        >
          EN
        </span>
        <span
          className={`lang-btn ${!langBg ? "active" : ""}`}
          onClick={changeLang}
        >
          TA
        </span>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">
          {isLogin ? text.login_title : text.create_account_title}
        </h2>

        <p className="auth-subtitle">
          {isLogin ? text.login_subtitle : text.create_account_subtitle}
        </p>

        {!isLogin && (
          <div className="input-group">
            <label>{text.full_name}</label>
            <input
              type="text"
              placeholder={text.full_name_placeholder}
              className="auth-input"
            />
          </div>
        )}

        <div className="input-group">
          <label>{isLogin ? text.email_label : text.email}</label>
          <input
            type="email"
            placeholder={text.email_placeholder}
            className="auth-input"
          />
        </div>

        <div className="input-group">
          <label>{isLogin ? text.password_label : text.password}</label>
          <input
            type="password"
            placeholder={text.password_placeholder}
            className="auth-input"
          />
        </div>

        {!isLogin && (
          <div className="input-group">
            <label>{text.confirm_password}</label>
            <input type="password" className="auth-input" />
          </div>
        )}

        {isLogin && (
          <div className="remember-row">
            <div className="remember-left">
              <input type="checkbox" />
              <span>{text.remember_me}</span>
            </div>
            <span className="forgot-text">{text.forgot_password}</span>
          </div>
        )}

        <Button_primary
          text={isLogin ? text.sign_in_button : text.create_account_btn}
          bgcolor="#186b38"
          textcolor="white"
          bordercolor="#186b38"
          width="100%"
        />

        {/* Simple OR text (no pseudo elements) */}
        <p className="or-text">{text.divider_text || text.or_text}</p>

        <Button_primary
          text={isLogin ? text.google_button : text.continue_google}
          bgcolor="#ffffff"
          textcolor="#000"
          bordercolor="#4CAF50"
          width="100%"
        />

        <p className="bottom-text">
          {isLogin ? text.no_account_text : text.already_account}
          <span
            className="link-text"
            onClick={() => setIsLogin(!isLogin)}
          >
            {" "}
            {isLogin ? text.sign_up_link : text.sign_in}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthMobile;