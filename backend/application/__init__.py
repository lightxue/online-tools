#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File   : __init__.py
# Author : lightxue
# Date   : 2015-09-08
# Desc   :

import flask
import importlib

from .util import config

def import_resources():
    from . import resources
    for mdl in resources.__all__:
        mdl_name = '.resources.' + mdl
        importlib.import_module(mdl_name, __name__)

app = flask.Flask(__name__)
#app.config['JSON_AS_ASCII'] = False

import_resources()
