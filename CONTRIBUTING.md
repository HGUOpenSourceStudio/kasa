# 협업 가이드

"구해줘 홈즈" 팀(송준선, 임규민)의 작업 규칙입니다. Git Flow를 사용합니다.

> **경고: 이 저장소는 fork입니다.**
> PR의 대상 저장소(base repository)는 반드시 **`HGUOpenSourceStudio/kasa`** 여야 합니다.
> GitHub 웹과 `gh`는 원본 저장소(`m4thieugit/kasa.openclassrooms`)를 기본값으로 고를 수 있으니, PR을 만들기 전에 확인하세요.
> 저장소를 clone한 뒤 한 번 실행해 두세요.
>
> ```bash
> gh repo set-default HGUOpenSourceStudio/kasa
> ```

## 브랜치 규칙

| 브랜치 | 용도 | 시작 지점 | PR 대상 | 병합 방식 |
|---|---|---|---|---|
| `main` | 배포 가능한 버전 | - | - | 직접 push 금지 |
| `develop` | 다음 버전 통합(기본 브랜치) | `main` | - | 직접 push 금지 |
| `feature/<이슈번호>-<설명>` | 기능·문서·일반 수정 | `develop` | `develop` | Squash merge |
| `release/X.Y.Z` | 배포 준비 | `develop` | `main` | Merge commit |
| `hotfix/X.Y.Z` | 배포본 긴급 수정 | `main` | `main` | Merge commit |
| `main` (역반영) | 배포 결과를 `develop`에 반영 | - | `develop` | Merge commit |

일반 버그 수정도 `feature/` 브랜치를 사용합니다(`fix/` 브랜치는 검사에서 실패합니다).

## 기능 작업 순서

```bash
# 1. 이슈 만들기 (출력된 번호를 아래 N에 사용)
gh issue create -R HGUOpenSourceStudio/kasa

# 2. develop에서 브랜치 만들기
git switch develop
git pull origin develop
git switch -c feature/N-short-description

# 3. 커밋
git add <파일>
git commit -m "feat: 설명"

# 4. push 후 PR 만들기 (본문에 Closes #N 작성)
git push -u origin feature/N-short-description
gh pr create -R HGUOpenSourceStudio/kasa --base develop

# 5. 리뷰 반영, 검사 확인
gh pr checks --watch

# 6. 승인 1개와 검사 통과 후 squash merge
gh pr merge --squash
```

- `Closes #N`은 기본 브랜치인 `develop`에 병합될 때만 이슈를 자동으로 닫습니다. `main`에만 병합되는 PR(hotfix 등)의 이슈는 직접 닫거나, 역반영 PR 본문에 `Closes #N`을 적으세요.
- 외부 기여자는 fork의 `feature/<이슈번호>-<설명>` 브랜치에서 `develop`으로 PR을 보내면 됩니다.

## 커밋과 PR 제목

`타입(범위): 설명` 형식을 사용합니다. 범위는 생략할 수 있고, 호환성이 깨지는 변경은 `!`를 붙입니다.

- 타입: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- 예: `feat(map): 지도 페이지 추가`, `fix!: 데이터 필드 이름 변경`

Squash merge를 하면 PR 제목이 `develop`의 이력에 남으므로 PR 제목도 같은 형식이어야 합니다.

## 리뷰와 병합 조건

- 팀원의 **승인 1개**가 필요합니다.
- **검사 통과**가 필요합니다.
  - `check`: 빌드와 테스트. 통과하지 않으면 병합할 수 없습니다.
  - `pr-rules`: 브랜치 이름, PR 대상, PR 제목. 팀 규칙상 통과한 뒤 병합합니다.
- 리뷰 요청을 받으면 **24시간 안에** 응답합니다.
- 승인 후 새 커밋을 push하면 기존 승인이 취소되므로 다시 리뷰를 요청합니다.

## 로컬에서 확인하기

```bash
npm ci
CI=true npm run build
npm test -- --watchAll=false --passWithNoTests
node --test scripts/check-pr.test.mjs
```

CI에서는 `CI=true`이므로 빌드 경고도 실패로 처리됩니다.

## Release와 Hotfix

1. 브랜치를 만듭니다. release는 `develop`에서, hotfix는 `main`에서 시작합니다.

   ```bash
   git switch develop                # hotfix라면 main
   git pull
   git switch -c release/X.Y.Z       # hotfix라면 hotfix/X.Y.Z
   ```

2. 필요한 수정과 `package.json` 버전 변경을 커밋하고 push합니다.
3. `main`으로 PR을 만들고, 승인과 검사 통과 후 **merge commit**으로 병합합니다.

   ```bash
   gh pr create -R HGUOpenSourceStudio/kasa --base main --title "chore: release vX.Y.Z"
   gh pr merge --merge
   ```

4. `main`에 태그 `vX.Y.Z`를 만듭니다.

   ```bash
   git switch main
   git pull origin main
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

5. `main`을 `develop`에 역반영하는 PR을 만들고 **merge commit**으로 병합합니다.

   ```bash
   gh pr create -R HGUOpenSourceStudio/kasa --base develop --head main --title "chore: merge main into develop"
   gh pr merge --merge
   ```

## 비밀 정보

- API 키, 토큰, 비밀번호 같은 비밀 정보는 **절대 커밋하지 않습니다.** 이 저장소는 공개 저장소입니다.
- `.gitignore`는 `.env.local`, `.env.*.local`만 제외합니다. `.env` 파일은 제외되지 않으므로 비밀 값을 넣지 마세요.
- `REACT_APP_`으로 시작하는 환경 변수는 빌드 결과물에 포함되어 누구나 볼 수 있습니다.
- 실수로 노출했다면 커밋을 지우는 것으로 끝내지 말고, **즉시 폐기하고 재발급**한 뒤 팀원에게 알리세요.
