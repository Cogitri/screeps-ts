#!/bin/sh
set -e

# Call when the pipeline should deploy to PO's Screeps account
if [ -z $SCREEPS_WEB_DEPLOY ]; then
  cp screeps.sample.json screeps.json
  sed -i "s/\"YOUR_TOKEN\"/\"$SCREEPS_MASTER_DEPLOY\"/g" ./screeps.json
  yarn
  yarn push-main
# Call if pipeline was triggered from web frontend
else
  cp screeps.sample.json screeps.json
  sed -i "s/\"YOUR_TOKEN\"/\"$SCREEPS_WEB_DEPLOY\"/g" ./screeps.json
  yarn
  yarn push-main
fi
