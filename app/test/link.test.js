process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Link = require('../models/link.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Links', () => {
    beforeEach((done) => { //Before each test we empty the database
        Link.remove({}, (err) => {
            done();
        });
    });
    /** 
     * Test the /GET route
     */
    describe('/GET Links', () => {
        it('it should GET all the links', (done) => {
            chai.request(server)
                .get('/links')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /**
     * Test the /POST route
     */
    describe('/POST link', () => {
        it('should not POST without url field', (done) => {
            let link = {
                title: 'Test Link',
                category: 'test',
                rate: 5
            };
            chai.request(server)
                .post('/link')
                .send(link)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Link url cannot be blank');
                    done();
                });
        });
        it('should post a link', (done) => {
            let link = {
                title: 'test link',
                category: 'test',
                url: 'a valid url',
                rate: 8
            }
            chai.request(server)
                .post('/link')
                .send(link)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('url');
                    res.body.should.have.property('category');
                    res.body.should.have.property('rate');
                    done();
                });
        });
    });
    /**
     * Test the /GET/:id route
     */
    describe('/GET/:id link', () => {
        it('should GET a link by the given id', (done) => {
            let link = new Link({
                title: 'test link 1',
                category: 'test',
                url: 'a valid url',
                rate: 4
            });
            link.save((err, link) => {
                chai.request(server)
                    .get('/link/' + link.id)
                    .send(link)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('title');
                        res.body.should.have.property('url');
                        res.body.should.have.property('category');
                        res.body.should.have.property('rate');
                        res.body.should.have.property('_id').eql(link.id);
                        done();
                    });
            });
        });
    });
    /**
     * Test the /PUT/:id route
     */
    describe('PUT/:id link', () => {
        it('should UPDATE a link given the id', (done) => {
            let link = new Link({
                title: 'test link 2',
                category: 'test',
                url: 'a valid url',
                rate: 5
            });
            link.save((err, link) => {
                chai.request(server)
                    .put('/link/' + link.id)
                    .send({
                        title: 'test link 3',
                        category: 'test',
                        url: 'a valid url',
                        rate: 10
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql('test link 3');
                        res.body.should.have.property('rate').eql(10);
                        done();
                    });
            });
        });
    });
    /**
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id link', () => {
        it('should DELETE a link given the id', (done) => {
            let link = new Link({
                title: 'test link 2',
                category: 'test',
                url: 'a valid url',
                rate: 5
            });
            link.save((err, res) => {
                chai.request(server)
                    .delete('/link/' + link.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Link deleted successfully!');
                        done();
                    })
            })
        })
    })

});