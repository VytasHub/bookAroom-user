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




        //Add Square bracket
    }]);
