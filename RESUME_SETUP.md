# 内容更新说明

网站会自动读取以下文件夹的内容，无需手动改 HTML 或 JS。

## 头像 `profile/`

把头像图片放进 `profile/` 文件夹，命名为 `avatar.jpg`（也支持 png 等格式）。

## 简历 `resume/`

把 PDF 放进 `resume/` 文件夹即可。网站会显示所有 PDF，名称就是文件名。

推送到 GitHub 后会自动更新。

## 猫咪照片 `cat/`

- 把照片放进 `cat/` 文件夹
- 封面图命名为 `cover.jpg`（或其他图片格式）
- 其余照片会自动出现在相册里

## 生活照片 `life/`

- 把照片放进 `life/` 文件夹
- 封面图命名为 `cover.jpg`
- 其余照片会自动出现在相册里

## 本地预览

添加或删除文件后，运行：

```bash
python3 scripts/generate_content.py
```

然后刷新浏览器。推送到 GitHub 后，GitHub Actions 也会自动运行这个脚本。
