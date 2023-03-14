import React, {useState} from "react";
import "./faqElement.scss";

const FaqElement = (props) => {
    const [isActive, setActive] = useState(false);
    return(
        <div className={'faqElement'}>
            <div className={'faqElementTitle'}
                 onClick={() => setActive(!isActive)}
            >
                <div className={'titleContainer'}>
                    {props.title ?? '-'}
                </div>
                <div className={'iconContainer'}>
                    {isActive ?
                        <span className="material-icons">
                        keyboard_arrow_up
                        </span> :
                        <span className="material-icons">
                        keyboard_arrow_down
                        </span>
                    }
                </div>
            </div>
            <div className={`
            faqElementContent 
            ${isActive ? 'show' : 'hide'}
            `}>
                <div className={'faqElementContentInside'}>
                {props.children ?? '-'}
                </div>
            </div>
        </div>
    )
}

export default FaqElement;
