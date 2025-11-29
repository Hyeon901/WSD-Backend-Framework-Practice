// src/middlewares/logger.js
const requestLogger = (req, res, next) => {
    // 요청 시간, 메소드, URL을 콘솔에 출력합니다.
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    
    console.log(`[${timestamp}] ${method} ${url} - Request Received`);
    
    // 다음 미들웨어 또는 라우터로 제어권을 넘깁니다.
    next();
};

module.exports = requestLogger;