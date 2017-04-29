build: requirements log

log:
	test -d log || mkdir /data/log/znb-tools
	test -d log || ln -s /data/log/znb-tools log

requirements: venv requirements.txt
	venv/bin/pip3 install -Ur requirements.txt

venv:
	test -d venv || pyvenv venv

test: venv test/runtests.py
	venv/bin/python3 test/runtests.py
