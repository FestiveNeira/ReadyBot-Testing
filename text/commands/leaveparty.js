// This code written by Josiah Vanevenhoven (Festive Neiso)
module.exports = {
    name: 'leaveparty',
    alt: 'leave',
    secret: false,
    description: "Leaves an established game party",
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
            if (fs.existsSync(filename)) {
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
                //if the file exists and the user is in it, yeet them
                if (x) {
                    //create an array of users
                    var arr = data.split(" : ");
                    var strnewlist = "";
                    y = 0;
                    while (y < data.split(" : ").length) {
                        //if 'user' is equal to the user that send the message do not add them to the new list
                        if (data.split(" : ")[y].localeCompare(user) == 0) {
                        }
                        //if 'user' is not equal to the user that send the message add them to the new list
                        else {
                            strnewlist += " : " + data.split(" : ")[y];
                        }
                        y++;
                    }
                    // remove the " : " from the beginning of the list
                    strnewlist = strnewlist.substring(3);
                    //rewrite the file without the user
                    fs.writeFile(filename, JSON.stringify(strnewlist), e => {
                        if (e) throw e;
                    });
                    message.channel.send("I've removed you from '" + name + "'");
                    //if they were the only member of the party delete the party
                    if (fs.readFileSync(filename, 'utf8').localeCompare('""""')) {
                        fs.unlinkSync(filename);
                        message.channel.send("I can't believe you just ended that party");
                    }
                }
            }
            //what party?
            else if (!fs.existsSync(filename)) {
                message.channel.send("That party doesn't exist...");
            }
            //can't leave what you didn't join
            else {
                message.channel.send("You already aren't in '" + name + "'");
            }
        }
        else {
            message.channel.send("Try naming a party");
        }
    }
}