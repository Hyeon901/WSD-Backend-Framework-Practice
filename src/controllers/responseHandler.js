// src/controllers/responseHandler.js

// 표준 성공 응답 포맷
const sendSuccess = (res, data, statusCode = 200, message = 'Success') => {
    res.status(statusCode).json({
        status: 'success',
        data: data,
        message: message,
    });
};

// 오류 응답 포맷 (4xx, 5xx)
const sendError = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: 'error',
        data: data,
        message: message,
    });
};

module.exports = { sendSuccess, sendError };