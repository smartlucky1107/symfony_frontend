export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();

    if (window.location.hostname === "localhost") {
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
        console.log(window.location.hostname);
    } else {
        document.cookie =
            cname +
            "=" +
            cvalue +
            ";" +
            expires +
            ";path=/;domain=kryptowaluty.pl;Secure;SameSite=None";
    }

    console.log(
        "Cookie set: " + cname + ":" + cvalue + " for " + exdays + " days"
    );
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default getCookie;
