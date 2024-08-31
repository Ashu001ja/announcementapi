const express = require('express');
const cnn=require('./db/database');
const dataSechema=require('./models/model');
const Port=process.env.PORT || 3000;
const app = express();

app.use(express.json());


app.get('/', async(req, res) => {
    try{
    const data=await dataSechema.find({});
    res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/send',async(req, res) => {
   
    try{
    const { title, description } = req.body;   
    if(!title ||!description){
        return res.status(400).send('Title and description are required.');
    }
    const data=dataSechema({ title, description });
    await data.save().then(()=>{
        res.send(data);
    });
    }catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.patch('/update/:id', async(req, res) => {
    try{
    const { id } = req.params;
    const { title, description } = req.body;
    if(!title && !description){
        return res.status(400).send('Title or description are required.');
    }
    const data=await dataSechema.findByIdAndUpdate(id, { title, description }, { new: true });
    if(!data){
        return res.status(404).send('Data not found.');
    }
    res.send(data);    
}catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
 
}
});

app.delete('/delete/:id', async(req, res) => {
    try{
    const { id } = req.params;
    const data=await dataSechema.findByIdAndDelete(id);
    if(!data){
        return res.status(404).send('Data not found.');
    }
    res.send(data);
}catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
 
}
});

const Start= async()=>{
    try {
        await cnn();
        app.listen(Port, () => {
            console.log(`Server running on port ${Port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

Start();


