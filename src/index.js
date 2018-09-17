const express = require('express')
const yaml = require('js-yaml')
const playground = require('graphql-playground-middleware-express').default
const { getGraphQLConfig } = require('graphql-config')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

// Config ------------------------------------------
const folderName = process.env.PLAYGROUND_FOLDERNAME || 'GrahpQL Playground'
const workspaceName = process.env.PLAYGROUND_WORKSPACENAME || folderName
const playgroundConfig = process.env.PLAYGROUND_CONFIG

// Server ------------------------------------------
const app = express()

var config
if (playgroundConfig) {
  config = yaml.safeLoad(playgroundConfig)
} else {
  config = getGraphQLConfig('./config').config
}

// @see(https://github.com/prisma/graphql-playground/blob/master/packages/graphql-playground-html/src/render-playground-page.ts)
//
// interface MiddlewareOptions {
//   endpoint?: string
//   subscriptionEndpoint?: string
//   workspaceName?: string
//   env?: any
//   config?: GraphQLConfigData
//   settings?: ISettings
//   schema?: IntrospectionResult
//   tabs?: Tab[]
//   codeTheme?: EditorColours
// }

app.get(
  '/',
  playground({
    folderName,
    workspaceName,
    config,
  })
)

app.listen(port, err => {
  if (err) throw err
  console.log(`> Server started on localhost:${port}${dev ? ' in dev mode' : ''}`)
})
