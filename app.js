const express = require('express')
const path = require('path')
const app = express();
const port = 80;

const bodyparser = require ("body-parser")
// connecting with mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://localhost/contactIce');

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  console.log('connected')
}
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address : String,
    flavour: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);


// Express specific stuffs
app.use('/static', express.static('static')) // for serving html
app.use(express.urlencoded())

// pug specific stuffs
app.set('view engine', 'pug')//setting template engine 
app.set('views',path.join(__dirname, 'views'))//setting the views directory


//Endpoints
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to data base")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    })
      
    //  res.status(200).render('contact.pug');
 })

app.listen(port, ()=>{
    console.log(`this app is started on your port ${port}`)
})