// This code written by Josiah Vanevenhoven (Festive Neiso)
module.exports = {
    name: 'removeparty',
    alt: 'remove',
    secret: false,
    description: "OBLITERATES an established game party",
    execute(message, args, bot) {
        const fs = require('fs');
        if (args.length) {
            //converts the arguments into a single 'name'
            name = '';
            while (args.length > 0) {
                name += " " + args.shift();
            }
            name = name.substring(1);
            //turns 'name' into a file directory
            filename = "./parties/" + name.toLowerCase() + ".json";
            //determines if the file exists/should be deleted
            if ((message.member.hasPermission('MANAGE_ROLES')) && (fs.existsSync(filename))) {
                fs.unlinkSync(filename);
                message.channel.send("That party got rekt m8");
            }
            else if (!message.member.hasPermission('MANAGE_ROLES')) {
                message.channel.send("Get better perms nerd");
            }
            else {
                message.channel.send("That party doesn't exist");
            }
        }
    }
}