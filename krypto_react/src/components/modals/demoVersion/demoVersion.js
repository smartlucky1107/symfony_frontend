import React, {useContext, useRef} from "react";
import "./../defaultModal.scss";
import "./demoVersion.scss";
import {ModalControllerContext} from "../modalControllerContext";
import DemoImg from "./../../../img/demo.svg";
import i18next from "i18next";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import Button from "../../ui/button/button";
import {AppContext} from "../../appContext";


const DemoVersionModal = () => {
    const modalController = useContext(ModalControllerContext);
    const appContext = useContext(AppContext);
    if(!appContext.data.demo){
        return null;
    }
    return(
        <div className={`modalWrapper ${modalController.data.demo ? 'show' : 'hide'}`}>
            <OutsideClickHandler
                onOutsideClick={() => modalController.hideDemoVersionModal()}
            >
            <div className={'modalImg'}>
                <img src={DemoImg} />
            </div>
                <div className={'modal modalCustom demoVersionModal'}>
                    <div className={'header'}>
                        {i18next.t('Niedostępne w wersji demo')}
                    </div>
                    <div className={'content'}>
                        <div className={'modalContainer'}>
                            {i18next.t('Funkcja niedostępna w wersji demonstracyjnej platformy kryptowaluty.pl')}
                            <Button
                                onClick={() => modalController.hideDemoVersionModal()}
                                big blue>
                                {i18next.t('Rozumiem')}
                            </Button>
                        </div>
                    </div>

                </div>
            </OutsideClickHandler>
        </div>
    )
}

export const showDemoVersionModal = () => {

}

export default DemoVersionModal;
