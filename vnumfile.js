/**
 * Created by Alvyn on 2017/2/23.
 */

var vnum = require('../vnum');
var path = ''; //input your folder path
//初始化vnum
vnum.init({
    'character engine' : 'utf-8',
    'view engine' : 'html',
    'replace type' : ['css','js'],
});

//启动vnum
vnum.start(path,function(err,msg){
    console.log(err);
    console.log(msg);
});