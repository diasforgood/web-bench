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
import { isExisted } from '../libraries/test-util/src'
import path from 'path'

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('importmap shape/', async ({ page }) => {
  const map = await page.locator('script[type="importmap"]').textContent()
  await expect(map?.includes('shape/')).toBeTruthy()
})

test('#shape3', async ({ page }) => {
  await expect(page.locator('#shape3')).toHaveText('0')
})
