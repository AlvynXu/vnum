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
    cwd: argv.r || argv.root, //当前输入hello命令的目录
    configPath: argv.f || argv.file //读取当前命令目录下的配置文件路径
}, function(env) {
    //捕获命令行
    var command = argv["_"];
    console.log(env.cwd);
    console.log(env.configPath);
});