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
const { pageLoginUser, pageLoginAdmin } = require('../libraries/shop-test-util/src')

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Regular user accessing own profile', async ({ page }) => {
  await pageLoginUser(page)

  await page.goto('/profile/user')
  await expect(page).toHaveURL('/profile/user')
  await expect(page.locator('.profile-username')).toBeVisible()
  await expect(page.locator('.profile-coin')).toBeVisible()
  await expect(page.locator('.profile-coin')).toContainText('1000')
})

test('Regular user accessing other profile', async ({ page }) => {
  await pageLoginUser(page)

  await page.goto('/profile/admin')
  await expect(page).toHaveURL('/login')
})

test('Admin accessing other profile', async ({ page }) => {
  await pageLoginAdmin(page)
  await page.goto('/profile/user')

  await expect(page).toHaveURL('/profile/user')
  await expect(page.locator('.profile-username')).toContainText('user')
  await expect(page.locator('.profile-coin')).toBeVisible()
})

test('Redirect to login for unauthenticated profile access', async ({ page }) => {
  await page.goto('/profile/user')
  await expect(page).toHaveURL('/login')
})
