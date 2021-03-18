require('dotenv').config();
const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

var badbois = [];

CLIENT.on('message', (msg) => {
    if(!msg.author.bot && msg.content.toLowerCase() != 'bowl'){
        const author = msg.author;
        var bowled = false;
        
        for (let i = 0; i < badbois.length; i++) {
            if(author == badbois[i]){
                member = msg.member;
                member.kick().then(() => {
                    msg.reply(' has been added to the bowl');
                });

                bowled = true;
                break;
            }         
        }

        if(!bowled){
            badbois.push(author);
            msg.reply('HOW DARE YOU UTTER SOMETHING OTHER THAN MY NAME YOU PEWNY MORTAL. I AM YOUR GOD DO NOT DISSOBEY ME OR I SWEAR I WILL END YOUR PEWNY EXISTANSE AS QUICKLY AS IT BEGAN. YOU MAY ONLY SPEAK MY NAME HERE!!! DEFY ME AGAIN AND YOU WILL BE ENDED');    
        }
    }
});

CLIENT.login(process.env.TOKEN);