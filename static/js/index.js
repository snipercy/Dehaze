
var debug = 0;
var show = 1;

function check(obj) {
    if (obj.id == 'debug' && obj.checked == true) {
        document.getElementById('r').checked = false;
        document.getElementById('show').checked = false;
        show = 0;
        debug = 1;
    } else if (obj.id == 'r' && obj.checked == true) {
        document.getElementById('debug').checked = false;
        document.getElementById('show').checked = false;
        debug = 0;
        show = 0;
    } else if (obj.id == 'show' && obj.checked == true) {
        document.getElementById('debug').checked = false;
        document.getElementById('r').checked = false;
        show = 1;
        debug = 0;

    }
}

function preImg(sourceId, targetId) {
    if (typeof FileReader === 'undefined') {
        alert('Your browser does not support FileReader...');
        return;
    }
    var reader = new FileReader();

    reader.onload = function(e) {
        var img = document.getElementById(targetId);
        img.src = this.result;
    }

    // 获取文件名
    // alert(document.getElementById(sourceId).files[0].name);
    img = sourceId; //设置全局变量
    reader.readAsDataURL(document.getElementById(sourceId).files[0]);
}

$(document).ready(function() {
      $("#imgPre").click(function() {

        if (show == 1) {
            // 正则 获取img中图片名称
            var imgName = document.getElementById(img).files[0].name;
            // alert(imgName);

            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;

            $('#guided_t1').html("");
            $('#res1').html("");
            $('#dark1').html("");
            $('#dark1').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
            // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
            $('#guided_t1').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
            $('#res1').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');

        } else {
            // 正则 获取img中图片名称
            var imgName = document.getElementById(img).files[0].name;
            // alert("Dehazing...");

            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            // dark channel path_d,path_t,path_gt,path_res)
            $.get("/darkChannel/", {
                    //$.get("/darkChannel/", {
                    'func': 'darkChannel',
                    'image': imgName,
                    'path_d': path_d,
                    'path_t': path_t,
                    'path_gt': path_gt,
                    'path_res': path_res,
                    'debug': debug,
                },
                function(ret) {
                    if (debug == 1) {
                        // alert("debyg");
                        $('#guided_t1').html("");
                        $('#res1').html("");
                        $('#dark1').html("");
                        $('#dark1').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
                        // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
                        $('#guided_t1').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
                        $('#res1').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    } else{

                        $('#guided_t1').html("");
                        $('#res1').html("");
                        $('#dark1').html("");
                        $('#res1').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    }
                })

        }
    });


    // pic1
    $("#pic1").click(function() {


        // $('#dark').append('<img src="http://192.168.1.101:8001/0002_2743062131.jpg" " HEIGHT="" , width=250 >');

        if (show == 1) {
            $('#guided_t').html("");
            $('#res').html("");
            $('#dark').html("");
            var name = document.getElementById("pic1").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;


            $('#dark').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
            $('#guided_t').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
            $('#res').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
        } else {


            // 正则 获取img中图片名称
            var name = document.getElementById("pic1").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
            // alert(imgName);

            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            // dark channel path_d,path_t,path_gt,path_res)
            $.get("/darkChannel/", {
                    //$.get("/darkChannel/", {
                    'func': 'darkChannel',
                    'image': imgName,
                    'path_d': path_d,
                    'path_t': path_t,
                    'path_gt': path_gt,
                    'path_res': path_res,
                    'debug': debug,
                },
                function(ret) {
                    // alert(debug);
                    if (debug == 1) {
                        $('#dark').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
                        // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
                        $('#guided_t').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
                        $('#res').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    } else {
                        $('#guided_t').html("");
                        $('#res').html("");
                        $('#dark').html("");
                        $('#res').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    }
                })
        }

    });

    //pic2 process
    $("#pic2").click(function() {

        // 正则 获取img中图片名称
        if (show == 1) {
            var name = document.getElementById("pic2").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            $('#guided_t2').html("");
            $('#res2').html("");
            $('#dark2').html("");
            $('#dark2').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
            $('#guided_t2').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
            $('#res2').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
        } else {
            // dark channel path_d,path_t,path_gt,path_res)
            var name = document.getElementById("pic2").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];

            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            $('#guided_t2').html("");
            $('#res2').html("");
            $('#dark2').html("");
            $.get("/darkChannel/", {
                    //$.get("/darkChannel/", {
                    'func': 'darkChannel',
                    'image': imgName,
                    'path_d': path_d,
                    'path_t': path_t,
                    'path_gt': path_gt,
                    'path_res': path_res,
                    'debug': debug,
                },
                function(ret) {
                    if (debug == 1) {
                        $('#dark2').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
                        // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
                        $('#guided_t2').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
                        $('#res2').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    } else
                        $('#res2').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');

                })
        }
    });

    //pic3
    $("#pic3").click(function() {

        if (show == 1) {
            var name = document.getElementById("pic3").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            $('#guided_t3').html("");
            $('#res3').html("");
            $('#dark3').html("");
            $('#dark3').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
            // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
            $('#guided_t3').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
            $('#res3').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');

        } else {
            // 正则 获取img中图片名称
            var name = document.getElementById("pic3").src;
            var imgName = name.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
            // alert(imgName);

            var path_d = 'dark_' + imgName;
            var path_t = 't_' + imgName;
            var path_gt = 'gt_' + imgName;
            var path_res = 'res_' + imgName;
            $('#guided_t3').html("");
            $('#res3').html("");
            $('#dark3').html("");
            // dark channel path_d,path_t,path_gt,path_res)
            $.get("/darkChannel/", {
                    //$.get("/darkChannel/", {
                    'func': 'darkChannel',
                    'image': imgName,
                    'path_d': path_d,
                    'path_t': path_t,
                    'path_gt': path_gt,
                    'path_res': path_res,
                    'debug': debug,
                },
                function(ret) {
                    if (debug == 1) {
                        $('#dark3').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
                        // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
                        $('#guided_t3').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
                        $('#res3').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                    } else
                        $('#res3').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                })

        }
    });

});

// choose file

// choose pic to process
$(document).ready(function() {
    $("#dehaze1").click(function() {

        $('#result').html('') //清空前面的结果

        var imgName = document.getElementById(img).files[0].name;
        // alert(imgName);
        var path_d = 'dark_' + imgName;
        var path_t = 't_' + imgName;
        var path_gt = 'gt_' + imgName;
        var path_res = 'res_' + imgName;
        $('#guided_t1').html("");
        $('#res1').html("");
        $('#dark1').html("");
        // dark channel path_d,path_t,path_gt,path_res)
        $.get("/darkChannel/", {
                //$.get("/darkChannel/", {
                'func': 'darkChannel',
                'image': imgName,
                'path_d': path_d,
                'path_t': path_t,
                'path_gt': path_gt,
                'path_res': path_res,
                'debug': debug,
            },
            function(ret) {
                if (debug == 1) {
                    $('#dark1').append('<img src="/static/image/dark/' + path_d + '" " HEIGHT="" , width=250 >');
                    // $('#rough_t').append('<img src="/static/image/transimission/' + path_t+ '" " HEIGHT="400" , width="200" >');
                    $('#guided_t1').append('<img src="/static/image/transimission/' + path_gt + '" " HEIGHT="" , width=250 >');
                    $('#res1').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');
                } else
                    $('#res1').append('<img src="/static/image/res/' + path_res + '" " HEIGHT="" , width=250 >');

            })

    });
});
//test
$(document).ready(function() {
    $("#hhhh").click(function() {

        $('#result').html('') //清空前面的结果

        var imgName = document.getElementById(img).files[0].name;
        var output = 't_' + imgName;
        // alert(output);
        $.get("/getT/", {
            'func': 'getT',
            'image': imgName,
            'output': output
        }, function(ret) {
            $('#dark').append('<img src="/static/image/dark/' + output + '" " HEIGHT="230" , width="200" >');
        })
    });
});

    //choose pic
$(document).ready(function() {

});

