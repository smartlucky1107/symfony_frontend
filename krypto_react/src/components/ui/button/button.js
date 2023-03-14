import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./button.scss";
import PropTypes from "prop-types";

const Button = (props) => {
    const className = `kBtn 
    ${props.blue ? " blue" : ""}
    ${props.active ? " active" : ""}
    ${props.big ? " big" : ""}
    ${props.thin ? " thin" : ""}
    ${props.small ? " small" : ""}
    ${props.hidden ? " hidden" : ""}
    ${props.className ?? ""}
    ${props.disabled ? " disabled" : ""}
    `;

    if (props.to) {
        if (props.navLink) {
            return (
                <NavLink
                    className={className}
                    onClick={props.onClick}
                    type={props.type}
                    to={props.to}
                    title={props.title}
                    activeClassName="active"
                >
                    <ButtonInner {...props} />
                </NavLink>
            );
        } else {
            return (
                <Link
                    className={className}
                    onClick={props.onClick}
                    type={props.type}
                    to={props.to}
                    title={props.title}
                >
                    <ButtonInner {...props} />
                </Link>
            );
        }
    } else if (props.href) {
        return (
            <a
                className={className}
                onClick={props.onClick}
                type={props.type}
                href={props.href}
                title={props.title}
                target={props.targetBlank ? "_blank" : "_self"}
            >
                <ButtonInner {...props} />
            </a>
        );
    } else {
        return (
            <button
                className={className}
                onClick={props.onClick}
                type={props.type}
            >
                <ButtonInner {...props} />
            </button>
        );
    }
};

Button.propTypes = {
    /**
     * Set the button background to blue, text to white
     */
    blue: PropTypes.bool,
    /**
     * Set button state to active - toggleable mode
     */
    active: PropTypes.bool,
    /**
     * Set button to behave as ReactRouter Link by using getRoute('route_name')
     */
    to: PropTypes.string,
    /**
     * Set button to behave as <a>
     */
    href: PropTypes.string,
    /**
     * Use MATERIAL icon at left side of the button
     * [https://material.io/resources/icons/?style=baseline]
     * Example:<br>
     * \arrow_right_alt
     */
    leftIcon: PropTypes.string,
    /**
     * Use MATERIAL icon at right side of the button
     * [https://material.io/resources/icons/?style=baseline]
     *
     * Example:<br>
     * \arrow_right_alt
     */
    rightIcon: PropTypes.string,
    /**
     * How large should the button be?
     */
    //size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Button contents
     */
    //label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    //onClick: PropTypes.func,
};

Button.defaultProps = {};

const ButtonInner = (props) => {
    return (
        <div className={"kBtnInner"}>
            {props.leftIcon ? (
                <div className={"leftIcon"}>
                    <span className="material-icons">{props.leftIcon}</span>
                </div>
            ) : null}
            <div className={"text"}>{props.children}</div>
            {props.rightIcon ? (
                <div className={"rightIcon"}>
                    <span className="material-icons">{props.rightIcon}</span>
                </div>
            ) : null}
        </div>
    );
};

export default Button;
export { ButtonInner };
