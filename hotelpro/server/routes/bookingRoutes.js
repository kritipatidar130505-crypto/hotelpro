const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingByRef,
  createBooking,
  updateBookingStatus,
  getAnalytics,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats/analytics', getAnalytics);

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:ref')
  .get(getBookingByRef);

router.route('/:id/status')
  .put(updateBookingStatus);

module.exports = router;
