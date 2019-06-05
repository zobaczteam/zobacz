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
			loginVisible() ;
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
	var chElem = document.getElementById(chFieldName);
	var pElem = document.getElementById(pFieldName);
	pElem.removeChild(chElem);
}

function registerVisible() {
	destField('form-main', 'login'); 	
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'register');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header"><h1>Register</h1></div> <!-- <form action="#">  --> <p><input type="email" id="stRegEmail"  name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendRegister" class="btn" onclick="sendRegister()">Register</button></p><p class="form-footer">Have account? <button id="btnChangeLogin" class="btn-footer" onclick="loginVisible()">Log In</button></p><!-- </form> -->';
	document.getElementById('form-main').appendChild(cTag1);
}

function loginVisible() {
	destField('form-main', 'register'); 	
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'login');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header"><h1>Login</h1></div> <!-- <form action="#"> --> <p><input type="email" id="stRegEmail" name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendLogin" class="btn" onclick="sendLogin()">Login</button></p><p class="form-footer">Don\'t have an account? <button id="btnChangeRegister" class="btn-footer" onclick="registerVisible()">Register</button></p> <!-- </form> -->';
	document.getElementById('form-main').appendChild(cTag1);
}
