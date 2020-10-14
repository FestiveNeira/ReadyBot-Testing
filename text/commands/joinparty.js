// This code written by Josiah Vanevenhoven (Festive Neiso)
module.exports = {
    name: 'joinparty',
    alt: 'join',
    secret: false,
    description: "Joins an established game party",
    execute(message, args, bot) {

        if (args.length) {
            //create ncessary variables
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
            //check the file to see if the user that sent the message is in it
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
            //if the file exists and the user is not in it, add them
            if (fs.existsSync(filename) && !x) {
                //add the user to the party
                data = data + " : " + user;
                fs.writeFile(filename, JSON.stringify(data), e => {
                    if (e) throw e;
                });
                message.channel.send("I've added you to '" + name + "'");
            }
            //if the user is already in the party tell them to fuck off
            else if (x) {
                message.channel.send("You have already joined '" + name + "'");
            }
            //what party?
            else {
                message.channel.send("That party doesn't exist...");
            }
        }
        else {
            message.channel.send("Try naming your party");
        }
    }
}