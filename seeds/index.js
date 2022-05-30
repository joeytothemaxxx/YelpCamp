const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')





const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
          // YOUR USER ID
            author: '62695f09e3c851a19e65e2e4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae sapiente recusandae nulla blanditiis accusantium, dolor sint iste amet iure ullam fugiat labore aliquid perferendis doloremque reprehenderit suscipit. Impedit, officia aliquid.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,                  
                  cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dewhinaik/image/upload/v1653208348/YelpCamp/zfm6w8rti3ttwt7tuzdh.jpg',
                  filename: 'YelpCamp/zfm6w8rti3ttwt7tuzdh',
                },
                {
                  url: 'https://res.cloudinary.com/dewhinaik/image/upload/v1653208352/YelpCamp/kbsrlhexjt9tarm4lovp.jpg',
                  filename: 'YelpCamp/kbsrlhexjt9tarm4lovp',            
                },
                {
                  url: 'https://res.cloudinary.com/dewhinaik/image/upload/v1653208354/YelpCamp/mjxmohdisrwcelu6gaju.jpg',
                  filename: 'YelpCamp/mjxmohdisrwcelu6gaju',                  
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
