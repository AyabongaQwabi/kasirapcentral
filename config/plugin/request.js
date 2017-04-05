var serializer = require('./../spontaneous')
exports.fetch = function(){
  return serializer.pop()
}
