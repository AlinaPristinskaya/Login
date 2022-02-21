<template>
  <el-form
    ref="form"
    class="login__form"
    id="form"
    :model="form"
    :rules="rules"
    @submit.native.prevent="submitLogin('form')"
  >
    >
    <el-form-item label="login">
      <el-input name="login" v-model="form.login" />
    </el-form-item>
    <el-form-item label="password">
      <el-input name="password" v-model="form.password" show-password />
    </el-form-item>

    <div class="login__footer">
      <el-button type="primary" native-type="submit" :loading="loading">
        <p>login</p>
      </el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        login: "",
        password: "",
      },
      rules: {
        login: [{ required: true, message: "login", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "password",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    async submitLogin() {
      const { form } = this.$refs;
      const isFormValidate = form.validate();
      if (isFormValidate) {
        try {
          this.loading = true;
          const form = document.querySelector("#form");
          console.log("form", form);
          await this.$store.dispatch("login", form);
          this.$router.push({ name: "/processingOrder" });
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.$message({
          message: this.$t(
            "Please, fill out the form correctly before submitting"
          ),
          type: "warning",
        });
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4rem;

  h1 {
    text-align: center;
    @media screen and(max-width:640px) {
      font-size: 22px;
    }
  }

  &__form {
    border-radius: 10px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);
    max-width: 400px;
    padding: 1rem;
    height: max-content;
  }

  &__footer {
    text-align: right;
    margin-top: 2rem;
  }
}
</style>
