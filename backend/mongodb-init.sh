#!/bin/bash
#
# ------------------------------------------
# Script Name: mongodb-init.sh
# Description: Entra dentro do container do MongoDB criado pelo Docker
#              e cria um novo usuário.
set -Eeuo pipefail

echo "$(tput setaf 5) [MongoDB] Inicializing script..."

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g' | xargs) | envsubst)
fi

MONGO_USER=$MONGO_USER
MONGO_PASSWORD=$MONGO_PASSWORD
MONGO_DB=$MONGO_DB

# Checks whether the values ​​of MONGO_USER and MONGO_PASSWORD are not empty
if [ -n "$MONGO_USER" -a -n "$MONGO_PASSWORD" ]
then
  mongo --host localhost -u root -p root --authenticationDatabase admin<<EOF
    db = db.getSiblingDB('$MONGO_DB')
    use $MONGO_DB
    db.createUser({
      user: '$MONGO_USER',
      pwd: '$MONGO_PASSWORD',
      roles: [{ role: 'readWrite', db: '$MONGO_DB' }]
    })
EOF
fi

