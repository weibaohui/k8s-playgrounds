 
# ⚡k8s playground

 
 
## Introduce
This is a template based on my repo: [fast-vite-electron](https://github.com/ArcherGu/fast-vite-electron). In the main process, I integrated nestjs. In the main process, you can build your code just as you would write a nestjs backend. Desktop clients built from this template can quickly split the electron when you need to switch to B/S.

## Features

- 🔨 [vite-plugin-doubleshot](https://github.com/archergu/doubleshot/tree/main/packages/plugin-vite#readme) to run/build electron main process or node backend.
<br>

- 🛻 An electron ipc transport for [nestjs](https://nestjs.com/) that provides simple ipc communication.
<br>

- 🪟 An electron module for [nestjs](https://nestjs.com/) to launch electron windows.
<br>

- ⏩ Quick start and build, powered by [tsup](https://tsup.egoist.sh/) and [electron-builder](https://www.electron.build/) integrated in [@doubleshot/builder](https://github.com/Doubleshotjs/doubleshot/tree/main/packages/builder)

## How to use

- Click the [Use this template](https://github.com/ArcherGu/fast-vite-electron/generate) button (you must be logged in) or just clone this repo.
- In the project folder: 
  ```bash
  # install dependencies
  yarn # npm install

  # run in developer mode
  yarn dev # npm run dev

  # build
  yarn build # npm run build
  ```

## Note for PNPM

In order to use with `pnpm`, you'll need to adjust your `.npmrc` to use any one the following approaches in order for your dependencies to be bundled correctly (ref: [#6389](https://github.com/electron-userland/electron-builder/issues/6289#issuecomment-1042620422)):
```
node-linker=hoisted
```
```
public-hoist-pattern=*
```
```
shamefully-hoist=true
```

## Relative
 
k8s model 生成
 * 使用https://editor.swagger.io/ 生成client，选择typescript-angular
 * 将文件名称中的ioK8sApiCore替换掉，文件内的处理掉。这样用起来方便
