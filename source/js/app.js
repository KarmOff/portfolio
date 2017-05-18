'use strict';

var button_log = document.querySelector('.welcome__login');

if(button_log) {
button_log.onclick = function(e) {
    let flipper = document.querySelector('.flipper');
    let button  = document.querySelector('.welcome__login');
    let main    = document.querySelector('.main_page'); 
    flipper.classList.add("flip-active");
    button.style.display = 'none';
    main.onclick = function(e) {
        flipper.classList.remove("flip-active");
        button.style.display = 'block';
    };
};
};



// PARALLAX 1


var parallaxContainer = document.getElementById('parallax');

	if(parallaxContainer) {
	var  layers = parallaxContainer.children;


// Функция, которая отслеживает позицию курсора и производит сдвиг картинок
var moveLayers = function (e) {
	var initialX = (window.innerWidth / 2) - e.pageX,
		initialY = (window.innerHeight / 2) - e.pageY;

	[].slice.call(layers).forEach(function (layer, i) {
		var divider = i / 100,
			positionX = initialX * divider,
			positionY = initialY * divider,
			bottomPosition = (window.innerHeight / 2) * divider,
			layerStyle = layer.style,
			transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px , 0)';

		layerStyle.transform = transformString;
		layerStyle.bottom = '-' + bottomPosition + 'px';
	});
};

window.addEventListener('mousemove', moveLayers);
}
//PARALLAX 1  end ----------------------------------------------------------------------




// PARALLAX 2 scroll

var parallax = (function () {
	var bg   		= document.querySelector('.hero__bg');
	var user 		= document.querySelector('.hero__user-block');
	

	return {
		move: function (block, windowScroll, strafeAmount) {
			var strafe = windowScroll / -strafeAmount + '%';
			var transformString = 'translate3d(0,' + strafe + ',0)';
			var style  = block.style;
			style.transform = transformString;
			style.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(user, wScroll, 15);
		}
	}

}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;
	parallax.init(wScroll);
};


//PARALLAX 2 scroll end ----------------------------------------------------------------------


// Preloader

var preloader = (function(){
    var percentsTotal = 0,
        preloader = $('.preloader');

    var imgPath = $('*').map(function(ndx, element){
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';


        if(background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }


        if(img) {
            path = $(element).attr('src');
        }

        if(path) return path
    });


    var setPercent = function(total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.preloader__percents').text(percents + '%');

        if(percents >= 100) {
            preloader.fadeOut();
        }
    }

    var loadImages = function (images) {
        if(!images.length) preloader.fadeOut();

        images.forEach(function(img, i, images) {
           var fakeImage = $('<img>', {
               attr : {
                   src: img
               }
           });


            fakeImage.on('load error', function(){
            percentsTotal++;
                setPercent(images.length, percentsTotal);
            });
        });
    }


    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }
}());


$(function () {
    preloader.init();
});

//preloader end ------------------------------------------------------------------------------------------------

// map ------------------------------------------------------------------------------------------------------------
 var map = document.querySelector('.map');
 if (map) {
   google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(59.985593660922305,30.352076437255846),
            zoom: 13,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable : true,
            clickableIcons: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]
        }
        var mapElement = document.getElementById('mapkit-9650');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"Парголовская ул., 11","address":"","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":59.9861654,"lng":30.345376999999985,"vicinity":"Санкт-Петербург","open_hours":"","marker":{"fillColor":"#0288D1","fillOpacity":1,"strokeWeight":0,"scale":1.5,"path":"M10.2,7.4c-6,0-10.9,4.9-10.9,10.9c0,6,10.9,18.4,10.9,18.4s10.9-12.3,10.9-18.4C21.2,12.2,16.3,7.4,10.2,7.4z M10.2,22.9c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,22.9,10.2,22.9z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":1},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
        var arrays = [];
        while (locations.length > 0) {
            arrays.push(locations.splice(0, 5));
        }
        for (var i = 0; i < arrays.length; i++) {
            makeRoutes(arrays[i]);
        }
        function makeRoutes(locations) {
            var waypts = [];
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                preserveViewport: true
            });
            if (locations.length > 1){
                for (var i = 0; i < locations.length; i++) {
                    waypts.push({
                        location:new google.maps.LatLng(locations[i].lat, locations[i].lng),
                        stopover:true
                    }); 
                }; 
            };
            var request = {
                origin: new google.maps.LatLng(locations[0].lat, locations[0].lng),
                destination: new google.maps.LatLng(locations[locations.length - 1].lat, locations[locations.length - 1].lng),
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    polylineOptions = {
                        strokeColor: '#808080',
                        strokeWeight: '1'
                    }
                    directionsDisplay.setOptions({
                        polylineOptions: polylineOptions
                    });
                    directionsDisplay.setDirections(response);
                }
            });
            directionsDisplay.setMap(map);
        }
   
    }
}
//map end ----------------------------------------------------------------------------------------------------------------


//hamburger ------------------------------------------------------------------------------------------


var hamb = document.querySelector('.input-toggler');

if(hamb) {
var Hamburger = (function () {
  var   body = $('body'),
        hamburger = $('.menu-toggler');

  return {
    init: function () {
      hamburger.on('click', function (e) {
        body.toggleClass('body_active');
      });
    }
  }
}());

$(function () {
  if (Hamburger) {
    Hamburger.init();
  }
});

};





