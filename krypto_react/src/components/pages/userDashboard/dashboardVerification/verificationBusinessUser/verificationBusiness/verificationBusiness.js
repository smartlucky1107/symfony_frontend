import React from "react";
import i18next from "i18next";
import "./verificationBusiness.scss";
// import img from "../../../../../../img/businessVerification.svg";
import img from "../../../../../../img/kyc.png";

const VerificationBusiness = () => {
    return (
        <>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
             </p>
            <div className="verificationBusiness textCenter">
                {/* <h3>
                    {i18next.t(
                        "W celu weryfikacji konta firmowego skontaktuj się z naszym konsultantem"
                    )}{" "}
                    <a href="mailto:support@kryptowaluty.pl">
                        support@kryptowaluty.pl
                    </a>
                </h3> */}
               
                <img src={img} alt="" />
            </div>
            <div className="tex-center mt2">
              <h4>verification completed<br/> successfully</h4>
            </div>
        </>
    );
};

export default VerificationBusiness;
