#!/bin/bash
#
# ------------------------------------------
# Script Name: mongodb-init.sh
# Description: Entra dentro do container do MongoDB criado pelo Docker
#              e cria um novo usuário.
set -Eeuo pipefail

echo "[MongoDB] Inicializing script..."
# Checks whether the values ​​of MONGO_USER and MONGO_PASSWORD are not empty

if [ -n $MONGO_USER -a -n $MONGO_PASSWORD ]
then
  mongo --host localhost -u $MONGO_INITDB_USER -p $MONGO_INITDB_PASSWORD --authenticationDatabase admin <<EOF
  use tindev
  db.createUser({
    user: '$MONGO_USER',
    pwd: '$MONGO_PASSWORD',
    roles: [{ role: 'readWrite', db: 'tindev' }]
  })
EOF
fi

