const mongoose = require('mongoose');

const schemaObj= {
    username: { type: String },
    text : { type: String },    
};

const messageSchema = new mongoose.Schema(schemaObj, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);