#!/usr/bin/env node
/**
 * Created by shwexTest on 2017/2/24.
 */
//加载引用命令工具的第三方插件包
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));

//实例化一个命令行工具
var cli = new Liftoff({
    name: 'vnum', // 命令名字
    processTitle: 'vnum', //同上即可
    moduleName: 'vnum', //同上即可
    configName: 'vnumfile', //配置文件名称
    // 设置为支持js后缀
    extensions: {
        '.js': null
    }
});

//启动命令
cli.launch({
    cwd: argv.r || argv.root,
    configPath: argv.f || argv.file
}, function(env) {
    //捕获命令行
    if(!env.configPath){
        return console.log(env.cwd + "\\vnumfile.js: node: No such file or directory");
    }
    if(argv.path!=undefined){
        var path = env.cwd + "\\" + argv.path;
        console.log(path);
    }
    console.log(env.configPath);
    var vnum = require(env.configPath);
});