import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: 'en' }, jest.fn()]);

  React.useReducer = mockUseReducer;

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

    // wrapper.update(); (issue; .update() not working)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = wrapper.find('[data-test="component-app"]');
    expect(appComponent.exists()).toBe(true);
  });

  test('does not render spinner when secretWord is not null', () => {
    const spinner = wrapper.find('[data-test="spinner"]');
    expect(spinner.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = wrapper.find('[data-test="component-app"]');
    expect(appComponent.exists()).toBe(false);
  });

  test('renders spinner when secretWord is null', () => {
    const spinner = wrapper.find('[data-test="spinner"]');
    expect(spinner.exists()).toBe(true);
  });
});
