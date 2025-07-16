// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { test, expect } = require('@playwright/test')
const { getComputedStyleByLocator } = require('../libraries/test-util/src')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('default bg', async ({ page }) => {
  const style = await getComputedStyleByLocator(page.locator('.color.hwb'))
  await expect(style.backgroundColor).toBe('rgb(255, 0, 0)')
})

test('change props to show result', async ({ page }) => {
  for (let i = 0; i < 3; i++) {
    await page.locator('.hwb .prop').nth(0).fill('90')
    await expect(page.locator('.hwb .result').nth(0)).toContainText('90')
  }

  await page.locator('.hwb .prop').nth(3).fill('0.5')
  await expect(page.locator('.hwb .result').nth(3)).toContainText('0.5')
})

test('change props to change bg | component range', async ({ page }) => {
  const ranges = await page.locator('.hwb input[type="range"]').all()
  await expect(ranges[0]).toHaveAttribute('min', '0')
  await expect(ranges[0]).toHaveAttribute('max', '360')
  await expect(ranges[1]).toHaveAttribute('min', '0')
  await expect(ranges[1]).toHaveAttribute('max', '100')
  await expect(ranges[2]).toHaveAttribute('min', '0')
  await expect(ranges[2]).toHaveAttribute('max', '100')
})

test('change props to change bg', async ({ page }) => {
  await page.locator('.hwb .prop').nth(0).fill('90')
  await expect(page.locator('.hwb .result').nth(0)).toContainText('90')
  let style = await getComputedStyleByLocator(page.locator('.hwb'))
  await expect(style.backgroundColor).toBe('rgb(128, 255, 0)')

  await page.locator('.hwb .prop').nth(1).fill('90')
  await expect(page.locator('.hwb .result').nth(1)).toContainText('90')
  style = await getComputedStyleByLocator(page.locator('.hwb'))
  await expect(style.backgroundColor).toBe('rgb(242, 255, 230)')

  await page.locator('.hwb .prop').nth(2).fill('90')
  await expect(page.locator('.hwb .result').nth(2)).toContainText('90')
  style = await getComputedStyleByLocator(page.locator('.hwb'))
  await expect(style.backgroundColor).toBe('rgb(128, 128, 128)')
})

test('change props to change bg | alpha', async ({ page }) => {
  await page.locator('.hwb .prop').nth(3).fill('0.5')
  await expect(page.locator('.hwb .result').nth(3)).toContainText('0.5')
  let style = await getComputedStyleByLocator(page.locator('.hwb'))
  await expect(style.backgroundColor).toBe('rgba(255, 0, 0, 0.5)')
})
