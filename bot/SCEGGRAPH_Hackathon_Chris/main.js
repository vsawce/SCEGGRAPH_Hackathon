const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();
client.login(process.env.TOKEN);
const GroceryList = [];
const ChorePeopleList = [];
const addedElements = [];
const removedElements = [];
const ChoreList = [["dishes","",0], ["trash","",0], ["vacuum","",0]]; //first slot name, second slot assigned person, third slot counter

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
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    arguments = splitAddComma

    for(i = 0; i <splitRemoveComma.length; i++)
        removedElements[i] = splitRemoveComma[i]
    if(primaryCommand =="add"){
        splitAddComma = splitAddComma.filter(function(entry) { return entry.trim() != ''; });
    }
    arguments = splitAddComma
    if(primaryCommand =="add"){
    for(i = 0; i <splitAddComma.length; i++){
        if (!lc) {
            if(GroceryList.indexOf(splitAddComma[i])<0)
                addedElements.push(splitAddComma[i]);
            else
                receivedMessage.channel.send("Item: " + splitAddComma[i] + " is already in the cart.")
        }
        else {
            if(ChorePeopleList.indexOf(splitAddComma[i])<0)
                addedElements.push(splitAddComma[i]);
            else
                receivedMessage.channel.send("Item: " + splitAddComma[i] + " is already a chore.")
        }
    }
    }

        if(primaryCommand == "") {
            if(!lc) {
                receivedMessage.channel.send("List Commands:\n- !list remind | Sends a reminder to whoever's shopping\n- !list show | Shows shopping list\n- !list add | Add things to buy. Example: !list add Boiled cereal, Toothpaste-flavored Lays, etc\n- !list remove | Removes an item in the shopping list\n- !list clear | Clears all items off the shopping list");
            }
            else {
                receivedMessage.channel.send("Chores Commands:\n- !chores rotate | Rotate the assignment, use this if done with chore. Random assignment if no one is assigned.\n- !chores remind | Sends a reminder to whoever's turn it is\n- !chores show | Shows list of people partaking in chores\n- !chores add | Add people to the chore assignee list. Example: !chores add Trash, Dishes\n- !chores remove | Removes a particular chore\n- !chores clear | Clears all chores\n- !chores webhook | Initializes webhook, in this channel, for the hardware to use");
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
    } else if (primaryCommand == "remind") {
        remindCommand(arguments, receivedMessage, lc)
    } else if (primaryCommand == "rotate" && lc) {
        rotateCommand(receivedMessage)
    } else if (primaryCommand == "webhook" && lc) {
        initWebhook(receivedMessage)
    }
}

function addCommand(arguments, receivedMessage, lc){
    if(arguments.length > 0) {
        //console.log(arguments.length);
        if (!lc) {
            if(addedElements.length>0) 
                //console.log(addedElements[0]);
                receivedMessage.channel.send(receivedMessage.author.toString() + " Added Items to cart: " + addedElements.join(", "))
                addedElements.forEach(element => {
                    GroceryList.push(element)
                });
            
        }
        else {
            if(addedElements.length>0) 
                receivedMessage.channel.send(receivedMessage.author.toString() + " People added for chores: " + addedElements.join(", "))
                addedElements.forEach(element => {
                    ChorePeopleList.push(element)
                });
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
        while(ChorePeopleList.length>0)
            ChorePeopleList.pop()
    }
    receivedMessage.channel.send("List Cleared")
}
function showCommand(arguments, receivedMessage, lc) {
    if (!lc) { //List mode
        receivedMessage.channel.send("Items in cart: " + GroceryList.join(", "))
        console.log(GroceryList + "<---")
    }
    else {
        receivedMessage.channel.send("Chore list of people: " + ChorePeopleList.join(", "))
        console.log(ChorePeopleList + "<---")
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
            removingIndex = ChorePeopleList.indexOf(element)
            if(removingIndex <0)
                receivedMessage.channel.send("Could not find requested chore, please try again")
                ChorePeopleList.splice(removingIndex, removingIndex)
            if(removingIndex ==0)
                ChorePeopleList.splice(0, 1)
                console.log(ChorePeopleList)
        }
    });
}

function remindCommand(arguments, receivedMessage, lc) {
    if (!lc) {
        receivedMessage.channel.send("Don't forget the groceries!")
    }
    else {
        found = false;
        for (i = 0; i < ChoreList.length; i++) {
            if (receivedMessage.content.substr(15) == ChoreList[i][0]) { //If what user enters is found
                if(ChoreList[i][1] == "" || ChoreList[i][1] == undefined) { //Uninitialized list
                    receivedMessage.channel.send("No one is in charge of " + ChoreList[i][0] + " yet. Rotate using !chores rotate <chore>");
                }
                else {
                    receivedMessage.channel.send(ChoreList[i][1] + " is in charge of " + ChoreList[i][0]);
                }
                found = true;
            }
        }
        if (!found) {
            receivedMessage.channel.send("Unknown chore.");
        }
    }
}

function rotateCommand(receivedMessage) {
    receivedMessage.channel.send("Rotating list...")
    found = false;
    for (i = 0; i < ChoreList.length; i++) {
        console.log(ChoreList[i][0]);
        if (receivedMessage.content.substr(15) == ChoreList[i][0]) { 
            console.log(i);
            if(ChoreList[i][1] == "" || ChoreList[i][1] == undefined) { //Uninitialized list
                ChoreList[i][2] = Math.floor(Math.random()*ChorePeopleList.length); //Reset counter index
                ChoreList[i][1] = ChorePeopleList[ChoreList[i][2]]; //Initialize to first person
                if (ChoreList[i][1] == undefined)
                    receivedMessage.channel.send("There's no one in the chore assignee list!");
                else
                    receivedMessage.channel.send(ChoreList[i][1] + " is now in charge of " + ChoreList[i][0]);
            }
            else {
                if (ChorePeopleList.length-1 > ChoreList[i][2])
                    ChoreList[i][2]++; //Increment rotation counter index
                else
                    ChoreList[i][2] = 0; //Reset counter index

                ChoreList[i][1] = ChorePeopleList[ChoreList[i][2]];
                receivedMessage.channel.send(ChoreList[i][1] + " is now in charge of " + ChoreList[i][0]);
            }
            found = true;
        }
    }
    console.log(found);
    if (!found) {
        receivedMessage.channel.send("Unknown chore.");
    }
}

function initWebhook(receivedMessage) {

    receivedMessage.channel.fetchWebhooks()
        .then(webhook => {
            
            let foundHook = webhook.find(name => 'ESP8266 Communicate');

            if (foundHook) {
                receivedMessage.channel.send("Webhook in channel #" + receivedMessage.channel.name + " already exists!");
            }
            else {
                receivedMessage.channel.send("Webhook in channel #" + receivedMessage.channel.name + " created.");
                receivedMessage.channel.createWebhook('ESP8266 Communicate', {
                    avatar: 'https://its.unl.edu/images/services/icons/Wi-Fi_icon-01.png',
                    reason: 'This webhook is important for ESP8266 WiFi communication.'
                })
                    .then(webhook => console.log(`Created webhook ${webhook.name}`))
                    .catch(console.error);
                myHook = new Discord.WebhookClient(webhook.id, webhook.token)
            }
        })
    
}

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('hi');
}