<template>
  <auth-component title="Reset Password">
    <Form :validation-schema="schema" @submit="onSubmit">
      <div>
        Enter your user account's verified email address and we will send you a
        password reset link.
      </div>

      <input-field
        v-model="email"
        label="email"
        :dense="false"
        name="email"
      ></input-field>

      <div>
        <q-btn color="primary" type="submit">Send password reset email</q-btn>
      </div>
    </Form>
  </auth-component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AuthComponent from "@/auth/components/AuthComponent.vue";
import { useAuthStore } from "../store";
import InputField from "@/core/components/InputField.vue";
import { Form } from "vee-validate";
import * as Yup from "yup";

const { sendResetEmail } = useAuthStore();
const email = ref("");

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
});

function onSubmit() {
  sendResetEmail(email.value);
}
</script>
