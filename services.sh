#!/bin/bash
docker rm -f tika-server
docker rm -f vis-ner
docker rm -f vis-summarization

docker run -d -p 9998:9998 --name tika-server --rm \
  logicalspark/docker-tikaserver

docker run -d -p 8081:8081 --name vis-ner --rm -v \
  /home/reggeva/models:/ds_NER/app/engines/neural/resources/models/ \
  visualizer/ds_ner:1.0.0

docker run -d -p 8083:8083 --name vis-summarization --rm \
  visualizer/ds_summarization:1.0.0
