/* eslint-disable import/extensions */
import path from 'path';
import express from 'express';

export function setupStaticRouter(router: express.Router) {
  let p = ''
  if (process.env.NODE_ENV === 'development') {
    p = path.resolve(__dirname, '../../../dist/transfer')
  } else {
    p = path.resolve(__dirname, '../transfer')
  }
  router.use('/', express.static(p))
}
