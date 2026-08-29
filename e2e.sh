#!/usr/bin/env bash
#
# Build the sun-graphql backend image (from the Sun repo) and run the
# Checklist functional-test stack.
#
# Usage:
#   ./e2e.sh                     # build the app image, then run the suite headless
#   ./e2e.sh up                  # bring up db + backend + app detached, no tests
#   ./e2e.sh open                # bring the stack up, then `npx cypress open` on the host
#   ./e2e.sh down                # stop the stack and wipe the DB volume
#   ./e2e.sh --no-cache          # rebuild the app image without docker layer cache
#   ./e2e.sh --rebuild-backend   # force a rebuild of the sun-graphql image
#   ./e2e.sh --outputs           # record cypress video

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE="docker compose -f docker-compose.e2e.yml"
SUN_DIR="${SUN_DIR:-$(cd "$SCRIPT_DIR/../Sun" && pwd)}"
BACKEND_IMAGE="sun-graphql:dev"
BACKEND_BUILD_CTX="$SUN_DIR/components"
BACKEND_DOCKERFILE="$BACKEND_BUILD_CTX/sun-graphql/Dockerfile"

REBUILD_BACKEND=0
APP_NO_CACHE=0
COMMAND="run"
for arg in "$@"; do
  case "$arg" in
    --rebuild-backend) REBUILD_BACKEND=1 ;;
    --no-cache) APP_NO_CACHE=1 ;;
    --outputs|--outputs=true|--outputs=1) export CYPRESS_CAPTURE_OUTPUTS=true ;;
    up|open|down) COMMAND="$arg" ;;
    *) echo "Unknown arg: $arg" >&2; exit 2 ;;
  esac
done

build_backend_if_needed() {
  if [[ "$REBUILD_BACKEND" -eq 1 ]] || ! docker image inspect "$BACKEND_IMAGE" >/dev/null 2>&1; then
    echo "==> Building $BACKEND_IMAGE from $SUN_DIR (this is slow the first time)"
    if [[ -f "$BACKEND_DOCKERFILE" ]]; then
      docker build -f "$BACKEND_DOCKERFILE" -t "$BACKEND_IMAGE" "$BACKEND_BUILD_CTX"
    else
      echo "    Dockerfile not found at $BACKEND_DOCKERFILE - building jar via gradle..."
      "$BACKEND_BUILD_CTX/sun-graphql/gradlew" -p "$BACKEND_BUILD_CTX" :sun-graphql:bootJar -x test --no-daemon
      echo "    Packing jar into $BACKEND_IMAGE..."
      docker build -t "$BACKEND_IMAGE" -f - "$BACKEND_BUILD_CTX" <<'DOCKERFILE'
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY sun-graphql/build/libs/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
DOCKERFILE
    fi
  else
    echo "==> $BACKEND_IMAGE already built (use --rebuild-backend to rebuild after Java changes)"
  fi
}

APP_IMAGE="checklist-e2e-app:latest"

build_app() {
  local hash
  hash=$(
    {
      cat Dockerfile package.json package-lock.json vite.config.ts tsconfig.json 2>/dev/null
      find src routes server.js css-loader.mjs -type f -not -path "*/node_modules/*" 2>/dev/null \
        | sort | xargs cat 2>/dev/null
    } | sha1sum | cut -c1-12
  )
  local cache_tag="checklist-e2e-app:${hash}"

  if [[ "$APP_NO_CACHE" -eq 1 ]]; then
    echo "==> --no-cache: rebuilding app image from scratch…"
    $COMPOSE build --no-cache app
    docker tag "$APP_IMAGE" "$cache_tag"
    return
  fi

  if docker image inspect "$cache_tag" >/dev/null 2>&1; then
    echo "==> Reusing cached app image ($cache_tag) - no source changes detected."
    docker tag "$cache_tag" "$APP_IMAGE"
    return
  fi

  echo "==> Building app image (vite build runs inside)… [new hash $hash]"
  $COMPOSE build app
  docker tag "$APP_IMAGE" "$cache_tag"
}

case "$COMMAND" in
  down)
    $COMPOSE down -v
    ;;
  up)
    build_backend_if_needed
    build_app
    $COMPOSE up -d db backend app
    echo "Stack is up. App at http://localhost:3080 - stop with: ./e2e.sh down"
    ;;
  open)
    build_backend_if_needed
    build_app
    $COMPOSE up -d db backend app
    echo "Opening Cypress against http://localhost:3080 ..."
    CYPRESS_baseUrl=http://localhost:3080 npx cypress open
    ;;
  run)
    build_backend_if_needed
    build_app
    code=0
    $COMPOSE up --abort-on-container-exit --exit-code-from cypress || code=$?
    $COMPOSE down -v --remove-orphans
    exit "$code"
    ;;
esac
