#!/bin/bash
# run_with_k6.bash

CPU=$1
MEM=$2
IMAGE_NAME="my-nest-app"
CONTAINER_NAME="test-api"
PORT=3000

# 입력 인자 검사
if [ -z "$CPU" ] || [ -z "$MEM" ]; then
  echo "❗ Usage: $0 <CPU> <MEM_MB>"
  exit 1
fi

# 이미지 유효성 검사
if ! docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
  echo "🚨 Image ‘${IMAGE_NAME}’ does not exist, please do a docker build first."
  exit 1
fi

# 포트 사용 여부 확인
if lsof -i :$PORT >/dev/null 2>&1; then
  echo "⚠️ Port ${PORT} is already in use. Specify a different port or exit and try again."
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

# 2. Test that the container is running (for up to 10 seconds)
echo "⏳ Waiting for API to start..."
for i in {1..10}; do
  if curl -sSf "http://localhost:${PORT}" > /dev/null 2>&1; then
    echo "✅ API response verified"
    break
  fi
  sleep 1
  if [ $i -eq 10 ]; then
    echo "❌ The API has not started, exit."
    docker stop "${CONTAINER_NAME}" > /dev/null
    exit 1
  fi
done

# 3. Run k6 test
echo "🚀 Running k6 load test..."
mkdir -p ../result
k6 run --summary-export ../result/${CPU}cpu_${MEM}mem.json ../k6_script.test.ts
if [ $? -eq 0 ]; then
  echo -n 'Success' > ../result/result
else
 echo -n 'Fail' > ../result/result
fi

# 4. Stop the container
echo "🧹 Stopping container..."
docker stop "${CONTAINER_NAME}" > /dev/null

# 5. Show summary (optional)
echo "📊 Test completed. Summary exported to result.json"
