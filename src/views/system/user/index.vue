<template>
  <el-card>
    <el-form :inline="true" class="user_form">
      <el-form-item label="登录名称:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="用户状态:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 2rem 0">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="primary">批量删除</el-button>
    <el-table border :data="userArr" style="margin: 3rem 0">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="userId"></el-table-column>
      <el-table-column label="用户名" align="center" prop="userName"></el-table-column>
      <el-table-column label="角色" align="center"></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
      ></el-table-column>
      <el-table-column label="用户状态" align="center" width="120px">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="'0'"
            :inactive-value="'1'"
            active-text="正常"
            inactive-text="停用"
            inline-prompt
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" :icon="User">分类角色</el-button>
          <el-button type="primary" size="small" :icon="Edit" @click="updateUser(row)"
            >编辑</el-button
          >
          <el-button type="primary" size="small" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      background
      layout="prev, pager, next,->,sizes,total"
      :total="total"
      @current-change="getHasUser"
      @size-change="handler"
    />
  </el-card>

  <!-- 抽屉结构：完成添加/更新用户 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParmams.userId ? "更新用户" : "新增用户" }}</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="登录账号:">
          <el-input
            placeholder="请输入登录账号"
            v-model="userParmams.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" v-if="!userParmams.userId">
          <el-input
            placeholder="请输入登录密码"
            v-model="userParmams.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input
            placeholder="请输入用户名称"
            v-model="userParmams.nickName"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input
            placeholder="请输入手机号码"
            v-model="userParmams.phonenumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input placeholder="请输入邮箱" v-model="userParmams.email"></el-input>
        </el-form-item>
        <el-form-item label="用户状态:" v-if="!userParmams.userId" prop="status">
          <el-switch
            v-model="userParmams.status"
            :active-value="'0'"
            :inactive-value="'1'"
            active-text="正常"
            inactive-text="停用"
            inline-prompt
          />
        </el-form-item>
        <el-form-item label="用户性别:" prop="sex">
          <el-select
            v-model="userParmams.sex"
            placeholder="请选择用户性别"
            style="width: 100%"
            clearable
          >
            <el-option label="男" :value="'0'" />
            <el-option label="女" :value="'1'" />
            <el-option label="未知" :value="'2'" />
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input
            placeholder="请输入邮箱"
            v-model="userParmams.dept!.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input placeholder="请输入邮箱" v-model="userParmams.postIds"></el-input>
        </el-form-item>
        <el-form-item label="角色:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input placeholder="请输入邮箱" v-model="userParmams.password"></el-input>
        </el-form-item>
        <el-form-item label="备注:&nbsp;&nbsp;&nbsp;&nbsp;">
          <el-input placeholder="请输入邮箱" v-model="userParmams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { listUser, reqUpdateUser, reqAddUser } from "@/api/user/index";
import { User, Edit, Delete } from "@element-plus/icons-vue";
import type { SysUser, SysUserResponse } from "@/api/user/type";
let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
// 定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false);

// 用户列表数组
let userArr = ref<SysUser[]>([]);

let userParmams = reactive<SysUser>({
  userName: "",
  password: "",
  nickName: "",
  status: "0",
  phonenumber: "",
  sex: "0",
});

onMounted(() => {
  getHasUser();
});
// 获取所有用户
const getHasUser = async (pager = 1) => {
  pageNo.value = pager;
  let result: SysUserResponse = await listUser(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.total;
    userArr.value = result.rows;
    console.log(userArr.value);
  }
};

const handler = () => {
  getHasUser();
};

const addUser = () => {
  Object.assign(userParmams, {
    userId: null,
    userName: "",
    password: "",
    nickName: "",
    status: "0",
    phonenumber: "",
    sex: "",
    dept: "",
  });
  // 显示抽屉
  drawer.value = true;
};
const updateUser = (row: SysUser) => {
  // 显示抽屉
  drawer.value = true;

  // 浅拷贝：Object.assign 只进行浅拷贝，如果对象中包含嵌套对象，复制的是引用
  // 响应式保持：对于 reactive 对象，使用 Object.assign 可以保持响应式
  // 属性覆盖：源对象的属性会覆盖目标对象的同名属性
  Object.assign(userParmams, row);
};

const save = async () => {
  if (userParmams.userId) {
    // userId存在，执行更新
    let result = await reqUpdateUser(userParmams);
    console.log("更新结果:", result);
  } else {
    // userId不存在，执行添加
    let result = await reqAddUser(userParmams);
    console.log("添加结果:", result);
  }
};
const cancel = () => {
  // 关闭抽屉
  drawer.value = false;
};
</script>

<style scoped lang="scss">
.user_form {
}
</style>
