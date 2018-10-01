const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const mockAdapter = require('axios-mock-adapter');
const app = require('../server/app');

// Connect mock adapter
const mock = new mockAdapter(axios);
const movieData = [
  { "Title": "Guardians of the Galaxy Vol. 2", "Year": "2017" },
  { "Title": "Baby Driver", "Year": "2017" }
]

/**
 * Removes movie from data array after first successful call
 * @param {number} i - movieData index
 */
function withMovie(i) {
  return () => {
    if (movieData[i]) {
      const movie = movieData[i];
      movieData[i] = null;
      return [200, movie];
    }
    
    return [500];
  }
}


mock
  .onGet('http://www.omdbapi.com', { params: { i: 'tt3896198', apiKey: '8730e0e' }})
  .replyOnce(withMovie(0))
	.onGet('http://www.omdbapi.com/', { params: { i: 'tt3896198', apiKey: '8730e0e' }})
  .replyOnce(withMovie(0))
  .onGet('http://www.omdbapi.com/?i=tt3896198&apikey=8730e0e')
  .replyOnce(withMovie(0))
  .onGet('http://www.omdbapi.com/?apikey=8730e0e&i=tt3896198')
  .replyOnce(withMovie(0))
  .onGet('http://www.omdbapi.com', { params: { t: 'baby driver', apiKey: '8730e0e' }})
  .replyOnce(withMovie(1))
  .onGet('http://www.omdbapi.com/', { params: { t: 'baby driver', apiKey: '8730e0e' }})
  .replyOnce(withMovie(1))
  .onGet('http://www.omdbapi.com/?t=baby%20driver&apikey=8730e0e')
  .replyOnce(withMovie(1))
  .onGet('http://www.omdbapi.com/?apikey=8730e0e&t=baby%20driver')
  .replyOnce(withMovie(1))

const expect = chai.expect;
chai.use(chaiHttp);

describe("server module", function() {
  this.timeout(6500);
  it("GET /?i=tt3896198 responds with movie data", (done) => {
	  chai.request(app)
      .get('/?i=tt3896198')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Guardians of the Galaxy Vol. 2');
        done();
    })
	});

	it("Second GET /?i=tt3896198 responds with movie data, without hitting OMDb", (done) => {
	  chai.request(app)
      .get('/?i=tt3896198')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Guardians of the Galaxy Vol. 2');
        done();
    })
  });
  
  it("GET /?t=baby%20driver responds with movie data", (done) => {
	  chai.request(app)
      .get('/?t=baby%20driver')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Baby Driver');
        done();
    })
	});

	it("Second GET /?t=baby%20driver responds with movie data, without hitting OMDb", (done) => {
	  chai.request(app)
      .get('/?t=baby%20driver')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Baby Driver');
        done();
    })
  });
  
  it("Third GET /?t=baby%20driver responds with movie data, without hitting OMDb", (done) => {
	  chai.request(app)
      .get('/?t=baby%20driver')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Baby Driver');
        done();
    })
	});
});
