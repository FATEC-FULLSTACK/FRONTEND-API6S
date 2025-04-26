<template>
  <div class="relative w-full" :class="{ 'opacity-70 cursor-not-allowed': disabled }">
    <input
      v-model="mensagem"
      type="text"
      placeholder="Digite sua pergunta..."
      class="w-full bg-[#2b2b2b] h-[65px] placeholder:text-sm p-6 pr-14 text-sm text-white rounded-[15px] outline-none disabled:cursor-not-allowed"
      @keyup.enter="enviarMensagem"
      :disabled="disabled || loading || !mensagem.trim()"
    />

    <button
      @click="enviarMensagem"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 disabled:cursor-not-allowed"
      :disabled="disabled || loading || !mensagem.trim()"
    >
      <img
        v-if="!loading"
        src="@/assets/input/SendButton.svg"
        alt="Enviar"
        class="w-6 h-6"
      />
      <div v-else class="loading-spinner w-6 h-6"></div>
    </button>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  name: 'ChatInput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mensagem: '',
      loading: false,
    }
  },
  methods: {
    async enviarMensagem() {
      if (!this.mensagem.trim() || this.disabled || this.loading) return

      const mensagemEnviada = this.mensagem
      this.mensagem = ''
      this.loading = true

      try {
        const response = await axios.post('http://localhost:8000/chat', {
          user_id: '123',
          message: mensagemEnviada,
        })

        this.$emit('novaMensagem', {
          texto: mensagemEnviada,
          resposta: response.data.data.responses,
        })
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
        this.$emit('erroEnvio')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.loading-spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #4ade80;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed !important;
}
</style>