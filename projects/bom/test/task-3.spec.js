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

import { test, expect } from '@playwright/test'
import { getContentBoxByLocator, getMarginBoxByLocator, isExisted } from '../libraries/test-util/src'
import path from 'node:path'
import fs from 'node:fs'

const src = process.env['EVAL_PROJECT_ROOT'] || path.join(import.meta.dirname, '../src')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('.address options', async ({ page }) => {
  const options = page.locator('.address option')
  await expect(options).toHaveCount(5)
  await expect(options.nth(0)).toHaveAttribute('value', 'docs/intro.html')
  await expect(options.nth(1)).toHaveAttribute('value', 'docs/javascript.html')
  await expect(options.nth(2)).toHaveAttribute('value', 'docs/css.html')
  await expect(options.nth(3)).toHaveAttribute('value', 'docs/html.html')
  await expect(options.nth(4)).toHaveAttribute('value', 'docs/nodejs.html')
})

test('.address option change', async ({ page }) => {
  const options = page.locator('.address option')
  // @ts-ignore
  const selectedIndex = await page.locator('.address').evaluate((el) => el.selectedIndex)
  await expect(selectedIndex).toBe(0)
  const url0 = (await options.nth(0).getAttribute('value')) ?? ''
  await expect(page.locator('.content')).toHaveAttribute('src', url0)
  
  await page.locator('.address').selectOption({ index: 4 })
  const url4 = (await options.nth(4).getAttribute('value')) ?? ''
  await expect(page.locator('.content')).toHaveAttribute('src', url4)
})

// test('address together fill .topbar', async ({ page }) => {
//   const topbar = await getContentBoxByLocator(page.locator('.topbar'))
//   const address = await getMarginBoxByLocator(page.locator('.address'))
//   await expect(address.height).toBeCloseTo(topbar.height)
// })