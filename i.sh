#!/usr/bin/env bash

WDIR="webroot"

mkdir -p ${WDIR}
cp -rv src/** ${WDIR}/
sudo chown -R www-data:www-data ${WDIR}
