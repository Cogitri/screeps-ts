#!/bin/sh
set -e

cp screeps.sample.json screeps.json

env

# Call when the pipeline should deploy to PO's Screeps account
if [ -z $SCREEPS_WEB_DEPLOY ]; then
  sed -i "s/\"YOUR_TOKEN\"/\"$SCREEPS_MASTER_DEPLOY\"/g" ./screeps.json
# Call if pipeline was triggered from web frontend
else
  sed -i "s/\"YOUR_TOKEN\"/\"$SCREEPS_WEB_DEPLOY\"/g" ./screeps.json
fi

cat screeps.json

yarn
yarn push-main

cat screeps.json
