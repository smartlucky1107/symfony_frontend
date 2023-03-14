import React, { useState, useEffect } from "react";
import "./boxPlaceholder.scss";
// Typy :
// line
// walletPlaceholder
// box
// bptabs
// Użycie
//
//<BoxPlaceholder
// type={"line"}
// count={5}
// show={true/false}
// />

const BoxPlaceholder = (props) => {
    const [listDOM, setListDOM] = useState();

    const handeleBuild = (count, type) => {
        let list = [];
        for (let i = 0; i < count; i++) {
            list.push(i);
        }
        list = list.map((item, index) => {
            return <div key={index} className={type}></div>;
        });
        setListDOM(list);
    };

    useEffect(() => {
        handeleBuild(props.count, props.type);
    }, []);

    return (
        <>
            {props.show === true ? (
                <div className="box-placeholder-wrapper">
                    <div className="box-placeholder ">
                        {listDOM}
                        {props?.children}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default BoxPlaceholder;
