var Discord = require("discord.js");
var mysql = require("mysql");
var AuthDetails = require("./auth.json");
var bot = new Discord.Client();

var connection = mysql.createConnection({
  host: "185.38.149.155",
  user: "xercesph_root",
  password: "MrT0}Y9.!y2xV/p",
  database: "xercesph_discord"
});
connection.connect();

bot.on("ready", function() {
  console.log("Xerces online on " + bot.servers.length + " server(s)");
  bot.setPlayingGame("xerces.phy.sx");﻿
});

bot.on("serverCreated", function(server) {
  console.log("Inserting server " + server.name + " into database");
  var info = {
    "servername": "'" + server.name + "'",
    "serverid": server.id,
    "ownerid": server.owner.id,
    "prefix": "&"
  }

  connection.query("INSERT INTO servers SET ?", info, function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server Inserted");
  })
})

bot.on("serverDeleted", function(server) {
  console.log("Deleting server entry " + server.name + " from database");
  connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function*(error) {
    if(error) {
      console.log(error);
      return;
    }
    console.log("Server Successfully Removed");
  })
})


bot.loginWithToken(AuthDetails.token);
