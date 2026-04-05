const setAuthCookie = (res, cookieType, tokens, age) => {
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: age
    };
    res.cookie(cookieType, tokens[cookieType], options);
}

module.exports = setAuthCookie;