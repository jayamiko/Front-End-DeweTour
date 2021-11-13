import React from "react";
import "./Footer.css";
import Leaf from "../../img/leaf.png";

function Footer() {
    return (
        <div>
            <div className="footer-container">
                <p>
                    Copyright @ 2020 Dewe Tour - Jaya Miko - NIS. All Rights
                    reserved
                </p>
                <img alt="leaf" src={Leaf}></img>
            </div>
        </div>
    );
}

export default Footer;