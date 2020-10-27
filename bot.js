const express = require('express');
const app = express();
const http = require('http');
    app.get("/",(request, response) => {
      console.log(`pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`);
      response.sendStatus(200);
    });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const db = require('quick.db')
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}; 
/////60gx-d30c

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  };

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});



client.login(ayarlar.token);



//////////////////////////Hata Alırsanız Discorddan Bildirebilirsiniz//////////////
//--KOMUTLAR--\\

////////////////////İsterseniz Aşağıdaki Komutu Silebilirsiniz///////////////////////

client.on('message', async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin** ");
  }
});

////////////////////İsterseniz Yukarıdaki Komutu Silebilirsiniz///////////////////////

/////OTOİSİM
client.on('guildMemberAdd', member => {
 member.setNickname('★ İsim ')////YENI GELENLERE VERILCEK ISIM
})




///HG MESAJI 
client.on('guildMemberAdd', member => {
 member.send(`**<a:767828437423226931:768074735627272194> Sunucumuza hoşgeldin <a:767484053963669514:768889314066432031>**`);
  
}); 


//--------------------------------Hg Kanalı---------------------------------\\
client.on("guildMemberAdd", member => {  
  const kanal = "765533933491453982";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = ' **<a:700673727138103346:768133387223040062>__Bu Hesap Güvenilir Değil__<a:700673727138103346:768133387223040062>** '
if (kurulus > 1296000000) kontrol = ' **<a:767472917377712189:768889230834270219>__Bu Hesap Güvenilir Gözüküyor__<a:767472917377712189:768889230834270219>** '
  moment.locale("tr");
  let kobs = client.channels.get(kanal);
kobs.send("<a:767828429889994773:768889167366062130>**Hoşgeldin! " + member + " Seninle __\`" + member.guild.memberCount + "\`__ Kişiyiz <a:767828429889994773:768889167366062130> \n\n <a:751938658394701944:768884768497467405> Sunucuya Kayıt Olmak İçin <#765533933491453982> İsim  Yazınız ! <a:751938658394701944:768884768497467405> \n\n  <@&765522336417447966> Rolündeki yetkililer sizinle ilgilenicektir  \n\n  Hesabın Oluşturulma Tarihi: <a:767828448256589834:768074773191327754>** " + moment(member.user.createdAt).format("YYYY **__DD MMMM dddd (hh:mm:ss)__**") +  "  \n\n"  + kontrol + " \n\n"  
  );
});


//Şüpheli Hesap Belirleme

client.on("guildMemberAdd", async (member) => {
      let gkisi = client.users.get(member.id);
      const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   

    if (ktarih < 1296000000) {
    member.addRole("765532827542355980") //yasaklı
    
    }else{
    
    member.addRole("765519847274577932") //kaytısz
    
      }
});
//////////TagAlanaRolVerme


//ÖZELKDOLAMALAR

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "' Nᴀʀᴋᴏᴛɪᴋ"; //tagınız
    let sunucu = "765518646838689802"; //sunucu ID
    let kanal = "767740922946912276" //log kanal id
    let rol = "765520027121614850"; // rol ID
    let yasaklı = "765532827542355980"; // YASAKLI
    let kız = "765519802613235743"; // KIZ
    let erkek = "765519751228686357"; // ERKEK
    
  
    if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
      
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    }

  }
})








//ArkadaşlarÜsttekiKanalİDYazan Yer Boş Kalırsa Botunuz Çalışmaz Ve Error Verir Eğerki Doldurmak İstemezsiniz Komutu Silebilirsiniz