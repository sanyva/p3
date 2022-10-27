<template>
  <auth-component title="Change Password">
    <Form :validation-schema="schema" @submit="onSubmit">
      <password-field
        v-model="password"
        label="Password"
        :dense="false"
        name="password"
      ></password-field>
      <password-field
        v-model="confirmPassword"
        label="Confirm Password"
        :dense="false"
        name="confirmPassword"
      ></password-field>

      <div>
        <q-btn color="primary" type="submit">Change password</q-btn>
      </div>
    </Form>
  </auth-component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AuthComponent from "@/auth/components/AuthComponent.vue";
import PasswordField from "@/core/components/PasswordField.vue";
import { useAuthStore } from "@/auth/store";
import { useRoute } from "vue-router";
import { Form } from "vee-validate";
import * as Yup from "yup";

const password = ref("");
const confirmPassword = ref("");
const route = useRoute();

const { setPassword } = useAuthStore();

const schema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .label("confirm password"),
});

function onSubmit() {
  setPassword(password.value, route.params.token.toString());
}
</script>
