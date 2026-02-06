<template>
  <div>
    <el-dialog v-model="visible" title="登录" width="300" center>
      <el-form status-icon ref="loginForms">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            :loading="loading"
            type="primary"
            @click="login"
            style="width: 100%"
          >
            登录
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ElNotification } from "element-plus";

// 引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
// 定义变量控制按钮加载效果
let loading = ref(false);
const loginForms = ref();
const loginForm = reactive({
  username: "admin",
  password: "888888",
});

const props = defineProps({
  //  v-model 的默认 prop 名称​
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// 用于实现 ​​v-model双向绑定​​的一个经典且标准的写法，其核心是通过 computed包装一个 ​​可读写的响应式变量​​，实现 ​​子组件与父组件之间双向同步一个布尔值（或其他类型）​​。
const visible = computed({
  get: () => props.modelValue,
  // 我们通过 emit("update:modelValue", value)，​​向父组件发送一个事件，通知它更新绑定的值​
  set: (value) => emit("update:modelValue", value),
});

const login = async () => {
  console.log("登录按钮被按下" + loginForm);
  loading.value = true;
  try {
    // 通知仓库发送登录请求
    //  保证登录成功
    await useStore.userLogin(loginForm);
    // 4. 跳转到首页并强制刷新
    window.location.href = "/"; // 使用原生跳转确保完全刷新
    // 登录成功提示信息
    ElNotification({
      type: "success",
      message: "登录成功",
    });
    emit("update:modelValue", false);
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
  //  reqTest()
  // 请求成功->跳转到首页
  // 请求失败->弹出登录失败信息
  loading.value = false;
};
</script>

<style scoped lang="scss"></style>
