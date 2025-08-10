<template>
    <header class="sticky top-4">

            <nav class="rounded-lg border shadow-lg overflow-hidden p-2  mx-auto w-full">
                <div class="flex items-center">
                    <NuxtLink to="/" class="titre logo px-1">Bibliothèque</NuxtLink>
                    <hr class="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
   
                        <ul class="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
                        <li>
                            <NuxtLink to="/" class="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0457 24.8187C18.0457 24.2664 18.4934 23.8187 19.0457 23.8187H31.0457C31.5979 23.8187 32.0457 24.2664 32.0457 24.8187V66.8187C32.0457 67.371 31.5979 67.8187 31.0457 67.8187H19.0457C18.4934 67.8187 18.0457 67.371 18.0457 66.8187V24.8187Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.0457 31.8168H32.0457" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.0457 59.8168H32.0457" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32.0457 12.8187C32.0457 12.2664 32.4934 11.8187 33.0457 11.8187H45.0457C45.5979 11.8187 46.0457 12.2664 46.0457 12.8187V66.8187C46.0457 67.371 45.5979 67.8187 45.0457 67.8187H33.0457C32.4934 67.8187 32.0457 67.371 32.0457 66.8187V12.8187Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32.0457 19.8168H46.0457" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32.0457 59.8168H46.0457" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M64.9544 66.5409L59.2941 31.1785L49.0457 32.8189L54.706 68.1813" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M54.337 65.8767C55.8065 65.049 57.4269 64.4759 59.1328 64.2028C60.9756 63.9078 62.8329 63.9767 64.6086 64.3807" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>Livres</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/auteurs" class="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>Auteurs</NuxtLink>
                        </li>
                        <li>
                        
                        </li>
                        </ul>
                  
                    <NuxtLink to="/admin" class="btn ">Editer</NuxtLink>
                    <div class="ml-auto flex gap-2">
                        ☀️
                        <input type="checkbox" class="appearance-none relative inline-block rounded-full w-12 h-6 cursor-pointer before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-stone-200 before:transition-colors before:duration-200 before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-6 after:h-6 after:border after:border-stone-200 after:bg-white after:rounded-full checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white checked:before:bg-stone-800 checked:after:border-stone-800 ml-auto" id="theme-switcher" />
                        🌑
                    </div>
                    

                
                
                </div>
            </nav>
            
       
    </header>
</template>

<script setup>

import { onMounted } from 'vue';

onMounted(() => {
  const themeSwitcher = document.querySelector('#theme-switcher');

  if (!themeSwitcher) return;

  function updateTheme(isDark) {
    if (isDark) {
      document.documentElement.style.setProperty('--theme', '🌑');
    } else {
      document.documentElement.style.setProperty('--theme', '☀️');
    }
  }

  themeSwitcher.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    
    if (!document.startViewTransition) {
      updateTheme(isChecked);
      return;
    }

    document.startViewTransition(() => {
      updateTheme(isChecked);
    });
  });

  // Set initial theme based on system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    themeSwitcher.checked = true;
    updateTheme(true);
  }
});
</script>