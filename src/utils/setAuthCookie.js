const setAuthCookie = (res, cookieType, tokens, age) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: age
    };
    res.cookie(cookieType, tokens[cookieType], options);
}

module.exports = setAuthCookie;