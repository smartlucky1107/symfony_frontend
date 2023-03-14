import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./roundIcon.scss";

const RoundIcon = (props) => {
    const className = `rIcon rIcon${props.btype} ${
        props.active ? " active" : ""
    } ${props.size ? props.size : "medium"}`;

    if (props.to) {
        return (
            <Link className={className} to={props.to} title={props.title}>
                <RoundInner {...props} />
            </Link>
        );
    } else if (props.href) {
        return (
            <a className={className} href={props.href} title={props.title}>
                <RoundInner {...props} />
            </a>
        );
    } else {
        return (
            <div className={className}>
                <RoundInner {...props} />
            </div>
        );
    }
};

RoundIcon.propTypes = {
    /**
     * Set the button background to blue, text to white
     *
     * Use MATERIAL icon
     * [https://material.io/resources/icons/?style=baseline]
     * Example:<br>
     * accessibility
     * Set just name of the icon form span
     *
     */
    icon: PropTypes.string,
    /**
     * Set button state to active - toggleable mode
     */
    active: PropTypes.bool,
    /**
     * Set Icon to behave as ReactRouter Link by using getRoute('route_name')
     */
    to: PropTypes.string,
    /**
     * Set Icon to behave as <a>
     */
    href: PropTypes.string,
    /**
     * Set border type (first letter uppercase)
     * Example:<br>
     *  Dashed, Solid
     */
    btype: PropTypes.string,

    /**
     * Set text inside border
     * Example:<br>
     *  1
     */
    content: PropTypes.string,
};

const RoundInner = (props) => {
    return (
        <div className={props.icon ? "box iconBox" : "box iconContentBox"}>
            {props.icon ? (
                <span className="material-icons">
                    {props.icon ?? "accessibility"}
                </span>
            ) : (
                props.content
            )}
        </div>
    );
};

export default RoundIcon;
