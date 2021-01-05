$(function(){
    // ========================= 登录 注册的切换效果 =========================
    // 去注册账号
    $('#gotoRegi').click(function(){
        

        // 登录注册整个页面
        $('.register').show()
        $('.login').hide()
    })
        // 去登录账号
    $('#gotoLogin').click(function(){
        
      //登录注册整个页面
        $('.login').show()
        $('.register').hide()
    })


    // 校验功能
    let form = layui.form;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
       

        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repwd:function(value){
            let pwd=$('.register [name=password]').val()
            if(value!==pwd){
                return '密码不一致'
            }
        },
            
      });  
  // ========================== 实现注册功能 ==========================
    // 从layui中获取到layer
  let layer = layui.layer;  
 $('#registerForm').on('submit',function(e){
   e.preventDefault()
  
   let fd= $(this).serialize()
   $.ajax({
     type:"POST",
     url:'http://ajax.frontend.itheima.net/api/reguser',
     data:fd,
     success:function(res){
     if(res.status===1){
       console.log(0);
     return layer.msg(res.message);
     }
     layer.msg('注册成功')
     $('#gotoLogin').click()
     }
   })
 })

// ========================== 实现登录功能 ==========================
$('#loginFormdata').on('submit',function(e){
 e.preventDefault();
 let fd= $(this).serialize()
 $.ajax({
   type:'POST',
   url:'http://ajax.frontend.itheima.net/api/login',
   data:fd,
   success:function(res){
   if(res.status!==0){
   return layer.msg(res.message)
   }

   //延时效果
   localStorage.setItem('token',res.token)
   layer.msg('登录成功',
   {
     time:2000
   },
   function(){
     location.href='index.html'
   }
   )
   }

 })
})
})