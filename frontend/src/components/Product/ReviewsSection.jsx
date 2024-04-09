import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const ReviewsSection = ({ machineId }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    comment: ''
  });

  // Dummy data for reviews (replace this with actual fetch from backend)
  const dummyReviews = [
    { id: 1, name: 'John Doe', rating: 4, comment: 'Great tool, worked well for my project.' },
    { id: 2, name: 'Jane Smith', rating: 5, comment: 'Excellent service, highly recommend.' },
    { id: 3, name: 'Alex Johnson', rating: 3, comment: 'Good quality but a bit expensive.' }
  ];

  useEffect(() => {
    setReviews(dummyReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new review to the list (this is just for demo purposes)
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      rating: parseInt(formData.rating),
      comment: formData.comment
    };
    setReviews([...reviews, newReview]);
    // Clear form data
    setFormData({
      name: '',
      email: '',
      rating: '',
      comment: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='p-10'>
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      {/* Display previous reviews */}
      <div className="mb-4">
        {reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded mb-2  shadow-sm shadow-zinc-500">
            <p className="text-lg font-semibold">{review.name}</p>
            <p className="text-gray-600">Rating: {review.rating}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
      {/* Review form */}
      <h2 className='text-2xl font-bold mb-4'>Add a Review:</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="standard" // Set variant to "standard"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>
      <div className="mb-4">
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard" // Set variant to "standard"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>
      <div className="mb-4">
        <TextField
          id="rating"
          name="rating"
          label="Rating"
          variant="standard" // Set variant to "standard"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          inputProps={{ min: "1", max: "5" }}
          required
          fullWidth
        />
      </div>
      <div className="mb-4">
        <TextField
          id="comment"
          name="comment"
          label="Comment"
          variant="standard" // Set variant to "standard"
          multiline
          rows={4}
          value={formData.comment}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>
      <Button type="submit" variant="contained" color="primary">Submit Review</Button>
    </form>
    </div>
  );
};

export default ReviewsSection;