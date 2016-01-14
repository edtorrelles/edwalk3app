/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var contentType ="application/x-www-form-urlencoded; charset=utf-8";
//contentType: "application/json", 
if(window.XDomainRequest){
     contentType = "text/plain";
	}
/*
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#topedbar').addClass('istop');
    } else {
        $('#topedbar').removeClass('istop');
    }
}

 $(window).scroll(sticky_relocate);
    sticky_relocate();	
*/	
	
	
		
//var distance = $('#topedbar').offset().top,
var   $window = $(window);

$window.scroll(function() {
//console.log('$window.scrollTop()  - distance '+distance);
    if ( $window.scrollTop() >  $('#sticky-anchor').offset().top  ){
        // Your div has reached the top
		$('#istop').addClass("displayblock");
    }else{$('#istop').removeClass("displayblock");}
});


function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}
	
function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, 
            // so we can allow for a little better readability over the wire: |`^
            replace(/%(?:7C|60|5E)/g, unescape);
}

function doMenu(id) {
		//console.log("The menu was clicked..."+id);
		if($("#"+id).css('display') == 'none'){
			$("#submenu div").css("display","none");
			$("#"+id).css("display","block"); 
			//console.log("open the menu");
		}else{
			$("#"+id).css("display","none"); 
			//console.log("close the menu");
		}
		/*
		if(menuOpen) {
			console.log("close the menu");
			document.querySelector("#"+id).style.display="none";
			menuOpen = false;
		} else {
			console.log("open the menu");
			document.querySelector("#"+id).style.display="block";
			menuOpen = true;
		}*/
}

var firstArrayMenu;
var totquiet = true;
//var menuOpen = false;
//var menuDiv = "";	
//menuDiv = document.querySelector("#submenu");
var edwalk = document.getElementById('edwalk');
var numitems = 0;
var perpage = 8;
var favsID = new Array();
var catsNameId = new Array();
var parentMenu = document.getElementById("menu");
var aMenu = parentMenu.getElementsByTagName("a");
for (var i = 0; i < aMenu.length ; i++) {
    aMenu[i].addEventListener("click", 
        function (event) {
            event.preventDefault();
			$('#menu a').removeClass('selec');
			this.className = "selec";
            /*if (confirm('Are you sure?')) {
                window.location = this.href;
            }*/
        }, 
        false);
}

var app = {
    // Application Constructor
    initialize: function() {
        //alert('initialize');
		this.store = new LocalStorageStore();
		//alert('initialize2');
		this.store.crearArray(function(favs) {  //alert('crearArray');
			if (typeof favs !== 'undefined' && favs.length > 0) { 
				var l = favs.length; //alert('crearArray2: '+l);
				for (var i=0; i < l; i++) { 
					var item = JSON.parse(favs[i]);
					
					favsID.push(item.id);// log('favs3:'+item.id); console.log('favs4:'+item.id);
					//log(JSON.stringify(favs)+' xx '+item.id);
				}
			}
		});
		//alert('this.bindEvents();');
		this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() { //alert('bindEvents');
		
        document.addEventListener('deviceready', this.onDeviceReady, false); this.onDeviceReady(); 
		document.addEventListener("online", this.onConnectionOnline, false);
        document.addEventListener("offline", this.onConnectionOffline, false); 
		
		app.onSearchWebEvent('contruct');
		
		
		var obj = document.getElementById('flippopup');
		var dits = JSON.parse('{ "pageX1":"xxx" , "pageX2":"xxx", "id":"xxx", "pageY1":"xxx", "pageY2":"xxx" }');
		
		obj.addEventListener('touchend', function(event) {
		
			//event.preventDefault();
			//event.stopPropagation();
			//var touches = evt.changedTouches;
			//log('<span style="color:#fff;">touches: '+ JSON.stringify(touches)+'</span><br/>');
			
			var px = dits.pageX2 - dits.pageX1;
			
			//log(px+'<br/>');
			if(!isNaN(px)){
				if( px > 400){
					var id = $("#exnexprev #prev").attr("laid");
					if(!isNaN(id)){ id = $("#exnexprev #next").attr("laid"); }
					app.hideExtra(id);
				}else if( px > 100 ){
					var id = $("#exnexprev #next").attr("laid");
					app.prevExtra(id);
				}else if( px < -100 ){
					var id = $("#exnexprev #prev").attr("laid");
					app.nextExtra(id);
				}
			}
			//log('px: '+px+' '+JSON.stringify(dits)+'<br/>'); 
			
			dits = JSON.parse('{ "pageX1":"xxx" , "pageX2":"xxx", "id":"xxx", "pageY1":"xxx", "pageY2":"xxx" }');
			
			//event.preventDefault();
				
			}, false);
			
		obj.addEventListener('touchmove', function(event) {
			//log('touchmove');
			//alert('touchmove');
		  // If there's exactly one finger inside this element
		  //event.preventDefault();
		  //var touches = event.changedTouches;
		  var touch = event.changedTouches[0];
		  //log('<span style="color:#fff;">touches: '+ JSON.stringify(touches)+'</span><br/>');
		  
		  //if (event.targetTouches.length == 1000000000) {
			//var touch = event.targetTouches[0];
			
			//var touch = event.targetTouches;
			//if(ditmove['id'] === 'xxx' || ditmove['id'] != touch.identifier ){
			if(dits.id === 'xxx' || dits.id != touch.identifier ){
			/*
				ditmove['id'] = touch.identifier;
				ditmove['pageX1'] = touch.pageX;
				ditmove['pageY1'] = touch.pageY;
				*/
				dits.id = touch.identifier;
				dits.pageX1 = touch.pageX;
				dits.pageY1 = touch.pageY;
			}
			/*
			ditmove['pageX2'] = touch.pageX;
			ditmove['pageY2'] = touch.pageY;
			*/
			dits.pageX2  = touch.pageX;
			dits.pageY2  = touch.pageY;
			
			
			
			// Place element where the finger is
			//obj.style.left = touch.pageX + 'px';
			//obj.style.top = touch.pageY + 'px';
			
			
		  //}
		}, false);
		
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { //alert('onDeviceReady');
		/* DESMARCAR PARA MOBILEç!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
		StatusBar.overlaysWebView( false );
		StatusBar.backgroundColorByHexString('#151515');
		StatusBar.styleLightContent();
		*/
		/*
		function alertDismissed() { // do something 
		}
		navigator.notification.alert(
			'You are the winner!',  // message
			alertDismissed,         // callback
			'Game Over',            // title
			'Done'                  // buttonName
		);
		navigator.notification.alert('You are the winner!');
		*/
		
        app.receivedEvent('deviceready');
		
		document.addEventListener("menubutton", doMenu, false);
		
		
		window.analytics.startTrackerWithId('UA-71798739-1');
		
		//var el = document.getElementById("#flipcontent");
		//  el.addEventListener("touchstart", handleStart, false);
		//  el.addEventListener("touchend", handleEnd, false);
		//  el.addEventListener("touchcancel", handleCancel, false);
		 //el.addEventListener("touchmove", handleMove, false);
		//document.addEventListener("touchmove", handleMove, false);
		
		
		
		/*window.setInterval(function(){
	  $("#edtitle").fadeToggle( "slow", "linear" );
	}, 3000);*/
		//alert('onDeviceReady');
		
    },
    onConnectionOnline: function(){
      //alert("conectado :-D");
    },
    
    onConnectionOffline: function(){
      alert("desconectado :-c");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		$('#prehome').delay(1000).addClass("tozero").delay(1000).remove();
		*/
		
		//var lalalaElement = document.getElementById('lalala');
		//lalalaElement.innerHTML = "xxxxxxxxxxx";
        //console.log('Received Event: ' + id);
		//$("#prehome").delay(2000).fadeOut('slow');
		
		app.onSearchWebEvent('art',1);
		
		
		
		//navigator.splashscreen.hide();
		/*
		$('#prehome').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
							  function(event) {
					// Do something when the transition ends
					$("#prehome").remove();
				  });
		*/
		
		
    },
	onSearchWebEvent: function(who,page,cat,catname) {
		//var url = 'http://edwalk.com/app/index.php';
		var url = 'http://edwalk.com/app/';
		/*edwalk.innerHTML = "<h2 style='text-align:center;padding:20px 0; background:#151515;'>"+who+"</h2>";
		$('#edwalk').append('<div id="loading">loading <div class="spinner"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div>'); 
		*/
		//console.log(JSON.stringify(favsID) + '' + favsID);
		//navigator.splashscreen.show();
		//window.analytics.trackView('Screen Title')
		//////////////////beforesend//////////////////
		if(who!=='like'){
				$('body').append('<div id="loading" style="text-align:center;"><div class="loadcontent"><img src="img/logo.png" alt="edwalk" /><br/>loading <div class="spinner"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div></div>');
				app.hideExtra();
				var cattts ="";
				var lologo ="";
				if(page === 1){
					
				if (typeof catname != 'undefined') { cattts ="<span style='color:#fff;'>"+decodeURIComponent(catname)+" </span>"; 
				window.analytics.trackView('app cat: '+decodeURIComponent(catname));
				/*window.analytics.trackView(decodeURIComponent(catname)); */
				} else { 
				window.analytics.trackView('app home');
				cattts ="<span>edwalk </span>"; lologo = "<img src='img/woki22.png' alt='edwalk' /><br/>"; 
				/*window.analytics.trackView('edwalk home');*/ 
				}
				edwalk.innerHTML = "<div id='topedbar'><h2>"+lologo+""+cattts+""+who+"</h2></div><div id='sticky-anchor'></div><div id='istop' class=''><h2>"+cattts+""+who+"</h2></div>";
				numitems = 0;
				}
				 
				
				//menuDiv.style.display="none";
				$("#submenu div").css("display","none");
				//$('#finale').html("");
				menuOpen = false;
				//$("#prehome").fadeIn();
				//$("#edwalk").fadeOut();
                        //$("#resultado").html("Procesando, espere por favor...");
			}
		/////////////////////////////////////////////
		
		var lang = this.store.findlang();
		//console.log('--> lang: '+lang);
		
		
		$.ajax({
			type: 'GET',
		url: 'http://edwalk.com/app/',
		async: false,
		crossDomain: true,
		 data : {   
			'cap': 'N1bl1m69',
			'who': who,
			'page': page,
			'cat': cat,
			'lang': lang
		},
		contentType:contentType,  
		jsonp: "callback",
		jsonpCallback: 'jsonpCallback',
		dataType: 'json',
		beforeSend: function () {
			
			
                },
		complete: function() {
			
			//$.mobile.loading('hide')
			//$('#loading').remove();
			//$("#prehome").fadeOut(function(){$("#edwalk").fadeIn();});
			},
			// Work with the response
		success: function( response ) {
			if(who!=="like"){
					
				
				if(page == 1){
					window.scrollTo(0,0);
				}
				//$("#edwalk").append(JSON.stringify(response));
				//obj = JSON && JSON.parse(json) || $.parseJSON(json);
				$('#loading .loadcontent').append(' success '); 
				//$('#edwalk').append("<div id='"+item.ID+"' class='art'>"+who+"who</div>"); 
				//var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
				
				if(who==="contruct"){
					app.createMenu(response);
				}else{
					app.onNewPrint(who,response,page,cat);
				}
				$('#edwalk .camera').imagesLoaded()
				  .always( function( instance ) {
					//console.log('all images loaded');
				  })
				  .done( function( instance ) {
					//console.log('all images successfully loaded');
					/*var $item = $( image.img ).parent();
					$item.removeClass('is-loading');*/
				  })
				  .fail( function() {
					//console.log('all images loaded, at least one is broken');
					$item.addClass('is-broken');
				  })
				  .progress( function( instance, image ) {
					//var result = image.isLoaded ? 'loaded' : 'broken';
					//console.log( 'image is ' + result + ' for ' + image.img.src );
					
					if( screen.width > 700){
						var alto = image.img.height;
						if(alto < 200 ){
							$(image.img).css({
								"height" : '200px',
								"width" : 'auto'
							});
							/*
							var anchoart = $('#edwalk .art').outerWidth();
							var $tato = $( image.img ).parent();
							var ancho = $tato.find(".foto").outerWidth();
							var menos = (anchoart-ancho)/2;
								$(image.img).css({
								"margin-left" : menos
							});
							*/
						}else{
							var menos = (200-alto)/2;
							$(image.img).css({
								"margin-top" : menos
							});
						}
						
					}
					
					var $item = $( image.img ).parent();
					$item.removeClass('is-loading');
					if ( !image.isLoaded ) {
						$item.addClass('is-broken');
					}
					
				  });
				//$("#edwalk").append('ok: ' + JSON.stringify(response));
				//console.log( response ); // server response
			}
			//navigator.splashscreen.hide();
			setTimeout(function() {
			  $('#loading').remove();
			}, 2000);
			
		},
		error: function(e) {
				console.log( 'error' );
				$("#edwalk").append('<h1>error loading content</h1>');
			   console.log(e.message);
			   navigator.splashscreen.hide();
			   //this.onSearchWebEvent('image');
			   //this.onSearchWebEvent('post');
			   setTimeout(function() {
				  $('#loading').remove();
				}, 2000);
			}
		});

	},
	drawImage: function(item,fav) { 
					//if(typeof iitem != "undefined"){var item = iitem;}else { var item = JSON.parse(iitem); console.log('mal!!!!'); }
					//console.log( item ); 
					var catss = "";
					$.each(item.lascats,function(j,xats){
						if(j > 0){ catss += ", ";}
						//catss += xats.name;
						catss +='<a href="javascript:void(0)" onclick="app.hideExtra('+item.id+'); app.onSearchWebEvent(\'art\',1,'+xats.term_id+',\''+encodeRFC5987ValueChars(xats.name)+'\'); ">'+xats.name+'</a>';
					});
					var t = item.idate.split(/[- :]/);
					var url = 'http://edwalk.com/uploads/'+t[0]+'/'+t[1]+'/i5-'+item.thumb_image;
					var ssize = "";
					if(typeof item.size != 'undefined'){ ssize = "<div class='artsize'>"+item.size+"</div>";}
					var artfav ="";
					if(fav === true){ var imglove = "img/fav7.png";}else{ var imglove = "img/fav2.png";}
					if(favsID.indexOf(item.id) != -1){ artfav = "<a class='loveicon' href='javascript:void(0)' onclick='app.removeFavs("+item.id+");'><img src='"+imglove+"' alt='favs' /></a>"; }else{ artfav = "<a class='loveicon' href='javascript:void(0)' onclick='app.addFavs("+item.id+");'><img src='img/fav1.png' alt='favs' /></a>"; }
					//console.log(JSON.stringify(item));
					$('#edwalk').append("<div id='"+item.id+"' class='art' data='"+encodeRFC5987ValueChars(JSON.stringify(item))+"' ><div class='artshadow' onclick='app.showExtra(\""+encodeRFC5987ValueChars(JSON.stringify(item))+"\");' ></div><div class='camera is-loading'><img class='foto' src='"+url+"' alt='"+item.title+"' /></div><div class='artpeu'>"+ssize+"<div class='artfav'>"+artfav+"</div><h2>"+item.title+"</h2><div class='artcats'>"+catss+"</div> </div></div>"); 
	},
	onNewPrint: function(who,response,page,cat) {
			$.each(response,function(i,item){
					if(who == 'blog'){
						if(typeof cat != 'undefined'){
							$('#edwalk').append("<div id='"+item.id+"' class='art'><h1>"+item.title+"</h1>"+item.content+"</div>"); 
						}else{
							$('#edwalk').append("<div id='"+item.id+"' class='art'><h2><a id='' href='javascript:void(0)' onclick='app.onSearchWebEvent(\"blog\",\""+item.slug+"\");'>"+item.title+"</a></h2><hr/></div>"); 
						}
						
					}else{
					
					app.drawImage(item,false);
					
					numitems++;
					}					
				});
				//////////////// pagination ///////////////
				app.pagination(page,numitems,cat);
				
	},
	pagination: function(page,numitems,cat) {
		var lang = this.store.findlang();
		var obj = {
			'end' : { 'EN' : 'You reached the end.', 'ES' : 'Has alcanzado el final. ' },
			'Load' : { 'EN' : 'Load more items', 'ES' : 'Cargar más imágenes' }
		};
		var nextpage = perpage*page;
		var fintext = "";
		page++;
		if( numitems < nextpage ){ 
			fintext = "<span style='color:#ccc;'>"+ obj['end'][lang] +"</span>" ;
		}else { 
			fintext = '<a href="javascript:void(0);" onclick="app.onSearchWebEvent(\'art\','+page+','+cat+');">'+ obj['Load'][lang] +'</a>'; 
		}
		
		document.getElementById('finale').innerHTML = fintext ;
		//$('#edwalk').append(fintext);
		//alert(fintext);
				
		//console.log('cat:'+cat+'perpage:'+perpage+' numitems:'+numitems+' - page:'+page+' - nextpage:'+nextpage+' fintext:'+fintext);
	},
	createMenu: function(response) { 
		$.each(response,function(i,item){		
			$.each(item,function(j,i2tem){ //console.log(i2tem.name);
				catsNameId[i2tem.name] = i2tem.term_id;
				catsNameId[i2tem.nameES] = i2tem.term_id;
			});	
		});
		firstArrayMenu = response;
		app.DrawMenu(response);
	},
	DrawMenu: function(response) { 
	//console.log('response.tec'+JSON.stringify(response.tec)); 
	//console.log('response.tem'+teto.length);
		var lang = this.store.findlang();
		var n1 = response.tec;
		var n = n1.length;
		//if( n > 7){	
		if( n > 1){
			$('#tec').html('');
			$.each(response.tec,function(i,item){
				if( lang === 'ES'){ var name = item.nameES;} else { var name = item.name; } 
				$('#tec').append('<li><a href="javascript:void(0)" onclick="app.onSearchWebEvent(\'art\',1,'+item.term_id+',\''+decodeURIComponent(escape(name))+'\');">'+decodeURIComponent(escape(name))+'</a></li>');
				//encodeRFC5987ValueChars(name)
				//catsNameId[item.name] = item.term_id;
			});
		}
		var m1 = response.tem;
		var m = m1.length;
		if( m > 1){
			$('#tem').html('');
			$.each(response.tem,function(i,item){
				if( lang === 'ES'){ var name = item.nameES;} else { var name = item.name; }
				$('#tem').append('<li><a href="javascript:void(0)" onclick="app.onSearchWebEvent(\'art\',1,'+item.term_id+',\''+decodeURIComponent(escape(name))+'\');">'+decodeURIComponent(escape(name))+'</a></li>');
				//catsNameId[item.name] = item.term_id;
			});
		}
			
		//alert(response.join('\n'));
		//alert('catsNameId: '+catsNameId.toString());
		
		if(!isNaN(response.perpage)){ perpage = response.perpage; }
		
		
	},
	showSettings: function() {
		
		var lang = this.store.findlang();
		var obj = {
			'Settings' : { 'EN' : 'Settings', 'ES' : 'Configuración' },
			'DeleteAll' : { 'EN' : 'Delete all your favorite pictures', 'ES' : 'Borrar todas tus imágenes favoritas' },
			'selectlang' : { 'EN' : 'Select your language', 'ES' : 'Selecciona tu idioma' }
		};
		var langES = '';
		var langEN = '';
		if( lang === 'ES'){ langES = ' asettSelect ';} else { langEN = ' asettSelect '; }
		
		window.scrollTo(0,0);
		$('#finale').html("");
		app.hideExtra();
		$("#submenu div").css("display","none");
		edwalk.innerHTML = "<h2 style='text-align:center;padding:20px 0; background:#151515;'><span style='color:#fff;'>edwalk</span> "+ obj['Settings'][lang] +"</h2>";
		$('#edwalk').append('<div id="about"> \
		<div class="settings2"> \
		<a class="asett" href="javascript:void(0)" onclick="navigator.notification.confirm( \' '+ obj['DeleteAll'][lang] +' \', app.clearFavsConfirm, \'edwalk settings\', [\'Detele\',\'Exit\']  );" >'+ obj['DeleteAll'][lang] +' <span id="clearfavsresult"></span></a> \
		'+ obj['selectlang'][lang] +': <br/> \
		<a class="asett '+langES+'" href="javascript:void(0)" onclick="app.changelanguage( \'ES\' );" >Español <span id="ES"></span></a> \
		<a class="asett '+langEN+'" href="javascript:void(0)" onclick="app.changelanguage( \'EN\' );" >English <span id="EN"></span></a> \
		</div> \
		</div>');
		window.analytics.trackView('app settings');
	},
	changelanguage: function(idioma) {
		//this.store.xchangelang(idioma);
		this.store.xchangelang(idioma,function() {
			app.DrawMenu(firstArrayMenu);
			app.showSettings();
		});
	},
	showAbout: function() {
		
		var lang = this.store.findlang();
		var obj = {
			'about' : { 'EN' : 'about', 'ES' : 'Sobre ' },
			'Portfolio' : { 'EN' : 'Portfolio of Visual Artist', 'ES' : 'Portafolio del Artista Visual' },
			'Painting' : { 'EN' : 'Painting, Illustration and sketches', 'ES' : 'Pintura, ilustración y bocetos' },
			'Myname' : { 'EN' : 'My name is Eduard Torrelles, after a long time lost in the immensity. I decided to return to the path of art, this is my diary.', 'ES' : 'Mi nombre es Eduard Torrelles, después de un largo tiempo perdido en la inmensidad. Decidí volver a la senda del arte, este es mi diario.' },
			'Settings' : { 'EN' : 'Settings', 'ES' : 'Configuración ' }
		};
		window.scrollTo(0,0);
		$('#finale').html("");
		app.hideExtra();
		var d = new Date();
		$("#submenu div").css("display","none");
		edwalk.innerHTML = "<div id='topedbar'><h2><span style='color:#fff;'>"+ obj['about'][lang] +"</span> ed</h2></div><div id='sticky-anchor'></div><div id='istop' class=''><h2><span style='color:#fff;'>"+ obj['about'][lang] +"</span> ed</h2></div>";
		$('#edwalk').append('<div id="about"> \
		<div class="targeta"><img class="aboutlogo" src="img/woki22.png" alt="edwalk" /></div> <h2>'+ obj['Portfolio'][lang] +'</h2> \
		<h3>Painting, Illustration and sketches</h3> \
		<p>'+ obj['Myname'][lang] +'</p> \
		Bacelona, Spain \
		<p><a href="javascript:void(0)" onclick="window.open(\'http://edwalk.com\', \'_system\');" >edwalk.com</a></p>		\
		All images © 2000 - '+d.getFullYear()+' Eduard Torrelles  \
		<div class="settings"> \
		<a  href="javascript:void(0)" onclick="app.showSettings();" >'+ obj['Settings'][lang] +'<br/><img src="img/settings.png" alt="settings"></a> \
		<button onclick="window.plugins.socialsharing.share(\'Message only\')">message only</button> \
		</div> \
		</div>');
		window.analytics.trackView('app about');
	},
	clearFavsConfirm: function(buttonIndex) {	// log('<br/><br/><br/>'+buttonIndex);
		if(buttonIndex === 1){// log('<br/><br/><br/>buttonIndex '+buttonIndex);
			app.clearFavs();
		}
	},
	clearFavs: function() {	// log('<br/><br/><br/>'+buttonIndex);
		this.store.clearAllFavs(function(doo) {// log('<br/><br/><br/>doo'+doo);
			if(doo === 'doit'){ $("#clearfavsresult").html('<span class="green"> - erased</span>'); }else{ $("#clearfavsresult").html('<span class="red"> - ERROR</span>'); }
		});	
	},
	showFavs: function() {
		//console.log('showFavs');
		
		var lang = this.store.findlang(); 
		var obj = {
			'likethis' : { 'EN' : 'I like this', 'ES' : 'Me gusta tu ' },
			'ART' : { 'EN' : 'ART', 'ES' : 'ARTE' },
			'willbe' : { 'EN' : 'Your favorites will be here', 'ES' : 'Tus favoritos estarán aquí' }
		};
		
		edwalk.innerHTML = "<h2 style='text-align:center;padding:20px 0; background:#151515;'><span style='color:#fff;'>"+ obj['likethis'][lang] +"</span> "+ obj['ART'][lang] +"</h2>";
		window.scrollTo(0,0);
		$('#finale').html("");
		app.hideExtra();
		$("#submenu div").css("display","none");
        this.store.findAll(function(favs) {
            var l = favs.length;
            var item;
			//console.log('favs.length: '+  l);
			//console.log('favs.length: '+  JSON.stringify(favs));
            //$('.employee-list').empty();
			if( l < 1){ 
				$('#edwalk').append(" <h3 style='text-align:center;padding:20px 0; '>"+ obj['willbe'][lang] +" </h3>");
			}else{
				
	/*			for(var index in favs) { 
    //var attr = object favs[index]; 
	console.log('xxxx1xxx'+  favs[index]);
	//var item = object.favs[index]; 
	//app.drawImage(item);
}
$.each(favs,function(i,item){
	console.log('xxxx222xxx'+  item);
});*/

for (var i=0; i<l; i++) {
	//console.log('xxxx333xxx'+ favs[i]);
	var item = JSON.parse(favs[i]);
	//console.log('xxxx333xxx'+ item);
	app.drawImage(item,true);
}
/*
				$.each(favs,function(i,item){
				//for (var i=0; i<l; i++) {
					console.log('xxxxxx'+item);
					//var item =favs[i];
					//$('#edwalk').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
					app.drawImage(JSON.parse(item));
					//var t = item.idate.split(/[- :]/);
					/*var url = item.thumb_image;
					var ssize = "";
					if(typeof item.size != 'undefined'){ ssize = "<div class='artsize'>"+item.size+"</div>";}
					$('#edwalk').append("<div id='"+item.id+"' class='art' data='"+encodeRFC5987ValueChars(JSON.stringify(item))+"'><div class='artshadow' onclick='app.showExtra(\""+encodeRFC5987ValueChars(JSON.stringify(item))+"\");'></div><div class='camera is-loading'><img class='foto' src='"+url+"' alt='"+item.title+"' /></div><div class='artpeu'>"+ssize+"<div class='artfav'><a class='loveicon' href='javascript:void(0)' onclick='app.removeFavs("+item.id+");'><img src='img/fav7.png' alt='favs' /></a></div><h2>"+item.title+"</h2>"+item.catname+" </div></div>"); 
					
				});
				*/
				$('#edwalk .camera').imagesLoaded()
				  .always( function( instance ) {
					//console.log('all images loaded');
				  })
				  .done( function( instance ) {
					//console.log('all images successfully loaded');
					/*var $item = $( image.img ).parent();
					$item.removeClass('is-loading');*/
					

				  })
				  .fail( function() {
					//console.log('all images loaded, at least one is broken');
					$item.addClass('is-broken');
				  })
				  .progress( function( instance, image ) {
					var result = image.isLoaded ? 'loaded' : 'broken';
					//console.log( 'imagee is ' + result + ' for ' + image.img.src );
					
					if( screen.width > 700){
						var alto = image.img.height;
						if(alto < 200 ){
							$(image.img).css({
								"height" : '200px',
								"width" : 'auto'
							});
							/*
							var anchoart = $('#edwalk .art').outerWidth();
							var $tato = $( image.img ).parent();
							var ancho = $tato.find(".foto").outerWidth();
							var menos = (anchoart-ancho)/2;
								$(image.img).css({
								"margin-left" : menos
							});
							*/
						}else{
							var menos = (200-alto)/2;
							$(image.img).css({
								"margin-top" : menos
							});
						}
						
					}	
					
					var $item = $( image.img ).parent();
					$item.removeClass('is-loading');
					if ( !image.isLoaded ) {
						$item.addClass('is-broken');
					}
					
				  });
			}
        });
	
	window.analytics.trackView('app show favs');
	
	},
	addFavs: function(id) {
	//console.log(favsID);
		if(favsID.indexOf(id) != -1){ }else{
			this.store.addNewFav(id,function(id) {
			app.changeFavs(id);
			app.onSearchWebEvent('like',id);
			});
		}
	},
	removeFavs: function(id) {
	//console.log(favsID);
		this.store.removeNewFav(id,function(id) {
		app.changeFavs(id);
		});
	},
	changeFavs: function(id) {
		//console.log('changeFavs'+favsID);
		var actual = $('#'+id+' .loveicon img').attr("src");
		//console.log('actual: '+actual);
			if( actual === "img/fav1.png"){ 
				$('#return .loveicon img').attr("src","img/fav2.png");
				$('#return .loveicon').attr("onclick","app.removeFavs("+id+");");
				$('#'+id+' .loveicon img').attr("src","img/fav2.png");
				$('#'+id+' .loveicon').attr("onclick","app.removeFavs("+id+");");
				//$("#fliplove").removeClass("tozero",function(){$("#fliplove").addClass( "toone" );});
				//$("#fliplove").addClass( "tozero" );
				//$("#fliplove").addClass( "tozero" ); .css("opacity", "1")
				 /*$('#fliplove').css('z-index','999').delay("slow").removeClass("tozero").addClass("toone");
				setTimeout( function() {
					$("#fliplove").removeClass("toone").addClass("tozero").delay("slow").css('z-index','5');
				}, 1000);
				*/
				//console.log('baboo');
			}else if(actual === "img/fav7.png"){	
				
				app.hideExtra(id);
				$('#'+id).remove();
				//console.log('removing div id from love');
			}else{
				$('#'+id+' .loveicon img').attr("src","img/fav1.png");
				$('#'+id+' .loveicon').attr("onclick","app.addFavs("+id+");");
				$('#return .loveicon img').attr("src","img/fav1.png");
				$('#return .loveicon').attr("onclick","app.addFavs("+id+");");
				
			}
	},
	hideExtra: function(id) {
		if(typeof id !== 'undefined'){
			var toop = $("#"+id).offset().top;
			window.scrollTo(0, toop);
			//$('#edwalk').scrollTop( 100 );
			//log('id:'+toop);
		/*$('html, body').animate({
            scrollTop: $("#"+id).offset().top
        }, 1000);*/
		}

		$('#flipcontent').removeClass("toleft");
		$('#extracontent').removeClass("toleft");
		$('#flipcontent').addClass("outright");
		$('#flipcontent #extracontent').addClass("outright");
		setTimeout( function() {
			$("#edwalk .art").removeClass("openart");
		});
		
		
	},
	nextExtra: function(id) {
		if(totquiet){
			totquiet = false;
			var datos = $("#edwalk #"+id).next(".art").attr("data");
			if (typeof datos !== 'undefined') {
				app.showExtra(datos,'next');
			}else{
				$("#next").css("display","none");
				totquiet = true;
			}
		}
		//log('--->'+id);
	},
	prevExtra: function(id) {
		if(totquiet){ 
			totquiet = false;
			var datos = $("#edwalk #"+id).prev(".art").attr("data");
			if (typeof datos !== 'undefined') {
				app.showExtra(datos,'prev');
			}else{
				$("#prev").css("display","none");
				totquiet = true;
			}
		//log('--->'+id);
		}
	},
	showExtra: function(extra,side) { //console.log('catsNameId: '+JSON.stringify(catsNameId));
		
		item = JSON.parse(decodeURIComponent(extra));
		//console.log(item);
		if (typeof(side)==='undefined'){ side = 'prev'; } 
		$("#edwalk .art").removeClass("openart");
		$("#"+item.id).addClass("openart");
		var extraclass = '';
		if(side ==='prev'){  extraclass = "transition stayleft"; }else {  extraclass = "transition stayright"; }
		
		var d = document.createElement("div");  
		d.setAttribute("id", "flipcontent2");
		d.setAttribute("class", extraclass);	
		//console.log('side'+side);
		document.getElementById("flippopup").appendChild(d);
		//document.body.appendChild(d);
		
		/*
		if(side ==='prev'){ $( "#flipcontent2" ).addClass("transition stayleft");  }else {$( "#flipcontent2" ).addClass("transition stayright"); }
   */
		
		
		$("#flipcontent2").html('<div id="extraimg"> <div id="eximg"></div> <div id="exfoot"></div> </div> <div id="extracontent" class=" '+extraclass+'" > <div id="return">  <a href="javascript:void(0)" onclick="app.hideExtra();" title="close"><img src="img/close.png" alt="close"></a>  </div> <div id="extitle"></div> <div id="excats"></div> <div id="exsize"></div>  <div id="exnexprev"></div> <div id="exfoot"></div> </div>'); 
		
		
		$("#flipcontent2 #exnexprev").html('<a id="prev" laid="'+item.id+'" href="javascript:void(0)" onclick="app.prevExtra('+item.id+');" title="prev"><img src="img/prev.png" alt="prev"></a><a id="next" laid="'+item.id+'" href="javascript:void(0)" onclick="app.nextExtra('+item.id+');" title="next"><img src="img/next.png" alt="next"></a>');
		$("#flipcontent2 #return").html(' <a class="hideextra" href="javascript:void(0)" onclick="app.hideExtra('+item.id+');" title="close"><img src="img/close.png" alt="close"></a> ');
		var artfav ="";
		var actual = $('#'+item.id+' .loveicon img').attr("src");
		if( actual === "img/fav7.png"){ var imglove = "img/fav7.png";}else{ var imglove = "img/fav2.png";}
		if(favsID.indexOf(item.id) != -1){ artfav = "<a class='loveicon' href='javascript:void(0)' onclick='app.removeFavs("+item.id+");'><img src='"+imglove+"' alt='favs' /></a>"}else{ artfav = "<a class='loveicon' href='javascript:void(0)' onclick='app.addFavs("+item.id+");'><img src='img/fav1.png' alt='favs' /></a>" }
		$("#flipcontent2 #return").append(artfav);
		
		var t = item.idate.split(/[- :]/);
		var url = 'http://edwalk.com/uploads/'+t[0]+'/'+t[1]+'/i5-'+item.thumb_image;
		$("#flipcontent2 #eximg").html("<img src='"+url+"' alt='"+item.title+"' />");
		$("#flipcontent2 #extitle").html('<h2>'+item.title+'</h2>');
		
		//var cca = item.catname.split(",");
		var text1 = "";
		
		$.each(item.lascats,function(j,xats){
			//if(j > 0){ text1 += ", ";}
			text1 +='<a href="javascript:void(0)" onclick="app.hideExtra('+item.id+'); app.onSearchWebEvent(\'art\',1,'+xats.term_id+',\''+encodeRFC5987ValueChars(xats.name)+'\'); ">'+xats.name+'</a>';
		});
		/*
		for(var i = 0; i < cca.length; i++) {
			text1 +='<a href="javascript:void(0)" onclick="app.hideExtra('+item.id+'); app.onSearchWebEvent(\'art\',1,'+catsNameId[cca[i]]+',\''+cca[i]+'\'); ">'+cca[i]+'</a>';
		}
		*/
		$("#flipcontent2 #excats").html(text1);
		$("#flipcontent2 #exsize").html(item.size);
		//$("#flipcontent").scrollTop();
		//$('html, body').animate({scrollTop:$('#flipcontent').position().top}, 'slow');
		
		
		
		setTimeout( function() {
		
		if(side ==='prev'){
			$('#flipcontent').addClass("outright");
			$('#flipcontent #extracontent').addClass("outright");
			
		}else{
			$('#flipcontent').addClass("outleft");
			$('#flipcontent #extracontent').addClass("outleft");
		}
		
		$('#flipcontent').removeClass("toleft");
		$('#flipcontent #extracontent').removeClass("toleft");
		
		$('#flipcontent2').addClass("toleft");
		$('#flipcontent2 #extracontent').addClass("toleft");
		$('#flipcontent2').removeClass("stayleft");
		$('#flipcontent2').removeClass("stayright");
		$('#flipcontent2 #extracontent').removeClass("stayleft");
		$('#flipcontent2 #extracontent').removeClass("stayright");
			setTimeout( function() {
					$('#flipcontent').remove();
					d.setAttribute("id", "flipcontent");
					$('#flipcontent').scrollTop = 0;
					$('#flipcontent').animate({
						scrollTop: 0
					}, 500);
					totquiet = true;
				}, 400);
		
		});
		
		$("#submenu div").css("display","none");
		/*$('#flipcontent').scrollTop = 0;
		$('#flipcontent').animate({
			scrollTop: 0
		}, 500);*/
		window.analytics.trackView('app popup: '+item.title);
	}
};
