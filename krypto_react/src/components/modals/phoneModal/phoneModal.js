import React, {useContext, useState, useEffect} from "react";
import "./../defaultModal.scss";
import "./phoneModal.scss";

import i18next from "i18next";
import {UserContext} from "../../user/userContext";
import getCookie from "../../../scripts/cookies";
import PostThis from "../../../scripts/post";
import Loader from "../../ui/loader/loader";
import Input from "../../ui/input/input";
import SmsImg from "./../../../img/sms.svg";
import Button from "../../ui/button/button";


const PhoneRequiredModal = (props) => {
    const account = useContext(UserContext);
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={'modalWrapper'}>
            <div className={'modalImg'}>
                <img src={SmsImg}/>
            </div>
            <div className={'modal modalCustom phoneConfirmationModal'}>
                    <div className={'header'}>
                        {i18next.t('Zweryfikuj swój numer telefonu')}
                    </div>
                    <div className={'content'}>
                        <div className={'modalContainer'}>
                        <p>{i18next.t('Ze względów bezpieczeństwa wymagamy od użytkowników potwierdzenia swojego numeru telefonu. Numer wykorzystywany będzie w celach weryfikacyjnych podczas różnych operacji w aplikacji.')}</p>
                            {currentStep === 0 ?
                                <PhoneView nextStep={() => setCurrentStep(1)}/> :
                                <CodeView prevStep={() => setCurrentStep(0)}/>
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}
const PhoneView = (props) => {
    const account = useContext(UserContext);
    const [phone, setPhone] = useState(account?.data?.user?.phone ?? '+48');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePhoneNumberChange = (inputId, eventValue) => {
        let valueForcedPlus = eventValue;
        const valueLength = eventValue.match(/\+/g)?.length;

        if (valueLength < 1 || typeof valueLength === 'undefined') {
            valueForcedPlus = '+' + valueForcedPlus;
        }

        let valueWithoutPlus = eventValue.replace('+', '');

        if (!isNaN(valueWithoutPlus) && !eventValue.includes(' ') && !eventValue.includes('.') && eventValue.length < 20) {
            setPhone(valueForcedPlus);
        }
    }

    const sendVerificationSMS = async () => {
        setError(null);
        if (phone.length > 7) {
            setLoading(true);
            let hed = {
                'authorization': 'Bearer ' + getCookie('authToken')
            }
            const response = await PostThis(
                '/api/users/me/phone',
                'PATCH',
                {
                    phone: phone
                },
                hed);

            if(response.status >= 200 && response.status < 300){
                props.nextStep();
                account.reload(() => {
                    setLoading(false);
                });
            }
        } else {
            setError(i18next.t('Podany numer telefonu jest nieprawidłowy'));
        }
    }

    return (
        <div className={'smallContainer'}>
            {loading ? <Loader absolute/> : null}

            <div className={'text'}>
                {i18next.t('Podaj swój numer telefonu poniżej')}
            </div>
            <Input
                type={'phone'}
                id={'phone'}
                label={i18next.t('Numer telefonu')}
                placeholder={i18next.t('Numer telefonu')}
                value={phone}
                onChange={handlePhoneNumberChange}
            />
            {error !== null ?
                <div className={'errorText'}>
                    {error}
                </div> : null}
            <Button blue
                    onClick={sendVerificationSMS}
                    rightIcon={'check_circle_outline'}
            >
                {i18next.t('Wyślij SMS weryfikacyjny')}
            </Button>


        </div>
    )
}

const CodeView = (props) => {
    const account = useContext(UserContext);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isConfirmed, setConfirmed] = useState(false);

    const handleCodeChange = (inputId, eventValue) => {
        setCode(eventValue);
    }

    const changePhoneNumber = () => {
        props.prevStep();
    }

    const sendCode = async () => {
        let hed = {
            'authorization': 'Bearer ' + getCookie('authToken')
        }
        const response = await PostThis(
            '/api/users/me/phone/send-code',
            'PATCH',
            '',
            hed);

        if(response?.status >= 200 && response?.status < 300){
        }else{
            setError(response?.data.message)
        }
    }

    const confirmCode = () => {
        if(code.length < 4) {
            setError(i18next.t('Błędny kod'))
        } else {
            setLoading(true);
            let hed = {
                'authorization': 'Bearer ' + getCookie('authToken')
            }
            PostThis(
                '/api/users/me/phone/confirm',
                'PATCH',
                {
                    code: code
                },
                hed,
                function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        setConfirmed(true);
                        setLoading(false);
                    } else {
                        setError(response.data.message);
                        setLoading(false);
                    }
                });
        }
    }

    const continuePhone = () => {
        account.reload();
    }

    useEffect(() => {
        sendCode();
    }, []);

    if(isConfirmed) {
        return(
            <div className={'smallContainer'}>
                <div className={'successText'}>
                    {i18next.t('Twój numer telefonu został potwierdzony, dziękujemy.')}
                </div>
                <Button big blue onClick={continuePhone}>{i18next.t('Kontynuuj')}</Button>
            </div>
        )
    }

    return (
        <div className={'smallContainer'}>
            {loading ? <Loader absolute/> : null}
            <div className={'text'}>
                {i18next.t('Kod został wysłany na podany numer telefonu') + ' (' + account.data.user.phone + ')'}
            </div>
            <Input
                type={'code'}
                id={'code'}
                label={i18next.t('Kod z SMS')}
                placeholder={i18next.t('Kod z SMS')}
                value={code}
                onChange={handleCodeChange}
            />
            {error !== null ?
                <div className={'errorText'}>
                    {error}
                </div> : null}
            <Button
                big
                blue
                //rightIcon={'check_circle_outline'}
                onClick={confirmCode}
                className={'btn'}
            >
                {i18next.t('Zatwierdź kod')}
            </Button>
            <div
                onClick={sendCode}
                className={'changePhone'}
            >
                {i18next.t('Wyślij kod ponownie')}
            </div>
            <div
                onClick={changePhoneNumber}
                className={'changePhone'}
            >
                {i18next.t('Zmień numer telefonu')}
            </div>
        </div>
    )
}

export default PhoneRequiredModal;
