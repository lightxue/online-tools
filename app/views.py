#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : views.py
# Author : lightxue
# Date   : 2016-05-20
# Desc   :


import flask
from collections import namedtuple

from app import app

@app.route('/')
def index():
    return flask.redirect(flask.url_for('hash'))

@app.route('/static/<path:path>')
def send_static(path):
    return flask.send_from_directory('static', path)

def register_route(path, name):
    def render():
        return flask.render_template('{}.html'.format(path))
    app.add_url_rule(path, name, render)


Rule = namedtuple('Rule', ['path', 'name'])
rules = [
    Rule('/encoding/hash', 'hash'),
    Rule('/develop/regex', 'regex'),
]

for rule in rules:
    register_route(rule.path, rule.name)
