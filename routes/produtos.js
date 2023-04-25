/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - quantidade
 *         - preco
 *         - desconto
 *         - dataDesconto
 *         - categoria
 *         - imagem
 *       properties:
 *         id:
 *           type: string
 *           description: Automaticamente gerado pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: O nome do produto
 *         descricao:
 *           type: string
 *           description: A descrição do produto
 *         quantidade:
 *           type: number
 *           description: A quantidade em estoque de um determinado produto
 *         preco:
 *           type: number
 *           description: O preço de determinado produto
 *         desconto:
 *           type: number
 *           description: O desconto de determinado produto
 *         dataDesconto:
 *           type: datetime
 *           description: Válidade do desconto
 *           format: date
 *         categoria:
 *           type: string
 *           description: A categoria de determinado produto
 *         imagem:
 *           type: string
 *           description: O caminho da imagem do produto
 *       example:
 *         id: 1
 *         nome: Boneca
 *         descricao: Boneca barbie profissões com 15pcs
 *         quantidade: 15
 *         preco: 35
 *         desconto: 10
 *         dataDesconto: 2023-04-20T14:14:36.108Z
 *         categoria: Brinquedos
 *         imagem: uploads\\imagem.jpg
 */

const { Router } = require("express");
const Joi = require("joi");
const { Produto, produtoJoi } = require("../models/produto");
const multer = require("multer");

const router = Router();

// Configurar armazenamento do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     description: Cria e adiciona um produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               quantidade:
 *                 type: number
 *               preco:
 *                 type: number
 *               desconto:
 *                 type: number
 *               dataDesconto:
 *                 type: date
 *               categoria:
 *                 type: string
 *               imagem: 
 *                 type: file
 *             example:
 *               nome: Boneca
 *               descricao: Boneca barbie profissões com 15pcs
 *               quantidade: 15
 *               preco: 35
 *               desconto: 10
 *               dataDesconto: 2023-04-20T14:14:36.108Z
 *               categoria: Brinquedos
 *               imagem: uploads\imagem.jpeg
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Err
 *       500:
 *         description: Um erro aconteceu
 */

// Inserção de Produto (POST)
router.post("/produtos", upload.single("imagem"), async (req, res) => {
  try {
    const { error } = produtoJoi.validate(req.body);
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;
  
    if(error) {
      res.status(400).json({ message: error.details[0].message});
    }else{

      const descontoValido = Joi.date().greater('now').validate(dataDesconto);

      if(descontoValido.error){
        res.status(406).json({ message: "Desconto vencido" });
      }else{
        const produto = new Produto({
          nome,
          descricao,
          quantidade,
          preco,
          desconto,
          dataDesconto,
          categoria,
          imagem: req.file.path,
        });
    
        await produto.save();
        res.status(201).json(produto);
      }   
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Mostra a lista de todos produtos
 *     description: Retorna uma lista com todos produtos cadastrados
 *     responses:
 *       200:
 *         description: Lista de todos produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

router.get("/produtos", async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

/**
 * @swagger
 * /produtos/filtro:
 *   get:
 *     summary: Mostra a lista de todos produtos filtrados
 *     description: Retorna uma lista com todos produtos filtrados de acordo com query
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do produto
 *       - in: query
 *         name: quantidade
 *         schema:
 *           type: number
 *         description: Quantidade do produto
 *       - in: query
 *         name: preco
 *         schema:
 *           type: number
 *         description: Preço do produto
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoria do produto
 *     responses:
 *       200:
 *         description: Lista de todos produtos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *          description: Nenhum produto encontrado
 *       500:
 *          description: Um erro aconteceu
 */

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

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Mostra detalhes do produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     responses:
 *       200:
 *         description: Retorna detalhes do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Um erro aconteceu
 */

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

/** 
 * @swagger
 * /produtos/{id}:  
 *  put:
 *    summary: Atualiza um produto
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id do produto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produto'
 *    responses:
 *      200:
 *        description: Produto editado com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produto'
 *      400:
 *        description: Err
 *      404:
 *        description: Produto não encontrado
 *      500:
 *        description: Um erro aconteceu
 */

// Atualização de um Produto (PUT)
router.put("/produtos/:id", upload.single("imagem"), async (req, res) => {
  try {
    const { error } = produtoJoi.validate(req.body);
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;

    if(error) {
      res.status(400).json({ message: error.details[0].message});
    }else{
    const { id } = req.params;
    console.log(req.file)
    const produto = await Produto.findByIdAndUpdate(id, {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
      imagem: req.file?.path
    }, { new: true });

    const descontoValido = Joi.date().greater('now').validate(dataDesconto);
    
    if(descontoValido.error){
      res.status(406).json({ message: "Desconto vencido" });
    }else{
      if (produto) {
        res.json({ message: "Produto editado." });
      } else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
    }
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

/**
 * @swagger
 * /produtos/{id}:
 *  delete:
 *     summary: Remover um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     responses:
 *       200:
 *         description: Produto excluído
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Um erro aconteceu
 */

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
