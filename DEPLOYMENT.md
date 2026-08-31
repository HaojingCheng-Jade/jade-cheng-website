# GitHub Pages 部署指南

## 步骤 1: 创建GitHub仓库

1. 登录到 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称建议使用: `jade-cheng-website` 或 `jade-cheng.github.io`
4. 设置为公开仓库（Public）
5. 不要初始化README（我们已经有了）
6. 点击 "Create repository"

## 步骤 2: 推送代码到GitHub

```bash
# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/jade-cheng-website.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

## 步骤 3: 启用GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 下选择 "Deploy from a branch"
5. 选择 "main" 分支和 "/ (root)" 文件夹
6. 点击 "Save"

## 步骤 4: 访问你的网站

几分钟后，你的网站将在以下地址可用：
- `https://YOUR_USERNAME.github.io/jade-cheng-website`

如果仓库名是 `YOUR_USERNAME.github.io`，则直接访问：
- `https://YOUR_USERNAME.github.io`

## 自定义内容

在部署前，记得更新以下内容：

1. **个人信息**: 编辑 `index.html` 中的：
   - 姓名和标题
   - 关于我的描述
   - 项目详情
   - 联系方式链接

2. **简历、照片**: 见 `RESUME_SETUP.md`
   - 头像放入 `profile/` 文件夹（命名为 `avatar.jpg`）
   - 简历放入 `resume/` 文件夹
   - 猫咪照片放入 `cat/` 文件夹
   - 生活照片放入 `life/` 文件夹
   - 推送后自动更新，本地可运行 `python3 scripts/generate_content.py`

3. **社交媒体链接**: 
   - 更新 LinkedIn、GitHub、LeetCode 等链接

4. **教育经历**: 
   - 更新真实的学校和专业信息

5. **宠物信息**: 
   - 更新宠物名称和描述

## 更新网站

每次修改后，使用以下命令更新：

```bash
git add .
git commit -m "Update website content"
git push origin main
```

GitHub Pages会自动重新部署网站。

## 故障排除

- 如果网站没有更新，等待几分钟后刷新
- 检查GitHub Pages设置是否正确
- 确保所有文件都已推送到main分支
- 查看GitHub Actions标签页是否有部署错误
