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
  await page.goto('/')
})

test('Check Delete Directly', async ({ page }) => {
  const deleteBtn = page.locator('.delete-btn:text("Delete")')
  await deleteBtn.click()

  const morningListItem = page.locator('.list-item:has-text("Morning")')
  await expect(morningListItem).toBeHidden()
  await expect(page.getByText('Morning My Friends')).toBeHidden()

  await expect(page.getByText('I love traveling!')).toBeVisible()
})

test('Check Create And Delete it', async ({ page }) => {
  await page.getByText('Add Blog').click()
  await page.getByLabel('title').fill('DeleteTest')
  await page.getByLabel('detail').fill('Delete Test Content')
  await page.locator('.submit-btn').click()

  const duplicationCheckListItem = page.locator('.list-item:has-text("DeleteTest")')
  await expect(duplicationCheckListItem).toBeVisible()
  await duplicationCheckListItem.click()
  await expect(page.getByText('Delete Test Content')).toBeVisible()

  const deleteBtn = page.locator('.delete-btn:text("Delete")')
  await deleteBtn.click()
  await expect(duplicationCheckListItem).toBeHidden()
  await expect(page.getByText('Delete Test Content')).toBeHidden()
})

test('Test Delete Button in the top right of Main', async ({ page }) => {
  const c1 = await getOffset(page, '.delete-btn:text("Delete")')
  const c2 = await getOffset(page, ':text("Morning My Friends")')
  const c3 = await getOffset(page, ':text("Hello Blog")')

  // The button is positioned far to the left to ensure it does not overlap with the text "Morning My Friends"
  expect(c1.centerX).toBeGreaterThan(c2.centerX)
  expect(c1.centerY).toBeLessThan(c2.centerY)

  // The button is positioned below the header
  expect(c1.top).toBeGreaterThanOrEqual(c3.bottom)
})

test('Test Delete all items', async ({ page }) => {
  await page.locator('.delete-btn:text("Delete")').click()
  await page.locator('.delete-btn:text("Delete")').click()

  await expect(page.getByText('Morning')).toBeHidden()
  await expect(page.getByText('Travel')).toBeHidden()

  await expect(page.getByText('Hello Blog')).toBeVisible()
})
