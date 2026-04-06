import React, { useEffect } from "react";
import "@/styles/AirQuality.css";
import { useState } from "react";
import axios from "axios";

interface AirQualityProps {
    data?: {
        current?: {
            us_aqi?: number;
            pm2_5?: number;
            pm10?: number;
            carbon_monoxide?: number;
            nitrogen_dioxide?: number;
            ozone?: number;
            sulphur_dioxide?: number;
            dust?: number;
            time?: string;
        };
    };
}

const AirQuality = ({data}: AirQualityProps) => {
    const current = data?.current || {};

    return (
        <div className="air-quality-container">
            <h2>Air Quality</h2>

            <div className="aq-grid">
                <div className="aq-card">
                    <span>US AQI</span>
                    <strong>{current.us_aqi}</strong>
                </div>

                <div className="aq-card">
                    <span>PM2.5</span>
                    <strong>{current.pm2_5} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>PM10</span>
                    <strong>{current.pm10} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>CO</span>
                    <strong>{current.carbon_monoxide} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>NO₂</span>
                    <strong>{current.nitrogen_dioxide} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>Ozone</span>
                    <strong>{current.ozone} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>SO₂</span>
                    <strong>{current.sulphur_dioxide} μg/m³</strong>
                </div>

                <div className="aq-card">
                    <span>Dust</span>
                    <strong>{current.dust} μg/m³</strong>
                </div>
            </div>

            <div className="aq-time">
                Updated: {current.time}
            </div>
        </div>
    );
};

export default AirQuality;