// server.js


const express = require('express');

const app = express();

const PORT = 3000;

const requestLogger = require('./src/middlewares/logger');

const userRouter = require('./src/routes/userRoutes');

// JSON 형식의 요청 본문(body)을 파싱하기 위한 미들웨어 설정
// 모든 POST/PUT 요청에서 데이터(JSON)를 처리할 수 있게 합니다.
app.use(requestLogger);
app.use(express.json()); 
app.use('/api/users', userRouter);

// 기본 라우트 (GET 요청) 정의 - 서버가 잘 작동하는지 확인하기 위한 엔드포인트
app.get('/', (req, res) => {
    // 클라이언트에게 "Hello World!" 텍스트를 응답(response)으로 보냅니다.
    res.send('Backend Assignment Server is Running!');
});

// 서버를 지정된 포트에서 실행하고, 성공적으로 실행되었을 때 콜백 함수를 실행합니다.
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server.`);
});