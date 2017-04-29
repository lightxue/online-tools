#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : ip.py
# Author : lightxue
# Date   : 2017-03-14
# Desc   :


import json
import flask
import logging
import requests
from pprint import pprint
from bs4 import BeautifulSoup
from flask import request

from ..util import config
from .. import app

logger = logging.getLogger('access')
exc_logger = logging.getLogger('exception')

@app.route('/query/ip/ip138')
def ip138():
    ip = request.args.get('ip')
    if not ip:
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    logger.info('Req ip138 | ip=%s', ip)
    try:
        r = requests.get('http://ip138.com/ips138.asp',
                         params={'ip': ip})

        if r.status_code != 200:
            msg = '{}: {}'.format(r.status_code, r.content)
            logger.error('Req ip138 error | msg=%s', msg)
            return flask.jsonify({
                'msg': msg
            }), 500

        r.encoding = 'gbk'
        soup = BeautifulSoup(r.text, 'lxml')
        regions = soup.select('table td ul li')
        ret = {
            'ip': ip,
            'regions': []
        }
        for region in regions:
            region = region.get_text()
            source, _, city = region.partition('：')
            ret['regions'].append({
                'source': source,
                'city': city
            })
        logger.info('Rsp ip138 | ip=%s | regions=%s', ip, len(ret['regions']))
        return flask.jsonify(ret)
    except Exception as e:
        logger.error('Req 138 error | ip=%s | err=%s', ip, e)
        exc_logger.error('Req 138 error | ip=%s')
        return flask.jsonify({
            'msg': 'Unkown error: {}'.format(e)
        }), 500
