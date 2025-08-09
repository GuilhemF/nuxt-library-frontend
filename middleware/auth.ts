export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('jwt_token');
  
    // Si le token n'existe pas, on redirige l'utilisateur vers la page de connexion
    if (!token.value) {
      return navigateTo('/admin');
    }
  });