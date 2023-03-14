import React from "react";
import i18next from "i18next";
import "./headerBar.scss";

import Button from "../../ui/button/button";

const HeaderBar = () => {
    return (
        <>
            {/* <div className="headerBar">
                <div className="headerBarContent">
                    <p>
                        {i18next.t(
                            "Zostań częścią tego biznesu. Sprawdź projekt kryptowaluty.pl już teraz!"
                        )}
                    </p>
                    <Button
                        href={
                            "https://www.tokenizer.io/pl/oferty/kryptowalutypl"
                        }
                        targetBlank={true}
                    >
                        {i18next.t("Wchodzę!")}
                    </Button> */}
                    {/* <a

                        target="_blank"
                        rel="noopener noreferrer"
                    >

                    </a> */}
                {/* </div>
            </div> */}
        </>
    );
};

export default HeaderBar;
