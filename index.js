#!/usr/bin/env node
/**
 * Created by Alvyn on 2017/2/23.
 */
var vnum = require('./vnum');
vnum.set('view engine','phtml');
vnum.set('replace type',['css','js']);
var index = {};

/**
 * init module vnum
 * @param setting: key include view engine, replace type
 */
index.init = function(setting){
    for(var key in setting) {
        vnum.set(key,setting[key]);
    }
};

/**
 * start vnum
 * @param path : view path
 * @param callBack
 */
index.start = function(path,callBack){
    vnum.task(path,function(err,msg){
        callBack(err,msg);
    });
};

module.exports = index;