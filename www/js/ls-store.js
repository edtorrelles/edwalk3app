var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function(id, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    }
	this.findAll = function(callback) { //ED
		var teto = window.localStorage.getItem("favs");
		if (typeof teto === 'undefined' || teto === null ) { //alert('a11111 '+teto);
			var favs= new Array();	
		}else{ //alert('a222222');
			var favs = JSON.parse(window.localStorage.getItem("favs"));
			//var favs = window.localStorage.getItem("favs");
		}
        /*var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }*/
        callLater(callback, favs);
	}
	this.crearArray = function(callback) { 
		var teto = window.localStorage.getItem("favs");
		if (typeof teto === 'undefined' || teto === null ) { //alert('a11111 '+teto);
			var favs= new Array();	
		}else{ //alert('a222222');
			var favs = JSON.parse(window.localStorage.getItem("favs"));
		}
		//callLater(callback, favs);
		callback(favs);
	}
	this.addNewFav = function(id,callback) { 
		var teto = window.localStorage.getItem("favs");
		if (typeof teto === 'undefined' || teto === null ) { //alert('a11111 '+teto);
			var favs= new Array();	
		}else{ //alert('a222222');
			var favs = JSON.parse(window.localStorage.getItem("favs"));
		}
		var extra = $("#edwalk #"+id).attr("data");
		favs.unshift(decodeURIComponent(extra)); 
		
		/*
		var title = $('#'+id+' h2').text();
		var image = $('#'+id+' img.foto').attr("src");
		var size = $('#'+id+' .artsize').text();
		var cats = $('#'+id+' .artcats').text();
		*/
		//console.log(title);
		//favs.unshift({"id":id,"title":title,"thumb_image":image,"catname":cats,"size":size}); 
		//favs.push({"id":id,"title":title,"thumb_image":image,"catname":cats,"size":size}); 
		favsID.push(id);
		window.localStorage.setItem("favs", JSON.stringify(favs));
		
		callback(id);
		
	}
	this.clearAllFavs = function(callback) { //log('<br/><br/><br/>window0');
		var favs = []; 
		favsID = [];
		//log('<br/><br/><br/>window1');
		window.localStorage.setItem("favs", JSON.stringify(favs));
		//log('<br/><br/><br/>window2');
		var doo = 'doit';
		callback(doo);
		//callLater(callback, doo);
	}
	this.removeNewFav = function(id,callback) { 
		
		var favs = JSON.parse(window.localStorage.getItem("favs"));
		//console.log(favs);
		for (var i=0, len=favs.length; i<len; i++) { 
		var fovs = JSON.parse(favs[i]);
		//console.log('favs '+favs[i]['id'] +' fovs1 '+fovs.id+' fovs2 '+fovs['id']);
			if(fovs.id === id){  //console.log('fav is id');
				favs.splice(favs[i],1); 
				var index = favsID.indexOf(id);
				if (index > -1) { //console.log('fav favid');
					favsID.splice(index, 1);
				}
				break;
				}
			/*
			for (var j=0, len2=ar[i].length; j<len2; j++) {
				// accesses each element of each sub-array in turn
				console.log( ar[i][j] ); 
			}
			*/
		}
		window.localStorage.setItem("favs", JSON.stringify(favs));
		callback(id);
	}
    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    var employees = [
            {"id": 1, "firstName": "Ryan", "lastName": "Howard", "title":"Vice President, North East", "managerId": 0, "city":"New York, NY", "cellPhone":"212-999-8888", "officePhone":"212-999-8887", "email":"ryan@dundermifflin.com"},
            {"id": 2, "firstName": "Michael", "lastName": "Scott", "title":"Regional Manager", "managerId": 1, "city":"Scranton, PA", "cellPhone":"570-865-2536", "officePhone":"570-123-4567", "email":"michael@dundermifflin.com"},
            {"id": 3, "firstName": "Dwight", "lastName": "Schrute", "title":"Assistant Regional Manager", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-865-1158", "officePhone":"570-843-8963", "email":"dwight@dundermifflin.com"},
            {"id": 4, "firstName": "Jim", "lastName": "Halpert", "title":"Assistant Regional Manager", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-865-8989", "officePhone":"570-968-5741", "email":"dwight@dundermifflin.com"},
            {"id": 5, "firstName": "Pamela", "lastName": "Beesly", "title":"Receptionist", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-999-5555", "officePhone":"570-999-7474", "email":"pam@dundermifflin.com"},
            {"id": 6, "firstName": "Angela", "lastName": "Martin", "title":"Senior Accountant", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-555-9696", "officePhone":"570-999-3232", "email":"angela@dundermifflin.com"},
            {"id": 7, "firstName": "Kevin", "lastName": "Malone", "title":"Accountant", "managerId": 6, "city":"Scranton, PA", "cellPhone":"570-777-9696", "officePhone":"570-111-2525", "email":"kmalone@dundermifflin.com"},
            {"id": 8, "firstName": "Oscar", "lastName": "Martinez", "title":"Accountant", "managerId": 6, "city":"Scranton, PA", "cellPhone":"570-321-9999", "officePhone":"570-585-3333", "email":"oscar@dundermifflin.com"},
            {"id": 9, "firstName": "Creed", "lastName": "Bratton", "title":"Quality Assurance", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-222-6666", "officePhone":"570-333-8585", "email":"creed@dundermifflin.com"},
            {"id": 10, "firstName": "Andy", "lastName": "Bernard", "title":"Sales Director", "managerId": 4, "city":"Scranton, PA", "cellPhone":"570-555-0000", "officePhone":"570-646-9999", "email":"andy@dundermifflin.com"},
            {"id": 11, "firstName": "Phyllis", "lastName": "Lapin", "title":"Sales Representative", "managerId": 10, "city":"Scranton, PA", "cellPhone":"570-241-8585", "officePhone":"570-632-1919", "email":"phyllis@dundermifflin.com"},
            {"id": 12, "firstName": "Stanley", "lastName": "Hudson", "title":"Sales Representative", "managerId": 10, "city":"Scranton, PA", "cellPhone":"570-700-6464", "officePhone":"570-787-9393", "email":"shudson@dundermifflin.com"},
            {"id": 13, "firstName": "Meredith", "lastName": "Palmer", "title":"Supplier Relations", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-588-6567", "officePhone":"570-981-6167", "email":"meredith@dundermifflin.com"},
            {"id": 14, "firstName": "Kelly", "lastName": "Kapoor", "title":"Customer Service Rep.", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-123-9654", "officePhone":"570-125-3666", "email":"kelly@dundermifflin.com"},
            {"id": 15, "firstName": "Toby", "lastName": "Flenderson", "title":"Human Resources", "managerId": 1, "city":"Scranton, PA", "cellPhone":"570-485-8554", "officePhone":"570-699-5577", "email":"toby@dundermifflin.com"}
        ];

   // window.localStorage.setItem("employees", JSON.stringify(employees));
	
	 //var favs = [{"id":188,"title":"dad","idate":"2015-03-11 22:06:11","thumb_image":"dad.jpg","catname":"oil painting,portrait"},{"id":189,"title":"dara-knot1","idate":"2015-03-11 22:06:11","thumb_image":"dara-knot1.jpg","catname":"oil painting,fantasy","size":"150 x 200 cm ~ 59 x 79 in"}];
	 //var favs = [];
	//window.localStorage.setItem("favs", JSON.stringify(favs));
	

    callLater(successCallback);

}