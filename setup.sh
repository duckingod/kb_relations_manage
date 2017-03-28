#!/usr/bin/env bash

# install node js
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# install express
npm install express

# install orm for express
npm install orm

