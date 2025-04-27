<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answerStore'
import RatingInputArea from '@/components/RatingInputArea.vue'
import FeedbackInputArea from '@/components/FeedbackInputArea.vue'
import axios from 'axios'

const router = useRouter()
const answerStore = useAnswerStore()

const route = useRoute()
const userQuestion = ref(route.query.question || 'User question not available')
const openaiAnswer = ref(route.query.openai || '')
const geminiAnswer = ref(route.query.gemini || '')
const feedbackUsuario = ref('')
const melhorPerformance = ref('')

const finalFeedback = ref({
  rating: 0,
  text: '',
})

const novaConversa = () => {
  answerStore.$patch({
    firstAnswer: null,
    secondAnswer: null,
    feedbackFinal: {
      feedback_usuario: '',
      melhor_performance: '',
    },
  })

  router.push('/')
}

const bothAnswered = computed(() => answerStore.bothAnswered())
const submitFinalFeedback = async () => {
  try {
    const payload = answerStore.getPayload()

    const fullPayload = {
      ...payload,
      feedback_usuario: feedbackUsuario.value,
      melhor_performance: melhorPerformance.value,
    }

    console.log('Enviando payload completo:', fullPayload)

    const response = await axios.post('http://localhost:8000/avaliacao', fullPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    answerStore.$reset()

    alert('Avaliação enviada com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error)
    alert('Erro ao enviar avaliação. Por favor, tente novamente.')
  }
}
</script>

<template>
  <div class="grid place-content-center mt-[50px]">
    <div class="mb-[20vh]">
      <Box class="mb-8 flex">
        <box class="p-[8px_16px_10px_16px] bg-[#313131] rounded-[50px] ml-auto">
          {{ userQuestion }}
        </box>
      </Box>
      <main class="flex flex-colgap-8 sm:gap-4 md:gap-6">
        <box class="flex gap-8 sm:flex-col md:flex-row">
          <section class="flex flex-col items-center gap-2.5">
            <Box
              readonly
              @click="
                router.push({
                  path: '/firstAnswer',
                  query: {
                    answer: openaiAnswer,
                    question: userQuestion,
                  },
                })
              "
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
              :class="{
                'hover:border-[#4ADE80]': answerStore.firstAnswer,
                'hover:border-[#A29D43]': !answerStore.firstAnswer,
              }"
            >
              <div class="h-full overflow-hidden text-ellipsis line-clamp-[13] whitespace-pre-wrap">
                {{ openaiAnswer }}
              </div>
            </Box>

            <box
              class="px-2 self-start py-1 rounded-[5px]"
              :class="{
                'bg-[#0D6C1A]': answerStore.firstAnswer,
                'bg-[#a29d43]': !answerStore.firstAnswer,
              }"
            >
              <p class="text-[13px] text-white">
                {{ answerStore.firstAnswer ? 'Respondido' : 'Resposta pendente' }}
              </p>
            </box>
          </section>

          <section class="flex flex-col items-center gap-2.5">
            <Box
              readonly
              @click="
                router.push({
                  path: '/secondAnswer',
                  query: {
                    answer: geminiAnswer,
                    question: userQuestion,
                  },
                })
              "
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
              :class="{
                'hover:border-[#4ADE80]': answerStore.secondAnswer,
                'hover:border-[#A29D43]': !answerStore.secondAnswer,
              }"
            >
              <div class="h-full overflow-hidden text-ellipsis line-clamp-[13] whitespace-pre-wrap">
                {{ geminiAnswer }}
              </div>
            </Box>

            <box
              class="px-2 self-start py-1 rounded-[5px]"
              :class="{
                'bg-[#0D6C1A]': answerStore.secondAnswer,
                'bg-[#a29d43]': !answerStore.secondAnswer,
              }"
            >
              <p class="text-[13px] text-white">
                {{ answerStore.secondAnswer ? 'Respondido' : 'Resposta Pendente' }}
              </p>
            </box>
          </section>
        </box>
      </main>

      <!-- se ambas forem respondidas ira aparecer essa mensagem -->
      <div v-if="bothAnswered" class="mt-[50px]">
        <FeedbackInputArea
          title="Nos Conte o que achou"
          placeholder="Por favor, escreva seu feedback..."
          v-model:text="feedbackUsuario"
          v-model:rating="feedbackRating"
        />

        <FeedbackInputArea
          title="Qual obteve melhor desempenho?"
          placeholder="O que você acha que poderia ter sido feito melhor?"
          v-model:text="melhorPerformance"
          v-model:rating="performanceRating"
        />

        <button
          @click="submitFinalFeedback"
          class="bg-[#4ADE80] text-[#313131] font-bold py-2 px-4 rounded-[10px] hover:bg-[#3a9e66] cursor-pointer transition-colors duration-300 mt-4"
        >
          Finalizar
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2 sm:gap-1 md:gap-2">
      <ChatInput />
      <span class="self-center text-[12px] text-[#9A9A9A]"
        >Esta IA pode apresentar respostas imprecisas. Considere verificar informações
        importantes</span
      >
    </div>

    <button
      @click="novaConversa"
      class="mx-auto bg-[#D9D9D9] text-[12px] mt-5 text-[#313131] font-medium py-2 px-6 rounded-[20px] cursor-pointer hover:bg-[#9A9A9A] transition-colors duration-300"
    >
      Nova Conversa
    </button>
  </div>
</template>
