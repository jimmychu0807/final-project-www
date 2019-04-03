#!/usr/bin/env bash
# set -x

# 1. build the truffle contracts
# 2. build the www project
# 3. rsync `www` to server

# config
USER="jimmychu"
REMOTE="lottery.dapp.hkwtf.com"
APP_DEPLOY_PATH="/var/www/lottery/www/public"
TRUFFLE_DIR="../truffle"

COMPILE_CONTRACTS=$1

# 1. build truffle
if [ "$COMPILE_CONTRACTS" = "-c" ]; then
  pushd $TRUFFLE_DIR &>/dev/null
  yarn deploy:rinkeby
  popd &>/dev/null
fi

# 2. build www
yarn build

# 3. rsync `www` over
ssh ${USER}@${REMOTE} "bash -lc \"rm -rf ${APP_DEPLOY_PATH}/*\""
echo "Deploying www to ${REMOTE}..."
rsync -av build/ ${USER}@${REMOTE}:$APP_DEPLOY_PATH

# 4. restart nginx server
ssh ${USER}@${REMOTE} "bash -lc \"sudo systemctl restart nginx\""
