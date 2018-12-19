const express = require("express");
const webpush = require("web-push");
const app = express();
const mysql = require('mysql');
const publicVapidKey = "BK8kIV6METnkfaVdyZzH1zfTJDsgmsfFhut1_oMUaJCVSZKjMPDIyI1zEWSH512k8AzxylWccNZhIfcxxUw0s5s";
const privateVapidKey = "uHHDhtiLrXcl7exxBj5dHjyQO_5VwR2G69nLqasSo3M";

const connection = mysql.createConnection({
  host: '140.124.42.70',
  user: 'root',
  password: 'fuzzy314',
  database: 'yinghai',
  port: '7781'
});


connection.connect(function (err) {

  if (err) throw err;
  connection.query("SELECT * FROM endpoint", function (err, result, fields) {
    if (err) throw err;
    for (var a = 0; a < result.length; a++) {
      var Mysqlsubscribe = { "endpoint": result[a].endpoint, "expirationTime": null, "keys": { "p256dh": result[a].p256dh, "auth": result[a].auth } };
      //  bobo=JSON.parse(bobo); 
      sendPush(Mysqlsubscribe);
      console.log(a);
    }


  });
});


webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com', publicVapidKey, privateVapidKey
);

const port = 5000;

app.listen(port, () => { console.log(`Server started on port ${port}`); });

function sendPush(endpoint) {
  const payload = JSON.stringify({ title: "Push Test" });
  console.log(endpoint);
  webpush
    .sendNotification(endpoint, payload)
    .catch(err => console.error(err));
}