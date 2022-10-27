<template>
  <auth-component title="Sign in">
    <Form :validation-schema="schema" @submit="onSubmit">
      <input-field
        v-model="login"
        name="login"
        label="Login"
        :dense="false"
      ></input-field>
      <password-field
        v-model="password"
        name="password"
        label="Password"
        :dense="false"
      ></password-field>
      <q-btn flat label="forgot password?" to="/reset-password" />
      <div>
        <q-btn color="primary" type="submit">Sign in</q-btn>
      </div>
    </Form>
  </auth-component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import AuthComponent from "@/auth/components/AuthComponent.vue";
import PasswordField from "@/core/components/PasswordField.vue";
import InputField from "@/core/components/InputField.vue";
import { useAuthStore } from "../store";
import * as Yup from "yup";
import { useRouter } from "vue-router";

const { doLogin } = useAuthStore();

const login = ref("");
const password = ref("");
const router = useRouter();
const schema = Yup.object().shape({
  login: Yup.string().required().email(),
  password: Yup.string().required(),
});

function onSubmit() {
  doLogin(login.value, password.value).then(() => {
    router.push("/");
  });
}
</script>
