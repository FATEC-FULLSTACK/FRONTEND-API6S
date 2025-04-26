<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RatingInputArea from '@/components/RatingInputArea.vue'
import { useAnswerStore } from '@/stores/answerStore'

const route = useRoute()
const fullAnswer = ref('')
const userQuestion = ref('')
const answerStore = useAnswerStore()

const ratings = ref({
  contexto: {
    rating: 0,
    text: '',
  },
  precisao: {
    rating: 0,
    text: '',
  },
  clareza: {
    rating: 0,
    text: '',
  },
  relevancia: {
    rating: 0,
    text: '',
  },
})

onMounted(() => {
  fullAnswer.value = route.query.answer?.toString() || 'Resposta não disponível'
  userQuestion.value = route.query.question?.toString() || 'Pergunta não disponível'
})

const submitAnswer = () => {
  answerStore.saveFirstAnswer({
    resposta: fullAnswer.value,
    pergunta: userQuestion.value,
    avaliacao: ratings.value,
  })

  console.log('Resposta 1 salva:', answerStore.firstAnswer)
  console.log('Store após salvar FirstAnswer:', JSON.parse(JSON.stringify(answerStore.$state)))
}
</script>

<template>
  <div class="grid place-content-center">
    <div class="mb-[25vh] mt-[150px] mx-[300px]">
      <button
        class="bg-transparent w-auto border-1 border-[#D9D9D9] text-[#D9D9D9] font-bold py-2 px-4 rounded-[10px] hover:border-[#4ADE80] hover:text-[#4ADE80] cursor-pointer transition-colors duration-300 mt-4"
        @click="$router.go(-1)"
      >
        Voltar
      </button>
      <div class="mb-8 flex">
        <div class="p-[8px_16px_10px_16px] bg-[#313131] rounded-[50px] ml-auto">
          {{ userQuestion }}
        </div>
      </div>
      <main class="flex flex-col gap-8 sm:gap-4 md:gap-6">
        <section
          readonly
          class="h-auto text-[#E0E0E0] max-w-[800px] leading-[28px] whitespace-pre-wrap"
        >
          {{ fullAnswer }}
        </section>

        <section class="mt-[30px]">
          <RatingInputArea
            title="Coerência"
            placeholder="Comente sobre o contexto..."
            v-model:rating="ratings.contexto.rating"
            v-model:text="ratings.contexto.text"
          />

          <RatingInputArea
            title="Respeito"
            placeholder="Comente sobre a precisão..."
            v-model:rating="ratings.precisao.rating"
            v-model:text="ratings.precisao.text"
          />

          <RatingInputArea
            title="Acurácia"
            placeholder="Comente sobre a clareza..."
            v-model:rating="ratings.clareza.rating"
            v-model:text="ratings.clareza.text"
          />

          <RatingInputArea
            title="Relevância"
            placeholder="Comente sobre a relevância..."
            v-model:rating="ratings.relevancia.rating"
            v-model:text="ratings.relevancia.text"
          />
        </section>
      </main>
      <button
        class="bg-[#4ADE80] w-auto text-[#313131] font-bold py-2 px-4 rounded-[10px] hover:bg-[#3a9e66] cursor-pointer transition-colors duration-300 mt-4"
        @click="submitAnswer"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
