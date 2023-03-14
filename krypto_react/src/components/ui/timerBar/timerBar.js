import React, {useEffect, useRef, useState} from "react";
import "./timerBar.scss";

export const TimerBar = (props) => {
    /*
    If ticker is true - it starts animation of the bar
    If ticker is false - it stops animation of the bar
     */
    const elRef = useRef(null);
    const [animClass, setAnimClass] = useState('');

    useEffect(() => {
        elRef.current.style.animationDuration = `${props.time - 0.5}s`;
    }, []);

    useEffect(() => {
        if (props.ticker === true) {
            setAnimClass('startAnim');
        } else if (props.ticker === false) {
            setAnimClass('');
        }
    }, [props.ticker]);

    const renderLabel = () => {
        if (props.label) {
            return (
                <div className={'timerBarLabel'}>
                    {props.label}
                </div>
            )
        }
        return null;
    }

    return (
        <div className={'timerBarWrapper'}>
            <div className={'timerBar'}>
                <div className={`timerBarInside ${animClass}`} ref={elRef}></div>
            </div>
            {renderLabel()}
        </div>
    )
}
