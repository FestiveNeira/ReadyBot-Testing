// This code written by Josiah Vanevenhoven (Festive Neiso)
module.exports = {
    name: 'createparty',
    alt: 'create',
    secret: false,
    description: "Creates a game party",
    execute(message, args, bot) {
        if (args.length) {
            //create necessary variables
            const fs = require('fs');
            var user = message.author.username + ", " + message.author.id;
            //converts the arguments into a single 'name'
            name = '';
            while (args.length > 0) {
                name += " " + args.shift();
            }
            name = name.substring(1);
            //turns 'name' into a file directory
            filename = "./parties/" + name.toLowerCase() + ".json";
            //if the file does not exist create it and add the user
            if (!fs.existsSync(filename)) {
                fs.writeFile(filename, JSON.stringify(user), e => {
                    if (e) throw e;
                });
                message.channel.send("I've created a party called '" + name + "' for you!");
            }
            //if the file already exists and the user isn't in it, add them
            else {
                //checks if the user is in the file already
                var x = false;
                var data = fs.readFileSync(filename, 'utf8');
                data = data.substring(1, data.length - 1);
                y = 0;
                while (y < data.split(" : ").length) {
                    if (data.split(" : ")[y].localeCompare(user) == 0) {
                        x = true;
                    }
                    y++;
                }
                //if the user isn't in the file, add them
                if (!x) {
                    //add the user to the party
                    data = data + " : " + user;
                    fs.appendFile(filename, JSON.stringify(data), e => {
                        if (e) throw e;
                    });
                    message.channel.send("That party already exists, so I added you to it!");
                }
                //if the user is in the file tell them so
                else {
                    message.channel.send("That party already exists, and you're already in it");
                }
            }
        }
        else {
            message.channel.send("Try naming your party");
        }
    }
}