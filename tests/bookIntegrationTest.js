const should = require('should');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', function() {
    it('should allow a book to be posted and return a read and _id', function(done) {
        const bookPost = {title: 'New Book', author: 'Brandon', genre: 'Fiction'};
        
        agent.post('/api/books')
            .send(bookPost)
            .expect(201) // created status
            .end(function(err, results) {
                if(err) {console.log('Integration Test: ' + err)}
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
        
    });
    
    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
    
})