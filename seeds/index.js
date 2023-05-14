
const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground')


mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("database connected");
});
const sample = array => array[Math.floor(Math.random()*array.length)];





const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author:'63e8db1615cd13aec3a1fa23',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)}${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate expedita sint at nihil saepe voluptas doloremque porro, accusantium non tenetur? Modi deserunt minus voluptatum reprehenderit nulla fugiat doloribus voluptas laboriosam',
            price
         
        })
        await camp.save();
    }
   
}

seedDB().then(()=>{
    mongoose.connection.close()
});