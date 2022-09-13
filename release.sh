rm -r release
mkdir release ./release/dist
cp -r ./dist/main/ ./release/dist/main
cp -r ./dist/renderer/ ./release/dist/renderer
cp -r ./screenshots/ ./release/screenshots
cp readme_zh-CN.md ./release/readme.md
cp logo.png ./release
cp plugin.json ./release
