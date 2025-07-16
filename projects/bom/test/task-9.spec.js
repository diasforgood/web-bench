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

test('.theme', async ({ page }) => {
  await expect(page.locator('.theme')).toBeVisible()
  await expect(page.locator('.theme option')).toHaveCount(2)
  await expect(page.locator('.theme option').nth(0)).toHaveAttribute('value', 'dark')
  await expect(page.locator('.theme option').nth(1)).toHaveAttribute('value', 'light')
})

test('change theme, index.html', async ({ page }) => {
  await page.locator('.theme').selectOption({ index: 1 })
  await expect(page.locator('body')).toHaveClass('light')
  await page.locator('.theme').selectOption({ index: 0 })
  await expect(page.locator('body')).toHaveClass('dark')
})

test('change theme, current doc page', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await page.locator('.theme').selectOption({ index: 1 })
  await expect(contentFrame.locator('body')).toHaveClass('light')
  await page.locator('.theme').selectOption({ index: 0 })
  await expect(contentFrame.locator('body')).toHaveClass('dark')
})

test('change theme, change doc page', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await page.locator('.theme').selectOption({ index: 1 })
  await expect(contentFrame.locator('body')).toHaveClass('light')
  await page.locator('.address').selectOption({ index: 2 })
  await expect(contentFrame.locator('body')).toHaveClass('light')
  
  await page.locator('.theme').selectOption({ index: 0 })
  await expect(contentFrame.locator('body')).toHaveClass('dark')
  await page.locator('.address').selectOption({ index: 1 })
  await expect(contentFrame.locator('body')).toHaveClass('dark')
})
