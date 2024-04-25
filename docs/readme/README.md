# 开发工具

推荐使用 [vscode](https://code.visualstudio.com/Download) 进行开发，配合对应的插件，目前体验比较好。

## 插件

项目中，推荐使用的插件已在项目中的 [.vscode/extensions.json](/.vscode/extensions.json) 文件中列出，可以直接安装。

项目在vscode中打开时，会自动提示安装插件，如果没有提示，可以手动安装。

## 配置

项目中，推荐使用的配置已在项目中的 [.vscode/settings.json](/.vscode/settings.json) 文件中列出，可以直接使用。

为防止每个人习惯不同，可以在自己的 `vscode` 中，单独配置，不要提交到项目中，或者将 .vscode/settings.json 中默认提供的配置放在自己编辑器的用户配置文件中。

# 代码格式化

1. 代码风格格式化使用 `prettier`，配置文件为：[.prettierrc.js](/.prettierrc.js)。
2. 代码质量校验使用 `eslint`，配置文件为：[.eslintrc.js](/.eslintrc.js)。
3. 结合以上两个工具，可以保证代码风格统一，质量可控。
4. 正常情况下，不需要手动执行格式化和校验，提交代码时会自动执行，如果不符合规范，会自动修复，如果修复失败，提交失败。
5. 如果需要手动执行格式化和校验，可以执行以下命令：
   - 格式化：`pnpm lint:prettier`
   - 校验：`pnpm lint:eslint`
   - 格式化和校验：`pnpm format`
6. **配置文件中，有些规则是不允许修改的，如果有特殊情况，可以联系相关人员进行修改。**

# 代码提交规范

1. `commit` 信息应该简明扼要，不要太长，一般不超过 50 个字符，应该能通过 `commit message` 知道这次提交做了什么（表明要做的事，指明模块）。
2. 提交代码时，系统会自动执行 `pre-commit` 钩子，对代码进行格式化和校验，如果不符合规范，会自动修复，如果修复失败，提交失败。
3. 提交失败一般分以下几种情况：
   - 代码格式化失败，需要手动修复。
   - 代码校验失败，需要手动修复。
   - `git commit message` 不符合规范（见：[.commitlintrc.js](/.commitlintrc.js)）。
4. 代码提交前，应评估代码的质量及影响范围，确保提交的代码是可用的，不会影响到其他人的开发。
5. 合并远程代码或者其他人的分支代码时，先提交到本地，在合并代码，防止代码冲突丢失等问题，方便回滚。
6. 如果遇到代码冲突问题，应联系对应的开发人员，确认代码冲突的原因，再进行处理。

# 环境变量

1. 项目中，使用 `dotenv` 来管理环境变量，配置文件为：[.env](/.env)。
2. `.env` 为全局配置文件，所有环境都会加载，`.env.local` 为本地配置文件，本地开发时，会覆盖 `.env` 中的配置。
3. `.env.local` 文件，此文件不会被 `git` 管理。
4. 平常我们修改环境变量一般是在开发阶段，对接不同的后端开发人员，所请求的地址不同，为了防止频繁的修改，避免和他人冲突，所以我们可以在本地新建 `.env.local` 文件，配置自己的环境变量，不要提交到项目中，这样就不会影响到他人的开发。
5. 对于新增的环境变量，需要在 `.env` 中添加默认值，然后在 `.env.local` 中修改为自己的值，如果不同的环境下，值不同，在相应的环境变量文件中添加即可。
6. `.env` 文件中汇总所有的环境变量，以及变量注释及默认值。
7. 新增环境变量后，需要在 [typings/vite-env.d.ts](/typings/vite-env.d.ts) 中添加类型声明，方便代码中使用。
8. [src/utils/env.ts](/src/utils/env.ts) 文件下，封装了获取环境变量的方法，方便代码中使用。当我们使用环境变量值时，统一从 `env.ts` 文件下获取，方便统一维护。

# 开发规范注意事项

## 项目目录及文件命名

1. 项目中，目录及文件命名，一律采用小写字母，多个单词之间使用 `-` 连接。
2. 项目中，目录及文件命名，不要使用中文，不要使用大写字母，不要使用特殊字符。
3. `.vue` 文件命名，一律采用大驼峰命名法，即：每个单词首字母大写，多个单词之间不使用连接符。（`index.vue` 除外）
4. `components` 目录下的文件及目录命名，一律采用大驼峰命名法，即：每个单词首字母大写，多个单词之间不使用连接符。
5. `hooks` 目录下的文件命名，一律采用小驼峰命名法，以 **use** 开头，即：第一个单词首字母小写，多个单词之间不使用连接符。

## vue

1. `template` 中，标签属性，一律采用小写字母，多个单词之间使用 `-` 连接。
2. `template` 中，组件命名采用如下两种命名规范：

   1. 在 `script` 中 `import` 引入的组件，采用大驼峰命名法，即：每个单词首字母大写，多个单词之间不使用连接符。如下所示：

   ```vue
   <template>
     <div>
       <TestComponent />
     </div>
   </template>

   <script lang="ts" setup>
     import TestComponent from '@/components/test-component/index.vue';
   </script>
   ```

   2. 全局组件使用 `kebab-case` 命名法，即：每个单词之间使用 `-` 连接。如下所示：

   ```vue
   <template>
     <div>
       <test-component />
     </div>
   </template>
   ```

3. 在子组件中通过 `defineEmits` 定义的事件和通过 `defineProps` 定义的属性，采用小驼峰命名法，即：第一个单词首字母小写，多个单词之间不使用连接符。`vue` 组件的 `props` 与事件的名字也提供了自动的格式转换，比如我们触发了一个以 `camelCase` 形式命名的事件，但在父组件中可以使用 `kebab-case` 形式来监听。

4. 定义组件的 `props` 和 事件时，应明确定义类型，避免使用 `any` 或其他不明确的类型，如果不确定类型，可以使用 `unknown`，并在使用时，进行类型判断。参考如下：[为组件的 props 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)、[为组件的 emits 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-emits)。

## ts

1. **明确的类型注解：**尽管 TypeScript 有类型推断，但是在某些情况下，明确的类型注解可以提高代码的可读性和可维护性。例如，函数的参数和返回值，对象的形状等。
2. **使用接口和类型别名定义复杂类型：**对于复杂的类型，使用接口（`interface`）或类型别名（`type`）来定义，可以使代码更易于理解和维护。
3. **避免使用 any 类型：**尽可能避免使用 `any` 类型，因为它会跳过类型检查。如果你不确定一个变量的类型，考虑使用 `unknown` 类型。
4. `ts` 文件中导出的方法或者其他变量、类型，应使用命名导出，不要使用默认导出。

   ```typescript
   // 命名导出
   export type A = string;

   export const a = 1;
   ```

   ```typescript
   // 默认导出
   export default {
     a: 1,
     b: 2,
   };
   ```

## 样式

编写样式时，常用的样式，例如：色值、文字大小、圆角、行高等都已经定义好，位于 [src/styles/common/var/var.less](/src/styles/common/var/var.less) 文件中，文件里已经抽取成 `less` 变量，可以直接使用，无需引入。

里面的变量一般有三种使用使用方式：

1. 直接使用变量，例如：`color: @color-primary;`。
2. 在模板中使用：
   1. 通过类名使用（借助 `tailwind`，在 `/tailwind.config.js` 配置文件中，已经将对应的变量值抽取成了 `css` 类名）：`<div class="text-primary-color"></div>`。
   2. 在 `style` 中使用：`color: var(--tj-primary-color);`，在 `style` 中，通过 `css` 变量的形式使用，`css` 变量大部分来源于 `tj-design-ui` 组件库，具体的值可以在控制台 `DOM` 标签下查看，或者查看 [src/styles/common/var/var.less](/src/styles/common/var/var.less)、[src/styles/common/var/root.less](/src/styles/common/var/root.less) 文件。
3. 文字大小等样式，可以直接通过类名使用：
   1. 在实际的样式图中，文字的大小一般是包含行高的，我们直接使用 `tailwind` 提供的类名即可，例如：`<div class="text-14"></div>`。它对应的就是 `font-size: 14px; line-height: 22px;`。
   2. 如果需要忽略行高，可以使用：`<div class="text-14t"></div>`。它对应的就是 `font-size: 14px;`。
   3. 具体可查看：[tailwind.config.js](/tailwind.config.js)

### 类名前缀

为防止项目嵌套在别的端，作为子项目使用，在开发时，可以通过添加类名前缀的方式作为一个模块。（类名前缀是css隔离的其中一种方式）。例如：`<div class="tj-xxx"></div>`。

在项目中，我们定义好了要使用的前缀：[src/configs/design-config.ts](/src/configs/design-config.ts)

```typescript
export const prefixCls = 'khfw';
```

此文件中，定义了项目的默认类名前缀。

[src/styles/common/var/var.less](/src/styles/common/var/var.less) 文件中定义了类名的 `less` 变量。

```less
// 项目类名默认前缀
@namespace: khfw;
```

使用方式如下：

```vue
<template>
  <div class="space-y-4" :class="prefixCls"></div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  defineOptions({ name: 'Home' });

  const { prefixCls } = useDesign('home-page');
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-home-page';

  .@{prefix-cls} {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style>
```

`useDesign` 作为工具方法，提供拼接类名前缀的方法，方便使用。

在 `style` 中，使用 `less` 的 `~` 符号，可以将变量转换成字符串，方便拼接。

使用如上方法，`style` 中可以不在使用使用 vue 提供的 `scoped` 属性，因为类名前缀已经起到了隔离的作用。（建议）

### 类名前缀修改

如果我们要修改类名前缀：

1. 可以在 [src/configs/design-config.ts](/src/configs/design-config.ts) 文件中修改 `prefixCls` 的默认值，或者在根组件 `App.vue` 中，通过 `AppProvider` 组件提供的 `props.prefixCls` 修改（推荐使用）。
2. 修改 [src/styles/common/var/var.less](/src/styles/common/var/var.less) 文件中定义的 `less` 变量 `@namespace: xxx;`

```vue
<template>
  <AppProvider prefix-cls="xxx">
    <router-view />
  </AppProvider>
</template>
```

## store

项目中使用 `pinia` 作为状态管理工具。

1. `pinia` 的使用，参考：[pinia](https://pinia.esm.dev/)。
2. 每一个 `pinia` 的实例 -> `store` 文件，都应导出一个 `useXxxStore` 方法和一个 `useXxxStoreWithOut` 方法，分别用于在组件中使用和在非 `vue` 上下文中使用。
   1. 非 `vue` 上下文中使用 `store`，参考：[在非 Vue 上下文中使用](https://pinia.esm.dev/ssr.html#%E5%9C%A8%E9%9D%9E-vue-%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%AD%E4%BD%BF%E7%94%A8)。
   2. 非 `vue` 上下文中使用，就是脱离 `vue` 的环境，例如：`hooks`（除非此文件的运行环境为vue）、`utils`、`services` 等文件中，如果需要使用 `store`，就需要使用 `useXxxStoreWithOut` 方法。
3. 每一个 `store` 文件中的 `state`，都应被明确定义：如

   ```typescript
    interface AppState {
      theme: null;
    }

    export const useAppStore = defineStore({
      id: 'appStore',
      state: (): AppState => ({
        theme: null,
      }),
    });
   ```
4. `getters` 中定义的方法，应该是纯函数，不应该有副作用，如果有副作用，应该放在 `actions` 中。
5. `getters` 中定义的方法以 `get` 开头，例如：`getTheme`，用以区分。
6. `actions` 中定义的方法以 `Action` 结尾，例如：`setThemeAction`，用以区分。

# 组件

## IconSvg组件

[src/components/IconSvg](/src/components/IconSvg/src/index.vue) 组件可将 `src/assets/icons/svg/*.svg`（此目录下放置的svg图标为单色或者纯色图标）文件作为 icon 图标使用，加载的图标均为去除默认颜色的图标。

```vue
<!-- name 为文件的名称 -->
<template>
  <IconSvg name="test" />
</template>

<script setup lang="ts">
  import { IconSvg } from '@/components/IconSvg';
</script>
```

## IconFillSvg组件

[src/components/IconFillSvg](/src/components/IconFillSvg/index.tsx) 组件可将 `src/assets/icons/fill-svg/*.svg`（此目录下放置的svg图标为多色或者带色图标）文件作为 icon 图标使用，加载的图标不处理原理文件内容。

```vue
<template>
  <IconFillSvg name="test" />
</template>

<script setup lang="ts">
  import { IconFillSvg } from '@/components/IconFillSvg';
</script>
```


# 项目结构

```txt
├─.commitlintrc.js ------------------ // git commit 提交配置
├─.env ------------------------------ // 全局环境变量
├─.env.development ------------------ // 开发环境变量
├─.env.preview ---------------------- // 预发环境变量
├─.env.production ------------------- // 生产环境变量
├─.env.test ------------------------- // 测试环境变量
├─.eslintignore
├─.eslintrc.js
├─.gitignore
├─.husky ---------------------------- // git hook
│ ├─_
│ │ ├─.gitignore
│ │ └─husky.sh
│ ├─commit-msg
│ └─pre-commit
├─.lintstagedrc.js ------------------ // 供 git hook 调用
├─.npmrc ---------------------------- // npm 配置项
├─.postcssrc.yaml ------------------- // postcss 配置项，目前仅用于 tailwindcss
├─.prettierignore
├─.prettierrc.js -------------------- // 代码风格配置
├─.vscode --------------------------- // vscode 配置项
│ ├─extensions.json ----------------- // 插件
│ └─settings.json ------------------- // 编辑器配置
├─README.md
├─build ----------------------------- // 用于项目代码打包
│ └─webpack ---------------------------- // 针对 webpack 的打包配置
│   ├─xxx-plugin.ts
│   └─xxx2-plugin.ts
├─docs ------------------------------ // 项目文档
│ └─readme -------------------------- // 项目说明及注意事项
│   ├─README.md
│   └─images
├─eslint-base-rules.js -------------- // 自定义 eslint 的规则
├─index.html
├─package.json
├─pnpm-lock.yaml
├─public
│ └─vite.svg
├─src
│ ├─App.vue
│ ├─assets -------------------------- // 存储项目的静态资源
│ │ ├─icons ------------------------- // 存放项目用到的 svg 图标
│ │ │ ├─fill-svg -------------------- // 多色图标放置于此目录下，将不对此目录下的文件处理
│ │ │ │ └─test.svg
│ │ │ └─svg ------------------------- // 单色图标放置于此目录下（将对其去除默认颜色）
│ │ │   └─test.svg
│ │ └─images ------------------------ // 图片资源
│ │   ├─img ------------------------- // png/jpg/webp等图片资源
│ │   │ └─img-onerror.png
│ │   └─svg ------------------------- // svg图片资源
│ │     └─test.svg
│ ├─components ---------------------- // 存放公共组件
│ │ └─TestComponent
│ │   └─index.vue
│ ├─configs ------------------------- // 项目内的业务及逻辑配置信息
│ │ ├─encryption-config.ts ---------- // 加密模块
│ │ └─theme-config.ts --------------- // 主题
│ ├─enums --------------------------- // 枚举模块，公共的枚举放置与此
│ │ ├─index.ts
│ │ └─user.ts
│ ├─hooks --------------------------- // 编写的公共 hooks 方法
│ │ └─web
│ │   └─useMessage.ts
│ ├─internal ------------------------ // 用于初始化项目中的模块、组件、插件的入口项
│ │ ├─compoents --------------------- // 项目中存在的第三方或者自己的全局组件可在此处注册
│ │ │ ├─index.ts
│ │ │ └─tj-design-ui.ts
│ │ ├─dayjs.ts
│ │ ├─index.ts
│ │ ├─pinia.ts
│ │ └─style.ts
│ ├─main.ts ------------------------- // 项目入口文件
│ ├─router -------------------------- // 路由
│ │ └─index.ts
│ ├─services ------------------------ // 项目中的请求放置与此
│ │ └─user -------------------------- // 以模块拆分
│ │   ├─index.ts -------------------- // user 模块下的请求
│ │   └─type.ts --------------------- // user 模块下的接口数据类型定义
│ ├─store
│ │ ├─app.ts
│ │ └─user.ts
│ ├─styles -------------------------- // 样式
│ │ ├─common
│ │ │ ├─animate.less
│ │ │ ├─tailwind.css ---------------- // tailwindcss 配置
│ │ │ └─var ------------------------- // style 变量
│ │ │   ├─index.less
│ │ │   ├─root.less
│ │ │   └─var.less ------------------ // 全局 less 变量，可直接使用，不用引入
│ │ └─components -------------------- // 如果有一些全局的组件需要重置或者修改一些样式，可按照组件分类放置
│ │   └─index.less
│ ├─types --------------------------- // 公共类型
│ │ └─user.ts
│ ├─utils
│ │ ├─bom.ts
│ │ ├─color.ts
│ │ ├─dom.ts
│ │ ├─env.ts
│ │ ├─file.ts
│ │ ├─http -------------------------- // 封装的网络请求
│ │ │ └─axios
│ │ │   ├─brideg.ts
│ │ │   ├─index.ts
│ │ │   └─src
│ │ │     ├─Axios.ts
│ │ │     ├─axios-cancel.ts
│ │ │     ├─axios-transform.ts
│ │ │     ├─check-http-status.ts
│ │ │     ├─enums
│ │ │     │ └─index.ts
│ │ │     ├─helper.ts
│ │ │     ├─index.ts
│ │ │     └─types
│ │ │       └─index.ts
│ │ ├─is.ts
│ │ ├─request ----------------------- // 请求工具的入口，如果项目中存在较多请求不一致的情况，在此目录下新建自己的请求方法即可
│ │ │ └─default-request.ts ---------- // 默认的请求方法
│ │ └─uuid.ts
│ └─views --------------------------- // 视图层
│   ├─About.vue
│   └─Home.vue
├─tailwind.config.js
├─tsconfig.json
├─tsconfig.node.json
├─typings --------------------------- // 全局 typescript 类型定义目录，此目录下的文件类型无法引入可直接使用
│ ├─global.d.ts
│ ├─module.d.ts
│ ├─node.d.ts ------------------- // 环境变量类型定义
│ ├─utils.d.ts ---------------------- // typescript 辅助工具类型
│ └─vue.d.ts ------------------------ // vue 相关类型
└─vue.config.js --------------------- // vue-cli 配置项
```
