require('dotenv').config();
const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();
const MongoClient = require('mongodb').MongoClient;

var badbois = [];

CLIENT.on('message', async (msg) => {
    if(!msg.author.bot && msg.content.toLowerCase() != 'bowl'){
        const author = msg.author;
        var bowled = false;
         
        if(await findUser(author)){
            member = msg.member;
            member.kick().then(() => {
                msg.reply(' has been added to the bowl');
            });

            bowled = true;
        }         
    
        if(!bowled){
            bowlUser(author);
            msg.reply('HOW DARE YOU UTTER SOMETHING OTHER THAN MY NAME YOU USELESS MORTAL. I AM YOUR GOD DO NOT DISSOBEY ME OR I WILL END YOUR PEWNY EXISTANSE AS QUICKLY AS IT BEGAN. YOU MAY ONLY SPEAK MY NAME HERE!!! DEFY ME AGAIN AND YOU WILL BE ENDED');    
        }   
    }
});

CLIENT.login(process.env.TOKEN).then(() => {
    console.log('Discord bot started');
});

async function bowlUser(name) {
    var config = JSON.parse(process.env.APP_CONFIG);
    
    MongoClient.connect(
        "mongodb://" + config.mongo.user + ":" + encodeURIComponent(process.env.MONGO_PASSWORD) + "@" + config.mongo.hostString, (err, db) => {
            if(!err) {
                db.collection('bowled').insertOne({user: name});
                db.close;
                res.end("user was bowled");
            } else {
                res.end("Error while connecting to MongoDB");
            }
        }
    );
}

async function findUser(name) {
    var config = JSON.parse(process.env.APP_CONFIG);
    
    await MongoClient.connect(
        "mongodb://" + config.mongo.user + ":" + encodeURIComponent(process.env.MONGO_PASSWORD) + "@" + config.mongo.hostString,async (err, db) => {
            if(!err) {
                await db.collection('bowled').findOne({user: name}).then(result => {
                    if(result){
                        return true;
                    } else {
                        return false;
                    }
                });
                db.close;
                res.end("User was processed");
            } else {
                res.end("Error while connecting to MongoDB");
            }
        }
    );
}

