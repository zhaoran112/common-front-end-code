## git  rebase

1.git pull --rebase origin dev
2.有冲突先解决冲突。
3.git add .,git commit -m，可以不用commit
4.git rebase --continue

git rebase --abort 会放弃合并，回到rebase操作之前的状态，之前的提交的不会丢弃；
git rebase --skip 则会将引起冲突的commits丢弃掉（慎用！！）；
git rebase --continue 合并冲突，结合"git add 文件"命令一起用与修复冲突，提示开发者，一步一步地有没有解决冲突。


Git 更安全的强制推送，--force-with-lease
git push origin master  --force-with-lease

1，[问题解决参考文档](https://stackoverflow.com/questions/7080803/how-can-i-commit-files-with-git)
2.[如何在Vim/Vi中保存文件并退出编辑器](https://www.myfreax.com/how-to-save-file-in-vim-quit-editor/)

vim编辑的文本，需要使用vim命令进行编辑
1. 首先，输入i命令，进入编辑模式。
2. 我们需要关注的是最上面几行以pick开头的信息。需要把除了第一行外的pick改成s。
3. 然后按esc键退出输入模式，输入:(英文冒号)进入底线命令模式
4. 再输入wq 即保存后退出
## [关于Git rebase你必须要知道的几件事](https://zhuanlan.zhihu.com/p/145037478)

## git merge --abort  取消合并

## [git rebase -i合并多次提交](https://blog.csdn.net/w57685321/article/details/86597808)
https://juejin.cn/post/7081250273703755789