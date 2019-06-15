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

function getLocGPS() {
	destField('search-bar', 'wyborMiejsce');
	destField('search-bar', 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById('search-bar');
	var createBlockMap = document.createElement("div");
	createBlockMap.setAttribute("id", "wyborGPS");
	parentIdGetMain.appendChild(createBlockMap);
	var createBlockC = document.createElement("div");
	createBlockC.setAttribute("id", "wyborGPSK");
	createBlockMap.appendChild(createBlockC);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		var createBlockP = document.createElement("p");
		createBlockP.innerHTML='Brak dostępu do GPS'
		createBlockMap.appendChild(createBlockP);
	}
}

function showPosition(position) {
	var lat = position.coords.latitude; 
	var lon = position.coords.longitude;
	
	var element = document.getElementById('wyborGPSK');
	element.innerText =  "Twoje współrzędne geograficzne: "+lat+" "+ lon;
	var createBlockH1 = document.createElement("input");
	createBlockH1.setAttribute("id", "coor1");
	createBlockH1.setAttribute("type", "hidden");
	createBlockH1.setAttribute("value", lat);
	element.appendChild(createBlockH1);
	var createBlockH2 = document.createElement("input");
	createBlockH2.setAttribute("id", "coor2");
	createBlockH2.setAttribute("type", "hidden");
	createBlockH2.setAttribute("value", lon);
	element.appendChild(createBlockH2);
	createKategory('search-bar');
}

function createBMap(parentId) {
	destField('search-bar', 'wyborMiejsce');
	destField('search-bar', 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById('search-bar');
	var createBlockMap = document.createElement("div");
	createBlockMap.setAttribute("id", "wyborMapa");
	parentIdGetMain.appendChild(createBlockMap);
	var createBlockP = document.createElement("h4");
	createBlockP.innerHTML='Wybierz miejsce na mapie'
	createBlockMap.appendChild(createBlockP);
	var createBlockC = document.createElement("div");
	createBlockC.setAttribute("id", "wyborMapK");
	createBlockMap.appendChild(createBlockC);
	showMapSetView();
	
}

function showMapPoly() {
	var polyFeature = new ol.Feature({
		geometry: new ol.geom.Point([19.129808, 50.618671]),
		projection: 'EPSG:4326'
	
	}); 
	return polyFeature;
}

function showMapVector() {
	var polyFeature = showMapPoly();
	var vectorLayer = new ol.layer.Vector({
	    source: new ol.source.Vector({
		features: [polyFeature]
	    })
	});
	return vectorLayer;
}

function showMapOSML() {
	var osmLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
	});
	return osmLayer;
}

function showMapView() {
	var view = new ol.View({
	projection: 'EPSG:4326',
	zoom: 18
	});
	view.setCenter([19.128499, 50.617803]);
	return view;
}


function showMapGenMap() {
	var osmLayer = showMapOSML();
	var vectorLayer = showMapVector();
	var view = showMapView();

		var map = new ol.Map({
			target: 'wyborMapa',
			view: view,
			layers: [ osmLayer,vectorLayer]
		});
		return map;
}

function showMapSetView() {
	var map = showMapGenMap();
	var view = showMapView();
	map.setView(view);
	
	var addMap = document.getElementById('wyborMapa');
	 addMap.addEventListener('click', function(){getCorMap(map), createKategory('search-bar')});
}

function getCorMap(nowaMapa) {
	var polyFeature = showMapPoly();
	var map = nowaMapa;
	var getCoorM;
		var geometry = polyFeature.getGeometry();
		var coordinate = geometry.getCoordinates();
		
		
		map.on('click', function(evt){
			getCoorM = evt.coordinate;
			var i = 0;
			var tablica=[];
			for (x in getCoorM) {
			tablica[i]=getCoorM[x];
			i++;
		}
		
			var element = document.getElementById('wyborMapK');
			element.innerText =  "Współrzędne geograficzne wybranego punktu: "+tablica[0]+" "+tablica[1];
			var createBlockH1 = document.createElement("input");
			createBlockH1.setAttribute("id", "coor1");
			createBlockH1.setAttribute("type", "hidden");
			createBlockH1.setAttribute("value", tablica[0]);
			element.appendChild(createBlockH1);
			var createBlockH2 = document.createElement("input");
			createBlockH2.setAttribute("id", "coor2");
			createBlockH2.setAttribute("type", "hidden");
			createBlockH2.setAttribute("value", tablica[1]);
			element.appendChild(createBlockH2);
		});
		
		
};	

function createWLoc(parentId) {
	destField(parentId, 'wyborMiejsce');
	destField(parentId, 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborMiejsce");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wprowadź nazwę miejscowości'
	createBlock.appendChild(createSentence);
	var createField = document.createElement("input");
	createField.setAttribute("type", "text");
	createField.setAttribute("name", "nameLoc");
	createField.setAttribute("id", "WLoc");
	createField.setAttribute("onblur", "createKategory('search-bar')");
	createBlock.appendChild(createField);
}

function createKategory(parentId) {
	destField(parentId, 'wyborKategorii'); 
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborKategorii");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wybierz kategorię'
	createBlock.appendChild(createSentence);
		
	var categories = [ "artwork_type", "historic", "museum", "tourism" ];
		
	var createSelect = document.createElement("select");
	createSelect.setAttribute("name", "nazwaKategorii");
	createSelect.setAttribute("id", "nazwaKategorii");
	createBlock.appendChild(createSelect);
	categories.forEach(wyswietlKategorie);
}

function wyswietlKategorie(wartosc) {
	var createOption = document.createElement("option");
	createOption.setAttribute("value", wartosc);
	createOption.setAttribute("id", "opt"+wartosc);
	createOption.setAttribute("onclick", "createSubKategory(this.value, 'search-bar')");
	createOption.innerHTML=wartosc;
	var parentIdGet=document.getElementById('nazwaKategorii');
	parentIdGet.appendChild(createOption);
}

function createSubKategory(nazwaKategorii, parentId) {
	destField(parentId, 'wyborPodkategorii'); 
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborPodkategorii");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wybierz podkategorię'
	createBlock.appendChild(createSentence);
	
	if(document.getElementById('WLoc')) {
		var nazwaMiasta=document.getElementById('WLoc').value;
		pobierzPodkategorie1(nazwaKategorii, nazwaMiasta, createBlock) ;
	} else if (document.getElementById('coor1') && document.getElementById('coor2')) {
		var lat = document.getElementById('coor1').value;
		var lon = document.getElementById('coor2').value;
		pobierzPodkategorie2(nazwaKategorii, lon, lat, createBlock) ;
	}
}

function pobierzPodkategorie1(nazwaKategorii, nazwaMiasta, parentId) {
	
	var pobPod = new XMLHttpRequest();
	pobPod.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var dane=this.responseText;
			var daneIlosc=dane.length;
			var wynik=CSVDoTablicy(dane, '', daneIlosc);
			podKatSel(wynik, parentId);
		}
	};
	pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:csv('"+nazwaKategorii+"')][timeout:25];(area[name='"+nazwaMiasta+"'];)-%3E.searchArea;(node['"+nazwaKategorii+"'~'.*'](area.searchArea);relation['"+nazwaKategorii+"'~'.*'](area.searchArea););out%20body;", true);
	pobPod.send();
}

function pobierzPodkategorie2(nazwaKategorii, lon, lat, parentId) {
	
	var pobPod = new XMLHttpRequest();
	pobPod.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var dane=this.responseText;
			var daneIlosc=dane.length;
			var wynik=CSVDoTablicy(dane, '', daneIlosc);
			podKatSel(wynik, parentId);
		}
	};
	pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:csv('"+nazwaKategorii+"')][timeout:25];rel['"+nazwaKategorii+"'](around:5000, "+lon+", "+lat+");out%20body;%3E;out%20skel%20qt;", true);
	pobPod.send();
}
