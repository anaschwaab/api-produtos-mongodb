const { Router } = require("express");
const Produto = require("../models/produto");

const router = Router();

// Inserção de Produto (POST)
router.post("/produtos", async (req, res) => {
  try {
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;

    const produto = new Produto({
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    });

    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.get("/produtos", async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

// Listagem de Produtos por campo

router.get("/produtos/filtro", async (req, res) => {

  try{
    const { nome, quantidade, preco, categoria } = req.query;
    const produtosNome = await Produto.find().where("nome").equals(nome);
    const produtosQuantidade = await Produto.find().where("quantidade").equals(quantidade);
    const produtosPreco = await Produto.find().where("preco").equals(preco);
    const produtosCategoria = await Produto.find().where("categoria").equals(categoria);
  
    if (nome){
      res.json(produtosNome);
    }else if (quantidade){
      res.json(produtosQuantidade);
    }else if (preco){
      res.json(produtosPreco);
    }else if (categoria){
      res.json(produtosCategoria);
    }else{
      res.status(404).json({ message: "Parâmetro de pesquisa inválido."})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


// Listagem de Produtos de acordo com a categoria 'brinquedo'
// router.get("/produtos/brinquedos", async (req, res) => {
//   try{
//     const listaBrinquedos = await Produto.find().where("categoria").equals("brinquedo");
//     if(listaBrinquedos.length > 0){
//       res.json(listaBrinquedos);
//     }else{
//       res.status(404).json({ message: "Nenhum produto nessa categoria foi encontrado."});
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({ message: "Um erro aconteceu." });
//   }
// });


// Listagem de um Produto (GET)
router.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const produtoExistente = await Produto.findById(id);

    if (produtoExistente) {
      res.status(200).json(produtoExistente);
    } else {
      res.status(404).json({ message: "Produto não encontrada" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


// Atualização de um Produto (PUT)
router.put("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;

    const produto = await Produto.findByIdAndUpdate(id, {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    });

    if (produto) {
      res.json({ message: "Produto editado." });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Remoção de um Produto (DELETE)
router.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByIdAndRemove(id);

    if (produto) {
      res.json({ message: "Produto excluído." });
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

module.exports = router;
