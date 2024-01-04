const Actions = {
    SET_AUTH: "SET_AUTH",
};

export const setAuth = (auth) => {
    return {
        type: Actions.SET_AUTH,
        auth,
    };
};

export default Actions;
