import React from 'react';
import { shallow } from 'enzyme';

import Arrow from '../../components/Arrow';
import { findByTestAttribute } from '../helpers';

const moveDateMock = jest.fn();

const defaultProps = {
  outerClassName: 'one',
  innerClassName: 'two',
  handleClick: moveDateMock,
  handleKeyPress: moveDateMock,
};

const setup = () => shallow(<Arrow {...defaultProps} />);

describe('Arrow Component', () => {
  test('renders outerclassName correctly', () => {
    const wrapper = setup();
    const outterDiv = findByTestAttribute(wrapper, '.one');
    expect(outterDiv.length).toBe(1);
  });

  test('renders innerclassName correctly', () => {
    const wrapper = setup();
    const icon = findByTestAttribute(wrapper, '.two');
    expect(icon.length).toBe(1);
  });

  test('clicking the button correctly calls a method', () => {
    const wrapper = setup();
    const outterDiv = findByTestAttribute(wrapper, '.one');
    outterDiv.simulate('click');

    const moveDateMockCount = moveDateMock.mock.calls.length;

    expect(moveDateMockCount).toBe(1);
  });
});
