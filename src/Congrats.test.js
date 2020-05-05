import React from 'react';
import { mount } from 'enzyme';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('renders without error', () => {
  const wrapper = setup({});
  const component = wrapper.find('[data-test="component-congrats"]');
  expect(component.length).toBe(1);
});

test('renders no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = wrapper.find('[data-test="component-congrats"]');
  // expect(component.length).toBe(0);
  expect(component.text()).toBe('');
});

test('render some message when `success` is true', () => {
  const wrapper = setup({ success: true });
  const message = wrapper.find('[data-test="message"]');
  expect(message.text().length).not.toBe(0);
});
