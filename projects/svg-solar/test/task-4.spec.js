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
const { isExisted, expectTolerance, getOffsetByLocator } = require('../libraries/test-util/src')
const { starData, density } = require('./util/util')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('planet', async ({ page }) => {
  await expect(page.locator('circle.planet')).toHaveCount(8)
})

test('planet attributes', async ({ page }) => {
  const planet = page.locator('.planet').nth(0)
  const body = starData.bodies[0]
  await expect(planet).toHaveAttribute('r', `${body.r}`)
  await expect(planet).toHaveAttribute('fill', `${body.color}`)
})

test('planet layout', async ({ page }) => {
  await Promise.all(
    starData.bodies.map(async (body, i) => {
      const planet = page.locator('.planet').nth(i)
      const offset = await getOffsetByLocator(planet)
      await expectTolerance(offset.centerX, (80 + body.rx) * density)
      await expectTolerance(offset.centerY, 80 * density)
    })
  )
})
