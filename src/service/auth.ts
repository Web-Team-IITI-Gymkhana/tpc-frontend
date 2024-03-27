import axios from "axios";
export const isAuthenticated = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        return true;
    } else {
        return false;
    }
};
