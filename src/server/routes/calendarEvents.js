const router = require('express').Router();
let CalendarEvent = require('../models/calendarEvent.model');

router.route('/').get((req, res) => {
    CalendarEvent.find()
    .then(calendarEvents => res.json(calendarEvents))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const eventName = req.body.eventName;
  const eventDate = Date.parse(req.body.eventDate);
  const eventLocation = req.body.eventLocation;
  const eventDescription =  req.body.eventDescription;
  const notes = req.body.notes;

  const newCalendarEvent = new CalendarEvent({
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      notes
  });

  newCalendarEvent.save()
    .then(() => res.json('Calendar event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    CalendarEvent.findById(req.params.id)
      .then(calendarEvent => res.json(calendarEvent))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    CalendarEvent.findByIdAndDelete(req.params.id)
      .then(() => res.json('Calendar event deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    CalendarEvent.findById(req.params.id)
      .then(calendarEvent => {
        calendarEvent.eventName = req.body.eventName;
        calendarEvent.eventDate = Date.parse(req.body.eventDate);
        calendarEvent.eventLocation = req.body.eventLocation;
        calendarEvent.eventDescription = req.body.eventDescription;
        calendarEvent.notes = req.body.notes;
  
        calendarEvent.save()
          .then(() => res.json('Calendar event updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;