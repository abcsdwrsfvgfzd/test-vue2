<!--
 * @Author: your name
 * @Date: 2021-02-25 17:09:27
 * @LastEditTime: 2021-02-26 17:55:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\views\table\index.vue
-->
<template>
  <div class="table">
    <div class="top">
      <el-button @click="addData">添加</el-button>
      <el-button @click="editData" :disabled="editChange">修改</el-button>
      <el-button @click="dels" :disabled="delChange">批量删除</el-button>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="inp"
        @keyup.native.enter="searchUser"
      ></el-input>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column type="index" width="60" label="序号"> </el-table-column>
      <el-table-column label="ID" width="120" prop="id">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sign" label="签名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="city" label="城市" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="integral" label="积分" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="operationTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id">
          <el-input
            v-model="ruleForm.id"
            autocomplete="off"
            :disabled="disabledChange"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="签名" prop="sign">
          <el-input v-model="ruleForm.sign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="ruleForm.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="ruleForm.integral" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operationTitle: "新增" /*  */,
      disabledChange: true,
      editChange: true,
      delChange: true,
      input: "",
      tableData: [],
      cloneTableData: [],
      checkList: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        name: "",
        email: "",
        sign: "",
        sex: "",
        city: "",
        integral: ""
      },
      locStor: window.localStorage,
      rules: {
        id: [{ required: true, message: "请输入ID" }],
        name: [{ required: true, message: "请输入用户名" }],
        email: [{ required: true, message: "请输入邮箱" }],
        sign: [{ required: true, message: "请输入签名" }],
        sex: [{ required: true, message: "请输入性别" }],
        city: [{ required: true, message: "请输入所在城市" }],
        integral: [{ required: true, message: "请输入积分" }]
      }
    };
  },
  mounted() {
    this.tableData = JSON.parse(this.locStor.getItem("userData"));
    // console.log(this.tableData);
  },
  methods: {
    handleSelectionChange(list) {
      // console.log(list);
      this.checkList = list;
      if (list.length == 0) {
        this.delChange = true;
        this.editChange = true;
      } else if (list.length == 1) {
        this.editChange = false;
        this.delChange = false;
      } else {
        this.delChange = false;
        this.editChange = true;
      }
    },
    handleEdit(index, row) {
      //编辑每行
      this.ruleForm.id = row.id;
      this.ruleForm.name = row.name;
      this.ruleForm.email = row.email;
      this.ruleForm.sign = row.sign;
      this.ruleForm.sex = row.sex;
      this.ruleForm.city = row.city;
      this.ruleForm.integral = row.integral;
      this.dialogVisible = true;
      console.log(index, row);
      this.operationTitle = "修改";
    },
    checkEdit() {
      if (this.operationTitle == "修改") {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == this.ruleForm.id) {
            this.tableData[i] = this.ruleForm;
            this.$set(this.tableData[i], "name", this.ruleForm.name);
            this.$set(this.tableData[i], "email", this.ruleForm.email);
            this.$set(this.tableData[i], "sign", this.ruleForm.sign);
            this.$set(this.tableData[i], "sex", this.ruleForm.sex);
            this.$set(this.tableData[i], "city", this.ruleForm.city);
            this.$set(this.tableData[i], "integral", this.ruleForm.integral);
            this.tableData = JSON.parse(JSON.stringify(this.tableData));
            this.locStor.setItem("userData", JSON.stringify(this.tableData));
            this.dialogVisible = false;
            return;
          }
        }
      } else if (this.operationTitle == "新增") {
        this.addNew();
      }
    },
    //删除
    handleDelete(index, row) {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == row.id) {
          this.tableData.splice(i, 1);
          this.locStor.setItem("userData", JSON.stringify(this.tableData));
          return;
        }
      }
      console.log(1);
    },
    //
    addData() {
      this.dialogVisible = true;
      this.disabledChange = false;
      this.operationTitle = "新增";
      this.ruleForm = {
        id: "",
        name: "",
        email: "",
        sign: "",
        sex: "",
        city: "",
        integral: ""
      };
      console.log(this.ruleForm);
    },
    //添加
    addNew() {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.tableData.push(this.ruleForm);
          this.dialogVisible = false;
          this.locStor.setItem("userData", JSON.stringify(this.tableData));
        } else {
          this.$message.error("数据不完整");
        }
      });
    },
    //上修改
    editData() {
      this.dialogVisible = true;
      this.operationTitle = "修改";
      this.ruleForm.id = this.checkList[0].id;
      this.ruleForm.name = this.checkList[0].name;
      this.ruleForm.email = this.checkList[0].email;
      this.ruleForm.sign = this.checkList[0].sign;
      this.ruleForm.sex = this.checkList[0].sex;
      this.ruleForm.city = this.checkList[0].city;
      this.ruleForm.integral = this.checkList[0].integral;
      console.log(this.checkList.id);
      console.log(this.checkList);
    },
    //批量删除
    dels() {
      for (var i = 0; i < this.tableData.length; i++) {
        for (var j = 0; j < this.checkList.length; j++) {
          if (this.checkList[j].id == this.tableData[i].id) {
            this.tableData.splice(i, 1);
            i = i - 1 < 0 ? 0 : i - 1;
          }
        }
      }
      this.locStor.setItem("userData", JSON.stringify(this.tableData));
    },
    searchUser() {
      if (this.input === "") {
        console.log(this.cloneTableData);
        this.tableData = this.cloneTableData;
      } else {
        this.tableData =
          this.cloneTableData.length > 0
            ? this.cloneTableData
            : this.tableData;
        console.log(this.tableData);
        var searchedArr = [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name.indexOf(this.input) !== -1) {
            var getName = this.tableData[i];
            searchedArr.push(getName);
          }
        }
        this.cloneTableData = this.tableData;
        this.tableData = searchedArr;
        this.input = "";
      }
    }
  }
};
</script>

<style>
.inp {
  width: 220px;
}
</style>
