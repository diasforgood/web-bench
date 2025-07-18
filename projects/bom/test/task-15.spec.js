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
import { getContentBoxByLocator, getMarginBoxByLocator } from '../libraries/test-util/src'

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('new page theme default', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  expect(page.locator('body')).toHaveClass('dark')

  let [newPage] = await Promise.all([
    page.waitForEvent('popup'), // Wait for the new page to open
    await contentFrame.locator('.open').click(),
  ])
  await expect(newPage.locator('body')).toHaveClass('dark')
})

test('new page theme, change index.html theme', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  expect(page.locator('body')).toHaveClass('dark')

  let [newPage] = await Promise.all([
    page.waitForEvent('popup'), // Wait for the new page to open
    await contentFrame.locator('.open').click(),
  ])
  await expect(newPage.locator('body')).toHaveClass('dark')

  await page.locator('.theme').selectOption({ value: 'light' })
  ;[newPage] = await Promise.all([
    page.waitForEvent('popup'), // Wait for the new page to open
    await contentFrame.locator('.open').click(),
  ])
  await expect(newPage.locator('body')).toHaveClass('light')
})

test('new page theme, change index.html theme 2', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  expect(page.locator('body')).toHaveClass('dark')

  let [newPage] = await Promise.all([
    page.waitForEvent('popup'), // Wait for the new page to open
    await contentFrame.locator('.open').click(),
  ])
  await expect(newPage.locator('body')).toHaveClass('dark')

  await page.locator('.theme').selectOption({ value: 'light' })
  await newPage.evaluate(() => location.reload())
  await expect(newPage.locator('body')).toHaveClass('light')
})
