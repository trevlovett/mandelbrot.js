var MAX_WIDTH = 180;
var MAX_HEIGHT = 100;


function render(min_i, max_i, prec_i, min_r, max_r, prec_r, max_iter, div, palette) {
    //var palette = palette_str.split('');

    var html_buffer = [];
    var idx = 0;
    html_buffer[idx++] = '<pre>';

    for (var i = min_i; i <= max_i; i += prec_i) {
        for (var r = min_r; r <= max_r; r += prec_r) {
            var z_r = r;
            var z_i = i;
            var is_inside = true;
            var iter;
            for (iter = 0; iter < max_iter; iter++) {
                z_r2 = z_r*z_r;
                z_i2 = z_i*z_i;
                z_mag = z_r2 + z_i2;

                if (z_mag > 4.0) {
                    is_inside = false;
                    break;
                }
                z_i = 2*z_r*z_i + i;
                z_r = z_r2 - z_i2 + r;
            }
            if (is_inside == true) {
                html_buffer[idx++] = ' ';
            }
            else {
                html_buffer[idx++] = palette[iter % (palette.length - 1)];
            }
        }
        html_buffer[idx++] = '\n';
    }
    html_buffer[idx++] = '</pre>';
    div.html(html_buffer.join(''));
}

var inc = 10.0;
var div = null; 
var vx = 0; 
var vy = 0;
var tx = 0;
var ty = 0;
var damping = 0.7;
var palette = "!@#$%^&*()_8{}?".split('');

$(document).ready(function() {
    div = $('#content');
    var scale_factor = 0.97;
    var render_interval_id = setInterval(function() { 
        zoom(inc); 
        inc *= scale_factor;
        if (inc < 0.0000001) { 
            scale_factor = 1.03;
        }
        if (inc >= 4) {
            scale_factor = 0.97;
        }
    }, 50);
});

function zoom(inc) {
    zoom_i = 0.02817533977921104899;
    i_len = 2.4 * inc;
    var min_i = zoom_i - i_len * 0.5;
    var max_i = zoom_i + i_len * 0.5;
    var prec_i = 6 *  i_len / $(window).height(); 

    zoom_r = -1.74006238257933990522;
    r_len = 3 * inc;
    var min_r = zoom_r - r_len * 0.5; 
    var max_r = zoom_r + r_len * 0.5;
    var prec_r = 4 * r_len / $(window).width(); // 5.2

    render(min_i, max_i, prec_i, min_r, max_r, prec_r, 50, div, palette);
}
