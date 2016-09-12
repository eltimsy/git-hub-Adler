var request = require('request');
var downloadImage = require("./downloadImage-module.js")
require('dotenv').config()

module.exports = function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    },
    qs: {
      'access_token': process.env.USERTOKEN
    }
  }

   request(options, function(err, response, body) {
     var avatar = [];
     data = JSON.parse(body);
     if (err) {
       throw err;
     } else {
       for(var i = 0; i < data.length; i++) {
         downloadImage (data[i].avatar_url, 'avatars', data[i].login);
         avatar.push(data[i].avatar_url);
       }
       cb(err, avatar);
     }
   })
}