import { pathToFileURL } from 'node:url';

const FEATURE = /^feature\/\d+-\S+$/;
const RELEASE = /^(release|hotfix)\/\d+\.\d+\.\d+$/;
const TITLE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?!?: \S.*$/;

function checkBranch(head, base, sameRepo) {
    if (head === 'main' && base === 'develop') {
        return sameRepo ? null : 'main → develop 역반영 PR은 이 저장소의 main 브랜치에서만 만들 수 있습니다.';
    }
    if (FEATURE.test(head)) {
        return base === 'develop' ? null : `'${head}' 브랜치의 PR 대상(base)은 develop이어야 합니다. 현재: ${base}`;
    }
    if (RELEASE.test(head)) {
        if (base !== 'main') return `'${head}' 브랜치의 PR 대상(base)은 main이어야 합니다. 현재: ${base}`;
        return sameRepo ? null : 'release·hotfix PR은 이 저장소의 브랜치에서만 만들 수 있습니다.';
    }
    return `허용되지 않는 브랜치입니다: '${head}' → '${base}'. feature/<이슈번호>-<설명> (→ develop), release/X.Y.Z 또는 hotfix/X.Y.Z (→ main) 형식을 사용하세요.`;
}

export function checkPr({ head, base, title, sameRepo }) {
    const errors = [];
    const branchError = checkBranch(head, base, sameRepo);
    if (branchError) errors.push(branchError);
    if (!TITLE.test(title)) {
        errors.push(`PR 제목이 '타입(범위): 설명' 형식이 아닙니다: ${title} (타입: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)`);
    }
    return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const { PR_HEAD = '', PR_BASE = '', PR_TITLE = '', PR_SAME_REPO } = process.env;
    const errors = checkPr({
        head: PR_HEAD,
        base: PR_BASE,
        title: PR_TITLE,
        sameRepo: PR_SAME_REPO === 'true',
    });
    for (const error of errors) console.error(error);
    if (errors.length > 0) process.exitCode = 1;
    else console.log('PR 규칙 검사 통과');
}
