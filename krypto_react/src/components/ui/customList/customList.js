import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./customList.scss";
import PropTypes from "prop-types";

const CustomList = (props) => {
    return <div className="customArrayList">{props.children}</div>;
};

CustomList.propTypes = {};

CustomList.defaultProps = {};

const CustomListItem = (props) => {
    return <div className={"customListItemRow"}>{props.children}</div>;
};

export default CustomList;
export { CustomListItem };
