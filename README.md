# WSD 실습 과제 2 - Express API (User API)

> 이 문서는 WSD 실습 과제 2 수행을 위해 Node.js 환경에서 Express.js를 사용하여 RESTful API 8개를 구현하고 미들웨어, 표준 응답 포맷, 그리고 다양한 HTTP 응답 코드를 적용한 실습 결과물입니다.

## 과제 요구사항 충족 현황

* **A. HTTP 메소드별 API 구현:** POST, GET, PUT, DELETE 메소드 모두 사용 (총 8개)
* **C. 미들웨어 구현:** 요청 시간, 메소드, URL을 기록하는 로깅 미들웨어 구현 완료.
* **D & E. 응답 포맷 및 코드 다양성:**
    * 모든 응답은 `{"status": "success"/"error", "data": {...}, "message": "..."}`의 표준 포맷을 따름.
    * **2xx (200, 201), 4xx (400, 401, 403, 404, 409), 5xx (500, 503)** 코드를 포함하여 다양하게 사용.


## 환경 설정 및 실행 방법

이 프로젝트는 Node.js 환경에서 Express 프레임워크를 사용합니다.

### 1. 필수 사항

* Node.js (LTS 버전 권장)
* npm (Node Package Manager)

### 2. 프로젝트 설치 및 의존성 다운로드

터미널에서 프로젝트 폴더로 이동하여 의존성 라이브러리를 설치합니다.

```bash
# 프로젝트 폴더로 이동
cd practice-2 
# Express 등 package.json에 명시된 라이브러리 설치
npm install


# 서버 실행 (nodemon이 코드를 감지하여 자동 재시작)
npm run dev
# 서버는 http://localhost:3000 에서 실행됩니다.

---

### 4. 구현된 API 명세

구현한 8개의 API 목록과 각 API의 응답 코드 사용 목적을 표로 정리합니다.


## API 엔드포인트 상세 명세

| No. | HTTP 메소드 | 엔드포인트 | 설명 | 주요 응답 코드 |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **POST** | `/api/users` | 새 사용자 등록 | `201 Created` / `400 Bad Request` |
| 2 | **POST** | `/api/users/login` | 로그인 시도 | `200 OK` / `401 Unauthorized` |
| 3 | **GET** | `/api/users` | 전체 사용자 목록 조회 | `200 OK` / **`503 Service Unavailable`** |
| 4 | **GET** | `/api/users/:id` | 특정 사용자 상세 조회 | `200 OK` / **`404 Not Found`** |
| 5 | **PUT** | `/api/users/:id` | 사용자 정보 전체 수정 | `200 OK` / `404 Not Found` |
| 6 | **PUT** | `/api/users/:id/password` | 비밀번호 변경 (권한 테스트) | `200 OK` / **`403 Forbidden`** |
| 7 | **DELETE** | `/api/users/:id` | 사용자 삭제 | `200 OK` / `404 Not Found` |
| 8 | **DELETE** | `/api/users/:id/deactivate` | 계정 비활성화 | `200 OK` / **`409 Conflict`** |