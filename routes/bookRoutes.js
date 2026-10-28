const express = require('express');
const router = express.Router();

const Book = require('../models/bookModel');

// 1. Add a new book
router.post('/',async(req,res)=>{
    try{
        const{title,author,category} = req.body;

        if(!title){
            return res.status(400).json({
                message:"Title field is required"
            });
        }

        const book = new Book({
            title,
            author,
            category
        });

        await book.save();

        res.status(201).json({
            message: "New Book is added successfully",
            book
        });
    } 
    catch(err){
        res.status(500).json({
            message : "Error is coming while adding book",
            error : err.message
        });
    }
});


router.get('/',async(req,res) => {
    try{
        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;

        const skip = (page-1)*limit;
        const books = await Book.find().skip(skip).limit(limit);
        const totalRecords = await Book.countDocuments();
        
        res.status(200).json({
            books,
            currentPage : page,
            totalRecords


        })
    }

    catch(err){
        res.status(500).json({
            message : "Error is coming",
            error : err.message
        })
    }
})








router.patch('/:id',async(req,res)=>{
    try{
        const{status}=req.body;

        if(typeof status !== 'boolean'){
            return res.status(400).json({
                message: "Typeof Status must be true or false"
            });
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { status },
            {new : true}
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Availability updated successfully",
            book
        });
    }
    
    
    
    
    catch(err){
        res.status(500).json({
            message: "Error updating avialbale",
            error: err.message
        });
    }
});

module.exports = router;