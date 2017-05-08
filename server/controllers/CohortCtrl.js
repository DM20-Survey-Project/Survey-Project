var cohortModel = require('./../models/CohortModel');
var axios = require('axios');

module.exports = {
  read:read,
  update:update,
  checkDevMountain:checkDevMountain
}

function read(req, res){
  cohortModel.find(req.query).exec(function(err, response){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.send(response);
  })
}

function update(req, res){
  cohortModel.findByIdAndUpdate(req.params.id, req.body)
  .then(function(response){
    console.log(response);
    res.send(response);
  });
}

function checkDevMountain(req, res){
  var now = new Date();
  axios.get('https://devmountain.com/api/classsession').then(response=>{

    var active = response.data.filter(e=> new Date(e.date_start) < now && new Date(e.date_end) > now)
    var activeId = active.map(e=>e.id);
    active.forEach(e=>{
      var update = {
        dmCohortId:e.id,
        location:{
          city:e.location.city,
          state:e.location.state
        },
        active:true,
        type:e.type,
        subject:e.subject,
        dates:{
          start:e.date_start,
          end:e.date_end
        }
      };
      if(e.short_name) update.name = e.short_name;
      var qry = {dmCohortId:e.id}
      cohortModel.findOneAndUpdate(qry, update, {upsert:true}, function(err, result){
        if(err){
          console.error(err);
        }
      })
    })

  })
}
