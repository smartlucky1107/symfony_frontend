import React, { useEffect, useState } from "react";
import i18next from "i18next";
import "./select.scss";
import OutsideClickHandler from "react-outside-click-handler";
import getRoute from "../../routing/routingService";

const Select = (props) => {
    const [isActive, setActive] = useState(false);

    const iHaveORiWant = props.className?.includes("iHave")
        ? props.className?.includes("buyIHave")
            ? "buyIHave"
            : "sellIHave"
        : props.className?.includes("buyIWant")
        ? "buyIWant"
        : "sellIWant";

    const handleOutsideClick = () => {
        setActive(false);
    };
    const handleSelectedElementClick = () => {
        setActive(!isActive);
        console.log('click fired');
    };
    const handleOptionClick = (selectedElement) => {
        setActive(false);
        if(props.cardOptions?.length > 0){
            props.onChangeActiveElement(selectedElement);
        }else if (props.currencyOptions?.length > 0) {
            props.onChangeActiveElement(iHaveORiWant, selectedElement);
        } else {
            props.onChangeActiveElement(selectedElement);
        }
    };

    useEffect(() => {
        if (
            props.activeElement === null ||
            typeof props.activeElement === "undefined"
        ) {
            // handleOptionClick(props.options[0]);
        }
    }, []);

    useEffect(() => {
        console.log('isActive: ', isActive);
    }, [isActive]);
    const options =
        props.options?.map((item, key) => {
            return (
                <Option
                    key={key}
                    value={item.value}
                    onClick={() => handleOptionClick(item)}
                >
                    {item.name}
                </Option>
            );
        }) ??
        props.currencyOptions?.map((item, key) => {
            const value = props.className.includes("iHave")
                ? item.currencyPair?.quotedCurrency?.shortName
                : item.currencyPair?.baseCurrency?.shortName;

            return (
                <Option
                    className={props.className}
                    key={key}
                    value={value}
                    data={item}
                    onClick={() => handleOptionClick(item)}
                />
            );
        }) ??
        props.cardOptions?.map((item, key) => {
            return (
                <Option
                    key={key}
                    cardData={item}
                    onClick={() => handleOptionClick(item)}
                />
            )
        });

    return (
        <div className={`kSelect`} id={props?.id}>
            <OutsideClickHandler
                disabled={!isActive}
                onOutsideClick={handleOutsideClick}
            >
                {props.label ? (
                    <div className="label">
                        {props.label}:
                        {props.required ? (
                            <div className={"isRequired"}>
                                <span className="material-icons">error</span>
                                <div className={"isRequiredText"}>
                                    {i18next.t("wymagane")}
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={`selectedElement ${
                        props.inputSelect ? "inputSelect" : ""
                    }`}
                    onClick={handleSelectedElementClick}
                >
                    <div className={"selectedElementInside"}>
                        <div className={"selectedElementText"}>
                            <ActiveElement activeElement={props?.activeElement ?? ''}/>
                        </div>
                        <span className="material-icons">
                            keyboard_arrow_down
                        </span>
                    </div>
                </div>
                {isActive ? (
                    <div
                        className={`
                        optionsList 
                        ${props.optionsAlign ?? ''} 
                        ${props.className ?? ''}
                        `}
                    >
                        {options}
                    </div>
                ) : null}
            </OutsideClickHandler>
        </div>
    );
};

const ActiveElement = (props) => {
    if (typeof props.activeElement === "object") {
        if(typeof props.activeElement.shortName !== 'undefined') {
            return (
                props.activeElement?.shortName ??
                props.activeElement?.name ??
                ""
            );
        }else if(typeof props.activeElement.first6Digits !== 'undefined'){
            return (
                <div className={'selectedCard'}>
                    <div className={'cardNumber'}>
                        {`${props.activeElement?.first6Digits.toString().slice(0,4)}
                     ${props.activeElement?.first6Digits.toString().slice(4)}•• •••• 
                      ${props.activeElement?.last4Digits}`}
                    </div>
                    <div className={'cardImg'}>
                        <img src={
                            getRoute("assets") +
                            '/imgs/cards/' +
                            props.activeElement?.binCard?.toLowerCase() +
                            ".svg"
                        }/>
                    </div>
                </div>
            );
        }else{
            return props.activeElement?.name ?? "";
        }
    } else {
        return props.activeElement?.name ?? "";
    }
};


const Option = (props) => {
    if (typeof props.cardData !== "undefined") {
        return (
            <div
                className={"kOption"}
                value={props.value}
                onClick={props.onClick}
            >
                <div className={'cardNumber'}>
                    {`${props.cardData?.first6Digits.toString().slice(0,4)}
                     ${props.cardData?.first6Digits.toString().slice(4)}
                     •• •••• 
                      ${props.cardData?.last4Digits}`}
                </div>
                <div className={'cardImg'}>
                    <img src={
                        getRoute("assets") +
                        '/imgs/cards/' +
                        props.cardData?.binCard?.toLowerCase() +
                        ".svg"
                    }/>
                </div>
            </div>
        );
    }
    if (typeof props.data === "undefined") {
        return (
            <div
                className={"kOption"}
                value={props.value}
                onClick={props.onClick}
            >
                {props.children}
            </div>
        );
    } else {
        const currency = props.className.includes("iHave")
            ? props.data.currencyPair.quotedCurrency
            : props.data.currencyPair.baseCurrency;

        const isDisabled =
            !props.data.currencyPair.enabled &&
            props.className.includes("iHave");

        return (
            <div
                className={`
                kOption 
                ${isDisabled ? "disabled" : ""}
                `}
                value={props.value}
                onClick={isDisabled ? () => {} : props.onClick}
            >
                {isDisabled ? (
                    <div className={"currencyDisabled"}>
                        <div className={"currencyDisabledLabel"}>
                            <div className={"currencyDisabledLabelHover"}>
                                {i18next.t("Dostępne wkrótce")}
                            </div>
                            <span className="material-icons">lock</span>
                        </div>
                    </div>
                ) : null}
                <div className={"curImg"}>
                    <img
                        src={
                            getRoute("assets/currencies") +
                            currency.shortName +
                            ".svg"
                        }
                    />
                </div>
                <div className={"curShort"}>{currency.shortName}</div>
                <div className={"curFull"}>{currency.fullName}</div>
            </div>
        );
    }
};

export default Select;
