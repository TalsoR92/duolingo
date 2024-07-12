// cookieUtils.ts
import Cookies from "js-cookie";

export const getCookie = (key: string): string | undefined => {
    return Cookies.get(key);
};

export const setCookie = (key: string, value: string): void => {
    Cookies.set(key, value, { expires: 365 }); // Expire in 1 year
};

export const deleteCookie = (key: string): void => {
    Cookies.remove(key);
};
