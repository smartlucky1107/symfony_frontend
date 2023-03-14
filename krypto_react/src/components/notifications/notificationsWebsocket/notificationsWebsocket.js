import React, {useEffect, useRef, useState} from "react";
import "./notificationsWebsocket.scss";
import i18next from "i18next";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {store} from 'react-notifications-component';

const NotificationsWebsocket = (props) => {
    const wS = useRef(null);
    const intervalRef = useRef(null);
    const [isConnected, setConnected] = useState(null);
    const [isMounted, setMounted] = useState(true);

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);

    const connect = () => {
        wS.current = new WebSocket(process.env.REACT_APP_WEBSOCKET);
        wS.current.onopen = () => {
            subscribeToNotifications();
            startPinging();
            setConnected(true);
        }
        wS.current.onclose = () => {
            stopPinging();
            setConnected(false);
            reconnect();
        }
    }

    const reconnect = () => {
        if(wS.current !== null) {
            setTimeout(() => connect(), 3000);
        }
    }

    const disconnect = () => {
        wS.current.close();
        wS.current = null;
    }

    const subscribeToNotifications = () => {
        wS.current.addEventListener('message', (response) => {
            if(response.data === 'ok'){
                wS.current.send(JSON.stringify({
                    'action': 'subscribe',
                    'module': 'notifications',
                    'userId': props.user.id,
                    'userWsHash': props.user.wsHash
                }));
            }else{
                const parsedData = JSON.parse(response.data);
                createNotification(parsedData.notification.message, parsedData.notification.style);
            }
        })
    }

    const createNotification = (message, style) => {
        //success - blue
        //info - navy
        //danger - red
        let notificationStyle = 'info'
        switch (style) {
            case 1:
                notificationStyle = 'success'
                break;

            case 2:
                notificationStyle = 'danger'
                break;

            case 3:
                notificationStyle = 'danger'
                break;

        }

        store.addNotification({
            message: message,
            type: notificationStyle,
            insert: 'top',
            container: 'top-right',
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                pauseOnHover: true
            }
        })
    }

    const startPinging = () => {
        intervalRef.current = setInterval(() => {
            wS.current.send(JSON.stringify({
                'action': '',
                'module': ''
            }));
        }, 50000)
    }

    const stopPinging = () => {
        clearInterval(intervalRef.current);
    }

    if (isConnected === null || isConnected === true) {
        return <>
            <ReactNotification />
            </>
    } else {
        return (
            <div className={'socketInfo pending'}>
                {i18next.t('Utracono połączenie z serwisem notyfikacji. Trwa ponowne łączenie...')}
            </div>
        )
    }
}

export default NotificationsWebsocket;
