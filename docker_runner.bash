#!/bin/bash
# docker_runner.bash

CPU=$1
MEM=$2

docker run --rm --name "test-api" \
  --cpus="${CPU}" \
  --memory="${MEM}m" \
  -p 3000:3000 \
  my-nest-app