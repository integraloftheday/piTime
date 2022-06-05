var pinumber;
var displayFormat; 
//Initalizing Localy Stored Variables
if(localStorage.TimeTextSize==undefined){
    localStorage.TimeTextSize=18;
}
if(localStorage.AroundTextSize==undefined){
    localStorage.AroundTextSize=16;
}
if(localStorage.baseT==undefined){
    localStorage.baseT=10;
}
if(localStorage.twelveHour==undefined){
    localStorage.twelveHour=true;
}
if(localStorage.pride==undefined){
    localStorage.pride = false;
}
//Gloabl Variables
//var twelveHour=true;
var size=620;
var pridePath = "./assets/Gay_Pride_Flag.svg";
//var baseT=10;

//Get Pi Data
/**
 *
 * @param {Int16Array} baseT Base of Pinumber Fetched
 */

 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

function dataget(baseT){
    const fileUrl='./BaseConvertion/PI'+baseT+'.txt';
    fetch(fileUrl)
        .then(r => r.text())
        .then(t =>pinumber=t)
}
//getPi value
dataget(localStorage.baseT);
setTimeout(null, 1000);

/**
 *
 * @param {Int16Array} number Calls dataget(); and gets Pi and updates innerHTML
 */
function chooseBase(number){
    localStorage.baseT=number;
    dataget(localStorage.baseT);
    innerHTML();
}

/**
 *
 * @param {string} x x=String to search through y=String to search for. Returns first location of y as indexed in x.
 * @param {String} y
 */
function find(x,y){
    for(i=0;i<x.length;i++){
        if(x.slice(i,i+y.length)==y){
            return(i);
        }
    }
    return(false);
    }

/**
 *
 * @param {string} x x=String to search through y=String to search for. Returns all locations of y as indexed in x.
 * @param {string} y
 */
function findc(x,y){
    var locs=[];
    for(i=0;i<x.length;i++){
        if(x.slice(i,i+y.length)==y){
            locs.push(i)
        }
    }
    return(locs);
    }
/**
 *
 * @param {string} x Finds the shortest distance between two strings (y1, y2) in the main string x
 * @param {string} y1
 * @param {string} y2
 */
function shortestdist(x,y1,y2){
    var y1L=findc(x,y1);
    var y2L=findc(x,y2);
    var shortest = 100000000000;
    var pairS;
    for(i1=0;i1<y1L.length;i1++){
        for(i2=0;i2<y2L.length;i2++){
            if(Math.abs(y1L[i1]-y2L[i2])<shortest){
                pairS=[y1L[i1],y2L[i2]];
            }
        }
    }
    return(pairS)
}

function dateFour(){
    var d = new Date();
    var hours=d.getHours();
    if(!eval(localStorage.twelveHour)){
        if(hours>12){
            hours=hours-12;
        }
        if(hours==0){
            hours=12;
        }
    }
    var mins=(d.getMinutes());
    mins=mins.toString(localStorage.baseT);
    if(mins.length==1){
        mins='0'+mins;
    }
    //console.log(hours.toString(localStorage.baseT)+mins);
    return((hours.toString(localStorage.baseT)).toUpperCase()+mins.toUpperCase());
}

function before(location,string1,length){
    if(length>location){
        return(string1.slice(0,location));
    }
    else{
        return(string1.slice(location-length,location));
    }

}
function content(location,string,length){
    return(string.slice(location,location+length));
}

function after(location,string1,length,contentlength){
    if(string1.length<length+location+contentlength){
        return(string1.slice(location+contentlength,string.length-1));
    }
    else{
        return(string1.slice(location+contentlength,location+contentlength+length));
    }
}

function piTime(string1,lengtharound){
    var time=dateFour();
    if(time == "314"){
        time="3.14";
    }
    var position=find(string1,String(time));
    var before1= before(position,string1,lengtharound);
    var content1=content(position,string1,time.length);
    var after1=after(position,string1,lengtharound,time.length);
    if (time=="3.14"){
        position=1;
    }
    return([position,before1,content1,after1])
}
function ordinal_suffix_of(i) { //taken from stackoverflow
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function positveOrNegative(){
    if(Math.random() > .5){
        return(-1)
    }
    else{
        return(1)
    }
}
function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }


  //SETTINGS FUNCTIONS
  function increaseTextSizeTime(){
      localStorage.TimeTextSize=eval(localStorage.TimeTextSize)+1;
      innerHTML();
  }
  function decreaseTextSizeTime(){
      localStorage.TimeTextSize=eval(localStorage.TimeTextSize)-1;
      innerHTML();
  }
  function increaseTextSizeAround(){
    localStorage.AroundTextSize=eval(localStorage.AroundTextSize)+1;
    innerHTML();
}
function decreaseTextSizeAround(){
    localStorage.AroundTextSize=eval(localStorage.AroundTextSize)-1;
    innerHTML();
}

function TimeFormatToggle(){
    localStorage.twelveHour=!eval(localStorage.twelveHour);
    DisplayTimeFormat();
}

function DisplayTimeFormat(){
    if(eval(localStorage.twelveHour)){
        //localStorage.twelveHour=false;
        displayFormat="TwentyFour Hour";
    }
    else{
       // localStorage.twelveHour=true;
        displayFormat="Twelve Hour";
    }

    innerHTML();

}
function prideToggle(){
    localStorage.pride = !eval(localStorage.pride);
    innerHTML();
}

function reset(){
    localStorage.AroundTextSize=16;
    localStorage.TimeTextSize=18;
    localStorage.baseT=10;
    localStorage.twelveHour=true;
    innerHTML();
}




time=dateFour();
DisplayTimeFormat();

function innerHTML(){
    if(time!=dateFour()){
    size=600+positveOrNegative()*(Math.random()*10);
    time=dateFour();
    }
    if(eval(localStorage.pride)){
        document.body.style.backgroundImage = "url("+pridePath+")";
    }
    else{
        document.body.style.backgroundImage = "url()";
    }

    var numbers= piTime(pinumber,size);
    document.getElementById("position").innerHTML= "The time starts at the "+String(ordinal_suffix_of((numbers[0])))+" digit of pi";
    document.getElementById("display").innerHTML="<p style='font-size:16px; color:black; font-weight:bold; font-style:italic;'> <a style='font-size:"+String(localStorage.AroundTextSize)+"px;'>"+numbers[1]+"</a><a style='font-size:"+String(localStorage.TimeTextSize)+"px; color: #ff0000' >"+numbers[2]+"</a><a style='font-size:"+String(localStorage.AroundTextSize)+"px;'>"+numbers[3]+"</a></p>";

    document.getElementById("TimeSize").innerHTML="Time Size "+localStorage.TimeTextSize+"px";
    document.getElementById("AroundSize").innerHTML="Other Text Size "+localStorage.AroundTextSize+"px";
    document.getElementById("Base").innerHTML="Base: "+localStorage.baseT;
    document.getElementById("twentyfour").innerHTML= "Time Format: "+displayFormat;
}


function repeating(){
    setInterval(function() {
        innerHTML();
      }, 1000);
}
/*setInterval(function() {
    console.log("its Repeating");
    innerHTML();
  }, 1000);*/
/*
function alltime(baseT){
    var time;
    for(var i=0;i<13;i++){
        for(var m=0;m<61;m++){
            if(m.length<1){
                m="0"+m.toString(baseT);
            }
            time=i.toString(baseT)+m.toString(baseT);
            var lengthPi = findc(pinumber,time).length;
            if(lengthPi == 0) {
                console.log(i + ":" + m);
            }

        }
    }
}*/
