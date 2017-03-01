/**
 * Created by Alvyn on 2017/2/23.
 */
var fs = require("fs");

/**
 * vnum 配置项
 * @type {{view engine: string, replace type: string[]}}
 */
var setting = {
    'character engine' : 'utf-8',
    'view engine' : 'html',
    'replace type': ['css','js'],
};
//版本号
var version = new Date().getTime();

var vnum = {};
var fileList = [];

/**
 * 自定义配置
 * @param engine 配置名
 * @param val
 * @returns {{view, engine: string, replace, type: string[]}}
 */
vnum.set = function(engine,val){
    switch (engine){
        case 'character engine':
            setting[engine] = val;break;
        case 'view engine' :
            setting[engine] = val;break;
        case 'replace type' :
            setting[engine] = val;break;
        default : break;
    }
    return setting;
};

/**
 * 修改 文件中的 css js 版本号
 * @param path
 * @param callBack
 */
vnum.task = function(path,callBack){
    if(!fs.existsSync(path)){
        return callBack("error",path+": node: No Such File Or Directory")
    };
    getFile(path);
    for(let i=0;i<fileList.length;i++){
        updateFile(fileList[i],function(err,path){
            if(err==200){
                callBack(200,"Add version success! \r\nPath : "+path);
            }else{
                callBack("error","Add version error! \r\n Path : "+path);
            }
        });
    }
};

/**
 * 清楚 文件中 css js 等尾部版本号
 * @param path
 * @param callBack
 */
vnum.clean = function(path,callBack){
    if(!fs.existsSync(path)){
        return callBack("error",path+": node: No Such File Or Directory")
    };
    getFile(path);
};

/**
 * 当前文件夹中获取所有 view engine 结尾的文件
 * @param path
 */
var getFile = function(path){
    fileList = [];
    if(fs.lstatSync(path).isDirectory()){
        var files = fs.readdirSync(path);
        for (let i=0;i<files.length;i++){
            getFile(path+'/'+files[i]);
        }
    }else{
        if(path.indexOf("."+setting['view engine'])>0){
            var count = fileList.length;
            fileList[count] = path;
        }
    }
};

/**
 * 添加版本号
 * @param path
 * @param callBack
 */
var updateFile = function(path,callBack){
    var data = fs.readFileSync(path,setting['character engine']);
    data = data.replace(new RegExp("\\?v=\\d{13}","gm"),"");
    for (let i=0;i<setting['replace type'].length;i++){
        data = data.replace(new RegExp("\\."+setting['replace type'][i],"gm"),"."+setting['replace type'][i]+"?v="+version);
    }
    fs.writeFile(path, data, function(err){
        if(err){
            callBack(err,path);
        }else{
            callBack("200",path);
        }
    });
};

/**
 * 删除版本号
 * @param path
 * @param callBack
 */
var deleteVnum = function(path,callBack){
    var data = fs.readFileSync(path,setting['character engine']);
    try{
        var reg = new RegExp("\\?v=\\d{13}","gm");
        data = data.replace(reg,"");
        if(reg.test(data)){
            callBack('-2',"删除失败");
        }
    }catch(e){
        callBack('-1',e);
    }
    callBack('200',data);
};

module.exports = vnum;