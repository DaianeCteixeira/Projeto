//constantes que serão usadas dentro das modal(as duas telas) a principal com a lista de tarefas e a de cadastro
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const cTarefa = document.querySelector('#m-tarefa')
const cDescricao = document.querySelector('#m-descricao')
const btnSalvar = document.querySelector('#btnSalvar')
const btnCancela = document.querySelector('#btnCancela')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
      
    }
  }

  if (edit) {
    cTarefa.value = itens[index].tarefa
    cDescricao.value = itens[index].descricao

    id = index
  } else {
    cTarefa.value = ''
    cDescricao.value = ''

  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
//comando innerhtml utilizado para obter os dados ja existentes ou alterar
  tr.innerHTML = `
    <td>${item.tarefa}</td>
    <td>${item.descricao}</td>
      <td class="acao"> 
      <button onclick="editItem(${index})"> &#9997; <i class='bx bx-edit'></i></button>
      
     
    </td>
    
    <td class="acao">
      <button onclick="deleteItem(${index})"> &#10062; <i class='bx bx-trash'></i></button>
      
    </td>
`
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {//botão com ação de salvar caso as informações lançadas no campo não estiver nula/vazio
  
  if (cTarefa.value == '' || cDescricao.value == '') {
   
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].tarefa = cTarefa.value
    itens[id].descricao = cDescricao.value
  } else {
    itens.push({'tarefa': cTarefa.value, 'vencimento': cDescricao.value})
  }
  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
  
}

btnCancela.onclick = b =>{//ao clicar no botão de cancelar o modal sai de visualização

  setItensBD()//seleção dos itens da base de dados

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {//função para localização dos itens 
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []//comando para puxar os itens ja salvos
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))//comando para inclusão dos itens lançados para a base de dados 

loadItens()//atualização da base