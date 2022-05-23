$(function() {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            
            layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if ( res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            //渲染用户头像
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(user) {

    //获取用户名称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}