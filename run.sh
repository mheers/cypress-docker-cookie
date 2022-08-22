#! /bin/bash

docker build -t backend backend

ALIAS=foo

docker stop $ALIAS

SERVICE_CONTAINER=backend
CYPRESS_CONTAINER=cypress/included:9.3.1
docker run --rm --name $ALIAS --hostname $ALIAS -d $SERVICE_CONTAINER
# redis starts very quickly, so just go ahead
docker run --rm --link $ALIAS --entrypoint="" -it -v $PWD:/e2e $CYPRESS_CONTAINER cypress run --project /e2e --config baseUrl=http://${ALIAS}:8090/ --browser chrome
