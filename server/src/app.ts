import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import graphqlHTTP from 'koa-graphql'
import cors from 'koa-cors'
import Router from 'koa-router'
import logger from 'koa-logger'

import schema from './schema/schema'

const app = new Koa()
const router = new Router()

const graphqlServer = graphqlHTTP({ schema, graphiql: true })
router.all('/graphql', bodyParser(), graphqlServer)

app.use(graphqlServer)
app.use(logger())
app.use(cors())
app.use(helmet())
app.use(router.routes()).use(router.allowedMethods())

export default app
