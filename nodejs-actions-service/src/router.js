import express from 'express';
import validator from 'email-validator';

const { query } = require('graphqurl');
const router = express.Router();

const HASURA_URL = process.env.HASURA_URL;

router.get('/', (req, res) => {
  return res.json({hello: "world"});
});

router.post('/createUser', (req, res) => {
  const {
    input
  } = req.body;

  console.log(input);

  if (!(validator.validate(input.email))) {
    res.json({
      errors: "Invalid email"
    });
    return;
  }

  query(
    {
      query: `
        mutation ($name:String!, $email:String!) {
          insert_users(objects: {name: $name, email: $email}) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        name: input.name,
        email: input.email
      },
      endpoint: HASURA_URL
    }
  ).then((response) => {
    console.log(response)
    // Slow things down
    res.json({
      data: {
        userId: response.data.insert_users.returning[0].id
      }
    });
  })
  .catch((error) => {
    console.error(error)
    res.json({
      errors: "Failed to create user."
    });
  });
});

router.post('/createUserSlow', (req, res) => {
  const {
    input
  } = req.body;

  console.log(input);

  if (!(validator.validate(input.email))) {
    res.json({
      errors: "Invalid email"
    });
    return;
  }

  query(
    {
      query: `
        mutation ($name:String!, $email:String!) {
          insert_users(objects: {name: $name, email: $email}) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        name: input.name,
        email: input.email
      },
      endpoint: HASURA_URL
    }
  ).then((response) => {
    console.log(response)
    // Slow things down
    setTimeout(() => {
      console.log("Sending response now");
      res.json({
        data: {
          userId: response.data.insert_users.returning[0].id
        }
      });
    }, 15000);
  })
  .catch((error) => {
    console.error(error)
    res.json({
      errors: "Failed to create user."
    });
  });
});


export {router};
