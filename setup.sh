#!/usr/bin/env bash

# install node js
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# install sqlite3
sudo apt-get install sqlite3

# install express
npm install --save express sqlite body-parser lodash sequelize

