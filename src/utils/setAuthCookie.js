const setAuthCookie = (res, cookieType, tokens, age) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: age
    };
    res.cookie(cookieType, tokens[cookieType], options);
}

module.exports = setAuthCookie;