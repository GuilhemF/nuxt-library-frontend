<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Connexion</h1>
    <form @submit.prevent="login" class="flex flex-col gap-4 max-w-sm">
      <input
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        required
        class="p-2 border rounded"
      />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Mot de passe"
        required
        class="p-2 border rounded"
      />
      <button type="submit" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Se connecter
      </button>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCookie } from '#app';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();
const router = useRouter();
const token = useCookie('jwt_token');

const credentials = ref({
  email: '',
  password: ''
});
const error = ref(null);

const login = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/login_check`, {
      method: 'POST',
      body: JSON.stringify(credentials.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    token.value = response.token;
    console.log('Connexion réussie, token:', token.value);
    // Redirect to the admin dashboard or another page
    router.push('/admin/dashboard');

  } catch (err) {
    error.value = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
    console.error('Erreur de connexion:', err);
  }
};
</script>