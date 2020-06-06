const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');

bot.login(process.env.token);

const prefix = '!';

bot.on('ready', () => {
    console.log('Bot is online!');
    bot.user.setActivity('The Weather', {type: 'WATCHING'});
});

bot.on('message', async msg=>{
    let args = msg.content.substring(prefix.length).split(' ');
    switch(args[0]){
        case 'help':
            msg.channel.send('Type "!weather" along with the location to get the weather and the forecast (you can type the location in lowercase)'+'\n'+'Example: !weather Polva');
            
        case 'weather':
            await weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result){
                if(err) console.log(err);
                //console.log(result);
                //let JSONweather = JSON.stringify(result, null, 2);
                let aWeatherEmbed = new Discord.MessageEmbed()
                .setTitle('Weather in '+result[0].location.name)
                .setThumbnail('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fwineass%2Fios7-redesign%2F512%2FWeather-icon.png&f=1&nofb=1')
                .setFooter('MSN Weather', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F31z8fsGe1IL.png&f=1&nofb=1')
                .addField('**Day:**', result[0].current.shortday+' '+result[0].current.date)
                .addField('**Temperature in F°**', result[0].current.temperature+'°')
                .addField('**Description**', result[0].current.skytext)
                .addField('**Humidity**', result[0].current.humidity+'%')
                .addField('**Wind**', result[0].current.winddisplay)
                .addField('**Forecast for** '+result[0].forecast[0].shortday+ ' ' + result[0].forecast[0].date, 
                
                'High: '+ result[0].forecast[0].high+'°'+ '\n'+
                'Low: ' + result[0].forecast[0].low+'°'+ '\n'+
                'Description: '+ result[0].forecast[0].skytextday+'\n'+
                'Precipitation: '+result[0].forecast[0].precip/100+' in.',true
                )
                .addField('**Forecast for** '+result[0].forecast[1].shortday + ' ' + result[0].forecast[1].date, 
                
                'High: '+ result[0].forecast[1].high+'°'+ '\n'+
                'Low: ' + result[0].forecast[1].low+'°'+ '\n'+
                'Description: '+ result[0].forecast[1].skytextday+'\n'+
                'Precipitation: '+result[0].forecast[1].precip/100+' in.',true

                
                )
                .addField('**Forecast for** '+result[0].forecast[2].shortday + ' ' + result[0].forecast[2].date, 
                
                'High: '+ result[0].forecast[2].high+'°'+ '\n'+
                'Low: ' + result[0].forecast[2].low+'°'+ ' \n'+
                'Description: '+ result[0].forecast[2].skytextday+'\n'+
                'Precipitation: '+result[0].forecast[2].precip/100+' in.',true

                
                )
                .addField('**Forecast for** '+result[0].forecast[3].shortday + ' ' + result[0].forecast[3].date, 
                
                'High: '+ result[0].forecast[3].high+'°'+ '\n'+
                'Low: ' + result[0].forecast[3].low+'°'+ '\n'+
                'Description: '+ result[0].forecast[3].skytextday+'\n'+
                'Precipitation: '+result[0].forecast[3].precip/100+' in.',true

                
                )
                .addField('**Forecast for** '+result[0].forecast[4].shortday + ' ' + result[0].forecast[4].date, 
                
                'High: '+ result[0].forecast[4].high+'°'+ '\n'+
                'Low: ' + result[0].forecast[4].low+'°'+ '\n'+
                'Description: '+ result[0].forecast[4].skytextday+'\n'+
                'Precipitation: '+result[0].forecast[4].precip/100+' in.',true

                
                );
                msg.channel.send(aWeatherEmbed);
                
            });
    }
})