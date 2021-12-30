const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  eventDate: {
    type: Date,
    required: true,
    trim: true,
    minlength: 1
  },
  eventLocation: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  eventDescription: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  notes: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, {
  timestamps: true,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;