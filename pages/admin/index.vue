<template>
  <main data-namespace="admin-index" class="w-full py-8" >
    <h1 class="titre mb-4">Connexion</h1>
    <form @submit.prevent="login" class="flex flex-col gap-4 max-w-sm">
      <input
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        required
        class="p-2 border rounded-lg bg-gray-300 text-gray-700"
      />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Mot de passe"
        required
        class="p-2 border rounded-lg bg-gray-300 text-gray-700"
      />
      <button type="submit" class="btn btn-big">
        Se connecter
      </button>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
  </main>
</template>

<script setup>
useHead({ title: 'Admin – Login', meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

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
    // Redirige sur le dashboard admin
    router.push('/admin/dashboard');

  } catch (err) {
    error.value = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
    console.error('Erreur de connexion:', err);
  }
};
</script>