# 仿丁香医生项目（待完善）

## 技能点

- react
- react-router-dom
- antd-mobile UI 组件库
- dayjs 处理时间 JS 函数库
- mobx-react / mobx 状态管理库
- pinyin 将汉字转换成拼音库
- react-sticky 粘连布局库
- echarts / echarts-for-react 地图库
- puppeteer 爬虫

## 项目介绍

- 此项目主要是练习：mobx、webpack、echarts 的用法

- mobx

  - observable 定义 store 数据
  - action 定义更新 store 数据的方法
  - computed 定义计算属性（类似于 vue 中计算属性）

- mobx-react

  - Provider 类似于 context 的用法，负责给后代组件传递 mobx 管理的 store 状态数据
  - inject 高阶组件，负责给被包装组件传递 store 的状态数据
  - observer 高阶组件，需要使用 mobx 管理的 store 状态数据都要包装 observer

- webpack

  - 运行 npm run eject 来修改 create-react-app 的配置
  - 具体功能包含：
    - 自定义主题
    - antd-mobile 按需加载
    - 兼容装饰器语法
    - css 自动转 rem 单位
    - ...
  - 详细配置参照配置文件：config/webpack.config.js

- echarts

  - 地图使用
  - 详细配置参照 Map 组件

- puppeteer
  - 爬取需要使用的数据
  - 详细配置参照 server/index.js
