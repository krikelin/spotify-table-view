/***
Table module for Spotify Apps
@module table
**/

var views = sp.require("sp://import/scripts/api/views");
var models = sp.require("sp://import/scripts/api/models");
/**
@class Table
**/
exports.Table = function(playlist, track, columns) {	
//	alert("A");
	this.playlist = playlist;
	this.list = new views.List(playlist, track);
	var _playlist = playlist;

	this.tableHeader = new exports.TableHeader(this, columns);
	this.list.node.getElementsByTagName("div")[0].appendChild(this.tableHeader.node);
	this.tableNode = this.tableHeader.node;
	this.node = document.createElement("div");
	this.node.appendChild(this.list.node); 
	var _node = this.node;
	var sortMode = null;
	this.sort = function(column) {	
		try {
			var mode = true;
			if(sortMode !== null) {
				if(typeof(sortMode["column"]) !== "undefined") {
					if(sortMode.column == column) {
					mode = !sortMode.mode;
					}
				}
			}
			console.log("GCWE");	
			console.log(this.playlist);
			var list = this.playlist.tracks.slice(0);
			list.sort(function(track, track2) {
				var order = 0;
				console.log(track);
				
				switch(column) {
					case views.Track.FIELD.NAME:
					
						order = track.data.name > (track2.data.name);
							
						break;
					case views.Track.FIELD.ARTIST:
						order = track.data.artists[0].name >  track2.data.artists[0].name;
						break;
					case views.Track.FIELD.ALBUM:
						order = track.data.album.name >  track2.data.album.name;
						break;
					case views.Track.FIELD.DURATION:
						order = track.data.duration > track2.data.duration;
						break;
				}
				order = order ? -1 : 1;
				console.log(order);
				return mode ? order : -order;
			
			});
			
			// Remove all songs
			while(playlist.length > 0)	playlist.remove(playlist.get(0));
			for(var i = 0; i < list.length; i++) {
				playlist.add(list[i]);
			}
		/*	console.log(list);
			sortMode = { column: column, mode: mode};
			var div = this.node.getElementsByTagName("div")[0];
			var elms = [];
			for(var x = 0; x < list.length; x++) {
				var track = list[x];
				var a = this.node.querySelectorAll("a[href=\"" + track.data.uri + "\"]")[0];
				elms.push(a);
				a.parentNode.removeChild(a);
				
			}
			for(var x = 0; x < elms.length; x++) {
	
				a.setAttribute("style","-webkit-transform: translateY(" + (20 * x) + "px)");
				a.setAttribute("data-itemindex", x);
				a.setAttribute("data-viewindex", x);
				div.appendChild(a);
			}
			var list = new views.List(playlist, track);
			
			var tableHeader = new exports.TableHeader(this, columns);
			list.node.getElementsByTagName("div")[0].appendChild(tableHeader.node);
			
			console.log(this.node);
			this.node.innerHTML="";
			
			var as = list.node.getElementsByTagName("a");
			var aplaylist = new models.Playlist();
		
			
			console.log("FG");
			console.log(aplaylist.tracks);
			this.list = new views.List(aplaylist, track);
			var tableHeader = new exports.TableHeader(this, columns);
			this.list.node.getElementsByTagName("div")[0].appendChild(tableHeader.node);
			this.node.innerHTML ="";
			this.node.appendChild(this.list.node);
			console.log(this.node);*/
		} catch(e) {
			console.log(e.stack);
		}
	};
};
/***
@class TableHeader
****/
exports.Column = function(type, title, table) {
	console.log(table);	
	this.node = document.createElement("span")
	this.node.setAttribute("class", "sp-column sp-track-field-" + type.toLowerCase() + "");
	this.node.innerHTML = title;
	console.log(this.node);

	this.node.addEventListener("click", function () {
		try {
			table.sort(views.Track.FIELD[type]);
		} catch(e) {
			console.log(e.stack);
		}
		
	});
};
	
exports.TableHeader = function (table, columns) {
	var a = document.createElement("a");
	a.setAttribute("class", "sp-header sp-item sp-list");
	a.style.height= "16px";
	a.style.position = "relative";

	if(columns |= views.Track.FIELD.STAR) a.appendChild(new exports.Column("STAR","", table).node);
	if(columns |= views.Track.FIELD.SHARE) a.appendChild(new exports.Column("SHARE","", table).node, table);
	if(columns |= views.Track.FIELD.NAME)  a.appendChild(new exports.Column("NAME","Name", table).node, table);
	if(columns |= views.Track.FIELD.ARTIST) a.appendChild(new exports.Column("ARTIST","Artist", table).node, table);
	if(columns |= views.Track.FIELD.DURATION) a.appendChild(new exports.Column("DURATION","Length", table).node, table);
	if(columns |= views.Track.FIELD.ALBUM) a.appendChild(new exports.Column("ALBUM","Album", table).node, table);
	
	this.node = a;
};