const mongoose = require("mongoose");

const MissionSchema = mongoose.Schema({
  mission_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  roverId: {
    type: Array,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Mission', MissionSchema);

// https://json-generator.com/

// [
//   '{{repeat(5, 7)}}',
//   {
//     _id: '{{objectId()}}',
//     mission_name: '{{firstName()}}',
//     country: '{{country()}}',
//     start_date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
//     end_date: '{{date(new Date(2020, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
//     rovers: [
//       '{{repeat(2)}}',
//       {
//         roverId: '{{objectId()}}'
//       }
//     ]
//   }
// ]