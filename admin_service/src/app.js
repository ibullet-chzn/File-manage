import http from 'http'
import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import session from 'koa-session'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import config from './config'
import encapsulation from './models/encapsulation'
import intercept from './models/intercept'

const app = new Koa();
const bodyparser = Bodyparser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
// session
app.keys = ['some secret hurr'];

var CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true /** (boolean) signed or not (default true) */
};
app.use(convert(session(CONFIG, app)));

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
})));

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}));

// 500 error
koaOnError(app, {
  template: 'views/500.ejs'
});

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// login intercept
app.use(async(ctx, next) => {
  if (intercept.loginIgnorePath(ctx.url)) {
    await next();
  } else {
    if (ctx.session) {
      await next();
    } else {
      ctx.body = encapsulation.body('NOT_LOGIN');
    }
  }
});


// response router
app.use(async(ctx, next) => {
  await require('./routes').routes()(ctx, next)
});

// 404
app.use(async(ctx) => {
  ctx.status = 404;
  await ctx.render('404')
});

// error logger
app.on('error', async(err, ctx) => {
  console.log('error occured:', err)
});

const port = parseInt(config.port || '3100');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error
  }
});
server.on('listening', () => {
  console.log('Listening on port: %d', port)
});

export default app
