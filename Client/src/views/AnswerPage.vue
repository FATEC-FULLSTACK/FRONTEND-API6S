<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()
const userQuestion = ref(route.query.question || 'User question not available')
const openaiAnswer = ref(route.query.openai || '')
const geminiAnswer = ref(route.query.gemini || '')
</script>

<template>
  <div class="grid place-content-center h-screen mt-[50px]">
    <div class="mb-[25vh]">
      <Box class="mb-8 flex">
        <box class="p-[8px_16px_10px_16px] bg-[#313131] rounded-[50px] ml-auto">
          {{ userQuestion }}
        </box>
      </Box>
      <main class="flex flex-col gap-8 sm:gap-4 md:gap-6">
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
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent hover:border-[#A29D43] transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
            >
              <div class="h-full overflow-hidden text-ellipsis line-clamp-[13] whitespace-pre-wrap">
                {{ openaiAnswer }}
              </div>
            </Box>

            <box class="px-2 self-start py-1 rounded-[5px] bg-[#a29d43] text-white">
              <p class="text-[13px]">Pending Answer</p>
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
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent hover:border-[#A29D43] transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
            >
              <div class="h-full overflow-hidden text-ellipsis line-clamp-[13] whitespace-pre-wrap">
                {{ geminiAnswer }}
              </div>
            </Box>

            <box class="px-2 self-start py-1 rounded-[5px] bg-[#a29d43] text-white">
              <p class="text-[13px]">Pending Answer</p>
            </box>
          </section>
        </box>
      </main>
    </div>

    <div class="flex flex-col gap-2 sm:gap-1 md:gap-2">
      <ChatInput />
      <span class="self-center text-[12px] text-[#9A9A9A]">Esta IA pode apresentar respostas imprecisas. Considere verificar informações importantes</span>
    </div>

    <button
      @click="router.push('/')"
      class="mx-auto bg-[#D9D9D9] text-[12px] mt-5 text-[#313131] font-medium py-2 px-6 rounded-[20px] cursor-pointer hover:bg-[#9A9A9A] transition-colors duration-300"
    >
      Nova Conversa
    </button>
  </div>
</template>
