#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File   : logger.py
# Author : lightxue
# Date   : 2015-10-20
# Desc   :


import os
import yaml
import logging, logging.config

def setup_logging(default_path='logger.yaml'):
    '''Setup logging configuration
    '''
    path = default_path
    if not os.path.exists(path):
        raise Exception('Logging config file not exist: %s', path)
    with open(path, 'rt') as f:
        log_conf = yaml.load(f.read())
    logging.config.dictConfig(log_conf)


if __name__ == '__main__':
    os.chdir('..')
    setup_logging('logger.yaml')

    logger = logging.getLogger('access')
    exc_logger = logging.getLogger('exception')

    try:
        1 / 0
    except Exception as e:
        logger.debug('Debug log: %s', e)
        logger.info('Info log: %s', e)
        logger.warn('Warn log: %s', e)
        logger.error('Error log: %s', e)
        exc_logger.exception('Exception log')


