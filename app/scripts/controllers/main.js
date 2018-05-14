'use strict';

/**
 * @ngdoc function
 * @name votesAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the votesAppApp
 */
angular.module('votesAppApp')
  .controller('MainCtrl', function ($scope,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.variable = null;

    vm.findCandidatebyId = findCandidatebyId;
    vm.getThumbUpOrDown = getThumbUpOrDown;
    vm.voteAgain = voteAgain;
    vm.titleAbout = titleAbout;
    $rootScope.name = ''; 

    vm.candidates = [{ 'id': '1', 'name': 'Kanye West', 'topic': 'Entertainment', 'numbervotes': 0, 'thumbup': 0, 'thumbdown': 0, 'percentagethumbup': 0, 'percentagethumbdown': 0, 'votepress': false, 'currentThumb': null, 'imagepath': 'kanye.jpg' },
    { 'id': '2', 'name': 'Mark Zuckerberg', 'topic': 'Business', 'numbervotes': 0, 'thumbup': 0, 'thumbdown': 0, 'percentagethumbup': 0, 'percentagethumbdown': 0, 'votepress': false, 'currentThumb': null, 'imagepath': 'mark.jpeg' },
    { 'id': '3', 'name': 'Cristina Fernández de Kirchner', 'topic': 'Politics', 'numbervotes': 0, 'thumbup': 0, 'percentagethumbup': 0, 'percentagethumbdown': 0, 'votepress': false, 'currentThumb': null, 'thumbdown': '0', 'imagepath': 'cristina.jpg' },
    { 'id': '4', 'name': 'Malala Yousafzai', 'topic': 'Entertainment', 'numbervotes': 0, 'thumbup': 0, 'thumbdown': 0, 'percentagethumbup': 0, 'percentagethumbdown': 0, 'votepress': false, 'currentThumb': null, 'imagepath': 'malala-yousafzi.jpg' },
    ];
    activate();

    function activate() {

      var item = JSON.parse(localStorage.getItem('jsonCandidates'));
      //item = null;
      if (item !== null && item !== undefined) {
        vm.candidates = item;
      }

      for (var i = 0; i < vm.candidates.length; i++) {
        vm.candidates[i].currentThumb = null;
      }

      $(function () {

        for (var i = 0; i < vm.candidates.length; i++) {

          var elem = document.getElementById(i);
          var newStyle = '';

          if (vm.candidates[i].percentagethumbup === 0 && vm.candidates[i].percentagethumbdown === 0) {
            newStyle = 'linear-gradient(to right, #2ac3b0 50%, #ffb732 50%';
          } else {

            if (vm.candidates[i].percentagethumbup > vm.candidates[i].percentagethumbdown) {
              newStyle = 'linear-gradient(to right, #2ac3b0 ' + vm.candidates[i].percentagethumbup + '%, #ffb732 ' + vm.candidates[i].percentagethumbdown + '%';
            } else {
              newStyle = 'linear-gradient(to left, #ffb732 ' + vm.candidates[i].percentagethumbdown + '%, #2ac3b0 ' + vm.candidates[i].percentagethumbup + '%';

            }
          }
          elem.style.background = newStyle;
        }
      });

    }

    function titleAbout(title){
      var newTitle = '';
      if(title ===1){
        newTitle = 'Past Trials';
      }else if(title===2){
        newTitle = 'How its works';
      }else if(title===3){
        newTitle = 'Log In/Sign Up';
      }else if(title===4){
        newTitle = 'How its works';
      }else if(title===5){
        newTitle = 'searching';

      }
      $rootScope.name = newTitle;
      console.log($rootScope.name);
    }


    function findCandidatebyId(id, index) {
      for (var i = 0; i < vm.candidates.length; i++) {
        if (vm.candidates[i].id === id) {

          if (vm.candidates[i].currentThumb === null) {
            alert('Please check a choice');
          } else {
            var currentThumb = vm.variable;
            if (currentThumb) {
              vm.candidates[i].thumbup++;
            } else {
              vm.candidates[i].thumbdown++;
            }
            vm.candidates[i].numbervotes++;
            vm.candidates[i].votepress = true;


            if (vm.candidates[i].thumbup === 0) {
              vm.candidates[i].percentagethumbup = 0;

            } else {
              var result = Math.floor((vm.candidates[i].thumbup / vm.candidates[i].numbervotes) * 100);
              vm.candidates[i].percentagethumbup = result;
            }
            if (vm.candidates[i].thumbdown === 0) {
              vm.candidates[i].percentagethumbdown = 0;
            } else {
              vm.candidates[i].percentagethumbdown = Math.ceil((vm.candidates[i].thumbdown / vm.candidates[i].numbervotes) * 100);
            }
            vm.candidates[i].currentThumb = null
            changeLinerGradiente(index, vm.candidates[i].percentagethumbup, vm.candidates[i].percentagethumbdown);
            saveLocallyJsonList();
          }



        }
      }
    }

    function voteAgain(id) {
      for (var i = 0; i < vm.candidates.length; i++) {
        if (vm.candidates[i].id === id) {
          vm.candidates[i].votepress = false;
        }
      }
    }

    function changeLinerGradiente(index, up, down) {
      var elem = document.getElementById(index);
      var newStyle = '';
      if (up > down) {
        newStyle = 'linear-gradient(to right, #2ac3b0 ' + up + '%, #ffb732 ' + down + '%';

      } else {
        newStyle = 'linear-gradient(to left, #ffb732 ' + down + '%, #2ac3b0 ' + up + '%';

      }

      elem.style.background = newStyle;
    }


    function getThumbUpOrDown(value, id) {
      for (var i = 0; i < vm.candidates.length; i++) {
        if (vm.candidates[i].id === id) {
          vm.candidates[i].currentThumb = value;
        }
      }
      vm.variable = value;
    }

    function saveLocallyJsonList() {
      localStorage.setItem('jsonCandidates', JSON.stringify(vm.candidates));
    }




  });
