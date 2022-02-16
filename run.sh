#! /bin/bash
SERVICE_CONTAINER=redis
CYPRESS_CONTAINER=cypress/included:9.3.1
ALIAS=foo.bar
docker run --name $ALIAS --hostname $ALIAS -d $SERVICE_CONTAINER
# redis starts very quickly, so just go ahead
docker run --link $ALIAS --entrypoint="" -it -v $PWD:/e2e $CYPRESS_CONTAINER cypress run --project /e2e --config baseUrl=https://${ALIAS}:6379/ --browser firefox
