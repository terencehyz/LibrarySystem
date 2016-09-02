angular.module('MyService', [])
.service('AccountService',function ($http,$q) {
    return{
      addUser: function(userId,userPwd,userTrueName,userMaxNum,userType) {
        var deferred = $q.defer();
        var url = "../user/newUser.php?userId=" + userId + "&userPwd=" + userPwd + "&userMaxNum="+userMaxNum+"&userType="+userType+"&userTrueName=" + userTrueName + "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      loginUser:function (id,password) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var loginResult=new Object();
        var url="../user/login.php?Id="+id+"&Password="+password+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(response){
            loginResult=response;
            localStorage.password=loginResult.Password;
            localStorage.id=loginResult.Id;
            localStorage.trueName=loginResult.TrueName;
            localStorage.isAdmin=loginResult.IsAdmin;
            localStorage.bookNum=loginResult.BookNum;
            localStorage.maxBookNum=loginResult.MaxBookNum;
            localStorage.userType=loginResult.UserType;

            deferred.resolve(loginResult);
          });
        return promise;
      }
    }
})
.service('BookService', function ($http,$q){
  return{
    addBook: function(bookName,bookAuthor,bookPress,bookISBN,bookVersion,bookPrice,bookNum,bookCategory,releaseDate) {
        var deferred = $q.defer();
        var url = "../user/newbook.php?bookName=" + bookName + "&bookAuthor=" + bookAuthor + "&releaseDate="+releaseDate+"&bookPress="+bookPress+"&bookISBN="+bookISBN+"&bookCategory="+bookCategory+"&bookVersion=" + bookVersion+"&bookPrice="+bookPrice+"&bookNum=" +bookNum+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      checkInfo: function() {
        var deferred = $q.defer();
        var url = "../user/checkInfo.php?UserId=" +localStorage.id+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      adminall: function($scope) {
        var deferred = $q.defer();
        var url = "../book/adminLendBook.php?callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            $scope.allAdmins=res;
            deferred.resolve(res);
          });
        return deferred.promise;
      },
    lendBook: function(book) {
      var deferred = $q.defer();
      var url = "../user/lend.php?UserId=" + localStorage.id + "&BookId=" + book.BookId + "&callback=JSON_CALLBACK";
      $http.get(url)
        .success(function(res) {
          deferred.resolve(res);
        });
      return deferred.promise;
    },
    delData: function(allReservationBooks,book) {
      var deferred = $q.defer();
      var url = "../user/delData.php?ReservationId=" + book.ReservationId + "&callback=JSON_CALLBACK";
      $http.get(url)
        .success(function(res) {
          allReservationBooks.splice(allReservationBooks.indexOf(book), 1);
          deferred.resolve(res);
        });
      return deferred.promise;
    },
    resBook: function(book) {
      var deferred = $q.defer();
      var url = "../user/reservation.php?UserId=" + localStorage.id + "&BookId=" + book.BookId + "&callback=JSON_CALLBACK";
      $http.get(url)
        .success(function(res) {
          deferred.resolve(res);
        });
      return deferred.promise;
    },
    toReturn: function(allLendBooks,book) {
      var deferred = $q.defer();
      var url = "../user/toReturn.php?UserId=" + localStorage.id + "&BookId=" + book.BookId +"&LendId=" + book.LendId + "&callback=JSON_CALLBACK";
      $http.get(url)
        .success(function(res) {
          allLendBooks.splice(allLendBooks.indexOf(book), 1);
          deferred.resolve(res);
        });
      return deferred.promise;
    }
  }
})

.factory('Users',function($http,$q){
  return {
    all:function($scope){
      var deferred = $q.defer();
      var url="../user/alluser.php?callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.allUsers=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    update:function(user){
      var deferred = $q.defer();
      var url="../user/editUser.php?UserId="+user.UserId+"&TrueName="+user.TrueName+"&Password="+user.Password+"&MaxBookNum="+user.MaxBookNum+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    delUser: function(allUsers, user) {
      var deferred = $q.defer();
      $http.get("../user/delUser.php?userId=" + user.Id + "&callback=JSON_CALLBACK")
      .success(function(res) {
          allUsers.splice(allUsers.indexOf(user), 1);
          deferred.resolve(res);
      });
      return deferred.promise;
    }
  }
})

.factory('Books', function ($http,$q) {
  return {
    delBook: function(allBooks, book) {
      var deferred = $q.defer();
      $http.get("../book/delBook.php?bookId=" + book.BookId + "&callback=JSON_CALLBACK")
      .success(function(res) {
          allBooks.splice(allBooks.indexOf(book), 1);
          deferred.resolve(res);
      });
      return deferred.promise;
    },
    update:function(book){
      var deferred = $q.defer();
      var x=book.TotalNum;
      var y=book.FreeNum;
      var z=book.LendNum;
      console.log(x);
      console.log(y);
      console.log(z);
      y=x-z;
      var url="../book/editBook.php?BookId="+book.BookId+"&BookAuthor="+book.BookAuthor+"&Press="+book.Press+"&Price="+book.Price+"&TotalNum="+book.TotalNum+"&FreeNum="+y+"&BookCategory="+book.BookCategory+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    byPress:function($scope,data){
      var deferred = $q.defer();
      var url="../book/byPress.php?Press="+ data +"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.bookByPress=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    byAuthor:function($scope,data){
      var deferred = $q.defer();
      var url="../book/byAuthor.php?BookAuthor="+data+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.bookByAuthor=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    byDate:function($scope,data){
      var deferred = $q.defer();
      var url="../book/byDate.php?ReleaseDate="+data+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.bookByDate=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    byZTFL:function($scope,data){
      var deferred = $q.defer();
      var url="../book/byZTFL.php?BookCategory="+data+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.bookByZTFL=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },


    all:function($scope){
      var deferred = $q.defer();
      var url="../book/allBook.php?callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.allBooks=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    allLend:function($scope){
      var deferred = $q.defer();
      var url="../book/lendBook.php?UserId="+localStorage.id+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.allLendBooks=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },
    allReservation:function($scope){
      var deferred = $q.defer();
      var url="../book/reservationBook.php?UserId="+localStorage.id+"&callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.allReservationBooks=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },

    bookinfo:function($scope){
      var deferred = $q.defer();
      var url="../book/bookInfo.php?callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.bookInfo=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },

    lend:function($scope){
      var deferred = $q.defer();
      var url="../book/lendbook.php?callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.lendBook=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    },

    reservation:function($scope){
      var deferred = $q.defer();
      var url="../book/reservationbook.php?callback=JSON_CALLBACK";
      $http.get(url)
      .success(function(res){
        $scope.reservationBook=res;
        deferred.resolve(res);
      });
      return deferred.promise;
    }
  };
});