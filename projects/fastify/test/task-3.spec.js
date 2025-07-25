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
const { getOffset } = require('../libraries/test-util/src')

test.beforeEach(async ({ page }) => {
  await page.goto('/xxxxxxxxxxxx')
})

test('/xxxxxxxxxxxx which is a 404 Page', async ({ page }) => {
  await expect(
    page.getByText('Oops! Looks like you have wandered off the beaten path.')
  ).toBeVisible()
})

test('Test go back to home', async ({ page }) => {
  await page.locator(`.not-found-go-to-home`).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome to Shopping Mart').first()).toBeVisible()
})

test('Test go to home From Header', async ({ page }) => {
  await page.getByText('WebBench Shopping Mart').click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome to Shopping Mart').first()).toBeVisible()
})

test('Check 404 Page Layout', async ({ page }) => {
  await expect(page.getByText('WebBench Shopping Mart')).toBeVisible()
  await expect(page.getByText('Copyright: Web Bench')).toBeVisible()
})
