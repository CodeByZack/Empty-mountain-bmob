<template>
<!-- :rules Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2('loginForm')" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Bmob from '../api/api';
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: 'admin',
          checkPass: '123456'
        },
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(formName) {
        let self = this;        
        Bmob.login(this.loginForm.account,this.loginForm.checkPass)
        .then(function(res){
          //登录成功！
          self.$router.push('/article');
        })
        .catch(function(err){
          //登录出错！
          alert("登录出错！")
        });
      }
    },
    mounted(){
      let currentUser = Bmob.instance.User.current();
      if(currentUser == null){
        console.log('未登录状态!');
      }else{
        console.log(currentUser);
      }
    }
  }

</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 300px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;  
  }
  .login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }
</style>