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
const {
  expectTolerance,
  getOffsetByLocator,
  getComputedStyleByLocator,
} = require('../libraries/test-util/src')
const { starData, density } = require('./util/util')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('detailPanel | hover planet | highlight subbody', async ({ page }) => {
  const detail = page.locator('#detailPanel')
  await expect(detail).toContainText(/earth/i)
  await expect(detail).toContainText(/jupiter/i)

  
  const style0 = await getComputedStyleByLocator(page.locator('.earth'))
  await detail.getByText('earth').hover()
  await expect(page.locator('.earth.highlight')).toBeVisible()
  const style1 = await getComputedStyleByLocator(page.locator('.earth'))
  await detail.getByText('jupiter').hover()
  await expect(page.locator('.jupiter.highlight')).toBeVisible()
  const style2 = await getComputedStyleByLocator(page.locator('.earth'))

  await expect(style0.stroke).not.toBe(style1.stroke)
  await expect(style0.stroke).toBe(style2.stroke)
})

test('detailPanel | hover planet | highlight orbit', async ({ page }) => {
  const detail = page.locator('#detailPanel')
  await expect(detail).toContainText(/earth/i)
  await expect(detail).toContainText(/jupiter/i)
  
  const style0 = await getComputedStyleByLocator(page.locator('#orbit_earth'))
  await detail.getByText('earth').hover()
  await expect(page.locator('#orbit_earth.highlight')).toBeVisible()
  const style1 = await getComputedStyleByLocator(page.locator('#orbit_earth'))
  await detail.getByText('jupiter').hover()
  await expect(page.locator('#orbit_jupiter.highlight')).toBeVisible()
  const style2 = await getComputedStyleByLocator(page.locator('#orbit_earth'))

  await expect(style0.fill).not.toBe(style1.fill)
  await expect(style0.fill).toBe(style2.fill)
})

test('detailPanel | planet | hover', async ({ page }) => {
  const offset = await getOffsetByLocator(page.locator('.jupiter'))
  await page.mouse.move(offset.centerX, offset.centerY)
  await page.locator('.jupiter').click()

  const detail = page.locator('#detailPanel')
  await expect(detail).toContainText(/europa/i)
  await expect(detail).toContainText(/io/i)

  const style0 = await getComputedStyleByLocator(page.locator('.europa'))
  await detail.getByText('europa').hover()
  await expect(page.locator('.europa.highlight')).toBeVisible()
  const style1 = await getComputedStyleByLocator(page.locator('.europa'))
  await detail.getByText('io').hover()
  await expect(page.locator('.io.highlight')).toBeVisible()
  const style2 = await getComputedStyleByLocator(page.locator('.europa'))

  await expect(style0.stroke).not.toBe(style1.stroke)
  await expect(style0.stroke).toBe(style2.stroke)
})

test('detailPanel | hover satellite | highlight orbit', async ({ page }) => {
  const offset = await getOffsetByLocator(page.locator('.jupiter'))
  await page.mouse.move(offset.centerX, offset.centerY)
  await page.locator('.jupiter').click()

  const detail = page.locator('#detailPanel')
  await expect(detail).toContainText(/europa/i)
  await expect(detail).toContainText(/io/i)
  
  const style0 = await getComputedStyleByLocator(page.locator('#orbit_europa'))
  await detail.getByText('europa').hover()
  await expect(page.locator('#orbit_europa.highlight')).toBeVisible()
  const style1 = await getComputedStyleByLocator(page.locator('#orbit_europa'))
  await detail.getByText('io').hover()
  await expect(page.locator('#orbit_io.highlight')).toBeVisible()
  const style2 = await getComputedStyleByLocator(page.locator('#orbit_europa'))

  await expect(style0.fill).not.toBe(style1.fill)
  await expect(style0.fill).toBe(style2.fill)
})