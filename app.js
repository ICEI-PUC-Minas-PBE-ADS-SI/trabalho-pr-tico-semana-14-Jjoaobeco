document.addEventListener("DOMContentLoaded", function () {
  const receitas = [
    {
      id: 1,
      titulo: "Bolinho de Chuva",
      descricao: "Aprenda a fazer um bolinho de chuva sequinho.",
      imagem: "imagens/bolinho-chuva.png",
      link: "bolinho.html",
      historia:
        "O bolinho de chuva é uma receita tradicional brasileira, trazida por influência portuguesa. Costuma ser preparado em dias chuvosos, daí seu nome, e é popular por sua simplicidade e sabor nostálgico."
    },
    {
      id: 2,
      titulo: "Lasanha à Bolonhesa",
      descricao: "Aprenda a fazer a boa e velha lasanha.",
      imagem: "imagens/lasanha.png",
      link: "lasanha.html",
      historia:
        "A lasanha é um prato de origem italiana, especialmente da região da Bolonha. É conhecida por suas camadas de massa, molho de carne e muito queijo, sendo uma das receitas mais amadas do mundo."
    },
    {
      id: 3,
      titulo: "Salmão ao Molho de Maracujá",
      descricao: "Aprenda a fazer um delicioso salmão ao molho de maracujá.",
      imagem: "imagens/salmao.png",
      link: "salmao.html",
      historia:
        "Essa receita combina a suavidade do salmão com o sabor ácido e adocicado do maracujá. Muito apreciada na culinária contemporânea brasileira, é servida em diversas ocasiões especiais."
    }
  ];

  const container = document.getElementById("receitas-container");
  container.innerHTML = receitas
    .map(
      (r) => `
    <div class="col-md-4">
      <div class="card text-center">
        <img src="${r.imagem}" class="card-img-top receita-img" alt="${r.titulo}" style="width: 100%; padding: 10%; cursor: pointer;">
        <div class="card-body">
          <h5 class="card-title"><a href="${r.link}" class="text-dark">${r.titulo}</a></h5>
          <p class="card-text">${r.descricao}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Criar popup
  const popup = document.createElement("div");
  popup.className = "popup-overlay";
  popup.style.display = "none";
  popup.innerHTML = `
    <div class="popup-content">
      <span class="popup-close" onclick="document.querySelector('.popup-overlay').style.display='none'">×</span>
      <img id="popup-img" src="" alt="" />
      <h2 id="popup-title"></h2>
      <p id="popup-historia"></p>
    </div>
  `;
  document.body.appendChild(popup);

  // Eventos nas imagens dos cards (depois que estão no DOM)
  document.querySelectorAll(".receita-img").forEach((img, i) => {
    img.addEventListener("click", () => {
      const r = receitas[i];
      document.getElementById("popup-img").src = r.imagem;
      document.getElementById("popup-title").textContent = r.titulo;
      document.getElementById("popup-historia").textContent = r.historia;
      popup.style.display = "flex";
    });
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});
