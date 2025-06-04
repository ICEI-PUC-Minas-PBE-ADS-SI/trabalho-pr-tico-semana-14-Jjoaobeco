
const apiUrl = "http://localhost:3000/receitas";

document.addEventListener("DOMContentLoaded", () => {
  listarReceitas();

  document.getElementById("form-receita").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const receita = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      conteudo: document.getElementById("conteudo").value,
      categoria: document.getElementById("categoria").value,
      autor: document.getElementById("autor").value,
      data: document.getElementById("data").value,
      imagem: document.getElementById("imagem").value
    };

    if (id) {
      fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receita)
      }).then(() => listarReceitas());
    } else {
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receita)
      }).then(() => listarReceitas());
    }

    this.reset();
    document.getElementById("id").value = "";
  });
});

function listarReceitas() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(receitas => {
      const tabela = document.getElementById("tabela-receitas");
      tabela.innerHTML = "";
      receitas.forEach(receita => {
        tabela.innerHTML += `
          <tr>
            <td>${receita.id}</td>
            <td>${receita.titulo}</td>
            <td>${receita.autor}</td>
            <td>
              <button onclick='editar(${JSON.stringify(receita)})'>Editar</button>
              <button onclick='excluir(${receita.id})'>Excluir</button>
            </td>
          </tr>`;
      });
    });
}

function editar(receita) {
  document.getElementById("id").value = receita.id;
  document.getElementById("titulo").value = receita.titulo;
  document.getElementById("descricao").value = receita.descricao;
  document.getElementById("conteudo").value = receita.conteudo;
  document.getElementById("categoria").value = receita.categoria;
  document.getElementById("autor").value = receita.autor;
  document.getElementById("data").value = receita.data;
  document.getElementById("imagem").value = receita.imagem;
}

function excluir(id) {
  if (confirm("Deseja excluir esta receita?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    }).then(() => listarReceitas());
  }
}
