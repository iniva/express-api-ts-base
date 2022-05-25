#!/bin/bash

DOCKER_BUILDKIT=1 docker compose -p express-ts-api build
DOCKER_BUILDKIT=1 docker compose -p express-ts-api up --force-recreate --renew-anon-volumes --abort-on-container-exit && \

CODE=0
docker compose -p express-ts-api ps -q | xargs docker inspect -f '{{ .State.ExitCode }}' | while read code; do
    if [ "$code" == "1" ]; then
       CODE=-1
    fi
done
docker compose -p express-ts-api down -v
exit $CODE

