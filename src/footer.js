import React from 'react';
import './footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
function Footer() {
    return (
        <div>
        <footer className="footer">
        <div className="bgFooter">
    <div className="container">
      <div className="row">
        <div className="col noFlex">
          <a href="#">O nas</a>
        </div>
        <div className="col noFlex">
          <a href="#">Weryficacja</a>
        </div>
        <div className="col noFlex">
          <a href="#">Jak zaczac</a>
        </div>
        <div className="col noFlex">
          <a href="#">Wsparcie</a>
        </div>
        <div className="col-2 noFlex">
          <a href="#">Polityka Cookies</a>
        </div>
        <div className="col noFlex">
          <a href="#">Regulamin</a>
        </div>
        <div className="col noFlex">
          <a href="#">Tabela oplat</a>
        </div>
        <div className="col-2 noFlex">
          <a href="#">Polityka prywatnosci</a>
        </div>

        <div className="social-links mt-5 text-center">
          
          <FacebookIcon  style={{color: "white!important;"}}/>
          <TwitterIcon  style={{color: "white!important;"}}/>
          <LinkedInIcon  style={{color: "white!important;"}}/>
          <TelegramIcon  style={{color: "white!important;"}}/>
          
        </div>
     
    </div>
    </div>
    </div>
  </footer>
        </div>
    );
}

export default Footer;