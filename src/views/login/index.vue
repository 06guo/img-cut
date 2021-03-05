<template>
  <div class="login">
    <div class="login-form">
      <h3 class="login-form-title">登录</h3>
      <div class="login-form-container">
        <fs-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          auto-complete="on"
        />
        <fs-input
          v-model="loginForm.password"
          type="password"
          :viewPassword="true"
          placeholder="请输入密码"
          name="password"
        />
        <fs-input
          v-model="loginForm.code"
          placeholder="请输入验证码"
          align="left"
          type="number">
          <template slot="suffix">
            <fs-button @click="getCode">短信验证</fs-button>
          </template>
        </fs-input>
      </div>
      <fs-button
        size="large"
        :fetch="handleLogin"
      >登录
      </fs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    showPwd () {},
    handleLogin () {},
    getCode () {}
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
