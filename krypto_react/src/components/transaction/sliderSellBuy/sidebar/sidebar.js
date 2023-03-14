import React from "react";
import Button from "../../../ui/button/button";
import "./sidebar.scss";

const SellBuySidebar = (props) => {

    return(
        <div className={'sellBuySidebar'}>
            {props.transactionTypes.map((item, key, array) => {
                console.log(item)
                console.log(props.activeTransactionType === key);
                return (
                    <Button
                        key={key}
                        active={props.activeTransactionType === key}
                      
                        leftIcon={item == 'Buy' ? 'add_shopping_cart' : 'monetization_on'}
                        onClick={() => props.changeTransactionType(key)}
                    >
                        {item}
                    </Button>
                )
            })}
        </div>
    )
}

export default SellBuySidebar;
