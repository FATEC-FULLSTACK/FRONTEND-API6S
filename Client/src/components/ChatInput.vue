<template>
  <div class="relative w-full">
    <!-- Input -->
    <input
      v-model="mensagem"
      type="text"
      placeholder="Digite sua pergunta..."
      class="w-full bg-[#2b2b2b] h-[65px] placeholder:text-sm p-6 pr-14 text-sm text-white rounded-[15px] outline-none"
    />
    
    <!-- Ícone de Enviar -->
    <button @click="enviarMensagem" class="absolute right-4 top-1/2 transform -translate-y-1/2">
      <img src="@/assets/input/SendButton.svg" alt="Enviar" class="w-6 h-6 cursor-pointer" />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChatInput',
  data() {
    return {
      mensagem: ''
    };
  },
  methods: {
    enviarMensagem() {
      if (!this.mensagem.trim()) return;
      console.log("Mensagem enviada:", this.mensagem);
      this.mensagem = ""; // Limpa o input após o envio
    }
  }
};
</script>