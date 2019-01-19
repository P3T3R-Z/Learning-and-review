## bootstrap-sass使用

### 文件说明
`sass\bootstrap`-------bootstrap源文件
`sass\_bootstrap.scss`-------bootstrap默认引入
`sass\_bootstrap-variables.scss`-------bootstrap自定义参数文件
`sass\_bootstrap-custom.scss`-------bootstrap自定义引入
`sass\styles.scss`------编译入口文件
`stylesheets\styles.css`-------编译后文件

### 使用步骤
1. 安装 Ruby 勾选添加系统环境
2. 安装 Sass `gem install sass`
3. 安装 Compass `gem install compass`
4. 安装bootstrap-sass插件：`gem install bootstrap-sass`
5. 新建应用该插件的项目：`compass create xxx -r bootstrap-sass --using bootstrap`  xxx项目名称
6. 修改编译入口styles.scss: `@import "bootstrap";`
7. 编译命令: `compass compile`

### 自定义样式方法1
1. 拷贝sass\bootstrap文件为sass\custome文件
2. 修改sass\custome文件中的样式
3. 修改bootstrap自定义引入
4. 修改编译入口styles.scss: `@import "bootstrap-custom";`

### 自定义样式方法2
1. 修改`sass\_bootstrap-variables.scss`文件中的参数
2. 修改编译入口styles.scss: `@import "bootstrap";`和`@import "bootstrap-variables";`

