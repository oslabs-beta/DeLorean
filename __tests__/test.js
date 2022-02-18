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
  const mainToBgPort = {};

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
    // checking to see if mainToBgPort has haslistener's function definition(ND)
    expect(mainToBgPort.onMessage.hasListeners()).toBe(true);
  });
});

describe('on clicking a state button', () => {
  /*
    need to mock Svelte app state data from background page... message should be this format:
    {
      body: {
        componentStates: [
          [
            [
              {component, could be {} for testing purposes},
              {stateValues ex {counter: 0} },
              'componentName',
            ],
            [
              {component2, could be {} for testing purposes},
              {stateValues ex {counter: 0} },
              'component2Name'
            ]
          ],
          [ [different state of component1], [different sate of comp 2] ],
          [ [different state of component1], [different sate of comp 2] ],
        ],
        cacheLength: 3;
      }
    }
  */
  let results;
  let mainToBgPort = {};

  chrome.runtime.connect.mockImplementation(() => ({
    onMessage: {
      addListener: () => {},
    },
    postMessage: jest.fn(() => ({
      body: {
        componentStates: [{}, { state: 0 }, 'componentName'],
        cacheLength: 0,
      },
    })),
  }));

  // mainToBgPort.postMessage({ body: 'updateCtx', ctxIndex: i });

  beforeEach(async () => {
    results = render(App);
    await fireEvent.click(screen.getByText('Connect'));
    // we need to send fake data to make state buttons appear (ND)
    setTimeout(await fireEvent.click(screen.getByText('State')), 2000);
    mainToBgPort.postMessage.mockImplementation(() => {});
    activeIndex = 0;
    mainToBgPort = chrome.runtime.connect();
  });

  it('receive the correct data types from bg', () => {
    expect(mainToBgPort.postMessage.mock.calls.length).toBe(1);
  });

  it('posts a message on mainToBgPort', () => {
    expect(mainToBgPort.postMessage.mock.calls.length).toBe(1);
  });

  it('changes activeIndex value', () => {
    expect(results.activeIndex).not.toBe(1);
  });
});
