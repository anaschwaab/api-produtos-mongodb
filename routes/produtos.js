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