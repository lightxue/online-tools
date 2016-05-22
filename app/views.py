#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : views.py
# Author : lightxue
# Date   : 2016-05-20
# Desc   :


import flask
from flask import request

from app import app

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/encoding/hash')
def md5_sha1():
    return flask.render_template('encoding/hash.html')

@app.route('/static/<path:path>')
def send_static(path):
    return flask.send_from_directory('static', path)
