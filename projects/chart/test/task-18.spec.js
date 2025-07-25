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

import { expect, test } from '@playwright/test'
import {
  expectTolerance,
  getComputedStyleByLocator,
  getOffsetByLocator,
} from '../libraries/test-util/src'
import { data, doRectanglesIntersect, getUnionRect, TO } from './util/util'

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
  await page.locator('#type').selectOption({ value: 'pie' })
  await page.locator('#dataLabels').check()
  await page.waitForTimeout(TO)
  await expect(page.locator('svg.chart.pie')).toBeAttached()
})

test('PieChart | dataLabels', async ({ page }) => {
  await expect(page.locator('.chart .dataLabels')).toHaveCount(1)
  await expect(page.locator('.chart .dataLabels-0 .dataLabel')).toHaveCount(5)
  await expect(page.locator('.chart .dataLabels-0 .dataLabel-0')).toBeVisible()
  await expect(page.locator('.chart .dataLabels-0 .dataLabel-4')).toBeVisible()
})

test('PieChart | dataLabels color', async ({ page }) => {
  for await (const [j, item] of Object.entries(data.datasets[0].data)) {
    // const sector = await getComputedStyleByLocator(page.locator(`.chart .dataset-0 .sector-${j}`))
    // console.log({ j, item })
    const dataLabel = page.locator(`.chart .dataLabels-0 .dataLabel-${j}`)
    await expect(dataLabel).toContainText(`${item}`)
  }
})

test('PieChart | connect lines', async ({ page }) => {
  await expect(page.locator('.chart .connect')).toHaveCount(5)

  for await (const [j, item] of Object.entries(data.datasets[0].data)) {
    const offset0 = await getOffsetByLocator(page.locator(`.chart .connect-${j}`))
    const offset1 = await getOffsetByLocator(page.locator(`.chart .dataLabel-${j}`))
    const offset2 = await getOffsetByLocator(page.locator(`.chart .sector-${j}`))

    await expect(doRectanglesIntersect(offset0, offset1)).toBeTruthy()
    await expect(doRectanglesIntersect(offset0, offset2)).toBeTruthy()
  }
})

// test('PieChart | dataLabels layout', async ({ page }) => {
//   for await (const [i, dataset] of Object.entries(data.datasets)) {
//     const dataLabelsRect = await getOffsetByLocator(page.locator(`.chart .dataLabels-${i}`))
//     const piesRect = await getOffsetByLocator(page.locator(`.chart .dataset-${i}`))
//     await expectTolerance(dataLabelsRect.centerX, piesRect.centerX, 10)
//     await expectTolerance(dataLabelsRect.top, piesRect.top, 20)
//   }
// })
