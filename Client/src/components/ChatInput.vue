<template>
  <div class="relative w-full">
    <!-- Input -->
    <input
      v-model="mensagem"
      type="text"
      placeholder="Digite sua pergunta..."
      class="w-full bg-[#2b2b2b] h-[65px] placeholder:text-sm p-6 pr-14 text-sm text-white rounded-[15px] outline-none"
      @keyup.enter="enviarMensagem"
    />

    <!-- Ícone de Enviar -->
    <button @click="enviarMensagem" class="absolute right-4 top-1/2 transform -translate-y-1/2">
      <img src="@/assets/input/SendButton.svg" alt="Enviar" class="w-6 h-6 cursor-pointer" />
    </button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'ChatInput',
  data() {
    return {
      mensagem: ''
    };
  },
  methods: {
    async enviarMensagem() {
      if (!this.mensagem.trim()) return;

      const mensagemEnviada = this.mensagem; // Salva a mensagem antes de limpar
      this.mensagem = ""; // Limpa o input imediatamente

      try {
        const response = await axios.post('http://localhost:8000/chat', {
          user_id: "123",
          message: mensagemEnviada
        });

        console.log("Resposta do servidor:", response.data.data.responses.gemini);
        console.log("Resposta do servidor:", response.data.data.responses.openai);

        // Emitir o evento para a HomePage.vue com as respostas
        this.$emit('novaMensagem', {
          texto: mensagemEnviada,
          resposta: response.data.data.responses
        });

      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  }
};
</script>
