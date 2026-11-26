import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import rooms from '../../assets/data/logements.json';

const renderAt = (url) => render(<MemoryRouter initialEntries={[url]}><Home /></MemoryRouter>);
const results = () => within(screen.getByRole('region', { name: '검색 결과' }));
const cards = () => results().queryAllByRole('link', { name: /보증금/ });
const count = (fn) => rooms.filter(fn).length;
const search = () => within(document.querySelector('form.search'));

beforeAll(() => { window.HTMLMediaElement.prototype.pause = () => {}; });
beforeEach(() => window.localStorage.clear());

test('선택이 없으면 전체 방을 보여준다', () => {
    renderAt('/');
    expect(cards()).toHaveLength(rooms.length);
});

test('지역을 여러 개 고르면 해당 지역의 방만 보이고 해제하면 다시 늘어난다', () => {
    renderAt('/');
    fireEvent.click(search().getByLabelText('양덕동'));
    fireEvent.click(search().getByLabelText('장성동'));
    expect(cards()).toHaveLength(count((r) => ['양덕동', '장성동'].includes(r.zone)));
    fireEvent.click(search().getByLabelText('양덕동'));
    cards().forEach((card) => expect(card).toHaveTextContent('장성동'));
});

test('종류, 보증금, 월세, 옵션 조건을 함께 적용한다', () => {
    renderAt('/?type=' + encodeURIComponent('원룸') + '&maxDeposit=500&maxRent=45&opt=' + encodeURIComponent('인덕션'));
    const expected = count((r) => r.tags[0] === '원룸' && r.deposit <= 500 && r.monthlyRent <= 45 && r.options.includes('인덕션'));
    expect(expected).toBeGreaterThan(0);
    expect(cards()).toHaveLength(expected);
    expect(search().getByLabelText('종류')).toHaveValue('원룸');
});

test('관리비 포함 스위치는 월세 상한과 표시 금액 모두에 적용된다', () => {
    renderAt('/?maxRent=45');
    const before = cards().length;
    fireEvent.click(screen.getByRole('switch'));
    expect(cards()).toHaveLength(count((r) => r.monthlyRent + r.maintenanceFee <= 45));
    expect(cards().length).toBeLessThan(before);
    cards().forEach((card) => expect(card).toHaveTextContent('월세+관리비'));
});

test('잘못된 URL 값은 무시한다', () => {
    renderAt('/?zone=nowhere&type=x&maxDeposit=abc&maxRent=-3&opt=none');
    expect(cards()).toHaveLength(rooms.length);
});

test('결과가 없으면 안내하고 초기화할 수 있다', () => {
    renderAt('/?maxRent=1');
    expect(results().getByText('조건에 맞는 방이 없습니다.')).toBeInTheDocument();
    fireEvent.click(results().getByRole('button', { name: '조건 초기화' }));
    expect(cards()).toHaveLength(rooms.length);
});

test('지도 링크에 조건을 전달한다', () => {
    renderAt('/?maxRent=45&fee=1');
    const href = results().getByRole('link', { name: '지도' }).getAttribute('href');
    expect(href).toContain('maxRent=45');
    expect(href).toContain('fee=1');
});

test('찜하면 저장되고 헤더 개수가 바뀐다', () => {
    renderAt('/');
    const button = results().getByRole('button', { name: `${rooms[0].title} 찜` });
    act(() => { fireEvent.click(button); });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(JSON.parse(window.localStorage.getItem('homez:favorites'))).toEqual([rooms[0].id]);
    expect(screen.getByRole('link', { name: /찜 1/ })).toBeInTheDocument();
});

test('깨진 찜 저장값이 있어도 화면이 동작한다', () => {
    window.localStorage.setItem('homez:favorites', '{not json');
    renderAt('/');
    expect(cards()).toHaveLength(rooms.length);
});

test('비교 손잡이를 움직이면 사진이 잘린다', () => {
    renderAt('/');
    fireEvent.change(screen.getByRole('slider', { name: '사진과 평균 금액 비교' }), { target: { value: '20' } });
    expect(document.querySelector('.compare-photo').style.clipPath).toBe('inset(0 80% 0 0)');
});
