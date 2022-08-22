#! /bin/bash

docker-compose build backend

docker-compose up -d backend backend2

export CYPRESS_baseUrl=http://localhost:8090
export SECONDARY_URL=http://localhost:8091

npx wait-on -t 10000 ${CYPRESS_baseUrl}
npx wait-on -t 10000 ${SECONDARY_URL}

npx cypress open --env SECONDARY_URL="${SECONDARY_URL}" --browser chrome
