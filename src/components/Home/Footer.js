import React from "react";
import { Link } from "react-router-dom";

import logoIcon from "../../assets/images/coffee 1.png";
import facebookIcon from "../../assets/images/Facebook.png";
import twitterIcon from "../../assets/images/Twitter.png";
import instagramIcon from "../../assets/images/Instagram.png";

function Footer() {
  return (
    <footer className="row footer-container container-fluid">
      <aside className="col col-6 left-side">
        <div className="logo">
          <img src={logoIcon} alt="logo-icon" />
          <span>Coffee Shop</span>
        </div>
        <div className="desc-footer">
          Coffee Shop is a store that sells some good meals, and especially
          coffee. We provide high quality beans
        </div>

        <div className="socmed-section">
          <Link to="#">
            <img src={facebookIcon} alt="Facebook-Icon" />
          </Link>
          <Link to="#">
            <img src={twitterIcon} alt="Twitter-Icon" />
          </Link>
          <Link to="#">
            <img src={instagramIcon} alt="Instagram-Icon" />
          </Link>
        </div>

        <div className="copyright">©2020CoffeeStore</div>
      </aside>

      <aside className="col col-6 right-side">
        <div className="widget">
          <h6>Product</h6>
          <div className="widget-menu">
            <div className="widget-menu-item">
              <Link to="#">Download</Link>
              <Link to="#">Pricing</Link>
              <Link to="#">Locations</Link>
              <Link to="#">Countries</Link>
              <Link to="#">Blog</Link>
            </div>
          </div>
        </div>

        <div className="widget">
          <h6>Engage</h6>
          <div className="widget-menu">
            <div className="widget-menu-item">
              <Link to="#">Coffee Shop ?</Link>
              <Link to="#">FAQ</Link>
              <Link to="#">Terms of Service</Link>
              <Link to="#">About US</Link>
              <Link to="#">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </aside>
    </footer>
  );
}

export default Footer;
