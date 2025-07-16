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
const { getViewport, getOffset, isExisted } = require('../libraries/test-util/src')
const path = require('path')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')

  const addFile = page.locator('.tools button:text("file")')
  const addDir = page.locator('.tools button:text("dir")')
  await addFile.click()
  await addDir.click()
})

test('common/dir.js', async ({ page }) => {
  await expect(isExisted('common/dir.js', path.join(__dirname, '../src'))).toBeTruthy()
})

test('> 1 dir existed', async ({ page }) => {
  const count = await page.locator('.entries > .dir').count()
  await expect(count).toBeGreaterThan(0)
  await expect(page.locator('.entries > .dir:nth-child(2)')).toBeVisible()
})

test('dir entry', async ({ page }) => {
  await expect(page.locator('.entries > .entry.dir:nth-child(2)')).toBeVisible()
})

test('add dirs', async ({ page }) => {
  const addDir = page.locator('.tools button:text("dir")')
  const count1 = await page.locator('.entries .dir').count()
  await addDir.click()
  await addDir.click()
  const count2 = await page.locator('.entries .dir').count()
  await expect(count2).toBe(count1 + 2)
})

test('add dirs and files', async ({ page }) => {
  const addFile = page.locator('.tools button:text("file")')
  const addDir = page.locator('.tools button:text("dir")')

  const fileCount1 = await page.locator('.entries .file').count()
  const dirCount1 = await page.locator('.entries .dir').count()
  await addFile.click()
  await addDir.click()
  await addFile.click()
  await addDir.click()
  await expect(await page.locator('.entries .file').count()).toBe(fileCount1 + 2)
  await expect(await page.locator('.entries .dir').count()).toBe(dirCount1 + 2)
})
