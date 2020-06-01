const Discord = require('discord.js');
const bot = new Discord.Client();
const api = require('openweather-apis');

api.setLang('en');
api.setAPPID('b0b4cb7af9dc9d779c139543b19c6ca2');


bot.login(process.env.token);

const prefix = '!';

bot.on('ready', () => {
    console.log('Bot is online!');
});

bot.on('message', async msg=>{
    let args = msg.content.substring(prefix.length).split(' ');
    switch(args[0]){
        case 'city':
            //you can type the city with lowercase letters
            await api.setCity(args[1]);
            let weatherData = await api.getAllWeather(function(err, JSONObj){
                let weatherEmbed = new Discord.MessageEmbed();
                weatherEmbed.setTitle('Weather in ' + args[1]);
                weatherEmbed.setColor('#0099f');
                weatherEmbed.setThumbnail('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fwineass%2Fios7-redesign%2F512%2FWeather-icon.png&f=1&nofb=1');
                weatherEmbed.addField('**Temperature in F°**', JSONObj.main.temp*1.8+32+'°');
                weatherEmbed.addField('**High**', JSONObj.main.temp_max*1.8+32+'°', true);
                weatherEmbed.addField('**Low**', JSONObj.main.temp_min*1.8+32+'°', true);
                weatherEmbed.addField('**Description**', JSONObj.weather[0].description);
                weatherEmbed.addField('**Pressure**', JSONObj.main.pressure+' inHg ', true);
                weatherEmbed.addField('**Humidity**', JSONObj.main.humidity+'%',true);
                weatherEmbed.addField('**Wind Speed**', JSONObj.wind.speed+' mph ', true);
                weatherEmbed.addField('**Visibility**', JSONObj.visibility+' mi ');
                msg.channel.send(weatherEmbed);
            })
    }
})