const { Router } = require("express");
const { Produto, produtoJoi } = require("../models/produto");

const router = Router();

// Inserção de Produto (POST)
router.post("/produtos", async (req, res) => {
  try {
    const { error } = produtoJoi.validate(req.body);

    if(error) {
      res.status(400).json({ message: error.details[0].message});
    }else{
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
    }
    
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

    const query = {};
    if (nome) query.nome = nome;
    if (quantidade) query.quantidade = quantidade;
    if (preco) query.preco = preco;
    if (categoria) query.categoria = categoria;

    const produtos = await Produto.find(query);

    if (produtos.length === 0) {
      res.status(404).json({ message: "Nenhum produto encontrado." });
    } else {
      res.json(produtos);
    }
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


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
    const { error } = produtoJoi.validate(req.body);

    if(error) {
      res.status(400).json({ message: error.details[0].message});
    }else{
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
