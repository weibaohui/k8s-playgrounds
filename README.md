 
# ⚡k8s playground

 
 
## Introduce
使用Vue、TypeScript、Electron技术打造的k8s playground客户端。
框架上使用了NaiveUI+NestJS。
使用ChatGPT进行智能化加持，做使用简单、智能的k8s 管理UI。

## Features

- 🔨 资源管理：Node、Pod、Deployment.
<br>

- 🛻 命令执行：Pod Exec.
<br>

- 🪟 日志查看：Pod Log.
<br>


## How to use

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

## 开发提示
 
k8s model 生成
 * 使用https://editor.swagger.io/ 生成client，选择typescript-angular
 * 将文件名称中的ioK8sApiCore替换掉，文件内的处理掉。这样用起来方便
