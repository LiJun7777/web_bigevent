$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 定义layui元素
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var possword = $('.reg-box input[name=password]').val()
            if (value !== possword) {
                return '两次密码不一致'
            }
        }
    })

    // 注册信息
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            
            // console.log(res.message);
            layer.msg(res.message);
            if (res.status === 0) {
                $('#link_login').click()
            }
        })
        
    })

    //登录
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/login', $(this).serialize(), function(res) {

            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            localStorage.setItem('token', res.token)
            layer.msg('登录成功')
            // console.log(res.token);
            location.href = '/index.html'
        })
    })
    

});