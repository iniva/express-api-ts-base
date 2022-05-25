#!/bin/bash

DOCKER_BUILDKIT=1 docker compose -p express-ts-api up --build --abort-on-container-exit
