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
import path from 'path'
import { isExisted } from '../libraries/test-util/src'

const srcPath = path.join(import.meta.dirname, '../src')

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html')
})

test('util/log.js', async ({ page }) => {
  await expect(isExisted('modules/util/log.js', srcPath)).toBeTruthy()
})

test('util/math.js', async ({ page }) => {
  await expect(isExisted('modules/util/math.js', srcPath)).toBeTruthy()
})

test('util/lang.js', async ({ page }) => {
  await expect(isExisted('modules/util/lang.js', srcPath)).toBeTruthy()
})
