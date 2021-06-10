<template>
  <div class="login-container">
    <form class="login-form">
      <BaseInput class="input" name="Username" v-model:input="username" />
      <BaseInput
        class="input"
        name="Password"
        v-model:input="password"
        inputType="password"
      />
      <BaseButton class="button" text="Login" :onClick="login" />
    </form>
    <i class="loading fas fa-spinner fa-pulse" v-show="loading"></i>
    <div v-show="showBadCredentials" class="message">
      Invalid Credentials !!!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { authenticateQuery } from '../graphql/queries';
import { authenticate } from '../utils/auth';

export default defineComponent({
  name: 'Login',
  components: {
    BaseInput,
    BaseButton,
  },
  setup() {
    const router = useRouter();

    const username = ref<string | undefined>(undefined);
    const password = ref<string | undefined>(undefined);

    const showBadCredentials = ref(false);

    const { result, load: loginQuery, loading } = useLazyQuery(
      authenticateQuery,
      {
        username: username.value,
        password: password.value,
      },
    );

    watch(result, (value) => {
      if (value.authenticate === true && username.value && password.value) {
        authenticate(username.value, password.value, router);
        return;
      }

      showBadCredentials.value = true;
      username.value = undefined;
      password.value = undefined;
    });

    async function login() {
      showBadCredentials.value = false;

      if (!username.value || !password.value) {
        return;
      }

      await loginQuery(authenticateQuery, {
        username: username.value,
        password: password.value,
      });
    }

    return {
      username,
      password,
      showBadCredentials,
      login,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  display: grid;
  place-items: center;
  height: 100%;
}

.login-form {
  padding: 5em 7em;
  border: $primary-color 0.125em solid;
  border-radius: 0.5em;
  width: 44ch;
}

.button {
  margin-top: 2em;
  width: 100%;
}

.input + .input {
  margin-top: 2em;
}

.message {
  position: absolute;
  color: coral;
  top: 80vh;
  left: 0;
  right: 0;
  text-align: center;
}

.loading {
  font-size: 44px;
  position: absolute;
  top: 80vh;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
