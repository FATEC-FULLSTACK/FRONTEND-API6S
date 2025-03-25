<template>
    <div>
      <!-- Input de cima -->
      <input type="text" class="input-top" placeholder="Input acima" />

      <div class="container">
                <!-- Blocos de texto com label + botão -->
                <div class="text-boxes ">
            <!-- Primeiro bloco -->
        <div class="box">
          <textarea class="text-area" readonly>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea> 
          <!-- (readonly) (Serve para bloquear a capacidade de editar o texto)-->
          <div class="actions">
            <label class="label">This answer was provided by gpt OMini</label>
            <button class="btn">Pending answer</button>
          </div>
        </div>
  
        <!-- Segundo bloco -->
        <div class="box">
          <textarea class="text-area" readonly>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea> 
          <!-- (readonly) (Serve para bloquear a capacidade de editar o texto)-->
          <div class="actions">
            <label class="label">This answer was provided by gemini AI</label>
            <button class="btn">Pending answer</button>
          </div>
        </div>
      </div>
  
      <!-- Input de baixo -->
      <input type="text" class="input-bottom" placeholder="Input abaixo" />

      </div>  

    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    height: 100vh;
    padding: 40px;
  }
  
  .input-top{
    margin: 73px 0 0 867px;
    width: 300px;
    height: 35px;
    border-radius: 20px;
    border: none;
    padding: 0 15px;
    background-color: #e0e0e0;
    color: black;
  }
  .input-bottom {
    margin-top: 150px;
    width: 800px;
    height: 55px;
    border-radius: 20px;
    border: none;
    padding: 0 15px;
    background-color: #e0e0e0;
    color: black;
  }
  
  .text-boxes {
    display: flex;
    gap: 40px;
    justify-content: center;
  }
  
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .text-area {
    width: 510px;
    height: 300px;
    background-color: gray;
    border: 3px solid #a29d43;
    border-radius: 10px;
    padding: 15px;
    resize: none;
    color: black;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .label {
    background-color: #D9D9D9;
    padding: 5px 15px;
    color: gray;
    font-weight: bold;
    height: 32px;
    width: 300px;
    border-radius: 5px;
    font-size: 13px;
  }
  
  .btn {
    padding: 5px 15px;
    border: none;
    border-radius: 8px;
    background-color: #a29d43;
    color: white;
    cursor: pointer;
  }
  </style>
  