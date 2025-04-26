<template>
  <div>
    <input
      type="text"
      placeholder="Input acima"
      class="mt-[73px] ml-[867px] w-[300px] h-[35px] rounded-full border-none px-4 bg-gray-300 text-black"
    />

    <div class="flex flex-col items-center gap-[30px] h-screen p-10">
      <div class="flex gap-10 justify-center">
        <div class="flex flex-col items-center gap-2.5">
          <textarea
            class="w-[510px] h-[300px] bg-gray-500 border-[3px] border-[#a29d43] rounded-[10px] p-4 resize-none text-black"
            readonly
          >
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </textarea
          >
          <div class="flex items-center gap-2.5">
            <label
              class="bg-gray-300 px-4 py-1.5 text-gray-500 font-bold h-[32px] w-[300px] rounded-[5px] text-[13px] flex items-center justify-center"
            >
              This answer was provided by gpt OMini
            </label>
            <button class="px-4 py-1.5 rounded-lg bg-[#a29d43] text-white cursor-pointer">
              Pending answer
            </button>
          </div>
        </div>
        <div class="flex flex-col items-center gap-2.5">
          <textarea
            class="w-[510px] h-[300px] bg-gray-500 border-[3px] border-[#a29d43] rounded-[10px] p-4 resize-none text-black"
            readonly
          >
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </textarea
          >
          <div class="flex items-center gap-2.5">
            <label
              class="bg-gray-300 px-4 py-1.5 text-gray-500 font-bold h-[32px] w-[300px] rounded-[5px] text-[13px] flex items-center justify-center"
            >
              This answer was provided by gemini AI
            </label>
            <button class="px-4 py-1.5 rounded-lg bg-[#a29d43] text-white cursor-pointer">
              Pending answer
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Input abaixo"
        class="mt-[150px] w-[800px] h-[55px] rounded-full border-none px-4 bg-gray-300 text-black"
      />
    </div>
  </div>
</template>
