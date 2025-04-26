import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Rating {
  rating: number
  text: string
}

interface AnswerData {
  resposta: string
  pergunta: string
  avaliacao: {
    contexto: Rating
    precisao: Rating
    clareza: Rating
    relevancia: Rating
  }
}

export const useAnswerStore = defineStore('answers', () => {
  // Dados das respostas
  const firstAnswer = ref<AnswerData | null>(null)
  const secondAnswer = ref<AnswerData | null>(null)
  
  // Dados adicionais (feedback final)
  const feedbackFinal = ref({
    feedback_usuario: '',
    melhor_performance: ''
  })

  // Métodos para salvar respostas
  const saveFirstAnswer = (data: AnswerData) => {
    firstAnswer.value = data
  }

  const saveSecondAnswer = (data: AnswerData) => {
    secondAnswer.value = data
  }

  // Método para salvar feedback final
  const saveFeedback = (feedback: string, performance: string) => {
    feedbackFinal.value = {
      feedback_usuario: feedback,
      melhor_performance: performance
    }
  }

  // Verifica se ambas respostas foram completadas
  const bothAnswered = () => firstAnswer.value && secondAnswer.value

  // Gera o payload completo
  const getPayload = () => {
    if (!bothAnswered()) throw new Error('Ambas as respostas devem ser completadas')
    
    return {
      llm1: "model-1",
      llm2: "model-2",
      endereco_ip_user: "", // Você pode adicionar isso depois
      pergunta: firstAnswer.value?.pergunta || '',
      resposta_llm1: firstAnswer.value?.resposta || '',
      resposta_llm2: secondAnswer.value?.resposta || '',
      avaliacao_llm1: {
        coerencia: firstAnswer.value?.avaliacao.contexto.rating || 0,
        respeito: firstAnswer.value?.avaliacao.precisao.rating || 0,
        acuracia: firstAnswer.value?.avaliacao.clareza.rating || 0,
        relevancia: firstAnswer.value?.avaliacao.relevancia.rating || 0,
        veracidade: 0 // Adicione se necessário
      },
      avaliacao_llm2: {
        coerencia: secondAnswer.value?.avaliacao.contexto.rating || 0,
        respeito: secondAnswer.value?.avaliacao.precisao.rating || 0,
        acuracia: secondAnswer.value?.avaliacao.clareza.rating || 0,
        relevancia: secondAnswer.value?.avaliacao.relevancia.rating || 0,
        veracidade: 0 // Adicione se necessário
      },
      ...feedbackFinal.value
    }
  }

  return {
    firstAnswer,
    secondAnswer,
    feedbackFinal,
    saveFirstAnswer,
    saveSecondAnswer,
    saveFeedback,
    bothAnswered,
    getPayload
  }
})