import indexSer from '../services/indexSer';

export default async (ctx, next) => {
  console.log(ctx.url);
  await indexSer(ctx, next);
}
