const express = require('express');

const routes = (Book) => {
    
    const bookRouter = express.Router();
    const bookController = require('../controllers/bookController')(Book);
    
    bookRouter.route('/')
    
        .post(bookController.post)
    
        .get(bookController.get);
        
        
    // middleware    
    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) { res.status(500).send(err); }
            else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No book found');
            }
        });
    }); 
    
    bookRouter.route('/:bookId')
        .get((req, res) => {
            const returnBook = req.book.toJSON();
            
            returnBook.links = {};
            const newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20'); // remove spaces in genre
            res.json(returnBook);
        })
        
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            
            req.book.save((err) => {
                if (err) { res.status(500).send(err); }
                else {
                    res.json(req.book);
                }
            });
            
            res.json(req.book);
        })
            
        
        .patch((req, res) => {
            if (req.body._id) {
                delete req.body._id;
            }
            
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            
            req.book.save((err) => {
                if (err) { res.status(500).send(err); }
                else {
                    res.json(req.book);
                }
            });
        })
        
        .delete((req, res) => {
            req.book.remove((err) => {
               if (err) { res.status(500).send(err); }
                else {
                    res.status(204).send('Removed');
                }
            });
        });
        
    return bookRouter;
        
};

module.exports = routes;