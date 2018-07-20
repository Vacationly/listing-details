const request = require('supertest');
const app = require('../server');

const validGetUrl = '/api/listings/1';
const invalidGetUrl = '/api/listings/101';

describe('GET listing data', () => {
  test('It should return a listing object when provided a valid path', (done) => {
    request(app)
      .get(validGetUrl)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toEqual(
          expect.arrayContaining(['listingType', 'host', 'location', 'descriptions']),
        );
        done();
      });
  });

  test('It should not return a listing object when provided an invalid path', (done) => {
    request(app)
      .get(invalidGetUrl)
      .then((response) => {
        expect(response.body).toEqual({});
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
