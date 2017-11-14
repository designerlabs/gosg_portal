var cd;

define(["require", "exports"], function (require, exports) {
    // Create Captcha
    function CreateCaptchas() {
        var code = document.getElementById("CapCodes");
        if(code){        
            var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
            var i;
            for (i = 0; i < 6; i++) {
                var a = alpha[Math.floor(Math.random() * alpha.length)];
                var b = alpha[Math.floor(Math.random() * alpha.length)];
                var c = alpha[Math.floor(Math.random() * alpha.length)];
                var d = alpha[Math.floor(Math.random() * alpha.length)];
                var e = alpha[Math.floor(Math.random() * alpha.length)];
                var f = alpha[Math.floor(Math.random() * alpha.length)];
            }
            cd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;

            $('.CaptchaImageCodes').empty().append('<canvas id="CapCodes" class="capcode" width="120" height="40"></canvas>');
            var c = document.getElementById("CapCodes");
            var ctx = c.getContext("2d");
            var x = c.width / 2;
            var img = new Image();
            img.src = "../assets/images/captcha-pattern.jpg";
            img.onload = function () {
                $("#WrongCaptchaError").css('display', 'none');
                var pattern = ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.font = "20px Roboto Slab";
                ctx.fillStyle = '#ccc';
                ctx.textAlign = 'center';
                //ctx.setTransform(0, -0.12, 0, 1, 0, 15);
                ctx.fillText(cd, x, 30);
            };
        }
    }

    function getCaptcha() {
        var str1 = removeSpaces(cd);
        // $('#rCaptcha').val(str1);
        if(str1 != ""){
            document.getElementById('rCaptcha').setAttribute('data-val', str1);
        }
        
        //   return cd;
    }

    exports.CreateCaptchas = CreateCaptchas;
    exports.getCaptcha = getCaptcha;

});
// Validate Captcha
function ValidateCaptcha() {
    var string1 = removeSpaces(cd);
    var string2 = removeSpaces($('#UserCaptchaCode').val());
    if (string1 == string2) {
        //   return true;
        $('#WrongCaptchaError').hide();
    }
    else {
        $('#WrongCaptchaError').text('Wrong Text');
        $('#WrongCaptchaError').show();
    }
}
function ValidateCaptchaForg() {
    var string1 = removeSpaces(cd);
    var string2 = removeSpaces($('#UserCaptchaCodeForg').val());
    if (string1 == string2) {
        return true;
    }
    else {
        return false;
    }
}
function removeSpaces(string) {
    if(string){
        return string.split(' ').join('');
    }else{
        return ''
    }
    
}
//# sourceMappingURL=captcha.js.map