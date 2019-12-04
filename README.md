# graphql-hk-assets

- Run Hasura + Postgres (use image tags from docker-compose.yaml)
- Build the nodejs docker image (`cd nodejs-actions-service && docker build -t nodejs-actions-service .`)

- Upload migrations + metadata from the `init/` folder
    - Run `init/create-table.sql` in the SQL window
    - Upload the metadata from `init/metadata.json`

