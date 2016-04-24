angular.module('sample.home', [
        'auth0'
    ])
    .controller('HomeCtrl', ['$scope', 'auth', '$http', '$location', 'store', '$firebaseArray', function HomeController($scope, auth, $http, $location, store, $firebaseArray) {
        //Order of the Parameter mathers so just included all of the parameters of the function


        //Uncoment folowing refs for FireBAse to work
        var IrlWorkBenches = new Firebase('https://bookaroomfirebase.firebaseio.com/WorkBenches');
        var fireBaseKey = IrlWorkBenches.key();
        $scope.WorkBenches = $firebaseArray(IrlWorkBenches);

        $scope.auth = auth;

        $scope.callApi = function() {
            // Just call the API as you'd do using $http
            $http({
                url: 'http://localhost:3001/secured/ping',
                method: 'GET'
            }).then(function() {
                alert("We got the secured data successfully");
            }, function(response) {
                if (response.status == 0) {
                    alert("Please download the API seed so that you can call it.");
                } else {
                    alert(response.data);
                }
            });
        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/login');
        }




        $scope.showWorkbench = function(item) {
            console.log("show button is called ");
            $scope.addFormShow = false; //turn on the addForm visibility
            $scope.editFormShow = true; //turn off the editForm visibility

            $scope.Address = item.Address;
            $scope.CityTown = item.CityTown;
            $scope.WName = item.WName;
            $scope.id = item.$id;
            console.log("item " + JSON.stringify(item));
        }

        $scope.BookWorkbench = function() {

            //if(isValid){
            $scope.WorkBenches.$add({

                TimeBooked: $scope.TimeBooked,

            });
            //clearForm();
            //}

        }


        $scope.today = function() {

            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            newdate = month + "/" + day + "/" + year;

            $scope.dt = newdate;
        };
        $scope.today();
        $scope.repeatArray = [1, 2, 3];
        $scope.showWeeks = true;
        $scope.toggleWeeks = function() {
            $scope.showWeeks = !$scope.showWeeks;
        };




        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = ($scope.minDate) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.opened = [];
        $scope.open = function(index) {

            $timeout(function() {
                $scope.opened[index] = true;
                console.log("Click");
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };


        ////////////////////////////Google Maps


        // function init_map() 
        // {
        //     var myOptions = 
        //     {
        //         zoom: 10,
        //         center: new google.maps.LatLng(51.5073509, -0.12775829999998223),
        //         mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };

        //     map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);



        //     marker1 = new google.maps.Marker(
        //     {
        //         map: map,
        //         position: new google.maps.LatLng(51.5073509, -0.12775829999998223)
        //     });

        //     infowindow1 = new google.maps.InfoWindow(
        //     {
        //         content: '<strong>Title</strong><br>London, United Kingdom<br>'
        //     });


        //     marker = new google.maps.Marker(
        //     {
        //         map: map,
        //         position: new google.maps.LatLng(51.6073509, -0.12775829999998223)
        //     });

        //     infowindow = new google.maps.InfoWindow(
        //     {
        //         content: '<br>Test, Ireland<br>'
        //     });




        //     google.maps.event.addListener(marker, 'click', function() 
        //     {
        //         infowindow.open(map, marker);
        //         infowindow1.open(map,  marker1);
        //     });

        //     infowindow.open(map, marker);
        //     infowindow1.open(map,  marker1);
        // }
        // google.maps.event.addDomListener(window, 'load', init_map);

        function init_map() 
        {
            var myOptions = 
            {
                zoom: 8,
                center: new google.maps.LatLng(53.42701599999999, -7.942911900000013),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

            marker = new google.maps.Marker(
            {
                map: map,
                position: new google.maps.LatLng(53.423383, -7.938385)
            });
            infowindow = new google.maps.InfoWindow(
            {
                content: '<strong></strong><br>Athlone<br>2 Workbenches<br>'
            });

            //Adding multyplay markers on to map create duplicate objects of marker and infowindow
            marker1 = new google.maps.Marker(
            {
                map: map,
                position: new google.maps.LatLng(53.344631, -6.259526)
            });
            infowindow1 = new google.maps.InfoWindow(
            {
                content: '<strong></strong><br>Dublin<br>3 Workbenches<br>'
            });


             marker2 = new google.maps.Marker(
            {
                map: map,
                position: new google.maps.LatLng(53.275107, -9.050199)
            });
            infowindow2 = new google.maps.InfoWindow(
            {
                content: '<strong></strong><br>Galway<br>3 Workbenches<br>'
            });







            google.maps.event.addListener(marker, 'click', function() 
            {
                infowindow.open(map, marker);

            });
            //Once Objects created add ref infowindow1 marker1
            infowindow.open(map, marker);
            infowindow1.open(map, marker1);
            infowindow2.open(map, marker2);
        }
        google.maps.event.addDomListener(window, 'load', init_map);


        ////////////////////////////Google Maps
































        //Add Square bracket
    }]);
