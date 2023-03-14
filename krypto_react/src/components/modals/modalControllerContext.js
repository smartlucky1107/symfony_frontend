import React, {useEffect, useState} from "react";
import DemoVersionModal from "./demoVersion/demoVersion";

export const modalControllerContext = {
    demo: false
}

export const ModalControllerContext = React.createContext({
    data: modalControllerContext,
    update: () => {}
});

export const ModalControllerContextProvider = (props) => {
    const [data, setData] = useState(modalControllerContext);

    const updateContextData = (data) => {
        setData(prevState => {
            return {
                ...prevState,
                ...data
            }
        })
    }

    const showDemoVersionModal = () => {
        updateContextData({
            demo: true
        })
    }

    const hideDemoVersionModal = () => {
        updateContextData({
            demo: false
        })
    }

    return(
        <ModalControllerContext.Provider value={
            {
                update: updateContextData,
                showDemoVersionModal, hideDemoVersionModal,
                data
            }
        }>
            {props.children}
            <DemoVersionModal/>
        </ModalControllerContext.Provider>
    )
}
