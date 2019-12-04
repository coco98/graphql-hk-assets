# graphql-hk-assets

- Run Hasura + Postgres (use image tags from docker-compose.yaml)
- Build the nodejs docker image (`cd nodejs-actions-service && docker build -t nodejs-actions-service .`)

- Upload migrations + metadata from the `init/` folder
    - Run `init/create-table.sql` in the SQL window
    - Upload the metadata from `init/metadata.json`



## Sync mutation

```graphql
mutation FastMutation {
  createUser(name: "test", email:"test2@email.com") {
    userId
    user {
      id
      name
      email
    }
  }
}
```

## Async mutation + subscription

```graphql
mutation SlowMutation {
  createUserSlow(name: "test", email:"test") {
    id
  }
}
```

Grab the id from that response, and then run the following subscription (say: `4fc0a091-0d6d-4a14-a2be-c0dfc8f66585`) :

```graphql
subscription SlowMutationResult {
  createUserSlow(id:"4fc0a091-0d6d-4a14-a2be-c0dfc8f66585") {
    output {
      userId
      user {
        name
        email
      }
    }
  }
}
```
