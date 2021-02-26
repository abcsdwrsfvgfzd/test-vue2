/* * @Author: your name * @Date: 2021-02-25 09:17:38 * @LastEditTime: 2021-02-25
09:17:39 * @LastEditors: Please set LastEditors * @Description: In User Settings
Edit * @FilePath: \my-project\src\views\register\index.js */
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击注册</el-button>

    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>
      
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">注册</el-button>
        <el-button @click="dialogVisible = false">我有账号，我要登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var valiUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      var reg = /^[a-zA-Z0-9]{6,18}$/gi;
      if (reg.test(value) == false) {
        callback(new Error("输入错误"));
      } else {
        callback();
      }
    };
    var valiPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }

      if (value.length < 6) {
        callback(new Error("密码太短"));
      } else if (value.length > 16) {
        callback(new Error("密码太长"));
      } else {
        callback();
      }
    };
    var valiCheckpwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (this.ruleForm.password !== this.ruleForm.checkPass) {
        callback(new Error("输入密码不一致"));
      } else {
        callback();
      }
    };
    var valiEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      var reg = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com/gi;
      if (reg.test(value) == false) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var valiName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }

      if (value.length < 2) {
        callback(new Error("昵称太短"));
      } else if (value.length > 16) {
        callback(new Error("昵称太长"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        user: "",
        password: "",
        checkPass: "",
        email: "",
        name: ""
      },
      rules: {
        user: [{ validator: valiUser, trigger: "blur" }],
        password: [{ validator: valiPwd, trigger: "blur" }],
        checkPass: [{ validator: valiCheckpwd, trigger: "blur" }],
        email: [{ validator: valiEmail, trigger: "blur" }],
        name: [{ validator: valiName, trigger: "blur" }]
      }
    };
  },
  methods:{
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
};
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  width: 80%;
  margin-left: 8%;
}
</style>