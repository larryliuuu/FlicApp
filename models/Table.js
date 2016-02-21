var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TableSchema   = new Schema({
    id: Integer

});

module.exports = mongoose.model('Table', TableSchema);
