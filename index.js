const mc = require("minecraft-protocol");
const crypto = require("crypto");

// Requires you to be connected to the VPN
console.log("Connecting to server");

var client = mc.createClient({
  host: "10.10.2.127",
  port: 25565,
  username: "user_" + crypto.randomBytes(4).toString("hex"),
  auth: "mojang",
});

client.on("connect", () => {
  console.log("Connected to server");
});

client.on("end", () => {
  console.log("Disconnected from server");
});

client.on("chat", function (packet) {
  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);
  //console.log(jsonMsg);
  if (jsonMsg.translate == "chat.type.announcement" || jsonMsg.translate == "chat.type.text") {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1].text;
    console.log(`[${username}]: ${msg}`);
  }
});

process.stdin.on("data", (data) => {
  client.write("chat", { message: data.toString() });
});
