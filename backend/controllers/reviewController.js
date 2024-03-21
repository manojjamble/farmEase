const asyncHandler = require('express-async-handler');
const Review = require('../models/review');

//@desc Get all reviews for particular machine 
//@route GET /api/review/
//@access Private
const getReviews = asyncHandler(async (req, res) => {
    const {machineId} = req.body; 
    const reviews = await Review.find({ machineId })
        .populate('bookingId')
        .populate('ownerId')
        .populate('userId').select('-password')
        .populate('machineId');
    res.status(200).json({ message : "Success", reviews });
});

//@desc Get review by ID for particular booking
//@route GET /api/review/
//@access Private
const getReview = asyncHandler(async (req, res) => {
    const {bookingId} = req.body;
    const review = await Review.findOne({ bookingId })
        .populate('bookingId')
        .populate('ownerId')
        .populate('userId').select('-password')
        .populate('machineId');
    res.status(200).json({ message : "Success", review });
});

//@desc Register review
//@route POST /api/review
//@access Public
const createReview = asyncHandler(async (req, res) => {
    const { ownerId, machineId, bookingId, comment, rating } = req.body;
    const newReview = new Review({
        userId : req.user.id,   
        ownerId,
        machineId,
        bookingId,
        comment,
        rating
    }); 
    const createdReview = await newReview.save();
    res.status(201).json({ message : "Success", createdReview });
});

//@desc Update review
//@route PUT /api/review/
//@access Public
const updateReview = asyncHandler(async (req, res) => {
    if(req.user.role === 'owner'){
        res.status(401).json({ message : "Unauthorized" });
    }

    const { reviewId, comment, rating } = req.body;
    const review = await Review.findById(reviewId);
    if(review){
        review.comment = comment;
        review.rating = rating;
        const updatedReview = await review.save();
        res.status(201).json({ message : "Success", updatedReview });
    } else {
        res.status(404).json({ message : "Review not found" });
    }
});

//@desc Delete review
//@route DELETE /api/review/
//@access Public
const deleteReview = asyncHandler(async (req, res) => {
    if(req.user.role === 'owner'){
        res.status(401).json({ message : "Unauthorized" });
    }

    const { reviewId } = req.body;
    const review = await Review.findById(reviewId);
    if(review){
        await review.deleteOne();
        res.status(200).json({ message : "Review deleted" });
    } else {
        res.status(404).json({ message : "Review not found" });
    }
});

module.exports = { getReviews, getReview, createReview, updateReview, deleteReview };
