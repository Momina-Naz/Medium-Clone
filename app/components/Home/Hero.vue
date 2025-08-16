

<template>
  <main
    class="flex justify-between items-center flex-col md:flex-row bg-[#F7F4ED] h-full"
  >
    <div class="ps-16 sm:ps-36 flex flex-col justify-center mb-3 gap-10">
      <h1
        class="font-serif text-8xl md:text-9xl text-[#282533] tracking-tighter"
      >
        Human <br />
        stories & ideas
      </h1>
      <p class="text-xl">
        A place to read, write, and deepen your understanding
      </p>
      <div>
        <button
          @click="emit('open-signup')"
          class="bg-[#242424] text-white font-medium rounded-3xl px-14 py-3 text-center"
        >
          Start reading
        </button>
      </div>
    </div>

    <div class="w-[300px ] sm:w-[500px] lg-w-[500px]">
      <img src="/images/hero.png" alt="hero" />
    </div>
  </main>
</template>
<script setup >
const emit = defineEmits(["open-signup"]);
</script>
