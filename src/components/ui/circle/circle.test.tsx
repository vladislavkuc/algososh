import renderer from 'react-test-renderer';

const { Circle } = jest.requireActual('./circle');
const { ElementStates } = jest.requireActual('../../../types/element-states');

it('Круг с текстом отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг без текста отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и head отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' head={'abc'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и элементом в head отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' head={<Circle letter='head'/>}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и tail отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' tail={'abc'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и элементом в tail отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' tail={<Circle letter='tail'/>}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и index отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' index={53}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг с текстом и пропсом isSmall отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' isSmall={true}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг в состоянии default отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' state={ElementStates.Default}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг в состоянии changing отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' state={ElementStates.Changing}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Круг в состоянии modified отрисовывается корректно', () => {
  const tree = renderer
    .create(<Circle letter='abc' state={ElementStates.Modified}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

export {};
