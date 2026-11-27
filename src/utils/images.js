// public/ 이미지는 CSS 파일이 아니라 인라인 스타일로 지정한다(CRA가 CSS의 url()을 번들로 해석하기 때문).
// 파일이 없으면 뒤의 그라데이션이 보인다.
export const uiImage = (name, from, to) => ({
    backgroundImage: `url(/images/ui/${name}.jpg), linear-gradient(135deg, ${from}, ${to})`,
});
