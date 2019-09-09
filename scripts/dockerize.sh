#!/bin/bash

while getopts "r" arg; do
  case $arg in
  r)
    docker run -d -p 4000:4000 visualizer/gateway:"$npm_package_version"
    exit 0
    ;;
  esac
done

echo "buidling docker for version $npm_package_version"
docker build -t visualizer/gateway:"$npm_package_version" .
