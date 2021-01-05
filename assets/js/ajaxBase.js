$.ajaxPrefilter(function(options){
    options.url="http://api-breakingnews-web.itheima.net"+options.url
    if(options.url.indexOf('/my/')!==-1){
        options.header={
            Authorization:localStorage.getItem('token')
        }
    }
})

// 控制用户访问权限
options.complete=function(xhr){
    if(xhr.responseJSON.status===1&&xhr.responseJSON.message==='身份认证失败'){
        localStorage.removeItem('token')
        location.href='login.href'
    }
}