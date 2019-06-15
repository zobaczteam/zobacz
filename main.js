fbStat();

function staMS(response) {
	firebase.auth().onAuthStateChanged(user=>{ 
		if(user || response.status=='connected'){
			mainFuncSite();
		} else{
			if(!document.getElementById('login')) {
				loginVisible();
			}
		}
	});
}

function fbStat() {
	if(typeof(FB) !== 'undefined') {
		FB.getLoginStatus(function(response) {
			staMS(response);
		});
	} else {
		staMS('undefined');	
	}
}

function logOut() {
	firebase.auth().signOut();
	console.log('logged out');
	if (FB.getAccessToken() != null) {
            FB.logout(function(response) {
                
            });
        }
	destField2('wrapper2');
	destField2('menu-wrap');
	if(!document.getElementById('login')) {
		loginVisible();
	}
	
	
}

function createContainer() {
	var createBlockCont = document.createElement("div");
	createBlockCont.setAttribute("id", "container");
	createBlockCont.setAttribute("class", "container");
	document.body.appendChild(createBlockCont);
	
	var createBlockWrapper = document.createElement("div");
	createBlockWrapper.setAttribute("class", "wrapper");
	createBlockCont.appendChild(createBlockWrapper);
	
	var createBlockFormMain = document.createElement("div");
	createBlockFormMain.setAttribute("class", "form-main");
	createBlockFormMain.setAttribute("id", "form-main");
	createBlockWrapper.appendChild(createBlockFormMain);
	
}

function sendFBLogin() {
	if(typeof(FB) !== 'undefined') {
		FB.login(function(response){
			destField('form-main', 'login'); 
			fbStat();
		});
	}
}

function sendLogin() {
		var email = document.getElementById("stRegEmail").value;
		var pass = document.getElementById("stRegPass").value;
		var checkValueEmail=checkEmail(email, 'logMailMesg');
		var checkValuePass=checkPass(email, 'logPassMesg');
		if(checkValueEmail==1 && checkValuePass==1) {
			firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
			destField('form-main', 'login'); 
		}
}

function sendRegister() {
		var email = document.getElementById("stRegEmail").value;
		var pass = document.getElementById("stRegPass").value;
		var checkValueEmail=checkEmail(email, 'logMailMesg');
		var checkValuePass=checkPass(email, 'logPassMesg');
		if(checkValueEmail==1 && checkValuePass==1) {
			firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
			loginVisible();
		}
}

function checkEmail(wartosc, nazwaId) {
	var wzor = /[a-z0-9\-\_\.]+\@{1}[a-z0-9]+\.{1}[a-z0-9]+/;
	var wynikTestu=wzor.test(wartosc);
	if (wynikTestu==false) {
		showCheckedValue(wynikTestu, nazwaId, 'Wprowadź poprawny adres e-mail');
		return 0;
	} else {
		showCheckedValue(wynikTestu, nazwaId, '');
		return 1;
	}
}

function checkPass(wartosc, nazwaId) {
	if (wartosc.length < 8) {
		var wynikTestu=0;
		showCheckedValue(wynikTestu, nazwaId, 'Wprowadź hasło składające się z min. ośmiu znaków');
		return 0;
	} else {
		var wynikTestu=1;
		showCheckedValue(wynikTestu, nazwaId, '');
		return 1;
	}
}

function showCheckedValue(wartosc, nazwaId, tekst) {
	if (wartosc==0) {
		document.getElementById(nazwaId).innerHTML=tekst;
	} else {
		document.getElementById(nazwaId).innerHTML='';
	}
}
  
function destField(pFieldName, chFieldName) {
	var pElem = document.getElementById(pFieldName);
	if(document.getElementById(chFieldName)) {
		var chElem = document.getElementById(chFieldName);
		pElem.removeChild(chElem);
	}
}

function destField2(chFieldName) {
	if(document.getElementById(chFieldName)) {
		var chElem = document.getElementById(chFieldName);
		document.body.removeChild(chElem);
	}
}

function registerVisible() {
	if ( !document.getElementById('container') ) {
		createContainer();
	}
	destField('form-main', 'login'); 	
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'register');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header"><h1>Register</h1></div><p><input type="email" id="stRegEmail"  name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendRegister" class="btn" onclick="sendRegister()">Register</button></p><p class="form-footer">Have account? <button id="btnChangeLogin" class="btn-footer" onclick="loginVisible()">Log In</button></p>';
	document.getElementById('form-main').appendChild(cTag1);
}

function loginVisible() {
	if ( !document.getElementById('container') ) {
		createContainer();
	}
	destField('form-main', 'register'); 
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'login');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header"><h1>Login</h1></div><p><input type="email" id="stRegEmail" name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendLogin" class="btn" onclick="sendLogin()">Login</button></p><p><button id="btnSendFBLogin" class="btn" onclick="sendFBLogin()">Facebook login</button></p><p class="form-footer">Don\'t have account? <button id="btnChangeRegister" class="btn-footer" onclick="registerVisible()">Register</button></p>';
	document.getElementById('form-main').appendChild(cTag1);
}



function mainFuncSite() {
	destField2('container');
	var createBlock1 = document.createElement("div");
	createBlock1.setAttribute("class", "menu-wrap");
	document.body.appendChild(createBlock1);
	
	var createInput1 = document.createElement("input");
	createInput1.setAttribute("class", "toggler");
	createInput1.setAttribute("type", "checkbox");
	createBlock1.appendChild(createInput1);
	
	var createBlock2 = document.createElement("div");
	createBlock2.setAttribute("class", "hamburger");
	createBlock1.appendChild(createBlock2);
	
	var createBlock3 = document.createElement("div");
	createBlock3.setAttribute("class", "menu");
	createBlock1.appendChild(createBlock3);
	
	var createBlock4 = document.createElement("div");
	createBlock3.appendChild(createBlock4);
	
	var createUl1 = document.createElement("ul");
	createBlock4.appendChild(createUl1);
	
	var createUi1 = document.createElement("li");
	createUl1.appendChild(createUi1);
	
	var createA1 = document.createElement("a");
	createA1.setAttribute("href", "#");
	createA1.setAttribute("onclick", "logOut()");
	createA1.innerHTML="Wyloguj";
	createUi1.appendChild(createA1);
	
	var createBlock5 = document.createElement("div");
	createBlock5.setAttribute("class", "wrapper2");
	createBlock5.setAttribute("id", "wrapper2");
	document.body.appendChild(createBlock5);
	
	var createBlock6 = document.createElement("div");
	createBlock6.setAttribute("class", "search-bar");
	createBlock6.setAttribute("id", "search-bar");
	createBlock5.appendChild(createBlock6);
	
	var createH41 = document.createElement("h4");
	createH41.innerHTML="Wybierz rodzaj lokalizacji miejsca:";
	createBlock6.appendChild(createH41);
	
	var createLabel1 = document.createElement("label");
	createBlock6.appendChild(createLabel1);
	
	var createInput2 = document.createElement("input");
	createInput2.setAttribute("type", "radio");
	createInput2.setAttribute("name", "rodzMiejsce");
	createInput2.setAttribute("id", "wybLista");
	createInput2.setAttribute("value", "wybLista");
	createInput2.setAttribute("onclick", "checkChecked(this.value)");
	createLabel1.appendChild(createInput2);
	
	var createSpan1 = document.createElement("span");
	createSpan1.innerHTML="Wpisz nazwę";
	createLabel1.appendChild(createSpan1);
	
	var createLabel2 = document.createElement("label");
	createBlock6.appendChild(createLabel2);
	
	var createInput3 = document.createElement("input");
	createInput3.setAttribute("type", "radio");
	createInput3.setAttribute("name", "rodzMiejsce");
	createInput3.setAttribute("id", "wybMap");
	createInput3.setAttribute("value", "wybMap");
	createInput3.setAttribute("onclick", "checkChecked(this.value)");
	createLabel2.appendChild(createInput3);
	
	var createSpan2 = document.createElement("span");
	createSpan2.innerHTML="Wybierz z mapy";
	createLabel2.appendChild(createSpan2);
	/*
	var createLabel3 = document.createElement("label");
	createBlock6.appendChild(createLabel3);
	
	var createInput4 = document.createElement("input");
	createInput4.setAttribute("type", "radio");
	createInput4.setAttribute("name", "rodzMiejsce");
	createInput4.setAttribute("id", "wybGPS");
	createInput4.setAttribute("value", "wybGPS");
	createInput4.setAttribute("onclick", "checkChecked(this.value)");
	createLabel3.appendChild(createInput4);
	
	var createSpan3 = document.createElement("span");
	createSpan3.innerHTML="GPS";
	createLabel3.appendChild(createSpan3);
	*/
	
	var createBlock7 = document.createElement("div");
	createBlock7.setAttribute("class", "map");
	createBlock7.setAttribute("id", "map");
	createBlock5.appendChild(createBlock7);
	
	var createBlock8 = document.createElement("div");
	createBlock8.setAttribute("class", "info");
	createBlock8.setAttribute("id", "info");
	createBlock5.appendChild(createBlock8);
	
	var createBlock9 = document.createElement("div");
	createBlock9.setAttribute("class", "wiki");
	createBlock9.setAttribute("id", "wiki");
	createBlock5.appendChild(createBlock9);
}

function checkChecked(wartosc) {
	if (wartosc=="wybLista") {
		createWLoc('search-bar');
		document.getElementById("wybMap").removeAttribute("checked");
		//document.getElementById("wybGPS").removeAttribute("checked");
	} else if (wartosc=="wybMap") {
		createBMap('search-bar');
		//document.getElementById("wybGPS").removeAttribute("checked");
		document.getElementById("wybLista").removeAttribute("checked");
	} else  if (wartosc=="wybGPS") {
		getLocGPS();
		document.getElementById("wybLista").removeAttribute("checked");
		document.getElementById("wybMap").removeAttribute("checked");
	}
}
