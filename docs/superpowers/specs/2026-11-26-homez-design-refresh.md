# Homez 디자인 개편 설계

## 의도
Homez(Kasa fork)의 mock 데이터와 기능은 유지하고, 모양과 움직임을
https://internestrealty.com/en/ 첫 화면처럼 바꾼다. 원본 11개 구역을 빠짐없이 옮긴다.

## 목표 / 하지 않는 것
- 목표: 첫 화면 전체 개편. 상세·지도·소개 페이지는 색, 글꼴, 헤더를 맞춘다.
- 하지 않음: API 연동, 서버, 로그인, 예약·상담 접수, 매물/분양/서비스 등 새 하위 페이지(찜 제외).
- 하지 않음: 원본 사이트의 사진, 영상, 문구, 로고 사용.
- 실패로 보는 것: 지어낸 숫자나 후기가 실제처럼 보이는 것, 기존 필터·지도·상세가 깨지는 것, 휴대폰에서 레이아웃이 무너지는 것.

## 검토한 방식
- **A (선택): React와 CSS만.** 작은 컴포넌트와 훅을 직접 작성. 새 라이브러리 없음, 설명 가능, 움직임은 원본보다 단순.
- B: framer-motion, swiper. 원본에 가깝지만 용량과 학습 부담 증가.

## 제약
- CRA, React 18, React Router 6. 새 npm 의존성 없음. 새 스타일은 `.css`.
- `CI=true npm run build`가 경고 없이 성공해야 한다.
- 작업 위치 `Desktop/01_공부-학습/HGU/OSS/kasa`, 브랜치 `feature/3-homez-design`
  (`feature/3-room-search-prototype`에서 분기). 커밋·push는 요청 시에만.
- 지도 페이지(R3)는 임규민 담당 영역이다. (만드는 사람 판단) 모양 외의 변경은 목록과 어긋나지 않기 위한 최소한만 한다:
  공용 필터 훅으로 마커에 모든 조건 적용, 지역을 바꿔도 다른 조건 유지, "목록으로" 링크에 조건 전달, 팝업에 관리비 스위치 반영.

## 색과 글자
- 바탕 `#FFFFFF`, 먹색 `#1F1E1C`, 옅은 회색 `#F5F5F5`, 강조 `#FF6060`.
- `#FF6060`과 흰 글자는 대비가 낮다. 작은 글자와 버튼 글자에는 먹색을 쓰거나 더 진한 `#D93A3A` 바탕을 쓴다. (만드는 사람 판단)
- 제목은 Montserrat, 얇은 줄 + 굵은 줄. 한글은 시스템 글꼴. 모서리 16px.

## 첫 화면 순서
1. **인트로**: Homez 로고 1.5초, 클릭하면 건너뜀, 브라우저 세션당 한 번. 동작 줄이기 설정이면 생략.
2. **헤더**: 위쪽 보조 줄(팀 GitHub, 소개). 홈 맨 위에서는 투명 + 흰 로고, 스크롤하면 흰색.
   다른 페이지는 항상 흰색. 메뉴 홈·지도·소개·찜(개수 표시). 좁은 화면은 접이식 메뉴.
3. **히어로와 검색**: 전체 높이 **배경 영상**, 어두운 덮개, 큰 제목.
   - `public/videos/hero.mp4`(H.264, 1920×1080, 6~10초 반복, 소리 없음, 8MB 이하), 대표 이미지는 `images/ui/hero.jpg`.
   - 자동 재생, 반복, 음소거, 화면 안 재생(`autoPlay loop muted playsInline`), 장식용이라 보조 기술에서 숨김.
   - 동작 줄이기 설정이면 영상을 불러오지 않고 대표 이미지를 보여준다. 영상 재생/정지 버튼을 둔다.
   - 영상이 없거나 재생이 막히면 대표 이미지, 그것도 없으면 그라데이션.
   검색 바: 지역(복수), 종류, 보증금 상한, 월세 상한, 검색 버튼.
   상세 검색: 옵션 복수 선택(고른 것을 모두 갖춘 방). 스위치 "관리비 포함 금액으로 보기".
   - 조건은 URL에 저장: `zone`, `type`, `maxDeposit`, `maxRent`, `opt`, `fee=1`. 잘못된 값은 무시.
   - 스위치를 켜면 카드·팝업의 월세와 월세 상한 모두 `월세+관리비` 기준.
   - 검색 버튼은 아래 결과 목록으로 스크롤한다. 지도 링크에도 조건을 전달한다.
4. **검색 결과 목록**: 기존 카드 그리드. 결과 0건 안내와 조건 초기화. (R2 유지를 위한 판단)
5. **시세 확인 비교**: 손잡이(range 입력, 키보드 조작 가능)로 선명/흐림을 넘긴다. 문구 "계약 전에 시세부터". 숫자에 **예시** 표시.
   (만드는 사람 판단) 선명한 쪽은 예시 방 사진, 반대쪽은 흐린 사진 위에 mock 매물에서 계산한 **권역별 평균 보증금·월세·관리비**. "예시 데이터 기준"이라고 적는다.
6. **포항 권역 지도**: 점으로 그린 개략도(실제 축척 아님이라고 표시), 3개 권역 선택, 선택 권역 사진 카드와 방 수, 방향 바늘 장식. 카드를 누르면 해당 지역으로 필터.
7. **추천 방 슬라이드**: 평점 4 이상. 좌우 버튼 + 손가락 스크롤(scroll-snap).
8. **계약 체크 포인트**: 큰 사진 위 버튼 5개(보증금, 관리비, 옵션, 계약서, 확정일자), 누르면 설명 카드.
   "일반 안내이며 법률 자문이 아님" 표시. 좁은 화면은 버튼 목록으로.
9. **신축 방 슬라이드**: mock 데이터에 `builtYear` 추가, 최신순.
10. **후기**: 가상 후기 6개, 구역 제목과 각 카드에 **예시** 표시. 평점 합계, 실제 이름, 구글 표시 없음.
11. **마무리 화면과 푸터**: 큰 제목, "문의하기" → https://github.com/HGUOpenSourceStudio/kasa/issues.
    푸터는 메뉴, 권역, 팀명, "Based on Kasa (MIT)".
- 오른쪽 아래 상담 버튼: 같은 GitHub issues 링크.
- 공통: 스크롤 등장 효과(동작 줄이기 설정이면 없음).

## 찜
카드와 상세의 하트. `localStorage` 키 `homez:favorites`(매물 id 배열). 저장이 막히거나 값이 깨져도 화면은 동작.
`/favorites` 페이지에 목록과 빈 상태.

## 기타 페이지
상세·지도·소개·404·500: 색, 글꼴, 헤더 통일. 소개 페이지 접이식 항목 너비를 같게 고친다.

## 확인 방법
필터 조건 조합, URL 복원, 관리비 스위치, 찜 저장/깨진 값, 비교 손잡이는 테스트.
데스크톱과 390px 폭에서 화면 확인, 콘솔 오류 확인.

## 이미지 (팀이 AI로 생성)
`public/images/ui/`에 저장. 깨진 아이콘이 나오지 않아야 한다.
(만드는 사람 판단) 이미지는 파일이 없어도 동작해야 한다. 방 사진은 `room-N.jpg`를 먼저 쓰고 없으면 지금의 SVG를 보여준다.
그 밖의 큰 이미지는 없으면 색 그라데이션을 보여준다. 파일이 준비되기 전의 화면 확인 결과는 "사진 없이 확인"으로 보고한다.
공통 문구(모든 프롬프트 뒤에 붙임):
`photorealistic, warm golden evening light, soft shadows, calm editorial real-estate photography, no people, no text, no logo, no watermark`
원룸 사진과 첫 화면에는 "AI 생성 예시 이미지" 표시를 한다.

| 파일 | 크기 | 프롬프트 |
|---|---|---|
| hero.jpg | 2400×1350 | Quiet Korean university town near the sea, low-rise villa apartments on a green hill, wide view, darker lower half for text |
| compare.jpg | 1600×1000 | Bright Korean studio apartment, large window, bed on right, desk on left |
| services.jpg | 2000×1125 | Korean studio apartment seen from a desk: contract papers and pen front left, keys front center, window top right, air conditioner top left, bed middle |
| closing.jpg | 2400×1350 | Open front door of a cozy Korean studio at dusk, warm light spilling out |
| zone-handong.jpg | 1200×900 | Small village of student housing surrounded by hills and trees, Korea |
| zone-yangdeok.jpg | 1200×900 | Clean Korean residential neighborhood with mid-rise buildings and a small park |
| zone-jangseong.jpg | 1200×900 | Lively Korean low-rise neighborhood street with small shops without signs text |
| room-1.jpg | 1600×1000 | Compact Korean one-room studio, kitchenette, white walls, wooden floor |
| room-2.jpg | 1600×1000 | New two-room Korean apartment living area, minimal furniture |
| room-3.jpg | 1600×1000 | Korean loft-style studio with stairs to a sleeping area |
| room-4.jpg | 1600×1000 | Renovated Korean studio, beige tones, desk by the window |
| room-5.jpg | 1600×1000 | Small Korean studio with separated kitchen behind a glass door |
| room-6.jpg | 1600×1000 | Korean studio with a small terrace and plants |

## 영상 (팀이 AI로 생성)
`hero.jpg`를 먼저 만들고 그 이미지를 시작 장면으로 넣어 영상을 만들면 대표 이미지와 영상이 이어진다.

프롬프트:
`Slow cinematic drone push-in over a quiet Korean university town near the sea, low-rise villa apartments on a green hill, warm golden evening light, gentle movement of trees, steady camera, no cuts, seamless loop, photorealistic, no people, no text, no logo, no watermark`

영상에도 "AI 생성 예시 영상" 표시를 한다.

## 만드는 사람에게 맡기는 것
컴포넌트 분할, 애니메이션 시간, 점 지도 모양, 예시 문구.
