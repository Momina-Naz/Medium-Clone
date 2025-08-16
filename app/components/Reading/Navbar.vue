<template>
  <main
    class="flex justify-between items-center px-10 py-4 border-b border-gray-100"
  >
    <div class="flex">
      <NuxtLink :to="`/`">
        <h1 class="text-3xl text-[#242424] font-bold font-serif tracking-tight">
          Medium
        </h1>
      </NuxtLink>
      <div class="relative w-64 ml-6">
        <span
          class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          search
        </span>
        <input
          type="text"
          placeholder="Search"
          class="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-3xl focus:outline-none"
        />
      </div>
    </div>
    <!-- right side -->
    <div class="flex justify-center items-center gap-4 text-gray-500 text-lg">
      <NuxtLink :to="`/newStory`">
        <p class="text-xl cursor-pointer">Write</p></NuxtLink
      >

      <span class="material-icons-outlined cursor-pointer">notifications</span>
      <div
        class="bg-purple-900 text-white w-9 h-9 rounded-full flex justify-center items-center cursor-pointer"
      >
        M
      </div>
    </div>
  </main>
</template>