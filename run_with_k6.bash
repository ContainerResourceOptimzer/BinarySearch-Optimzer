#!/bin/bash
# run_with_k6.bash

CPU=$1
MEM=$2
IMAGE_NAME="my-nest-app"
CONTAINER_NAME="test-api"
PORT=3000

if [ -z "$CPU" ] || [ -z "$MEM" ]; then
  echo "❗ Usage: $0 <CPU> <MEM_MB>"
  exit 1
fi

echo "🟢 Starting container with CPU=${CPU}, MEM=${MEM}MB..."

# 1. Run Docker container with resource limits
docker run -d --rm \
  --name "${CONTAINER_NAME}" \
  --cpus="${CPU}" \
  --memory="${MEM}m" \
  -p ${PORT}:${PORT} \
  ${IMAGE_NAME}

# 2. Wait for container to be ready (you may adjust sleep or add healthcheck probe)
echo "⏳ Waiting for API to start..."
sleep 5

# 3. Run k6 test
echo "🚀 Running k6 load test..."
k6 run --summary-export result.json k6_script.test.ts

# 4. Stop the container
echo "🧹 Stopping container..."
docker stop "${CONTAINER_NAME}" > /dev/null

# 5. Show summary (optional)
echo "📊 Test completed. Summary exported to result.json"
