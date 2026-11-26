import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import rooms from '../../assets/data/logements.json';

const renderAt = (url) => render(<MemoryRouter initialEntries={[url]}><Home /></MemoryRouter>);
const cards = () => screen.queryAllByRole('link', { name: /보증금/ });
const count = (zone) => rooms.filter((r) => r.zone === zone).length;

test('선택이 없으면 전체 방을 보여준다', () => {
    renderAt('/');
    expect(cards()).toHaveLength(rooms.length);
});

test('지역을 여러 개 고르면 해당 지역의 방만 보이고 해제하면 다시 늘어난다', () => {
    renderAt('/');
    fireEvent.click(screen.getByLabelText('양덕동'));
    expect(cards()).toHaveLength(count('양덕동'));
    fireEvent.click(screen.getByLabelText('장성동'));
    expect(cards()).toHaveLength(count('양덕동') + count('장성동'));
    fireEvent.click(screen.getByLabelText('양덕동'));
    expect(cards()).toHaveLength(count('장성동'));
    // 카드 내용이 필터 결과와 일치해야 한다 (이전 카드가 남지 않음)
    cards().forEach((card) => expect(card).toHaveTextContent('장성동'));
});

test('URL의 zone 값을 읽고, 지도 링크에도 필터를 전달한다', () => {
    renderAt('/?zone=' + encodeURIComponent('장성동'));
    expect(screen.getByLabelText('장성동')).toBeChecked();
    expect(cards()).toHaveLength(count('장성동'));
    expect(screen.getByRole('link', { name: '지도' }).getAttribute('href')).toContain('/map?zone=');
});

test('알 수 없는 zone 값은 무시한다', () => {
    renderAt('/?zone=nowhere');
    expect(cards()).toHaveLength(rooms.length);
});
