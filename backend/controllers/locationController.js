const asyncHandler = require('express-async-handler');
const Location = require('../models/location');

//@desc Get all locations
//@route GET /api/location
//@access Private
const getLocations = asyncHandler(async (req, res) => {
});

//@desc Get location by ID
//@route GET /api/location/
//@access Private
const getLocation = asyncHandler(async (req, res) => {
});

//@desc Register location
//@route POST /api/location
//@access Public
const createLocation = asyncHandler(async (req, res) => {
});

//@desc Update location
//@route PUT /api/location/
//@access Public
const updateLocation = asyncHandler(async (req, res) => {
});

//@desc Delete location
//@route DELETE /api/location/
//@access Public
const deleteLocation = asyncHandler(async (req, res) => {
});

module.exports = { getLocations, getLocation, createLocation, updateLocation, deleteLocation };
