// const request = require('supertest');
// const path = require('path');
import request from 'supertest';
// import path from 'path';


const app = require('../server/server.ts');

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});
