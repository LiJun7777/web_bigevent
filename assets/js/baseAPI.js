$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url


    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    
    options.complete = function(res) {
        if (res.responseJSON.status === 1 ) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})