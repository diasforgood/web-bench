
// Test utility functions extracted from @web-bench/test-util
const { expect } = require('@playwright/test');

async function expectArrayItemsEqual(items, numDigits = 5) {
  for (let i = 0; i < items.length - 1; i++) {
    expect(items[i]).toBeCloseTo(items[i + 1], numDigits);
  }
}

async function expectBetween(actual, expectLower, expectUpper) {
  expect(actual).toBeGreaterThanOrEqual(expectLower);
  expect(actual).toBeLessThanOrEqual(expectUpper);
}

async function expectTolerance(actual, expectValue, tolerancePercent = 5) {
  const lower = expectValue * (1 - tolerancePercent / 100);
  const upper = expectValue * (1 + tolerancePercent / 100);
  expectBetween(actual, lower, upper);
}

async function expectOneLine(page, selector) {
  const isTextClipped = await page
    .locator(selector)
    .first()
    .evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });
  expect(isTextClipped).toBeFalsy();
}

async function getComputedStyle(page, selector) {
  return getComputedStyleByLocator(page.locator(selector).first());
}

async function getComputedStyleByLocator(locator) {
  return locator.evaluate((el) => window.getComputedStyle(el));
}

async function getHtmlElement(page, selector) {
  return page.locator(selector).evaluate((el) => el);
}

async function getOffset(page, selector) {
  return getOffsetByLocator(page.locator(selector).first());
}

async function getOffsetByLocator(locator) {
  return locator.evaluate((el) => {
    function _getOffset(el) {
      const rect = el.getBoundingClientRect();
      const left = rect.left + window.scrollX;
      const top = rect.top + window.scrollY;
      const width = rect.width;
      const height = rect.height;

      return {
        left,
        top,
        width,
        height,
        centerX: left + width / 2,
        centerY: top + height / 2,
        right: left + width,
        bottom: top + height,
      };
    }

    return _getOffset(el);
  });
}

async function getViewport(page) {
  return page
    .locator('html')
    .first()
    .evaluate(() => ({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }));
}

function getBox(style) {
  const height =
    style.boxSizing === 'content-box'
      ? parseFloat(style.height) +
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderTopWidth) +
        parseFloat(style.borderBottomWidth)
      : parseFloat(style.height);

  const width =
    style.boxSizing === 'content-box'
      ? parseFloat(style.width) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth)
      : parseFloat(style.width);

  return { width, height };
}

async function getBoxByLocator(locator) {
  const style = await getComputedStyleByLocator(locator);
  return getBox(style);
}

async function getContentBoxByLocator(locator) {
  const style = await getComputedStyleByLocator(locator);
  const height =
    style.boxSizing === 'content-box'
      ? parseFloat(style.height)
      : parseFloat(style.height) -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom) -
        parseFloat(style.borderTopWidth) -
        parseFloat(style.borderBottomWidth);

  const width =
    style.boxSizing === 'content-box'
      ? parseFloat(style.width)
      : parseFloat(style.width) -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight) -
        parseFloat(style.borderLeftWidth) -
        parseFloat(style.borderRightWidth);

  return { width, height };
}

function getMarginBox(style) {
  const box = getBox(style);
  return {
    width: box.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    height: box.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom),
  };
}

async function getMarginBoxByLocator(locator) {
  const style = await getComputedStyleByLocator(locator);
  return getMarginBox(style);
}

function isExisted(filePath, srcPath) {
  const root = process.env['EVAL_PROJECT_ROOT'] || srcPath;
  return fs.existsSync(path.join(root, filePath));
}

async function getWindowMirror(page, _keys) {
  if (!_keys) {
    return {};
  }
  const keys = typeof _keys === 'string' ? [_keys] : _keys;
  const cb = new Function(`
      return [${keys.map((v) => `"${v}"`).join(',')}].reduce((pre, cur) => {
        return {
          ...pre,
          [cur]: window[cur]
        }
      }, {})
    `);

  return page.evaluate(cb);
}

async function getDomParams(locator, _keys) {
  if (!_keys) {
    return {};
  }
  const keys = typeof _keys === 'string' ? [_keys] : _keys;
  const cb = new Function(
    ['elm'],
    `
      return [${keys.map((v) => `"${v}"`).join(',')}].reduce((pre, cur) => {
        return {
          ...pre,
          [cur]: elm[cur]
        }
      }, {})
    `
  );

  return locator.evaluate(cb);
}

async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms || 100);
  });
}

function getCmdKey() {
  const isMac = require('os').platform() === 'darwin';
  return isMac ? 'Meta' : 'Control';
}

function getCmdKeyText() {
  const isMac = require('os').platform() === 'darwin';
  return isMac ? 'Cmd' : 'Ctrl';
}

module.exports = {
  expectArrayItemsEqual,
  expectBetween,
  expectTolerance,
  expectOneLine,
  getComputedStyle,
  getComputedStyleByLocator,
  getHtmlElement,
  getOffset,
  getOffsetByLocator,
  getBox,
  getBoxByLocator,
  getContentBoxByLocator,
  getMarginBox,
  getMarginBoxByLocator,
  getViewport,
  isExisted,
  getWindowMirror,
  getDomParams,
  sleep,
  getCmdKey,
  getCmdKeyText,
};
