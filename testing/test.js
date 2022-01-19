import { render, fireEvent } from '@testing-library/svelte';
import { chrome } from 'jest-chrome';
import App from '../chrome_extension/src/App.svelte';

/**
 * @jest-environment jsdom
 */

describe('rendering of main App component', () => {
  const results = render(App);

  it('only displays the connect button', () => {
    expect(() => results.getByText('Connect')).not.toThrow();
    expect(() => results.getAllByRole('button').toHaveLength(1));
  });
});

// describe("on clicking connect button", () => {

// })

// describe("on receiving a message with ctx from background.js", () => {

//   it('')

// })

// describe("on receiving a message without ctx from background.js", () => {

//   it('should push undefined into snaphsots', () => {

//   })
// })

// describe("on clicking a state button", () => {

// })
