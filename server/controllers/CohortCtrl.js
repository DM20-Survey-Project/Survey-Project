const cohortModel = require('./../models/CohortModel');
const axios = require('axios');

module.exports = {

    checkDevMountain(req, res) {
        var now = new Date();
        axios.get('https://devmountain.com/api/classsession').then(response => {

            var active = response.data.filter(e => new Date(e.date_start) < now && new Date(e.date_end) > now)
            var activeId = active.map(e => e.id);
            active.forEach(e => {
                var update = {
                    dmCohortId: e.id,
                    location: {
                        city: e.location.city,
                        state: e.location.state
                    },
                    active: true,
                    type: e.type,
                    subject: e.subject,
                    dates: {
                        start: e.date_start,
                        end: e.date_end
                    }
                };
                if (e.short_name) update.name = e.short_name;
                var qry = {
                    dmCohortId: e.id
                }
                cohortModel.findOneAndUpdate(qry, update, {
                    upsert: true
                }, (err, result) => {
                    if (err) {
                        console.error(err);
                    }
                })
            })
            res.send('Ok')
        })
    }
}
