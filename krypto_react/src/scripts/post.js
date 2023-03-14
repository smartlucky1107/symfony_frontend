import axios from "axios";
import i18next from "i18next";
import getRoute from "../components/routing/routingService";

export function PostThis(url, method, data, headers, callback,cancelToken,) {
    return axios({
        method: method,
        url: !url.includes("https") ? getRoute("api") + url : url,
        data: data,
        withCredentials: false,
        headers: headers,
        cancelToken:cancelToken,
    })
        .then(function (response) {
            if (typeof callback === "function") {
                callback(response);
            } else {
                return response;
            }
        })
        .catch(function (error) {
            if (typeof callback === "function") {
                if (typeof error.response !== undefined) {
                    callback(error.response);
                }
            } else {
                return error.response;
            }
        });
}

export default PostThis;
