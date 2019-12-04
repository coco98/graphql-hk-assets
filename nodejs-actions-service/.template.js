const handlerTemplate = (mutationSdl, typesSdl) => {
  return`
const handler = (requestBody) => {
  const {
    input,
  } = requestBody

  // custom logig

  return {
    data: {
      // spread the fields of the output type here
    }
  }
}

export default handler;
`;
};

const routeTemplate = (mutationSdl, typesSdl) => {
  const mutationAst = parse(mutationSdl);
  const mutationDef = mutationAst.definitions[0].fields[0];
  const actionName = mutationDef.name.value;

  return `
router.get('/${actionName.toLowerCase()}', (req, res) => {
  const response = require('./${actionName}').default(req.body);
  return res.json(response);
})
`

}

const FILE_EXTENSION = 'js';
