var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CohortSchema = new Schema({
    dmCohortId: {type: Number, required: true},
    name: {type: String, default: 'TBD'},
    nickname: {type: String, default: 'TBD'},
    slack_channel: {type: String, default: 'TBD'},
    location: {
        city: {type: String, default: 'TBD'},
        state: {type: String, default: 'TBD'}
    },
    type: {type: String, default: 'TBD'},
    subject: {type: String, default: 'TBD'},
    dates: {
        start: {type: Date, default: Date.now()},
        end: {type: Date, default: Date.now()}
    },
    active:Boolean
});


module.exports = mongoose.model('Cohort', CohortSchema);
