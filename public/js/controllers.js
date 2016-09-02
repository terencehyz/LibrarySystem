var app = angular.module('main', ['ngRoute', 'ngImgCrop', 'MyService', 'directs']);

app.controller('LoginCtrl', ['$scope','$location','$rootScope','AccountService', function($scope,$location,$rootScope,AccountService){
	$rootScope.data={
        id:'',
        pwd:'',
        login:localStorage.hasLogin
    }
    if ($rootScope.data.login==1||$rootScope.data.login==true) {
        $location.path('/bookList');
    }
    $scope.doLogin=function(){
        AccountService.loginUser($rootScope.data.id,$rootScope.data.pwd).then(function (data) {
          if(data.judge==1){
            localStorage.hasLogin=1;
            $location.path('/bookList');
          }
          else{
            localStorage.haslogin=0;
            alert("用户名或密码错误，请重试！");
          }
        })
    }
}]);

app.controller('AdminAllCtrl', ['$scope','BookService', function ($scope,BookService) {
    BookService.adminall($scope);
}])

app.controller('BookListCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
    $scope.data={
        login:localStorage.hasLogin
    };
	if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }
    Books.bookinfo($scope);
    Books.all($scope);

    BookService.checkInfo().then(function(data){
        if(data.judge==1){
            alert("您预约的书籍可借阅！");
        }
    });

    $scope.lendOperation=function(book){
        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/lend');
            }else{
                alert("借阅失败!");
            }
        })
    };

    $scope.reservationOperation=function(book){
        BookService.resBook(book).then(function(data){
            if(data.judge==1){
                alert("预约成功!");
                $location.path('/reservation');
            }else{
                alert("预约失败!");
            }
        })
    };
}]);

app.controller('LendCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
	$scope.data={
        login:localStorage.hasLogin
    };
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }else{
        Books.allLend($scope);
    }
    $scope.lendOperation=function(book){
        BookService.toReturn($scope.allLendBooks,book).then(function(data){
            if(data.judge==1){
                alert("还书成功!");
                $location.path('/lend');
            }else{
                alert("还书失败!");
            }
        })
    };
}]);

app.controller('ReservationCtrl', ['$scope','$location', 'Books','BookService',function ($scope,$location,Books,BookService) {
	$scope.data={
        login:localStorage.hasLogin
    };
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }else{
        Books.allReservation($scope);
    }
    $scope.lendOperation=function(book){
        BookService.delData($scope.allReservationBooks,book).then(function(res){
            if(res.judge==0){ 
                alert("借阅失败!");
            }
        });

        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/bookList');
            }else{
                alert("借阅失败!");
            }
        });
    };
    $scope.cancleOperation=function(book){
        BookService.delData($scope.allReservationBooks,book).then(function(res){
            if(res.judge==1){ 
                alert("取消成功!");
            }else{
                alert("取消失败！");
            }
        });

    };
}]);

app.controller('AdminBookCtrl', ['$scope','$location','$rootScope','Books', function ($scope,$location,$rootScope,Books) {
    $scope.data={
        login:localStorage.hasLogin
    }
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }else{
        Books.all($scope);    
    }
    $scope.delBook = function(book){
        if(book.TotalNum!=book.FreeNum)
        {
            alert("无法删除!已有读者借阅");
        }else{
            Books.delBook($scope.allBooks,book).then(function(data){
            if(data.judge==1){
                alert("删除成功!");
            }else{
                alert("删除失败!");
            }
        })
        }
    };
    $scope.updateBook = function(book){
        $rootScope.toEditBook=book;
        $location.path('/editBook');
    };
	$scope.toAddBook = function () {
        $location.path('/newBook');
    };
}]);

app.controller('AdminUserCtrl', ['$scope','$location','$rootScope','Users', function ($scope,$location,$rootScope,Users) {
    $scope.data={
        login:localStorage.hasLogin
    }
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }else{
        Users.all($scope);
    }
    $scope.delUser = function(user){
        Users.delUser($scope.allUsers,user).then(function(data){
            if(data.judge==1){
                alert("删除成功!");
                //Users.all($scope);
            }else{
                alert("删除失败!");
            }
        })
    };
    $scope.updateUser = function(user){
        $rootScope.toEditUser=user;
        $location.path('/editUser');
    };

	$scope.toAddUser = function () {
        $location.path('/newUser');
    };
}]);

app.controller('EditUserCtrl', ['$scope', '$rootScope','$location','Users',function ($scope,$rootScope,$location,Users) {
    $scope.data=$rootScope.toEditUser;
    console.log($scope.data);
    $scope.updateUser=function(){
        Users.update($scope.data).then(function (data) {
        if(data.judge==1){
            alert("修改成功");
            $location.path('/adminUser');
        }
        else{
            alert("修改失败");
        }
        })
    }
}]);

app.controller('EditBookCtrl', ['$scope', '$rootScope','$location','Books',function ($scope,$rootScope,$location,Books) {
    $scope.data=$rootScope.toEditBook;
    console.log($scope.data);
    $scope.updateBook=function(){
        Books.update($scope.data).then(function (data) {
        if(data.judge==1){
            alert("修改成功");
            $location.path('/adminBook');
        }
        else{
            alert("修改失败");
        }
        })
    }
}])

app.controller('UserStateCtrl', ['$scope','$rootScope','$location', function ($scope,$rootScope,$location) {
    $rootScope.data={
        isAdmin:localStorage.isAdmin,
        login:localStorage.hasLogin,
        state:localStorage.hasLogin,
        name:localStorage.trueName
    }
    if ($rootScope.data.login==0||$rootScope.data.login==undefined||$rootScope.data.login=='0'||$rootScope.data.login==false||$rootScope.data.login=="false") {
        $location.path('/login');
    }

    $scope.logout = function() {
        localStorage.password="";
        localStorage.id=0;
        localStorage.trueName = "";
        localStorage.isAdmin= "";
        localStorage.bookNum = "";
        localStorage.maxBookNum = "";
        localStorage.userType = "";
        localStorage.hasLogin=0;
        console.log(localStorage);
        $location.path('/login');
    }
}]);

app.controller('NewUserCtrl', ['$scope', '$location','AccountService',function ($scope,$location,AccountService) {
    $scope.data={
        login:localStorage.hasLogin,
        userId:'',
        userPwd:'',
        userTrueName:'',
        userMaxNum:'',
        userType:''
    };
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }
    $scope.addUser=function(){
        AccountService.addUser($scope.data.userId,$scope.data.userPwd,$scope.data.userTrueName,$scope.data.userMaxNum,$scope.data.userType).then(function (data) {
        if(data.judge==1){
            localStorage.hasLogin=1;
            alert("添加用户成功");
            $location.path('/adminUser');
        }
        else{
            localStorage.hasLogin=0;
            alert("已存在此用户，请勿重复添加");
        }
        })
    }
}]);

app.controller('NewBookCtrl', ['$scope', '$location','BookService',function ($scope,$location,BookService) {
    $scope.data={
        login:localStorage.hasLogin,
        bookName:'',
        bookAuthor:'',
        bookPress:'',
        bookISBN:'',
        bookVersion:'',
        bookPrice:'',
        bookNum:'',
        bookCategory:'',
        ReleaseDate:''
    };
    if ($scope.data.login==0||$scope.data.login==undefined||$scope.data.login=='0'||$scope.data.login==false||$scope.data.login=="false") {
        $location.path('/login');
    }
    $scope.addBook=function(){
        BookService.addBook($scope.data.bookName,$scope.data.bookAuthor,$scope.data.bookPress,$scope.data.bookISBN,$scope.data.bookVersion,$scope.data.bookPrice,$scope.data.bookNum,$scope.data.bookCategory,$scope.data.ReleaseDate).then(function (data) {
        if(data.judge==1){
            localStorage.hasLogin=1;
            alert("添加成功");
            $location.path('/adminBook');
        }
        else{
            localStorage.hasLogin=0;
            alert("发生未知错误");
        }
        })

        
    }
}]);

app.controller('ByPressCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
    $scope.data={
        press:''
    };
    $scope.search=function(){
        Books.byPress($scope,$scope.data.press);
    };
    $scope.lendOperation=function(book){
        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/lend');
            }else{
                alert("借阅失败!");
            }
        })
    };

    $scope.reservationOperation=function(book){
        BookService.resBook(book).then(function(data){
            if(data.judge==1){
                alert("预约成功!");
                $location.path('/reservation');
            }else{
                alert("预约失败!");
            }
        })
    };
}]);

app.controller('ByAuthorCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
    $scope.data={
        author:''
    };
    $scope.search=function(){
        Books.byAuthor($scope,$scope.data.author);
    };
    $scope.lendOperation=function(book){
        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/lend');
            }else{
                alert("借阅失败!");
            }
        })
    };

    $scope.reservationOperation=function(book){
        BookService.resBook(book).then(function(data){
            if(data.judge==1){
                alert("预约成功!");
                $location.path('/reservation');
            }else{
                alert("预约失败!");
            }
        })
    };
}]);

app.controller('ByDateCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
    $scope.data={
        date:''
    };
    $scope.search=function(){
        Books.byDate($scope,$scope.data.date);
    };
    $scope.lendOperation=function(book){
        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/lend');
            }else{
                alert("借阅失败!");
            }
        })
    };

    $scope.reservationOperation=function(book){
        BookService.resBook(book).then(function(data){
            if(data.judge==1){
                alert("预约成功!");
                $location.path('/reservation');
            }else{
                alert("预约失败!");
            }
        })
    };
}]);

app.controller('ByZTFLCtrl', ['$scope','$location','Books','BookService', function ($scope,$location,Books,BookService) {
    $scope.data={
        ZTFL:''
    };
    $scope.search=function(){
        Books.byZTFL($scope,$scope.data.ZTFL);
    };
    $scope.lendOperation=function(book){
        BookService.lendBook(book).then(function(data){
            if(data.judge==1){
                alert("借阅成功!");
                $location.path('/lend');
            }else{
                alert("借阅失败!");
            }
        })
    };

    $scope.reservationOperation=function(book){
        BookService.resBook(book).then(function(data){
            if(data.judge==1){
                alert("预约成功!");
                $location.path('/reservation');
            }else{
                alert("预约失败!");
            }
        })
    };
}]);

app.config(['$routeProvider', function ($routeProvider, $scope) {
    $routeProvider/*.when('/', {
        controller: "BookListCtrl",
        templateUrl: "views/bookList.html",
    })*/.when('/login', {
        cache:'false',
        controller: "LoginCtrl",
        templateUrl: "views/login.html"
    }).when('/bookList', {
        cache:'false',
    	templateUrl: 'views/bookList.html',
    	controller: 'BookListCtrl'
    }).when('/lend', {
        cache:'false',
    	templateUrl: 'views/lend.html',
    	controller: 'LendCtrl'
    }).when('/reservation', {
        cache:'false',
    	templateUrl: 'views/reservation.html',
    	controller: 'ReservationCtrl'
    }).when('/adminBook', {
        cache:'false',
    	templateUrl: 'views/adminBook.html',
    	controller: 'AdminBookCtrl'
    }).when('/adminUser', {
        cache:'false',
    	templateUrl: 'views/adminUser.html',
    	controller: 'AdminUserCtrl'
    }).when('/newBook', {
        cache:'false',
        templateUrl: 'views/newBook.html',
        controller: 'NewBookCtrl'
    }).when('/newUser', {
        cache:'false',
        templateUrl: 'views/newUser.html',
        controller: 'NewUserCtrl'
    }).when('/byAuthor', {
        templateUrl: 'views/byAuthor.html',
        controller: 'ByAuthorCtrl'
    }).when('/byDate', {
        templateUrl: 'views/byDate.html',
        controller: 'ByDateCtrl'
    }).when('/byZTFL', {
        templateUrl: 'views/byZTFL.html',
        controller: 'ByZTFLCtrl'
    }).when('/byPress', {
        templateUrl: 'views/byPress.html',
        controller: 'ByPressCtrl'
    }).when('/editBook', {
        templateUrl: 'views/editBook.html',
        controller: 'EditBookCtrl'
    }).when('/editUser', {
        templateUrl: 'views/editUser.html',
        controller: 'EditUserCtrl'
    }).when('/adminAll', {
        templateUrl: 'views/adminall.html',
        controller: 'AdminAllCtrl'
    })
    .otherwise({ redirectTo: '/login' })
}]);