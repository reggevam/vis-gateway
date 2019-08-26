#!/bin/bash
PACKAGE_VERSION=$(cat package.json |
  grep version |
  head -1 |
  awk -F: '{ print $2 }' |
  sed 's/[",]//g' |
  tr -d '[[:space:]]')

while getopts "r" arg; do
  case $arg in
  r)
    docker run -d -p 4000:4000 visualizer/gateway:"$PACKAGE_VERSION"
    exit 0
    ;;
  esac
done

echo "buidling docker for version $PACKAGE_VERSION"
docker build -t visualizer/gateway:"$PACKAGE_VERSION" .
