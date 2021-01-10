const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();
client.login(process.env.TOKEN);
const GroceryList = [];
const addedElements = [];
const removedElements = [];
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    if (receivedMessage.content.startsWith("!list")){
        processListCommand(receivedMessage)
    }
})
function processListCommand(receivedMessage) {
     while(removedElements.length > 0)
    removedElements.pop()
    while(addedElements.length > 0)
    addedElements.pop()
    let fullCommand = receivedMessage.content.substr(6) // Remove the leading exclamation mark and list
      let addLimiter = receivedMessage.content.substr(10) // if addition
      let removeLimiter = receivedMessage.content.substr(13)
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
    if(GroceryList.indexOf(splitAddComma[i])<0)
    addedElements.push(splitAddComma[i]);
    else
    receivedMessage.channel.send("Item: " + splitAddComma[i] + " is already in the cart.")
    }
    console.log(addedElements)
    console.log("Command received: " + primaryCommand)
        if(primaryCommand == "") {
        receivedMessage.channel.send("List Commands: !list add, !list show, !list clear, !list remove")
        }
      else if (primaryCommand == "show") {
        listCommand(arguments, receivedMessage)
    } else if (primaryCommand == "add") {
        listAddCommand(arguments, receivedMessage)
    } else if (primaryCommand == "clear") {
        listClearCommand(arguments, receivedMessage)
    } else if (primaryCommand == "remove") {
        listRemoveCommand(arguments, receivedMessage)
    }
}

function listAddCommand(arguments, receivedMessage){
    if(arguments.length > 0) {
        if(addedElements.length>0)
        receivedMessage.channel.send(receivedMessage.author.toString() + " Added Items to cart: " + addedElements.join(", "))
        console.log("These are the arguments:" + addedElements.join(", "))
        addedElements.forEach(element => {
            GroceryList.push(element)
        });
        console.log(GroceryList.join(", ") + ' <---Grocery List after items added')
    }
    else{
        receivedMessage.channel.send("You forgot to add items into the List")
    }
}
function listClearCommand(arguments, receivedMessage){
    while(GroceryList.length>0)
    GroceryList.pop()
   receivedMessage.channel.send("List Cleared")
}
function listCommand(arguments, receivedMessage) {
        receivedMessage.channel.send("Items in cart: " + GroceryList.join(", "))
        console.log(GroceryList + "<---")
}
function listRemoveCommand(arguments, receivedMessage){
    console.log(removedElements)
                receivedMessage.channel.send("Deleting: " + removedElements.join(", "))
        removedElements.forEach(element => {
            console.log("boutta delete: " + element)
            removingIndex = GroceryList.indexOf(element)
            if(removingIndex <0)
            receivedMessage.channel.send("Could not find requested item, please try again")
            GroceryList.splice(removingIndex, removingIndex)
            if(removingIndex ==0)
            GroceryList.splice(0, 1)
            console.log(GroceryList)
        });
}

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('hi');
}
