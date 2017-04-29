#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : config.py
# Author : lightxue
# Date   : 2016-05-09
# Desc   :


import yaml
from . import logger

options = yaml.load(open('conf/conf.yaml'))
logger.setup_logging('conf/logger.yaml')

