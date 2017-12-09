const buyRateModel = require('../app/models/buyRateModel');
const moment = require('moment');
const logger = require('winston');
module.exports = () => {
  let time = moment().subtract(1, 'hours')

  buyRateModel
  .find({"holdingTradeTransactionList.updatedAt": {$lt: time.toDate()}})
  .then((data) => {
    for(let i=0,length=data.length;i<length; i++){
      let buyRateRow = data[i]
      let totalHoldingVolume = 0
      let holdingTradeTransactionList = buyRateRow.holdingTradeTransactionList
      buyRateRow.holdingTradeTransactionList = holdingTradeTransactionList.filter((holdingObject) => {
        let duration = time.diff(holdingObject.updatedAt, 'hours')
        if(duration < 1){
          return true
        }
        totalHoldingVolume += holdingObject.volume
        return false
      })
      buyRateRow.volume += totalHoldingVolume
      buyRateRow.holdingVolume -= totalHoldingVolume
      buyRateRow.initialVolume = buyRateRow.volume
      // buyRateModel.update({_id: buyRateRow._id},{$inc: {volume: totalHoldingVolume, holdingVolume: -totalHoldingVolume}})
      buyRateRow.save().then((data) => console.log(data)).catch((error) => console.log(error))
    }
  })
  .catch((error) => {
      logger.error(error)
  })

}
