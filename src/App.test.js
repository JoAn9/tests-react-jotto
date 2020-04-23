import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = wrapper.find('[data-test="component-app"]');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord is not updated after every render', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update(); (issue; not working)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
