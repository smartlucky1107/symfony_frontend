import React from 'react';
import './inner.css';
import logo from './contacts.png';
function Contact() {
    return (
        <div>
        <section className="wrapper pt-5">
  <div className="container pt-5">
    <div className="themeCard">
    <div className="row">
      <div className="col-lg-12">
        <h4>Kontakt</h4>
        <div className="pt-3">
          <h6>Dane kontaktowe</h6>
          <p>Masz dodatkowe pytania lub chciatbys nawiqzaé wspétprace? Zachecamy do kontaktu z nami:  </p>
        </div>
        <div>
          <h6>+48 574-556-342</h6>
          <p>support@kantor.pl</p>
        </div>
        <p>Jestesmy do Paristwa dyspozycji w dniach Poniedziatek - Pigtek w godzinach godz. 9:00 - 17:00
          Na wiadomosci otrzymane poza wyznaczonymi godzinami pracy udzielamy odpowiedzi w kolejnym dniu roboczym.
        </p>
      </div>
    </div>
    <div className="row pt-3">
        <div className="col-md-4 align-self-center">
          <div>
            <h6>Dane firmy</h6>
            <p>kantor sp.z 0.0.<br/>
              ul. Kwiatowa 16 <br/>
              31-345 Krakow
            </p>
            <p>
              NIP: 94534567647<br/>
              REGON: 384423447<br/>
              KRS: 063456656221
            </p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="imgbox">
            <img src={logo} width="300"/>
          </div>
        </div>
    </div>
  </div>
</div>
</section>
       </div>
    );
}

export default Contact;