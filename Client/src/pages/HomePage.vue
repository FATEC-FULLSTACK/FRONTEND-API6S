<template>
  <div class="grid justify-center h-screen">
    <main class="flex flex-col justify-between mt-[64px] w-[800px]">
      <section class="flex flex-col items-center">
        <img src="../assets/logo/logo.svg" alt="IA Logo" width="30px" height="30px" />
        <div class="py-5">
          <h2 class="text-3xl font-medium text-white-600 text-center break-words">Hello, User</h2>
          <h1
            class="text-4xl mt-2 font-semibold gradient-bright-effect bg-gradient-to-r from-green-400 via-teal-500 to-sky-400 bg-clip-text text-transparent"
          >
            Como posso ajudar você hoje?
          </h1>
        </div>
        <p class="text-xs max-w-[455px] text-center leading-[27px] typing-text"></p>
      </section>
      <section class="w-full mb-[128px]">
        <ChatInput />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// @ts-expect-error it is working this effect
import Typewriter from 'typewriter-effect/dist/core'
import ChatInput from '../components/ChatInput.vue'

export default defineComponent({
  name: 'MainComponent',
  components: {
    ChatInput,
  },
  setup() {
    onMounted(() => {
      const typingText = document.querySelector<HTMLElement>('.typing-text')
      if (typingText) {
        new Typewriter(typingText, {
          strings: [
            'Este é um sistema de IA desenvolvido para avaliar critérios e treinar respostas de forma eficaz.',
          ],
          autoStart: true,
          loop: true, 
          delay: 15, 
          cursor: '|', 
          pauseFor: '450000',
        })
      }
    })
  },
})
</script>
