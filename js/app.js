// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function(){
	$('.slider').slick({
		dots: true,
		arrows: false
	});
});

(function($) {

function drawCircle(point, radius, dir) { 
    var d2r = Math.PI / 180;   // degrees to radians 
    var r2d = 180 / Math.PI;   // radians to degrees 
    var earthsradius = 3963; // 3963 is the radius of the earth in miles
    var points = 32; 

    // find the raidus in lat/lon 
    var rlat = (radius / earthsradius) * r2d; 
    var rlng = rlat / Math.cos(point.lat() * d2r); 

    var extp = new Array(); 
    if (dir==1) {var start=0;var end=points+1} // one extra here makes sure we connect the
    else{var start=points+1;var end=0}
    for (var i=start; (dir==1 ? i < end : i > end); i=i+dir)  
    {
        var theta = Math.PI * (i / (points/2)); 
        ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
        ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
        extp.push(new google.maps.LatLng(ex, ey));
    }
    return extp;
}

// defining circles w/ miles as units for radius
var citymap = {};
citymap['losangeles'] = {
  center: new google.maps.LatLng(34.0500, -118.2500),
  radius: 46
};
citymap['ventura'] = {
  center: new google.maps.LatLng(34.2750, -119.2278),
  radius: 17
};
citymap['sanbernardino'] = {
  center: new google.maps.LatLng(34.1000, -117.3000),
  radius: 25
};
citymap['riverside'] = {
  center: new google.maps.LatLng(33.9481, -117.3961),
  radius: 25
};
citymap['oc'] = {
  center: new google.maps.LatLng(33.6700, -117.7800),
  radius: 20
};

function initializeGmap() {
	var mapOptions = {
		center: { lat: 34.0522, lng: -118.2437 },
		zoom: 9,
		scrollwheel: false,
		styles: [
		    {
		        "featureType": "landscape",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 65
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 51
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 30
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 40
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.province",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "lightness": -25
		            },
		            {
		                "saturation": -100
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "hue": "#ffff00"
		            },
		            {
		                "lightness": -25
		            },
		            {
		                "saturation": -97
		            }
		        ]
		    }
		]
	};
	var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

	// draw single polygon for uniform opacity across overlap areas
	for (var city in citymap) {
		var cityCircle = new google.maps.Polygon({
             paths: [drawCircle(citymap['ventura'].center, citymap['ventura'].size, 1),//division by 3000 to suit
             drawCircle(citymap['losangeles'].center,citymap['losangeles'].size, 1),
             drawCircle(citymap['sanbernardino'].center,citymap['sanbernardino'].size, 1),
             drawCircle(citymap['riverside'].center,citymap['riverside'].size, 1),
             drawCircle(citymap['oc'].center,citymap['oc'].size, 1)],
             strokeColor: '#3b5a93',
             strokeOpacity: 0,
             strokeWeight: 0,
             fillColor: '#3b5a93',
             fillOpacity: 0.08,
         });
		cityCircle.setMap(map);
	}

}

google.maps.event.addDomListener(window, 'load', initializeGmap);

})(jQuery);
