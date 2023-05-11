const { getReverseStringSteps } = jest.requireActual("./utils");

describe('Алгоритм разворота строки', () => {
  test('Проверка пустой строки', () => {
    expect(getReverseStringSteps('').pop().currentState).toEqual([]);
  });

  test('Проверка строки с одним символом', () => {
    expect(getReverseStringSteps('a').pop().currentState).toEqual(['a']);
  });

  test('Проверка строки с четным количеством символом', () => {
    expect(getReverseStringSteps('abcd').pop().currentState).toEqual(['d', 'c', 'b', 'a']);
  });

  test('Проверка пустой с нечетным количеством символом', () => {
    expect(getReverseStringSteps('abcde').pop().currentState).toEqual(['e', 'd', 'c', 'b', 'a']);
  });

});

export {};
