const mongoose = require("mongoose");

const RoverSchema = mongoose.Schema({
  rover_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  launch_date: {
    type: String,
    required: true
  },
  is_success: {
    type: Boolean,
    required: true
  },
  construction: {
    date: { type: String, required: true },
    company: { type: String, required: true }
  },
  image_link: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Rover', RoverSchema);

// https://json-generator.com/

// [
//   '{{repeat(20, 30)}}',
//   {
//     rover_id: '{{guid()}}',
//     rover_name: '{{surname()}}',
//     description: '{{lorem((50, 100), "words")}}',
//     launch_date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
//     is_success: '{{bool()}}',
//     construction: [
//       { construction_date: '{{date(new Date(2012, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}' },
//       { constructor_company: '{{company().toUpperCase()}}' }
//     ],
//     image_link: '{{random("https://images2.imgbox.com/d8/6d/fnqIBEJh_o.png", "https://images2.imgbox.com/6f/c0/D3Owbmpo_o.png", "https://images2.imgbox.com/89/e8/5eeThzqZ_o.png")}}'
//   }
// ]