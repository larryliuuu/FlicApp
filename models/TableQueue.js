var mongoose     = require('mongoose');
var Table        = require('./Table');
var TableSchema  = Table.schema;
var Schema       = mongoose.Schema;

var TableQueueSchema   = new Schema({
    queue : {type: [TableSchema], default: []}
});

TableQueueSchema.methods.addTable = function(tableID, status) {
  console.log(tableID);
  var table = new Table({id:tableID, index: this.queue.length, status: status})
  table.save(function(err){
    if (err){
      console.log(err);
      return;
    }
  });
  this.queue.push(table);
}

TableQueueSchema.methods.removeTable = function(tableID) {
  var index;
  var query = Table.findOne({'id': tableID}, 'index', function(err, table){
    if (err){
      console.log(err);
      return;
    }
    index = table.index;
  });
  this.queue.splice(index);
}

module.exports = mongoose.model('TableQueue', TableQueueSchema);
