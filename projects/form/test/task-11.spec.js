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
const { isExisted, getOffsetByLocator } = require('../libraries/test-util/src')
const path = require('path')
const { interceptNetworkAndAbort, submit } = require('./util')
const exp = require('constants')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('question config', async ({ page }) => {
  await expect(page.locator('#single1 .q-config')).toBeVisible()
  await expect(page.locator('#single1 input[type="checkbox"].q-required')).toBeVisible()
})

test('single1 change required', async ({ page }) => {
  await expect(page.locator('#single1 input[type="radio"]:optional')).toHaveCount(3)
  await expect(page.locator('#single1 input[type="radio"]:required')).toHaveCount(0)

  await page.locator('#single1 .q-required').check()
  await expect(page.locator('#single1 input[type="radio"]:optional')).toHaveCount(0)
  await expect(page.locator('#single1 input[type="radio"]:required')).toHaveCount(3)
})

test('single1 validate', async ({ page }) => {
  await interceptNetworkAndAbort(page, async (searchParams) => {
    await expect(searchParams.get('single1')).toBe('2')
  })

  await page.locator('#single1 .q-required').check()
  await submit(page)
  await expect(page.locator('#single1 input[type="radio"]:invalid')).toHaveCount(3)

  await page.locator('#single1 input[type="radio"]').nth(0).check()
  await page.locator('#single1 input[type="radio"]').nth(2).check()
  await submit(page)
})

test('form checkValidity()', async ({ page }) => {
  await interceptNetworkAndAbort(page, async (searchParams) => {
    await expect(searchParams.get('single1')).toBe('2')
  })

  await page.locator('#single1 .q-required').check()
  await submit(page)
  /** @type {boolean} */
  const valid = await page
    .locator('form')
    .first()
    // @ts-ignore
    .evaluate((el) => el.checkValidity())

  await expect(valid).toBeFalsy()
})
