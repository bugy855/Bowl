require('dotenv').config();
const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();
const mongoose = require('mongoose');

mongoose.connect('mongodb://d1153a5b46c1ff42fd56fcf2d1a70a99:' + encodeURIComponent('CSXfU5Mq5UdnjTCr') + '@12a.mongo.evennode.com:27018,12b.mongo.evennode.com:27018/d1153a5b46c1ff42fd56fcf2d1a70a99?replicaSet=us-12', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const badBoiSchema = new mongoose.Schema({
    author: String
}); 

const badBoi = new mongoose.model('badBoi', badBoiSchema);

function verifyMessage(msg){
    const sanMsg = msg.content.trim().split(/\s+/);
    console.log(sanMsg);

    for (let i = 0; i < sanMsg.length; i++) {
        if(sanMsg[i].content.toLowerCase() != 'bowl'){
            return false;
        } 
    }

    return true;
}

async function handleMessage(msg) {
    if(!msg.author.bot && verifyMessage(msg)){
        const author = msg.author;
        msg.delete();
        badBoi.findOne({author: author}, (err, foundBadBoi) => {
            if(err){
                console.log(err);
            } else {
                if(foundBadBoi){
                    member = msg.member;
                    member.ban({ days: 7 }).then(() => {
                        msg.reply(' has been added to the bowl');
                    });
                }else{
                    const newBadBoi = new badBoi({author:author});
                    newBadBoi.save((err, badboi) => {
                        if(err){
                            console.log(err);
                        } else {
                            msg.reply('HOW DARE YOU UTTER SOMETHING OTHER THAN MY NAME YOU USELESS MORTAL. I AM YOUR GOD DO NOT DISSOBEY ME OR I WILL END YOUR PEWNY EXISTENSE AS QUICKLY AS IT BEGAN. YOU MAY ONLY SPEAK MY NAME HERE!!! DEFY ME AGAIN AND YOU WILL BE ENDED');
                        }
                    });
                }
            }
        });
    }
}

CLIENT.on('message', async (msg) => {
    handleMessage(msg);
});

CLIENT.on('messageUpdate', async (oldmsg,newmsg) => {
    handleMessage(newmsg);
});

CLIENT.login(process.env.TOKEN).then(() => {
    console.log('Discord bot started');
});