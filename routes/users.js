var express = require('express');
var router = express.Router();
var ex;
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/runcode', function (req, res, next) {
    lang = req.body.lang;
    code = req.body.code;
    input = req.body.input;
    username = req.session.username;
    // res.send(lang + code + custominput);
    switch (lang) {
        case "java":
            runjava(lang, code, input, res, username);
            break;
        case "c":
            runc(lang, code, input, res, username);
            break;
        case "c++":
            runcpp(lang, code, input, res, username);
            break;
    }
});

function runcpp(lang, code, input, res, username) {
    mainpath = "./user_files/" + username;
    var fs = require('fs');
    var uuid = require('node-uuid');
    inputname = uuid.v4();
    filename = uuid.v4();
    fs.writeFile(filename + ".cpp", code, function (err) {
        if (err) {

        }
        fs.writeFile(inputname + ".txt", input, function (err) {
            if (err) {

            }
            var sys = require('sys')

            var exec = require('child_process').exec;

            var child;
            //"gcc "+ "user_files/"+username+"/temp.cpp"
            child = exec("g++ -o " + filename + " " + filename + ".cpp", function (error, stdout, stderr) {

                console.log('stdout: ' + stdout);

                console.log('stderr: ' + stderr);

                if (error !== null) {

                    console.log('exec error: ' + error);
                }
                if (stderr == "") {

                    console.log("Running : " + "./" + filename + " < " + inputname + ".txt")
                    child = exec("./" + filename + " < " + inputname + ".txt",{timeout:10000}, function (error, stdout, stderr) {

                        console.log('stdout: ' + stdout);

                        console.log('stderr: ' + stderr);

                        if (error !== null) {

                            res.send("Timeout Please Optimize / Debug your Code");
                            try {
                                fs.unlinkSync(filename + ".cpp");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename);
                            }
                            catch (e) {

                            }
                        }
                        else {
                            res.send(stdout);
                            try {
                                fs.unlinkSync(filename + ".cpp");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename);
                            }
                            catch (e) {

                            }
                        }

                    });
                    setTimeout(function () {
                        child.kill()
                    }, 5000);
                }
                else {
                    res.send(stderr);
                    try {
                        fs.unlinkSync(filename + ".cpp");
                        fs.unlinkSync(inputname + ".txt");
                        fs.unlinkSync(filename);

                    }
                    catch (e) {

                    }
                }


            });


        });
    });

}


function runjava(lang, code, input, res, username) {
    mainpath = "./user_files/" + username;
    var fs = require('fs');
    var uuid = require('node-uuid');
    inputname = uuid.v4();
    // filename = uuid.v4();
    filename = "spit_judge";
    fs.writeFile(filename + ".java", code, function (err) {
        if (err) {

        }
        fs.writeFile(inputname + ".txt", input, function (err) {
            if (err) {

            }
            var sys = require('sys')

            var exec = require('child_process').exec;

            var child;
            //"gcc "+ "user_files/"+username+"/temp.cpp"
            child = exec("javac " + filename + ".java", function (error, stdout, stderr) {

                console.log('stdout: ' + stdout);

                console.log('stderr: ' + stderr);

                if (error !== null) {

                    console.log('exec error: ' + error);
                }
                if (stderr == "") {

                    console.log("Running : " + "./" + filename + " < " + inputname + ".txt")
                    child = exec("java " + filename + " < " + inputname + ".txt", {timeout:10000} , function (error, stdout, stderr) {

                        console.log('stdout: ' + stdout);

                        console.log('stderr: ' + stderr);

                        if (error !== null) {

                            res.send("Timeout Please Optimize / Debug your Code");
                            try {
                                fs.unlinkSync(filename + ".java");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename.class);

                            }
                            catch (e) {

                            }
                        }
                        else {
                            res.send(stdout);
                            try {
                                fs.unlinkSync(filename + ".java");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename.class);

                            }
                            catch (e) {

                            }
                        }


                    });
                    setTimeout(function () {
                        child.kill()
                    }, 5000);
                }
                else {
                    res.send(stderr);
                    try {
                        fs.unlinkSync(filename + ".java");
                        fs.unlinkSync(inputname + ".txt");
                        fs.unlinkSync(filename.class);
                    }
                    catch (e) {

                    }

                }


            });


        });
    });

}


function runc(lang, code, input, res, username) {
    mainpath = "./user_files/" + username;
    var fs = require('fs');
    var uuid = require('node-uuid');
    inputname = uuid.v4();
    filename = uuid.v4();
    fs.writeFile(filename + ".c", code, function (err) {
        if (err) {
        }
        fs.writeFile(inputname + ".txt", input, function (err) {
            if (err) {
            }
            var sys = require('sys')
            var exec = require('child_process').exec;
            var child;
            //"gcc "+ "user_files/"+username+"/temp.cpp"
            child = exec("gcc -o " + filename + " " + filename + ".c", function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                if (stderr == "") {
                    console.log("Running : " + "./" + filename + " < " + inputname + ".txt")
                    child = exec("./" + filename + " < " + inputname + ".txt", {timeout:10000},function (error, stdout, stderr) {

                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                            res.send("Timeout Please Optimize / Debug your Code");
                            try {
                                fs.unlinkSync(filename + ".c");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename);

                            }
                            catch (e) {
                            }
                        }
                        else {
                            res.send(stdout);
                            exec = "1";
                            try {
                                fs.unlinkSync(filename + ".c");
                                fs.unlinkSync(inputname + ".txt");
                                fs.unlinkSync(filename);

                            }
                            catch (e) {
                            }

                            console.log(child.pid);
                        }
                        });


                }
                else {
                    res.send(stderr);
                    try {
                        fs.unlinkSync(filename + ".c");
                        fs.unlinkSync(inputname + ".txt");
                        fs.unlinkSync(filename);

                    }
                    catch (e) {
                    }
                }
            });
        });
    });
}


module.exports = router;
