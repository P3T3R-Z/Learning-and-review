* git init 初始化git项目管理

* git commit 提交文件至暂存区
* git diff 比较文件修改部分  
* git diff --staged 比较工作区与暂存区的修改
* git diff master..seconed xx.html 比较两个分支的文件区别

* git rm xx.html 删除文件
* git mv xx.html cc.html 重命名
* git mv xx.html view/xx.html 移动

* git log --oneline 一行显示日志
* git log --grep="xx" 以xx为关键词搜索日志
* git log -10 最近10个日志
* git log --author="xx" 查看xx作者的日志
* git log --before="2017-01-01" 查看某日日志
* git log --before="3 days" 3日前日志
* git log --graph 图形选项

> 使用场景: 如果我们想恢复之前的某一版本，但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法。
* git revert 版本号 回做到之前 并生成新版本
> 使用场景: 如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法
* git reset --soft 版本号 改变指针 不改变工作区内容,只改变操作区
* git reset --hard 版本号 改变指针 之后提交改变暂存区和工作区提交的状态
* git reset --mixed 版本号 改变指针 之后提交改变暂存区提交的状态, 默认

* git checkout HEAD -- XX.html 恢复最近一次 当前分支 的文件
* git checkout HEAD^ -- XX.html 恢复上一次 当前分支 的文件  ^表示上几次次数

* git branch xx 新建分支
* git branch --list 查看分支
* git branch -d xx 删除分支
* git branch -m xx aa 分支改名
* git checkout xx 切换分支
* git branch -a (展示所有的git分支)
* git branch -r (展示远程分支)


> git stash是把当前未提交的修改暂存起来，让仓库还原到最后一次提交的状态。常用于更新、同步代码或者保存多个修改版本等情况下。
* git stash save 'xxxx' 保存工作进度,之后还原最后一次提交状态
* git stash list 查看工作进度,返回[stash]代号
* git show stash@{n} 查看具体内容
* git stash clear 清除所有的stash条目
* git stash drop [stash] 丢弃stash条目，默认丢弃最上面的那条，即stash@{0}
* git stash pop [stash] 将某一进度提到最上一层,并还原工作区为该进度

* git config --list 查看设置

* git config --global alias.co checkout  设置checkout别名为co

* ls 查看项目下的文件
* ls -la 查看隐藏文件

_全局配置忽略_
* git config --gloabal core.excludesfile ~/.gitignore_global 全局设置忽略写入在gitignore_global文件
* vim ~/.gitignore_global  vim编辑该文件 添加.DS_Store 并保存退出 
* touch .DS_Store 创建了.DS_Store文件 git status查看已被忽略
_本地配置忽略_
* vim .gitignore vim编辑该文件 添加*.log 并保存退出
* git add .gitignore 
* git commit -m 'add.gitignore文件'
* touch demo.log 创建了demo.log文件 git status查看已被忽略<br/>
----
* git remote update origin --prune 刷新远程分支列表
* git remote add origin xxxxx 远程版本库与本地版本库建立联系
* git push -u origin master 将本地版本库master分支推送至远程 并追踪
* git push origin master (省略了\<dst\>，等价于“git push origin master:master”，其中origin指定了你要push到哪个remote)<br/>
我们一般写的形式为“ git push origin <src>:<dst> ”，冒号前表示local branch的名字，冒号后表示remote repository下 branch的名字。注意，如果你省略了<dst>，git就认为你想push到remote repository下和local branch相同名字的branch。
* git push origin :mybranch （在origin repository里面查找mybranch，删除它。用一个空的去更新它，就相当于删除了）

* git clone xxxx aa 克隆远程版本至aa文件

* git fetch origin master 获取远程版本更新并放至当前本地分支
_以下两步操作相当于git pull_
* git fetch origin master:brantest 
* git merge brantest 

* git pull origin master:brantest 将远程主机origin的master分支拉取过来，与本地的brantest分支合并
* git pull origin master 后面的冒号可以省略,表示将远程origin主机的master分支拉取过来和本地的当前分支进行合并。

