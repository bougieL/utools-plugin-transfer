build:
	yarn build
	rm -rf release
	mkdir release ./release/dist
	cp -r ./dist/main/ ./release/dist/main
	cp -r ./dist/renderer/ ./release/dist/renderer
	cp logo.png ./release
	cp plugin.json ./release

prod:
	make build
	rm -r ./release/dist/**/*.map
	rm -r ./release/dist/**/*.txt
