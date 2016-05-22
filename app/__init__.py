#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : __init__.py
# Author : lightxue
# Date   : 2016-05-20
# Desc   :

from flask import Flask

app = Flask(__name__)
from app import views
