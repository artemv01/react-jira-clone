#!/bin/bash

cd /home/ubuntu/rjc && \
npm install && \
npm run build && \
pm2 restart rjc;