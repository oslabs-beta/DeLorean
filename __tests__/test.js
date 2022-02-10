import { render, fireEvent } from '@testing-library/svelte';
import { screen } from '@testing-library/dom';
import { chrome } from 'jest-chrome'; // importing for intellisense and linting, chrome is defined globally
import App from '../chrome_extension/src/App.svelte';

/**
 * @jest-environment jsdom
 */
describe('checking for chrome native functions', () => {
  test('chrome is mocked', () => {
    expect(chrome).toBeDefined();
    expect(window.chrome).toBeDefined();
    expect(chrome.storage.local).toBeDefined();
    expect(chrome.runtime).toBeDefined();
    expect(chrome.runtime.connect).toBeDefined();
  });

  test('chrome api functions are mocked', () => {
    const manifest = {
      name: 'DeLorean',
      manifest_version: 2,
      version: '1.2',
    };
    chrome.runtime.getManifest.mockImplementation(() => manifest);
    expect(chrome.runtime.getManifest()).toEqual(manifest);
    expect(chrome.runtime.getManifest).toBeCalled();
  });
});

describe('rendering of main App component', () => {
  let results;

  beforeEach(() => {
    results = render(App);
  });

  it('only displays the connect button', () => {
    expect(() => results.getByText('Connect').not.toThrow());
    expect(() => results.getAllByRole('button').toHaveLength(1));
  });
});

describe('on clicking connect button', () => {
  let results;

  beforeEach(() => {
    results = render(App);
    chrome.runtime.connect.mockImplementation(() => ({
      onMessage: {
        addListener: () => {},
      },
      postMessage: () => {},
    }));
  });

  it('hides the connect button once clicked and displays a single state button', async () => {
    expect(screen.queryByText('Connect')).not.toBe(null);
    await fireEvent.click(screen.getByText('Connect'));
    expect(() => screen.getByText('Connect').toThrow());
  });

  it('adds events listeners to mainToBgPort', () => {
    expect(mainToBgPort.onMessage.hasListeners()).toBe(true);
  });
});

describe('on clicking a state button', () => {
  let results;
  let mainToBgPort = {};
  mainToBgPort.postMessage = () => {};
  chrome.runtime.connect.mockImplementation(() => ({
    onMessage: {
      addListener: () => {},
    },
    postMessage: () => {
      body: {
        componentStates: [],
        cacheLength: 0
      }
    }
  }));

  beforeEach(async () => {
    results = render(App);
    await fireEvent.click(screen.getByText('Connect'));
    // setTimeout(await fireEvent.click(screen.getByText('State')), 2000);
    // mainToBgPort.postMessage.mockImplementation(() => {});
    // activeIndex = 0;
  });

  it('receive the correct data types from bg', () => {
    expect(mainToBgPort.postMessage.mock.calls.length).toBe(1);
  });

  it('posts a message on mainToBgPort', () => {
    expect(mainToBgPort.postMessage.mock.calls.length).toBe(1);
  });

  it('changes activeIndex value', () => {
    expect(results.activeIndex).not.toBe(1);
    console.log('results',results)
    console.log(results.activeIndex)
  });
});

// describe("on receiving a message with ctx from background.js", () => {

//   it('')

// })

// describe("on receiving a message without ctx from background.js", () => {

//   it('should push undefined into snaphsots', () => {

//   })
// })
