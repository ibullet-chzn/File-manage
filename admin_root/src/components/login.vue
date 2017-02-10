<template lang="html">
  <div class="login-box">
    <div class="login-logo">
      <div><b>Admin</b>LTE</div>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">欢迎登录XX后台管理系统</p>

      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="账户名" v-model="username">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="密码" v-model="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <!-- 用户协议 记住账号 -->
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="remember">记住我
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">登录</button>
        </div>
        <!-- /.col -->
      </div>

      <!-- 三方登录 -->
      <!--<div class="social-auth-links text-center">-->
      <!--<p>- OR -</p>-->
      <!--<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using-->
      <!--Facebook</a>-->
      <!--<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using-->
      <!--Google+</a>-->
      <!--</div>-->
      <!-- /.social-auth-links -->
      <br>
      <a href="javascript:void(0)">注册新账户</a>
      <a href="javascript:void(0)" class="f-right">忘记密码</a>
    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script lang="babel">
  import store from '../store';
  export default {
    name: 'hello',
    data () {
      return {
        username: '',
        password: '',
        remember: false
      }
    },
    beforeRouteEnter(to, from, next) {
      const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
      //next('/app/home');
      next(vm => {
        if (accountInfo) {
          vm.username = accountInfo.username;
          vm.remember = accountInfo.remember;
        }
      })
    },
    methods: {
      login: function () {
        this.$http.post('/api/login', {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.data.status === 0) {
            // 如果记住我 那就存储 username remember 到 localStorage
            if (this.remember) {
              localStorage.setItem('accountInfo', JSON.stringify({username: this.username, remember: this.remember}));
            } else {
              localStorage.setItem('accountInfo', null);
            }
            // 跳转到 home 页
            this.$router.push('/app/home');
          } else {
            console.log(res.data.errMessage);
          }
        }, err => {
          console.log(err);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login {
    padding: 100px;
  }

  .f-right {
    float: right;
  }
</style>
