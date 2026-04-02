const responseFn = (res, statusCode, success, data, message) => {
    const responseInfo = {
        success
    }
    if(success){
        responseInfo.data = data || null;
    }
    if(!success){
        responseInfo.data = { message };
    }
    return res.status(statusCode).json(responseInfo);
}

module.exports = responseFn;