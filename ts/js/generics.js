//泛型: 可以支持不特定的数据类型, 要求:传入的参数和返回的参数一致
//T标识泛型, 具体什么类型是调用这个方法时候决定的
function getData(value) {
    return value;
}
getData(123);
getData("asd");
//----------------------------------------检验参数为number类型
var Minclass = /** @class */ (function () {
    function Minclass() {
        this.list = [];
    }
    Minclass.prototype.add = function (num) {
        this.list.push(num);
    };
    Minclass.prototype.min = function () {
        var minnum = this.list[0];
        this.list.forEach(function (i) {
            if (minnum > i) {
                minnum = i;
            }
        });
        return minnum;
    };
    return Minclass;
}());
var s = new Minclass();
s.add(1);
s.add(2);
console.log(s.min); // 1
//---------------------------------------------------泛型类, 动态检验类的参数类型和返回类型
var Minclass2 = /** @class */ (function () {
    function Minclass2() {
        this.list = [];
    }
    Minclass2.prototype.add = function (num) {
        this.list.push(num);
    };
    Minclass2.prototype.min = function () {
        var minnum = this.list[0];
        this.list.forEach(function (i) {
            if (minnum > i) {
                minnum = i;
            }
        });
        return minnum;
    };
    return Minclass2;
}());
var m1 = new Minclass2();
m1.add(11);
m1.add(2);
console.log(m1.min); // 2
//------------------------------------------------------泛型类, 将类当做泛型,去检验类的参数
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var mysqlDb = /** @class */ (function () {
    function mysqlDb() {
    }
    mysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    return mysqlDb;
}());
var u = new User();
u.userName = "张三";
u.password = "123456";
var Db = new mysqlDb(); //-------------检验参数为User泛型
Db.add(u);
//定义ArticleCate 用于校验mysqlDb类传入的参数
var ArticleCate = /** @class */ (function () {
    function ArticleCate(params) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status;
    }
    return ArticleCate;
}());
var a = new ArticleCate({
    title: '老王的发展史',
    desc: '老王的发展史',
    status: true,
});
var Db2 = new mysqlDb(); //-------------检验参数为ArticleCate泛型
Db2.add(a);
//-----------------------------类实现接口
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDb;
}());
var Users = /** @class */ (function () {
    function Users() {
    }
    return Users;
}());
var users = new Users();
users.username = '老实人';
users.password = '123123';
var oMysqldb = new MysqlDb(); //Users作为泛型检验MysqlDb的数据
oMysqldb.add(users);
