import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { checkPr } from './check-pr.mjs';

const script = fileURLToPath(new URL('./check-pr.mjs', import.meta.url));
const okTitle = 'feat: 지도 추가';
const pr = (over) => ({ head: 'feature/3-map', base: 'develop', title: okTitle, sameRepo: true, ...over });

const passing = {
    'feature -> develop': {},
    'fork의 feature -> develop': { sameRepo: false },
    'release -> main': { head: 'release/0.1.0', base: 'main' },
    'hotfix -> main': { head: 'hotfix/0.1.1', base: 'main' },
    'main -> develop 역반영': { head: 'main', base: 'develop' },
    'scope와 ! 가 있는 제목': { title: 'fix(map)!: 오류 수정' },
};

for (const [name, over] of Object.entries(passing)) {
    test(`통과: ${name}`, () => {
        assert.deepEqual(checkPr(pr(over)), []);
    });
}

const failing = {
    'feature -> main': { base: 'main' },
    '이슈 번호 없는 feature': { head: 'feature/login' },
    '버전 형식이 틀린 release': { head: 'release/1.0', base: 'main' },
    'release -> develop': { head: 'release/0.1.0' },
    'fork의 main -> develop': { head: 'main', sameRepo: false },
    'fork의 release -> main': { head: 'release/0.1.0', base: 'main', sameRepo: false },
    '허용되지 않은 브랜치 종류': { head: 'fix/3-x' },
    '타입 없는 제목': { title: 'update map' },
    '설명 없는 제목': { title: 'feat:' },
    '대문자 타입 제목': { title: 'Feat: x' },
};

for (const [name, over] of Object.entries(failing)) {
    test(`실패: ${name}`, () => {
        const errors = checkPr(pr(over));
        assert.equal(errors.length, 1);
        assert.match(errors[0], /[가-힣]/);
    });
}

test('잘못된 브랜치 메시지는 올바른 형식을 알려 준다', () => {
    const [message] = checkPr(pr({ head: 'feature/login' }));
    assert.match(message, /feature\/<이슈번호>-<설명>/);
});

test('브랜치와 제목이 모두 틀리면 오류를 둘 다 알려 준다', () => {
    assert.equal(checkPr(pr({ head: 'fix/3-x', title: 'update map' })).length, 2);
});

const run = (env) =>
    spawnSync(process.execPath, [script], { env: { ...process.env, ...env }, encoding: 'utf8' });
const env = { PR_HEAD: 'feature/3-map', PR_BASE: 'develop', PR_TITLE: okTitle, PR_SAME_REPO: 'false' };

test('직접 실행: 통과하면 종료 코드 0', () => {
    assert.equal(run(env).status, 0);
});

test('직접 실행: 오류가 있으면 종료 코드 1', () => {
    const result = run({ ...env, PR_HEAD: 'main', PR_TITLE: 'chore: merge main into develop' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /[가-힣]/);
});

test('직접 실행: 제목의 따옴표, 백틱, $( )는 문자열로만 처리한다', () => {
    const title = '"; exit 7; \' `exit 8` $(exit 9)';
    const result = run({ ...env, PR_TITLE: title });
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes(title));
});
