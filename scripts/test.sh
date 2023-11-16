docker run \
    -ti \
    --net="host" \
    -w /app --mount type=bind,src="$(pwd)",target=/app \
    node:18-alpine \
    sh -c "npm run test"