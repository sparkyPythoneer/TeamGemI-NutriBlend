import Cookies from 'js-cookie';


export function decodeJwt(jwt) {
    function base64UrlDecode(base64Url) {
        const padding = '='.repeat((4 - base64Url.length % 4) % 4);
        const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
        return atob(base64);
    }

    const [header, payload, signature] = jwt.split('.');
    try {
        const decodedPayload = JSON.parse(base64UrlDecode(payload));
        return decodedPayload;
    } catch (error) {
        return null;
    }
}
export function hasTokenExpired(token) {
    const decodedToken = decodeJwt(token);

    if (decodedToken && decodedToken.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return (decodedToken?.exp < currentTimestamp);
    }
    else {
        return false
    }
}




export function getAccessToken() {
    if (typeof window !== 'undefined') {
        const accessToken = Cookies.get('accessToken');

        if (accessToken) {
            const tokenExpired = hasTokenExpired(accessToken);

            if (tokenExpired) {
                Cookies.remove('accessToken');
                removeAccessToken();
                return null;
            } else {
                return accessToken;
            }
        }
    }
}

export async function setAccessToken(token) {
    if (typeof window !== 'undefined') {
        Cookies.set('accessToken', token);
        window.postMessage('accessTokenChange', window?.location.href);
    }
}

export async function removeAccessToken() {
    if (typeof window !== 'undefined') {
        Cookies.remove('accessToken');
        window.postMessage('accessTokenChange', window?.location.href);
    }
}

export function getRefreshToken() {
    return Cookies.get('refreshToken');
}

export function setRefreshToken(token) {
    if (typeof window !== 'undefined') {
        Cookies.set('refreshToken', token);
    }
}
