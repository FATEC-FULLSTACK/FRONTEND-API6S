<template>
  <div class="grid justify-center min-h-screen bg-[var(--background-color)] px-4">
    <main class="flex flex-col justify-between mt-16 w-full max-w-[800px]">
      <section class="flex flex-col items-center transition-opacity duration-1000" :class="{'opacity-0': !mostrarTexto}">
        <img src="../assets/logo/logo.svg" alt="IA Logo" class="w-[30px] h-[30px]" />
        <div class="py-5 text-center">
          <h2 class="text-2xl md:text-3xl font-medium text-white-600 break-words">Hello, User</h2>
          <h1
            class="text-3xl md:text-4xl mt-2 font-semibold gradient-bright-effect bg-gradient-to-r from-green-400 via-teal-500 to-sky-400 bg-clip-text text-transparent"
          >
            Como posso ajudar você hoje?
          </h1>
        </div>
        <p v-if="mostrarTypingText" class="text-xs text-[var(--text-second-color)] max-w-[455px] text-center leading-[27px] typing-text"></p>
      </section>

      <!-- Div para exibir as respostas das LLMs -->
      <section v-if="respostas.openai || respostas.gemini" class="w-full max-h-[500px] overflow-y-auto border border-gray-600 p-4 rounded-lg mt-6">
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <!-- Resposta OpenAI -->
          <div class="w-full md:w-1/2 p-2 bg-gray-800 text-white rounded-lg">
            <h3 class="font-bold text-center">OpenAI</h3>
            <p class="text-sm whitespace-pre-wrap">{{ respostas.openai }}</p>
          </div>

          <!-- Resposta Gemini -->
          <div class="w-full md:w-1/2 p-2 bg-gray-800 text-white rounded-lg">
            <h3 class="font-bold text-center">Gemini</h3>
            <p class="text-sm whitespace-pre-wrap">{{ respostas.gemini }}</p>
          </div>
        </div>
      </section>

      <section class="w-full mb-32 mt-6">
        <ChatInput @novaMensagem="exibirRespostas" />
      </section>
    </main>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ChatInput from '../components/ChatInput.vue'
// @ts-expect-error it is working this effect
import Typewriter from 'typewriter-effect/dist/core'

export default defineComponent({
  name: 'MainComponent',
  components: {
    ChatInput,
  },
  setup() {
    const mostrarTexto = ref(true);
    const respostas = ref({ openai: '', gemini: '' });
    const mostrarTypingText = ref(true);

    const exibirRespostas = (dados: { texto: string, resposta: { openai: string, gemini: string } }) => {
      respostas.value = dados.resposta;
      mostrarTexto.value = false;
      mostrarTypingText.value = false; // Esconder texto animado quando a resposta chegar
    };

    onMounted(() => {
      const typingText = document.querySelector<HTMLElement>('.typing-text');
      if (typingText) {
        new Typewriter(typingText, {
          strings: ['Este é um sistema de IA desenvolvido para avaliar critérios e treinar respostas de forma eficaz.'],
          autoStart: true,
          loop: true,
          delay: 15,
          cursor: '|',
          pauseFor: 450000,
        });
      }
    });

    return { respostas, exibirRespostas, mostrarTexto, mostrarTypingText };
  }
});
</script>
