import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

it('Кнопка с текстом отрисовывается корректно', () => {
  const tree = renderer
    .create(<Button text='Кнопка'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка без текста отрисовывается корректно', () => {
  const tree = renderer
    .create(<Button/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка с текстом отрисовывается корректно', () => {
  const tree = renderer
    .create(<Button text='Кнопка' disabled={true}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка с текстом и индикацией загрузки отрисовывается корректно', () => {
  const tree = renderer
    .create(<Button text='Кнопка' isLoader={false}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает корректный callback', () => {
  window.alert = jest.fn();

  render(<Button text='Вызвать alert' onClick={e => { alert('alert вызван успешно')}}/>)

  const button = screen.getByText("Вызвать alert");

  fireEvent.click(button);

  expect(window.alert).toHaveBeenCalledWith('alert вызван успешно');
});

export {};
