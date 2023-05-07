#!/bin/sh

if [[ "$NODE_ENV" == "development" ]]
then
    # Modify the dev file
    VAR_PATH="/app/public"
else
    # Modify the built file
    VAR_PATH="/app/build"
fi

cp "$VAR_PATH/variables-template.js" "$VAR_PATH/variables.js"

if [[ ! -z "$API_ENDPOINT" && ! -z "$NOTIFICATION_PUBLIC_VAPID_KEY" ]]
then
    echo "Setting API Endpoint to '$API_ENDPOINT'"
    sed -i "s;__API_ENDPOINT__;$API_ENDPOINT;g" "$VAR_PATH/variables.js"

    echo "Setting public key to '$NOTIFICATION_PUBLIC_VAPID_KEY'"
    sed -i "s;__NOTIFICATION_PUBLIC_VAPID_KEY__;$NOTIFICATION_PUBLIC_VAPID_KEY;g" "$VAR_PATH/variables.js"
else
    echo "API_ENDPOINT or NOTIFICATION_PUBLIC_VAPID_KEY is not defined, web app won't work"
    exit 1
fi
