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
const { getOffsetByLocator } = require('../libraries/test-util/src')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('move line | right-bottom direction', async ({ page }) => {
  const canvas = page.locator('.canvas')
  const shape = canvas.locator('line')

  // Draw
  await page.locator('.line').click()
  await canvas.hover({ position: { x: 50, y: 50 } })
  await page.mouse.down()
  await canvas.hover({ position: { x: 100, y: 150 } })
  await page.mouse.up()

  // Move
  await page.locator('.move').click()
  await shape.hover()
  await page.mouse.down()
  await canvas.hover({ position: { x: 125, y: 200 } })
  await page.mouse.up()

  const offsetCanvas = await getOffsetByLocator(canvas)
  const offset = await getOffsetByLocator(shape)
  // console.log({ offsetCanvas, offset })
  await expect(offset).toMatchObject({
    left: 100 + offsetCanvas.left,
    top: 150 + offsetCanvas.top,
    width: 50,
    height: 100,
  })
})

test('move line | left-top direction', async ({ page }) => {
  const canvas = page.locator('.canvas')
  const shape = canvas.locator('line')

  // Draw
  await page.locator('.line').click()
  await canvas.hover({ position: { x: 50, y: 50 } })
  await page.mouse.down()
  await canvas.hover({ position: { x: 100, y: 150 } })
  await page.mouse.up()

  // Move
  await page.locator('.move').click()
  await shape.hover()
  await page.mouse.down()
  await canvas.hover({ position: { x: 50, y: 75 } })
  await page.mouse.up()

  const offsetCanvas = await getOffsetByLocator(canvas)
  const offset = await getOffsetByLocator(shape)
  // console.log({ offsetCanvas, offset })
  await expect(offset).toMatchObject({
    left: 25 + offsetCanvas.left,
    top: 25 + offsetCanvas.top,
    width: 50,
    height: 100,
  })
})

test('move rect', async ({ page }) => {
  const canvas = page.locator('.canvas')
  const shape = canvas.locator('rect')

  // Draw
  await page.locator('.rect').click()
  await canvas.hover({ position: { x: 50, y: 50 } })
  await page.mouse.down()
  await canvas.hover({ position: { x: 100, y: 150 } })
  await page.mouse.up()

  // Move
  await page.locator('.move').click()
  await shape.hover()
  await page.mouse.down()
  await canvas.hover({ position: { x: 125, y: 200 } })
  await page.mouse.up()

  const offsetCanvas = await getOffsetByLocator(canvas)
  const offset = await getOffsetByLocator(shape)
  // console.log({ offsetCanvas, offset })
  await expect(offset).toMatchObject({
    left: 100 + offsetCanvas.left,
    top: 150 + offsetCanvas.top,
    width: 50,
    height: 100,
  })
})

test('move ellipse', async ({ page }) => {
  const canvas = page.locator('.canvas')
  const shape = canvas.locator('ellipse')

  // Draw
  await page.locator('.ellipse').click()
  await canvas.hover({ position: { x: 50, y: 50 } })
  await page.mouse.down()
  await canvas.hover({ position: { x: 100, y: 150 } })
  await page.mouse.up()

  // Move
  await page.locator('.move').click()
  await shape.hover()
  await page.mouse.down()
  await canvas.hover({ position: { x: 125, y: 200 } })
  await page.mouse.up()

  const offsetCanvas = await getOffsetByLocator(canvas)
  const offset = await getOffsetByLocator(shape)
  // console.log({ offsetCanvas, offset })
  await expect(offset).toMatchObject({
    left: 100 + offsetCanvas.left,
    top: 150 + offsetCanvas.top,
    width: 50,
    height: 100,
  })
})
