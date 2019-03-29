#!/usr/bin/env bash
# set -x

# 1. build the truffle project
# 2. build the www project
# 3. rsync `contracts` to server
# 4. rsync `www` to server

# config
USER="jimmychu"
REMOTE="lottery.dapp.hkwtf.com"
APP_DEPLOY_PATH="/var/www/lottery/www/public"
CONTRACT_DEPLOY_PATH="/var/www/lottery/contracts"
TRUFFLE_DIR="../truffle"

COMPILE_CONTRACTS=$1

# 1. build truffle
if [ "$COMPILE_CONTRACTS" = "-c" ]; then
  pushd $TRUFFLE_DIR &>/dev/null

  # 2. compile contract & migrate
  truffle migrate --reset --compile-all --network rinkeby

  # 3. rsync `contracts` over
  ssh ${USER}@${REMOTE} "bash -lc \"rm -rf ${CONTRACT_DEPLOY_PATH}/*\""
  echo "Deploying contracts to ${REMOTE}..."
  rsync -av build/contracts/ ${USER}@${REMOTE}:$CONTRACT_DEPLOY_PATH

  popd &>/dev/null
fi

# 2. build www
yarn build

# 4. rsync `www` over
ssh ${USER}@${REMOTE} "bash -lc \"rm -rf ${APP_DEPLOY_PATH}/*\""
echo "Deploying www to ${REMOTE}..."
rsync -av build/ ${USER}@${REMOTE}:$APP_DEPLOY_PATH

# 5. restart nginx server
ssh ${USER}@${REMOTE} "bash -lc \"sudo systemctl restart nginx\""
