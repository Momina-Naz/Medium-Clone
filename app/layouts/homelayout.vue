<template>
  <main
    class="flex flex-col lg:flex-row lg:justify-between items-center bg-[#F7F4ED] border-b border-[#242424] py-6 px-1 md:px-40 leading-relaxed"
  >
    <NuxtLink :to="`/`">
      <h1 class="text-3xl text-[#242424] font-bold font-serif tracking-tight">
        Medium
      </h1>
    </NuxtLink>
    <div class="flex gap-5">
      <ul class="flex justify-center items-center gap-5 text-sm font-semibold">
        <li class="cursor-pointer">Our story</li>
        <li class="cursor-pointer">Membership</li>
        <li class="cursor-pointer">Write</li>
        <li @click="open = true" class="cursor-pointer">Sign in</li>
      </ul>
      <button
        class="bg-[#242424] text-white font-medium text-sm rounded-3xl px-4 py-2 text-center"
        @click="isModalopen = true"
      >
        Get started
      </button>
    </div>
  </main>

  <!-- Hero Section emit handling -->
  <ClientOnly>
    <Hero v-if="!token" @open-signup="isModalopen = true" />
  </ClientOnly>

  <!-- SignUp Modal -->
  <Teleport to="body">
    <div
      v-if="isModalopen"
      class="fixed inset-0 flex justify-center items-center min-h-screen z-50 bg-black/40"
      @click.self="isModalopen = false"
    >
      <SignUp
        @close="isModalopen = false"
        @switch-to-Signin="
          isModalopen = false;
          open = true;
        "
      />
    </div>
  </Teleport>

  <!-- SignIn Modal -->
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 flex justify-center items-center min-h-screen z-50 bg-black/40"
      @click.self="open = false"
    >
      <SignIn @close="open = false" />
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import SignUp from "~/components/Account/SignUp.vue";
import SignIn from "~/components/Account/SignIn.vue";
import Hero from "~/components/Home/Hero.vue";

const isModalopen = ref(false);
const open = ref(false);
</script>
