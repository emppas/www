function openModal() {
	document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.body.style.overflow = "hidden";
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    document.getElementById('ccv').style.display="block";
}
function closeM() {
    document.body.style.overflow = "hidden";
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}
function ccv(){
    document.getElementById('ccv').style.display="";
    //document.getElementById('ccv').innerHTML="";
}
var current_page = 1;
var records_per_page = 10;
var objJson = [];
//Check network and alert
//Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;
// Store the current network status
var isConnected = false;
//global login variable
var isLoggedIn = false;
function init() {
    // Add an event listener for deviceready
    document.addEventListener("deviceready",
        onDeviceReady, false);
	news();
}
function onDeviceReady() {
    // set to true
    isPhoneGapReady = true;
    // detect for network access
    networkDetection();
    // attach events for online and offline detection
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    window.location="index.html";
}
function networkDetection() {
    if (isPhoneGapReady) {
        // as long as the connection type is not none,
        // the device should have Internet access
        if (navigator.network.connection.type != Connection.NONE) {
            isConnected = true;
        }
    }
}
function onOnline() {
    isConnected = true;
}
function onOffline() {
    isConnected = false;
}
// Set an onload handler to call the init function
window.onload = init();
function news(){
	//if(isPhoneGapReady && isConnected){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				document.getElementById('news').innerHTML=xmlhttp.responseText;
			}
		}
		xmlhttp.open("POST","http://www.nbaph.org.ng/app/news.php",true);
		xmlhttp.send();
	//}
}
function search(){
    var q = document.getElementById('nna').value;
    if(q !=""){
    
	if(isPhoneGapReady && isConnected){
        //document.getElementById('loader').style.display="block";
	   
            openModal();
		      var xmlhttp = new XMLHttpRequest();
		      xmlhttp.onreadystatechange=function() {
			     if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    var content = xmlhttp.responseText;
                    objJson= content.split('$');
                    //document.getElementById('nna').value="";
                    closeModal();
                     changePage(1);				
			     }
		      }
		xmlhttp.open("POST","http://www.nbaph.org.ng/app/search.php?q="+q,true);
		xmlhttp.send();
	   } else{
		alert('Mobile data is off!');
	} 
	 }
    else{ alert("Form cannot be empty");}
    
}


function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        listing_table.innerHTML += objJson[i] + "<br/>";
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}


function Ms(){
    var m = document.getElementById('marine').value;
    if (m !==""){
	   if(isPhoneGapReady && isConnected){
            openModal();
            //document.getElementById('loader').style.display="block";
		      var xmlhttp = new XMLHttpRequest();
		      xmlhttp.onreadystatechange=function() {
			     if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    document.getElementById('disco').innerHTML= xmlhttp.responseText;
             	    closeM();	
			     }
		      }
		xmlhttp.open("POST","http://www.nbaph.org.ng/app/fstatus.php?m="+m,true);
		xmlhttp.send();
	   }
	
	   else{
		alert('Mobile data is off!');
	   }
    }
    else {
        alert("Form cannot be empty");
    }
}


function handleClick() {
	
}
// override the built in JavaScript alert function
function alert(msg, callback, title, button) {
    navigator.notification.alert(msg, callback, title, button);
}
function confirm(msg, callback, title, buttons) {
    navigator.notification.confirm(msg, callback,
     title, buttons);
}

function ndisplay(){
    openModal();
	if(isPhoneGapReady && isConnected){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                document.getElementById('listingTable').innerHTML= xmlhttp.responseText;
             	closeModal();
			}
		}
		xmlhttp.open("POST","http://www.nbaph.org.ng/app/allnews.php",true);
		xmlhttp.send();
	}
	
	else{
		alert('Mobile data is off! content Cannot display without it');
	}
}