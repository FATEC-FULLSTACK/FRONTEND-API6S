<template>
  <div class="grid justify-center min-h-screen bg-[var(--background-color)] px-4">
    <main class="flex flex-col justify-between mt-16 w-full max-w-[800px]">
      <section
        class="flex flex-col items-center transition-opacity duration-1000"
        :class="{ 'opacity-0': !mostrarTexto }"
      >
        <img src="../assets/logo/logo.svg" alt="IA Logo" class="w-[30px] h-[30px]" />
        <div class="py-5 text-center">
          <h2 class="text-2xl md:text-3xl font-medium text-white-600 break-words">Hello, User</h2>
          <h1
            class="text-3xl md:text-4xl mt-2 font-semibold gradient-bright-effect bg-gradient-to-r from-green-400 via-teal-500 to-sky-400 bg-clip-text text-transparent"
          >
            Como posso ajudar você hoje?
          </h1>
        </div>
        <p
          v-if="mostrarTypingText"
          class="text-xs text-[var(--text-second-color)] max-w-[455px] text-center leading-[27px] typing-text"
        ></p>
      </section>

      <div v-if="loadingGlobal" class="flex justify-center items-center my-8">
        <div class="loading-animation">
          <div class="dot-flashing"></div>
          <p class="text-[var(--text-second-color)] mt-4">Processando sua pergunta...</p>
        </div>
      </div>

      <section class="w-full mb-32 mt-6">
        <ChatInput
          @novaMensagem="exibirRespostas"
          @erroEnvio="loadingGlobal = false"
          :disabled="loadingGlobal || respostaEnviada"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ChatInput from '../components/ChatInput.vue'
// @ts-expect-error it is working this effect
import Typewriter from 'typewriter-effect/dist/core'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainComponent',
  components: {
    ChatInput,
  },
  setup() {
    const mostrarTexto = ref(true)
    const respostas = ref({ openai: '', gemini: '' })
    const mostrarTypingText = ref(true)
    const loadingGlobal = ref(false)
    const router = useRouter()
    const respostaEnviada = ref(false)

    const handleLoading = (isLoading: boolean) => {
      loadingGlobal.value = isLoading
    }

    const exibirRespostas = (dados: {
      texto: string
      resposta: { openai: string; gemini: string }
    }) => {
      respostas.value = dados.resposta
      respostaEnviada.value = true
      mostrarTexto.value = false
      mostrarTypingText.value = false

      // Navega após um pequeno delay para mostrar o resultado
      setTimeout(() => {
        router.push({
          path: '/answerPage',
          query: {
            question: dados.texto,
            openai: dados.resposta.openai,
            gemini: dados.resposta.gemini,
          },
        })
      }, 500)
    }

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
          pauseFor: 450000,
        })
      }
    })

    return {
      respostas,
      exibirRespostas,
      mostrarTexto,
      mostrarTypingText,
      loadingGlobal,
      handleLoading,
      respostaEnviada
    }
  },
})
</script>
