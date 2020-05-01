import React from 'react';
import { shallow, mount } from 'enzyme';
import { checkProps } from './test/testUtils';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';

const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={success} />
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
  const wrapper = shallow(<Congrats success={false} />);
  const component = wrapper.find('[data-test="component-congrats"]');
  expect(component.length).toBe(1);
});

test('renders no text when `success` props is false', () => {
  const wrapper = shallow(<Congrats success={false} />);
  const component = wrapper.find('[data-test="component-congrats"]');
  // expect(component.length).toBe(0);
  expect(component.text()).toBe('');
});

test('render some message when `success` props is true', () => {
  const wrapper = shallow(<Congrats success={true} />);
  const message = wrapper.find('[data-test="message"]');
  expect(message.text().length).not.toBe(0);
});

test("doesn't throw warning when expected type of props", () => {
  const expectedProps = { success: true };
  const propError = checkProps(Congrats, expectedProps);
  expect(propError).toBeUndefined();
});
