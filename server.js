require('dotenv').config();
const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();
const MongoClient = require('mongodb').MongoClient;

CLIENT.on('message', async (msg) => {
    if(!msg.author.bot && msg.content.toLowerCase() != 'bowl'){
        const author = msg.author;
        var bowled = false;
        const userExist = await findUser(author.id);
        console.log(userExist); 
        if(userExist){
            member = msg.member;
            member.kick().then(() => {
                msg.reply(' has been added to the bowl');
            });

            bowled = true;
        }         
    
        if(!bowled){
            bowlUser(author.id);
            msg.reply('HOW DARE YOU UTTER SOMETHING OTHER THAN MY NAME YOU USELESS MORTAL. I AM YOUR GOD DO NOT DISSOBEY ME OR I WILL END YOUR PEWNY EXISTANSE AS QUICKLY AS IT BEGAN. YOU MAY ONLY SPEAK MY NAME HERE!!! DEFY ME AGAIN AND YOU WILL BE ENDED');    
        }   
    }
});

CLIENT.login(process.env.TOKEN).then(() => {
    console.log('Discord bot started');
});

async function bowlUser(id) {
    var config = JSON.parse(process.env.APP_CONFIG);
    
    await MongoClient.connect(
        "mongodb://" + config.mongo.user + ":" + encodeURIComponent(process.env.MONGO_PASSWORD) + "@" + config.mongo.hostString,async (err, client) => {
            if(!err) {
                const db = await client.db('d1153a5b46c1ff42fd56fcf2d1a70a99');
                await db.collection('bowled').insertOne({user_id: id}).then(() => {
                    console.log(id);
                    client.close();     
                })
            } 
        }
    );
}

async function findUser(id) {
    var config = JSON.parse(process.env.APP_CONFIG);
    
    await MongoClient.connect(
        "mongodb://" + config.mongo.user + ":" + encodeURIComponent(process.env.MONGO_PASSWORD) + "@" + config.mongo.hostString,async (err, client) => {
            if(!err) {
                const db = await client.db('d1153a5b46c1ff42fd56fcf2d1a70a99');
                let result = await db.collection('bowled').findOne({user_id: id});
                client.close();
                console.log(result);
                if(result.user_id == id){
                    return true;
                } else {
                    return false;
                }
            } 
        }
    );
}


