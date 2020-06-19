#!/usr/bin/env bash

mkdir -p webroot
sudo chown -R www-data:www-data *
cp -rv assets webroot/
cp -rv index.html webroot/
