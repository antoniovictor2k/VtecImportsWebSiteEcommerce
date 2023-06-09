class Produto {
    constructor(nome, preco, desconto, descricao) {
        this.nome = nome;
        this.preco = preco;
        this.desconto = desconto;
        this.descricao = descricao;
    }
}

const produtos = [
    new Produto('Produto 1', 10.00, 0, 'Descrição do Produto 1'),
    new Produto('Produto 2', 20.00, 5, 'Descrição do Produto 2'),
    new Produto('Produto 3', 30.00, 0, 'Descrição do Produto 3'),
    // Adicione mais produtos aqui...
    new Produto('Produto 16', 160.00, 0, 'Descrição do Produto 16'),
    new Produto('Produto 1', 10.00, 0, 'Descrição do Produto 1'),
    new Produto('Produto 2', 20.00, 5, 'Descrição do Produto 2'),
    new Produto('Produto 3', 30.00, 0, 'Descrição do Produto 3'),
    // Adicione mais produtos aqui...
    new Produto('Produto 16', 160.00, 0, 'Descrição do Produto 16'),
    new Produto('Produto 1', 10.00, 0, 'Descrição do Produto 1'),
    new Produto('Produto 2', 20.00, 5, 'Descrição do Produto 2'),
    new Produto('Produto 3', 30.00, 0, 'Descrição do Produto 3'),
    // Adicione mais produtos aqui...
    new Produto('Produto 16', 160.00, 0, 'Descrição do Produto 16'),
];

const produtosPorPagina = 8;
let paginaAtual = 1;
const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function exibirProdutos() {
    const startIndex = (paginaAtual - 1) * produtosPorPagina;
    const endIndex = startIndex + produtosPorPagina;
    const produtosDaPagina = produtos.slice(startIndex, endIndex);

    const parentElement = document.getElementById('produtosContainer');
    parentElement.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'row px-xl-5';

    produtosDaPagina.forEach((produto, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 pb-1';
        col.innerHTML = `
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="img/product-1.jpg" alt="">
                </div>
                <div class="text-center py-4">
                    <a class="h6 text-decoration-none text-truncate" href="">${produto.nome}</a>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                        <h5>${formatarMoeda(produto.preco)}</h5>
                        <h6 class="text-muted ml-2"><del>${formatarMoeda(produto.desconto)}</del></h6>
                    </div>
                    <button type="button" class="btn btn-secondary m-2">Compre Agora</button>
                    <button type="button" class="btn btn-secondary m-2 ver-mais-btn" data-index="${index}">Ver Mais</button>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    parentElement.appendChild(row);

    atualizarNavegacao();

    // Rolar até a div #inicioProdutos
    const inicioProdutos = document.getElementById('inicioProdutos');
    inicioProdutos.scrollIntoView({ behavior: 'smooth' });

    // Adicionar os event listeners para os botões "Ver Mais"
    const verMaisBtns = document.getElementsByClassName('ver-mais-btn');
    Array.from(verMaisBtns).forEach(btn => {
        btn.addEventListener('click', mostrarDetalhesProduto);
    });
}

function mostrarDetalhesProduto(event) {
    const index = event.target.dataset.index;
    const produto = produtos[index];

    // Atualizar o conteúdo da seção de detalhes do produto
    const detalhesProduto = document.getElementById('detalhesProduto');
    detalhesProduto.innerHTML = `

    <div id="carouselExampleIndicators" class="carousel " data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="img/carousel-1.jpg" class="d-block w-100 carousel-img" alt="Imagem 1">
                </div>
                <div class="carousel-item">
                    <img src="img/carousel-2.jpg" class="d-block w-100 carousel-img" alt="Imagem 2">
                </div>
                <div class="carousel-item">
                    <img src="img/carousel-3.jpg" class="d-block w-100 carousel-img" alt="Imagem 3">
                </div>
                <div class="carousel-item">
                    <img src="img/carousel-3.jpg" class="d-block w-100 carousel-img" alt="Imagem 3">
                </div>
                <div class="carousel-item">
                    <img src="img/carousel-3.jpg" class="d-block w-100 carousel-img" alt="Imagem 3">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Anterior</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Próximo</span>
            </a>
        </div>


        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <button type="button" class="btn btn-secondary m-2 voltar-btn">Voltar</button>
    `;

    // Esconder a lista de produtos
    const produtosContainer = document.getElementById('produtosContainer');
    produtosContainer.style.display = 'none';

    // Exibir a seção de detalhes do produto
    detalhesProduto.style.display = 'block';

    // Esconder os botões de navegação
    const navegacao = document.getElementById('navegacao');
    navegacao.style.display = 'none';


    // Adicionar o event listener para o botão "Voltar"
    const voltarBtn = document.getElementsByClassName('voltar-btn')[0];
    voltarBtn.addEventListener('click', voltarParaListaProdutos);
}

function voltarParaListaProdutos() {
    // Exibir a lista de produtos
    const produtosContainer = document.getElementById('produtosContainer');
    produtosContainer.style.display = 'block';

    // Esconder a seção de detalhes do produto
    const detalhesProduto = document.getElementById('detalhesProduto');
    detalhesProduto.style.display = 'none';

    // Exibir os botões de navegação
    const navegacaoDiv = document.getElementById('navegacao');
    navegacaoDiv.style.display = 'block';
}

// Resto do código...

function atualizarNavegacao() {
    const anteriorBtn = document.getElementById('anteriorBtn');
    const proximaBtn = document.getElementById('proximaBtn');
    const paginaAtualSpan = document.getElementById('paginaAtualSpan');

    anteriorBtn.disabled = paginaAtual === 1;
    proximaBtn.disabled = paginaAtual === totalPaginas;

    paginaAtualSpan.textContent = paginaAtual;
}

function paginaAnterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        exibirProdutos();
    }
}

function proximaPagina() {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        exibirProdutos();
    }
}

exibirProdutos();
