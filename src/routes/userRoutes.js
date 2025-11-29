// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// 컨트롤러는 다음 단계에서 정의할 것입니다.
const userController = require('../controllers/userController'); 

// 1. POST (생성 1) - 새 사용자 생성
router.post('/', userController.createUser);

// 2. POST (생성 2) - 사용자 로그인 (가상)
router.post('/login', userController.loginUser); 

// 3. GET (조회 1) - 모든 사용자 목록 조회
router.get('/', userController.getAllUsers);

// 4. GET (조회 2) - 특정 사용자 상세 조회 (404 테스트 포함)
router.get('/:id', userController.getUserById);

// 5. PUT (수정 1) - 사용자 정보 전체 수정 (PUT은 전체 수정)
router.put('/:id', userController.updateUser);

// 6. PUT (수정 2) - 사용자 비밀번호 변경 (PUT은 전체 수정이지만, 여기서는 특정 필드 수정으로 가정)
router.put('/:id/password', userController.changePassword);

// 7. DELETE (삭제 1) - 특정 사용자 삭제
router.delete('/:id', userController.deleteUser);

// 8. DELETE (삭제 2) - 사용자 계정 비활성화 (가상)
router.delete('/:id/deactivate', userController.deactivateUser);

module.exports = router;