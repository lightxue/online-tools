BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/dist
NODEDIR=$(BASEDIR)/node_modules

GITHUB_PAGES_BRANCH=master

QINIU_CONFIG=config/qiniu-upload.json

help:
	@echo 'Makefile for a online tools                                               '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make serve                          serve site at http://localhost:8080'
	@echo '   make html                           (re)generate the web site          '
	@echo '   make clean                          remove the generated files         '
	@echo '   make cleanall                       remove the node and generated files'
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '   make cdn                            upload the web site to CDN         '
	@echo '                                                                          '
	@echo '                                                                          '

html:
	npm run build

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

cleanall: clean
	[ ! -d $(NODEDIR) ] || rm -rf $(NODEDIR)

serve:
	npm run dev

github: html
	ghp-import -m "Generate static site" -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR)
	git push origin $(GITHUB_PAGES_BRANCH)

# 上传到七牛空间
cdn: html
	qshell qupload $(QINIU_CONFIG)

.PHONY: html help clean cleanall serve github

