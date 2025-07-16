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

test('.keyword', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  await expect(contentFrame.locator('.keyword')).toBeVisible()
})

test('.keyword simple input', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  await contentFrame.locator('.keyword').focus()
  await contentFrame.page().keyboard.type('css') // cs
  await expect(await contentFrame.locator('.highlight').count()).toBeGreaterThanOrEqual(1)
})

test('.keyword simple complex', async ({ page }) => {
  const contentFrame = page.frame('content')
  await expect(contentFrame).toBeDefined()
  if (!contentFrame) return

  await contentFrame.waitForURL(/intro/i)
  await contentFrame.evaluate(() => {
    const el = document.createElement('div')
    el.innerHTML = `
<blockquote>
  The Web Developer Guide provides useful how-to content to help you actually use Web
  technologies (js/css/html/nodejs...) to do what you want or need to do.
</blockquote>
<ul>
  <li><a href="./javascript.html">Javascript</a></li>
  <li><a href="./css.html">CSS</a></li>
  <li><a href="./html.html">HTML</a></li>
  <li><a href="./nodejs.html">Nodejs</a></li>
</ul>`
    document.body.append(el)
  })

  await contentFrame.locator('.keyword').focus()
  await contentFrame.page().keyboard.type('cs') // cs
  await expect(await contentFrame.locator('.highlight').count()).toBeGreaterThanOrEqual(2)

  await contentFrame.locator('.keyword').clear()
  await contentFrame.page().keyboard.type('html') // css
  await expect(await contentFrame.locator('.highlight').count()).toBeGreaterThanOrEqual(2)
})
