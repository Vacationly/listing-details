const request = require('supertest');
const app = require('../server');

const agent = request(app);

const validListingId = 1;
const invalidListingId = 101;
const validHighlightId = 1;
const voteValue = 1;

const validGetUrl = `/api/listings/${validListingId}`;
const invalidGetUrl = `/api/listings/${invalidListingId}`;
const putUrl = `/api/listings/${validListingId}/highlights/${validHighlightId}`;
const putData = { feedback: voteValue };

describe('GET listing data', () => {
  test('It should return a listing object when provided a valid path', (done) => {
    agent.get(validGetUrl).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'listingType',
          'host',
          'location',
          'description',
          'highlights',
          'amenities',
          'sleepingArrangements',
          'houseRules',
          'cancellationPolicy',
        ]),
      );
      done();
    });
  });

  test('It should not return a listing object when provided an invalid path', (done) => {
    agent.get(invalidGetUrl).then((response) => {
      expect(response.body).toEqual({});
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});

describe('PUT highlight feedback data', () => {
  const findHighlightWithId = (highlights, id) => highlights.reduce((found, current) => (current.id === id ? current : found), null);

  test('It should be able to find a highlight for a valid id', (done) => {
    agent.get(validGetUrl).end((err, res) => {
      const highlight = findHighlightWithId(res.body.highlights, validHighlightId);
      expect(highlight).toHaveProperty('tagline');
      done();
    });
  });

  test('It should return status 200 when putting to a valid listing/highlight', (done) => {
    agent
      .put(putUrl)
      .send(putData)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('It should update "upvote" property of highlight in database', (done) => {
    let initialVoteCount;
    agent.get(validGetUrl).end((err, res) => {
      const highlight = findHighlightWithId(res.body.highlights, validHighlightId);
      initialVoteCount = highlight.upvotes;
      agent
        .put(putUrl)
        .send(putData)
        .end(() => {
          agent.get(validGetUrl).end((err, res) => {
            const highlight = findHighlightWithId(res.body.highlights, validHighlightId);
            expect(highlight.upvotes).toBe(initialVoteCount + voteValue);
            done();
          });
        });
    });
  });
});
