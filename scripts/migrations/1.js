function updateUserId(db){
  return new Promise(function(resolve, reject) {
    try{
      let users = db.collection("users")
      let users_temp = db.collection("users_temp")
      users
      .find()
      .forEach(function(user){
        user._id = user._id.toString(); // convert field to string
        users_temp.save(user);
      }, function(err){
        db.dropCollection("users", function(err){
          if(err){
            reject(err)
            return
          }
          db.renameCollection("users_temp", "users", function(err){
            if(err){
              reject(err)
              return
            }
            resolve()
          })
        })
      });
    }catch(err){
      reject(err)
    }
  });
}

function refactorSessionCollection(db){
  return new Promise(function(resolve, reject) {
    try{
      let sessions = db.collection("sessions")
      let sessions_temp = db.collection("sessions_temp")
      sessions
      .find()
      .forEach(function(sessionObject){
        sessionObject.user = sessionObject.user.toString();
        if(sessionObject.isTelegram == "true"){
          sessionObject.isTelegram = true
          sessionObject.loginId = sessionObject.telegramId.toString()
        }else{
          sessionObject.isTelegram = false
        }

        if(sessionObject.isFacebook == "true"){
          sessionObject.isFacebook = true
          sessionObject.loginId = sessionObject.facebookId.toString()
        }else{
          sessionObject.isFacebook = false
        }

        if(!sessionObject.createdAt){
          sessionObject.createdAt = sessionObject.updatedAt = sessionObject.startedAt || new Date()
        }

        sessionObject.isLoggedIn = false

        delete sessionObject.telegramId
        delete sessionObject.facebookId
        delete sessionObject.startedAt

        sessions_temp.save(sessionObject);
      }, function(err){
        db.dropCollection("sessions", function(err){
          if(err){
            reject(err)
            return
          }
          db.renameCollection("sessions_temp", "sessions", function(err){
            if(err){
              reject(err)
              return
            }
            resolve()
          })
        })
      });
    }catch(err){
      reject(err)
    }
  });
}

function updateMigrationVersion(db){
  return new Promise(function(resolve, reject) {
    try{
      let counters = db.collection("counters")
      counters
      .update(
        {name: "migration"},
        {$set: {migrationVersion: 1}},
        {upsert: true},
        function(err){
          if(err){
            reject(err)
            return
          }
          resolve()
        }
      )
    }catch(err){
      reject(err)
    }
  });
}
module.exports = function(db){
  return updateUserId(db)
          .then(() => {
            return refactorSessionCollection(db)
          })
          .then(() => {
            return updateMigrationVersion(db)
          })
}
