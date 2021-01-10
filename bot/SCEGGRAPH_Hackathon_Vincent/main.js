const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();
client.login(process.env.TOKEN);
const GroceryList = [];
const ChoresList = [];
const addedElements = [];
const removedElements = [];
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    if (receivedMessage.content.startsWith("!help")){
        processHelpCommand(receivedMessage)
    }
    else if (receivedMessage.content.startsWith("!list")) {
        processListChoresCommand(receivedMessage, 0)
    }
    else if (receivedMessage.content.startsWith("!chores")) {
        processListChoresCommand(receivedMessage, 1)
    }
})

function processHelpCommand(receivedMessage) {
    receivedMessage.channel.send(" \nThese are the available commands:\n- !list | Shopping list\n- !chores | Chores to do");
}

function processListChoresCommand(receivedMessage, lc) {
     while(removedElements.length > 0)
    removedElements.pop()
    while(addedElements.length > 0)
    addedElements.pop()

    choresAdd = 0;
    if (lc) { //If chores mode
        choresAdd = 2;
    }

    let fullCommand = receivedMessage.content.substr(6+choresAdd) // Remove the leading exclamation mark and list
      let addLimiter = receivedMessage.content.substr(10+choresAdd) // if addition
      let removeLimiter = receivedMessage.content.substr(13+choresAdd)
      let splitAddComma = addLimiter.split(", ") //used for 
      let splitRemoveComma = removeLimiter.split(", ")
      console.log("Commas remove->")
      console.log(splitRemoveComma)
      console.log("Commas add->")
      console.log(splitAddComma)
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    arguments = splitAddComma
    for(i = 0; i <splitRemoveComma.length; i++)
        removedElements[i] = splitRemoveComma[i]

    for(i = 0; i <splitAddComma.length; i++){
        if (!lc) {
            if(GroceryList.indexOf(splitAddComma[i])<0)
                addedElements.push(splitAddComma[i]);
            else
                receivedMessage.channel.send("Item: " + splitAddComma[i] + " is already in the cart.")
        }
        else {
            if(ChoresList.indexOf(splitAddComma[i])<0)
                addedElements.push(splitAddComma[i]);
            else
                receivedMessage.channel.send("Item: " + splitAddComma[i] + " is already a chore.")
        }
    }
    console.log(addedElements)
    console.log("Command received: " + primaryCommand)
        if(primaryCommand == "") {
            if(!lc) {
                receivedMessage.channel.send("List Commands:\n- !list show | Shows shopping list\n- !list add | Add things to buy. Example: !list add Boiled cereal, Toothpaste-flavored Lays, etc\n- !list remove | Removes an item in the shopping list\n- !list clear | Clears all items off the shopping list");
            }
            else {
                receivedMessage.channel.send("Chores Commands:\n- !chores show | Shows list of chores\n- !chores add | Add chores. Example: !chores add Trash, Dishes\n- !chores remove | Removes a particular chore\n- !chores clear | Clears all chores");
            }
        }
      else if (primaryCommand == "show") {
        showCommand(arguments, receivedMessage, lc)
    } else if (primaryCommand == "add") {
        addCommand(arguments, receivedMessage, lc)
    } else if (primaryCommand == "clear") {
        clearCommand(arguments, receivedMessage, lc)
    } else if (primaryCommand == "remove") {
        removeCommand(arguments, receivedMessage, lc)
    }
}

function addCommand(arguments, receivedMessage, lc){
    if(arguments.length > 0) {
        if (!lc) {
            if(addedElements.length>0)
            receivedMessage.channel.send(receivedMessage.author.toString() + " Added Items to cart: " + addedElements.join(", "))
            console.log("These are the arguments:" + addedElements.join(", "))
            addedElements.forEach(element => {
                GroceryList.push(element)
            });
            console.log(GroceryList.join(", ") + ' <---Grocery List after items added')
        }
        else {
            if(addedElements.length>0)
            receivedMessage.channel.send(receivedMessage.author.toString() + " Chores added: " + addedElements.join(", "))
            console.log("These are the arguments:" + addedElements.join(", "))
            addedElements.forEach(element => {
                ChoresList.push(element)
            });
            console.log(ChoresList.join(", ") + ' <---Chores List after items added')
        }
    }
    else{
        receivedMessage.channel.send("You forgot to add items into the List")
    }
}
function clearCommand(arguments, receivedMessage, lc){
    if (!lc) { //List mode, lc = 0
        while(GroceryList.length>0)
            GroceryList.pop()
    }
    else  {
        while(ChoresList.length>0)
            ChoresList.pop()
    }
    receivedMessage.channel.send("List Cleared")
}
function showCommand(arguments, receivedMessage, lc) {
    if (!lc) { //List mode
        receivedMessage.channel.send("Items in cart: " + GroceryList.join(", "))
        console.log(GroceryList + "<---")
    }
    else {
        receivedMessage.channel.send("Chore list: " + ChoresList.join(", "))
        console.log(ChoresList + "<---")
    }
}
function removeCommand(arguments, receivedMessage, lc){
    console.log(removedElements)
    receivedMessage.channel.send("Deleting: " + removedElements.join(", "))
    removedElements.forEach(element => {
        console.log("boutta delete: " + element)
        if (!lc) {
            removingIndex = GroceryList.indexOf(element)
            if(removingIndex <0)
                receivedMessage.channel.send("Could not find requested item, please try again")
                GroceryList.splice(removingIndex, removingIndex)
            if(removingIndex ==0)
                GroceryList.splice(0, 1)
                console.log(GroceryList)
        }
        else {
            removingIndex = ChoresList.indexOf(element)
            if(removingIndex <0)
                receivedMessage.channel.send("Could not find requested chore, please try again")
                ChoresList.splice(removingIndex, removingIndex)
            if(removingIndex ==0)
                ChoresList.splice(0, 1)
                console.log(ChoresList)
        }
    });
}

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('hi');
}
