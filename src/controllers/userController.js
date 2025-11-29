// src/controllers/userController.js
const { sendSuccess, sendError } = require('./responseHandler');

// 임시 데이터 저장소 (데이터베이스 역할)
// 초기 데이터 1개를 넣어 테스트하기 쉽게 합니다.
let users = [{ id: 1, username: 'tester', email: 'test@example.com', status: 'active' }];
let nextId = 2; // 다음 ID는 2부터 시작

// 헬퍼 함수: ID로 사용자 찾기
const findUser = (id) => users.find(u => u.id === parseInt(id));

// --- POST 요청 ---

// 1. POST /api/users (새 사용자 생성)
// 응답: 201 Created (성공) / 400 Bad Request (실패)
exports.createUser = (req, res) => {
    const { username, email } = req.body;
    
    // --- 400 Bad Request (클라이언트 오류 1) ---
    if (!username || !email) {
        return sendError(res, 400, "필수 필드(username, email)를 입력해야 합니다.");
    }
    
    const newUser = { id: nextId++, username, email, status: 'active' };
    users.push(newUser);
    
    // --- 201 Created (성공 1) ---
    sendSuccess(res, newUser, 201, '사용자가 성공적으로 생성되었습니다.');
};

// 2. POST /api/users/login (사용자 로그인 시뮬레이션)
// 응답: 200 OK (성공) / 401 Unauthorized (실패)
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // 간단한 로그인 시뮬레이션
    if (!email || !password) {
        return sendError(res, 400, "이메일과 비밀번호를 입력해야 합니다.");
    }

    if (email === 'fail@test.com' && password === 'wrong') {
        // --- 401 Unauthorized (클라이언트 오류 3: 인증 실패) ---
        return sendError(res, 401, '이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // --- 200 OK (성공 2) ---
    sendSuccess(res, { token: 'mock_jwt_token_123' }, 200, '로그인 성공');
};

// --- GET 요청 ---

// 3. GET /api/users (모든 사용자 목록 조회)
// 응답: 200 OK (성공) / 503 Service Unavailable (서버 오류 시뮬레이션)
exports.getAllUsers = (req, res) => {
    try {
        // 503 오류 시뮬레이션: 쿼리 파라미터로 'maintenance=true'가 오면 서버 점검 중으로 가정
        if (req.query.maintenance === 'true') {
            // --- 503 Service Unavailable (서버 오류 3) ---
            return sendError(res, 503, '현재 서버 점검 중입니다. 잠시 후 다시 시도해주세요.');
        }

        // --- 200 OK (성공 3) ---
        sendSuccess(res, { count: users.length, users: users }, 200);

    } catch (error) {
        // --- 500 Internal Server Error (서버 오류 4) ---
        sendError(res, 500, `서버 처리 중 예기치 않은 오류 발생: ${error.message}`);
    }
};

// 4. GET /api/users/:id (특정 사용자 상세 조회)
// 응답: 200 OK (성공) / 404 Not Found (실패)
exports.getUserById = (req, res) => {
    const user = findUser(req.params.id);
    
    // --- 404 Not Found (클라이언트 오류 4) ---
    if (!user) {
        return sendError(res, 404, `ID ${req.params.id}인 사용자를 찾을 수 없습니다.`);
    }
    
    // --- 200 OK (성공 4) ---
    sendSuccess(res, user, 200);
};

// --- PUT 요청 ---

// 5. PUT /api/users/:id (특정 사용자 정보 전체 수정)
// 응답: 200 OK (성공) / 404 Not Found (실패) / 400 Bad Request (실패)
exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    // --- 404 Not Found (실패 5) ---
    if (userIndex === -1) {
        return sendError(res, 404, `ID ${id}인 사용자를 찾을 수 없어 수정할 수 없습니다.`);
    }
    
    const { username, email } = req.body;
    
    // --- 400 Bad Request (실패 5: 데이터 형식 오류) ---
    if (!username || !email) {
        return sendError(res, 400, "수정 시 사용자 이름과 이메일은 필수입니다.");
    }

    users[userIndex] = { ...users[userIndex], username, email };

    // --- 200 OK (성공 5) ---
    sendSuccess(res, users[userIndex], 200, '사용자 정보가 성공적으로 업데이트되었습니다.');
};

// 6. PUT /api/users/:id/password (사용자 비밀번호 변경 시뮬레이션)
// 응답: 200 OK (성공) / 403 Forbidden (권한 없음)
exports.changePassword = (req, res) => {
    const id = parseInt(req.params.id);
    const { newPassword } = req.body;
    
    // 404 확인은 updateUser에서 처리했으므로 생략하고 권한 오류 시뮬레이션에 집중

    // 비밀번호 변경 권한 시뮬레이션: ID 1번 사용자만 변경 가능하다고 가정
    if (id !== 1) {
        // --- 403 Forbidden (클라이언트 오류 6: 권한 부족) ---
        return sendError(res, 403, '비밀번호를 변경할 권한이 없습니다. (다른 사용자)');
    }

    // --- 200 OK (성공 6) ---
    sendSuccess(res, { message: "Password updated" }, 200, `ID ${id}의 비밀번호가 성공적으로 변경되었습니다.`);
};


// --- DELETE 요청 ---

// 7. DELETE /api/users/:id (특정 사용자 삭제)
// 응답: 200 OK (성공) / 404 Not Found (실패)
exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== id);

    // 삭제 후 배열 길이가 줄어들지 않았다면 해당 ID가 없었다는 의미입니다.
    if (users.length === initialLength) {
        // --- 404 Not Found (실패 7) ---
        return sendError(res, 404, `ID ${id}인 사용자가 없어 삭제할 수 없습니다.`);
    }

    // --- 200 OK (성공 7) ---
    sendSuccess(res, null, 200, `ID ${id}인 사용자가 성공적으로 삭제되었습니다.`);
};

// 8. DELETE /api/users/:id/deactivate (사용자 계정 비활성화)
// 응답: 200 OK (성공) / 404 Not Found (실패) / 409 Conflict (이미 비활성화된 경우)
exports.deactivateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return sendError(res, 404, `ID ${id}인 사용자를 찾을 수 없어 비활성화할 수 없습니다.`);
    }

    if (users[userIndex].status === 'inactive') {
        // --- 409 Conflict (클라이언트 오류 8: 상태 충돌) ---
        return sendError(res, 409, `ID ${id}인 사용자는 이미 비활성화되어 있습니다.`);
    }

    users[userIndex].status = 'inactive';
    
    // --- 200 OK (성공 8) ---
    sendSuccess(res, users[userIndex], 200, `ID ${id}인 사용자가 성공적으로 비활성화되었습니다.`);
};