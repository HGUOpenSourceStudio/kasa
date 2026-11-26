# Kasa — 학생 방 찾기 (구해줘 홈즈)

프랑스어 숙소 소개 앱 Kasa를 **한국어 학생 원룸·방 찾기 SPA**로 바꾸는 프로젝트입니다.
서버와 DB 없이 정적 JSON 데이터를 사용하며, Vercel에 배포할 예정입니다.

팀 "구해줘 홈즈": 송준선, 임규민

## 현재 상태

**화면은 아직 원본의 프랑스어 앱 그대로입니다.** 현재는 숙소 목록, 숙소 상세, 소개, 오류 페이지가 있고, 아래 계획은 구현 전입니다.

## 계획

| 단계 | 내용 | 담당 |
|---|---|---|
| R0 | 클래스 컴포넌트를 함수 컴포넌트로 전환, 카드 렌더링·`key`·`Link` 수정 | 송준선 |
| R1 | `src/assets/data/logements.json`을 한국 매물 데이터로 교체 (`deposit`, `monthlyRent`, `maintenanceFee`, `zone`, `address`, `lat`, `lng`, `options`) | 송준선 |
| R2 | 여러 지역을 고르는 체크박스 필터 (`?zone=`) | 송준선 |
| R3 | Leaflet과 react-leaflet v4를 사용한 지도 페이지 `/map` | 임규민 |

## 실행 방법

Node.js 22가 필요합니다. Create React App(react-scripts 5), SCSS, React Router 6을 사용합니다.

```bash
npm ci           # 의존성 설치
npm start        # 개발 서버 (http://localhost:3000)
npm run build    # 배포용 빌드
npm test -- --watchAll=false --passWithNoTests   # 앱 테스트 (아직 테스트 없음)
node --test scripts/check-pr.test.mjs            # PR 규칙 검사 테스트
```

## 기여

브랜치, 커밋, PR 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 읽어 주세요.

## 출처와 라이선스

이 저장소는 [m4thieugit/kasa.openclassrooms](https://github.com/m4thieugit/kasa.openclassrooms)(OpenClassrooms 학습 프로젝트, Copyright (c) 2024 Mathieu)의 fork입니다.
[MIT License](LICENSE)를 따릅니다.
