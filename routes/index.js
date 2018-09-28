var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var start_date = req.query.start_date;
    var end_date = req.query.end_date;

    axios.get('https://skygarden.bookingbug.com/api/v1/37002/events', {
        params: {
            start_date: start_date,
            end_date: end_date,
            include_non_bookable: 'false'
        },
        headers: {
            "Accept": "application/hal+json,application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "App-Id": "f6b16c23",
            "App-Key": "f0bc4f65f4fbfe7b4b3b7264b655f5eb",
            "Connection": "keep-alive",
            "Host": "skygarden.bookingbug.com",
            "If-Modified-Since": "Thu, 27 Sep 2018 20:08:35 GMT",
            "Origin": "https://bespoke.bookingbug.com",
            "Referer": "https://bespoke.bookingbug.com/skygarden/new_booking.html"
        }
        })
        .then(function (response) {
            var events = response.data['_embedded']['events'];
            var available_tickets = [];
            for(var event in events){
                var date = events[event]['datetime'];
                var tickets = events[event]['ticket_spaces'];
                for(var ticket in tickets){
                    if(tickets[ticket]['name'] === 'Admittance' && tickets[ticket]['left'] > 0){
                        tickets[ticket]['date'] = date;
                        available_tickets.push(tickets[ticket]);
                    }
                }
            }

            res.json(available_tickets);
        })
        .catch(function (error) {
            console.log(error);
        });


});

module.exports = router;
