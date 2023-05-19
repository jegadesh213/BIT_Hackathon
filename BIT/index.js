var lb1 = true;
var lb2 = true;
var fan = false;
var fan2 = false;
const ip="http://192.168.137.1:81";
const url = ip+"/api/test";
const data_url = ip+"/api/data";
const update_frequency = 0.5;
var loaded_offline = false;
var loaded_dead = false;
var is_client_alive = false;
var isOnline = true;

var sync_switch = async () => {
    try{
      var datum = await fetch(data_url);
      var datums = await datum.json();
        lb1=datums["on0"];
        lb2 = datums["on1"];
        fan = datums["on2"];
        fan2 = datums["on3"];
        console.log(lb1,lb2,fan,fan2);
    }
    catch(err){
     console.log("Errrrrrrr in Fetching On Data(Check API)");
    }
  }
  
  var checkOnlineStatus = async () => {
      try{
          const online = await fetch(url);
          return online.status >= 200 && online.status < 300 ;
      }catch(err){
          return false;       
      }
  }
  
  setInterval(async () =>{
      isOnline = await checkOnlineStatus();
      console.log(isOnline);
      sync_switch();
      /*if(!isOnline){
          if(!loaded_offline){
            load_offline();
          }
          loaded_offline=true;
      }
      else{
          if(loaded_offline){
              reload();
              loaded_offline=false;
              window.top.location.reload(true);
          }
      }*/
  }, update_frequency*1000);
  function reload_alive() {
    var btns = document.getElementsByTagName("button");
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].className.search("anti-gravity") != -1) continue;
      //btns[i].style.display="block";
      btns[i].className = btns[i].className.replace(" box2d", "");
      btns[i].disabled = false;
    }
    document.getElementById("dead-gif").style.display = "none";
    init();
    //window.location.reload();
  }

function light(value) {
    var pic;
    if (lb1) {
        pic = "./Image/OFF.png";
        fetch(ip+"/api/flip/on0/false")
        lb1 = false;
    } else {
        fetch(ip+"/api/flip/on0/true")
        pic = "./Image/ON.png";
        lb1 = true;
    }
    document.getElementById('bulb').src = pic;
}

function light2(value) {
    var pic;
    if (lb2) {
        fetch(ip+"/api/flip/on1/false")
        pic = "./Image/OFF.png";
        lb2 = false;
    } else {
        pic = "./Image/ON.png";
        fetch(ip+"/api/flip/on2/true")
        lb2 = true;
    }
    document.getElementById('bulb2').src = pic;
}

// fan
let ceiling_fan = document.querySelector('.ceiling-container');

function rot_fan() {
    if (fan) {
        //off
        ceiling_fan.style.animation = 'spinw'
        console.log("Fan is changed to off")
        fan = false
    } else {
        //on
        ceiling_fan.style.animation = 'spin 550ms linear infinite'
        console.log("Fan is changed to on")
        fan = true
    }
}
let ceiling_fan2 = document.querySelector('.ceiling-container2');

function rot_fan2() {
    if (fan2) {
        //off
        ceiling_fan2.style.animation = 'spinw'
        console.log("Fan is changed to off")
        fan2 = false
    } else {
        //on
        ceiling_fan2.style.animation = 'spin 550ms linear infinite'
        console.log("Fan is changed to on")
        fan2 = true
    }
}










