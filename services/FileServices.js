var mkdirp = require('mkdirp');
var path = require('path');


exports.makerootdir = function (name) {

    appRoot = path.resolve(__dirname);
    var currpath = "./user_files/"+name;
    console.log("Make directory on path :" + currpath);
    mkdirp(currpath, function (err) {
        if (err) console.error(err);
        else console.log('pow!');
    });
};


exports.makedir = function(name,path){
    var currpath = "./user_files/"+path;
    console.log("Making directory on path :" + currpath);
    mkdirp(currpath, function (err) {
        if (err) console.error(err);
        else console.log('pow!');
    });
}

exports.ls = function (path) {
    const fs = require('fs');
    if(path != null)
    var currpath = "./user_files/"+path;
    else
        var currpath = "./user_files/"+name+'/'+path;
    fs.readdirSync(currpath, function(err, items) {
        console.log(currpath)
        if (err) {
             console.log(err);
        }
        for (var i=0; i<items.length; i++) {
            var file = currpath + '/' + items[i];
            console.log("Start: " + file);

            fs.stat(file, function(err, stats) {
                console.log(file);
                console.log(stats["size"]);
            });
            }
        });
};
