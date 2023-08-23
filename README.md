 
# ⚡k8s playground

 
 
## Introduce
使用Vue、TypeScript、Electron技术打造的k8s playground客户端。
框架上使用了NaiveUI+NestJS。
使用ChatGPT进行智能化加持，做使用简单、智能的k8s 管理UI。
## How to use

- In the project folder: 
  ```bash
  # install dependencies
  pnpm install # npm install

  # run in developer mode
  pnpm dev # npm run dev , ui display will be blank or error , please run pnpm gen command 
  pnpm gen # gen http client for call backend apis  
  # if  command not found , run this : `npm install openapi-typescript-codegen -g`
  # build
  pnpm build # npm run build
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
## 功能列表
|         分类 | 功能             | 	状态✅/☑️ |
|-----------:|:---------------|:--------|
|        Pod | 列表             | ✅       |
|        Pod | 列表-状态自动更新      | ✅       |
|        Pod | 列表-错误提示        | ✅       |
|        Pod | 列表-批量删除        | ✅       |
|        Pod | 列表-常用操作        | ✅       |
|        Pod | 列表-错误提示        | ✅       |
|        Pod | 列表-关键字搜索过滤     | ✅       |
|        Pod | 列表-Namespace过滤 | ✅       |
|        Pod | 列表-查看yaml      | ✅       |
|        Pod | 详情             | ✅       |
|        Pod | 详情-Exec        | ✅       |
|        Pod | 详情-Log         | ✅       |
|        Pod | 详情-删除          | ✅       |
|        Pod | 详情-事件          | ✅       |
|        Pod | 详情-污点          | ✅       |
|        Pod | 详情-注解          | ✅       |
|        Pod | 详情-账户          | ✅       |
|        Pod | 详情-状态          | ✅       |
|        Pod | 详情-Volume      | ✅       |
|        Pod | 详情-Env         | ✅       |
|        Pod | 详情-主机          | ✅       |
|        Pod | 详情-查看yaml      | ✅       |
|      Event | 列表             | ✅       |
|      Event | 列表-关联Pod       | ✅       |
|      Event | 列表-关联Node      | ✅       |
|      Event | 详情             | ✅       |
|      Event | 详情-查看关联对象      | ✅       |
|      Event | 详情-查看yaml      | ✅       |
|  Namespace | 列表             | ✅       |
|  Namespace | 详情             | ✅       |
|  Namespace | 详情-关联Event     | ✅       |
|  Namespace | 详情-查看yaml      | ✅       |
|       Node | 列表             | ✅       |
|       Node | 列表-状态自动更新      | ✅       |
|       Node | 详情             | ✅       |
|       Node | 详情-节点角色        | ✅       |
|       Node | 详情-调度状态        | ✅       |
|       Node | 详情-cordon操作    | ✅       |
|       Node | 详情-drain驱逐操作   | ✅       |
|       Node | 详情-查看yaml      | ✅       |
| ReplicaSet | 列表             | ✅       |
| ReplicaSet | 详情             | ✅       |
| ReplicaSet | 详情-查看yaml      | ✅       |
| Deployment | 列表             | ✅       |
| Deployment | 列表-重启          | ✅       |
| Deployment | 列表-删除          | ✅       |
| Deployment | 列表-查看yaml      | ✅       |
| Deployment | 列表-状态          | ✅       |
| Deployment | 列表-Scale       | ✅       |
| Deployment | 详情             | ✅       |
| Deployment | 详情-重启          | ✅       |
| Deployment | 详情-删除          | ✅       |
| Deployment | 详情-查看yaml      | ✅       |
| Deployment | 详情-Scale       | ✅       |
## 开发提示
### nestjs 作为后端服务，前端使用 `openapi-typescript-codegen` 进行代码生成
 * 安装 ：npm install openapi-typescript-codegen -g
### k8s model 生成
 * 使用https://editor.swagger.io/ 生成client，选择typescript-angular
 * 将文件名称中的ioK8sApiCore替换掉，文件内的处理掉。这样用起来方便

 | 前                                    | 后            |
 |--------------------------------------|--------------|
 | ioK8sApiCoreV1ConfigMap              | V1ConfigMap  |
 | IoK8sApimachineryPkgApisMetaV1Status | V1Status     |
 | ioK8sApiAppsV1ReplicaSet             | V1ReplicaSet |


## Demo
<img src="doc/demo.gif">

