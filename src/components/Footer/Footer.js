import React from "react";
import "./Footer.css";
import Leaf from "../../img/leaf.png";

function Footer() {
    return (
        <div>
            <img alt="leaf" src={Leaf}
                style={{
                    float: 'right',
                    position: 'relative',
                    top: '0px',
                }}
            ></img>
            <div className="footer-container">
                <p>
                    Copyright @ 2021 Dewe Tour - Jaya Miko - NIS. All Rights
                    reserved
                </p>
            </div>
        </div>
    );
}

export default Footer;