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
const { getComputedStyle, getOffset, getHtmlElement } = require('../libraries/test-util/src')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('.main flex', async ({ page }) => {
  const style = await getComputedStyle(page, '.main')
  expect(style.display).toBe('flex')
  expect(style.flexDirection).toBe('row')
})

test('.leftbar fixed left', async ({ page }) => {
  const offset = await getOffset(page, '.leftbar')
  expect(offset.left).toEqual(0)
})

test('.rightbar fixed right', async ({ page }) => {
  const offset = await getOffset(page, '.rightbar')
  const bodyWidth = (await getOffset(page, 'body')).width
  expect(offset.left + offset.width).toEqual(bodyWidth)
})

test('.content flex > 0', async ({ page }) => {
  const style = await getComputedStyle(page, '.content')
  expect(parseFloat(style.flexGrow)).toBeGreaterThan(0)
})
