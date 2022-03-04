const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '610a823d3d54ae2cc0dc2bc7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/diqwocnbh/image/upload/v1628177622/YelpCamp/itd3jtl4c5pqjsoiw01q.jpg',
                    filename: 'YelpCamp/itd3jtl4c5pqjsoiw01q'
                },
                {
                    url: 'https://res.cloudinary.com/diqwocnbh/image/upload/v1628177625/YelpCamp/od5zrwipbjmjnefgvo7z.jpg',
                    filename: 'YelpCamp/od5zrwipbjmjnefgvo7z'
                },
                {
                    url: 'https://res.cloudinary.com/diqwocnbh/image/upload/v1628177629/YelpCamp/foavv6t3jrhp2xqb6cvq.jpg',
                    filename: 'YelpCamp/foavv6t3jrhp2xqb6cvq'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatibus natus sit ad vel voluptas voluptate aperiam dolores inventore ipsa. Accusamus vero debitis cupiditate unde. Nemo nam iste repudiandae molestiae?',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})