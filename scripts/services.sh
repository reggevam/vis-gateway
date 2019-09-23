#!/bin/bash
docker rm -f tika-server \
  vis-ner \
  vis-summarization \
  vis-key-phrases \
  vis-redis

docker run -d -p 9998:9998 --name tika-server --rm \
  logicalspark/docker-tikaserver

docker run -d -p 8081:8081 --name vis-ner --rm -v \
  /home/reggeva/models:/ds_NER/app/engines/neural/resources/models/ \
  visualizer/ds_ner:1.0.0

docker run -d -p 8082:8081 --name vis-key-phrases --rm \
  visualizer/ds_key_phrases:1.0.0

docker run -d -p 8083:8083 --name vis-summarization --rm \
  visualizer/ds_summarization:1.0.0

docker run -d -p 6379:6379 --name vis-redis --rm \
  redis:5.0.5-alpine
