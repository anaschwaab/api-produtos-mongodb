const { model, Schema } = require("mongoose");
const Joi = require("joi");

// (nome, descrição, quantidade, preço, desconto, dataDesconto, categoria, imagem do produto)
const Produto = model(
    "Produto", 
    new Schema({ 
        nome: {
            type: String, 
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        quantidade: {
            type: Number,
            required: true,
        },
        preco: {
            type: Number,
            required: true,
        },
        desconto: {
            type: Number,
            required: false,
        },
        dataDesconto: {
            type: Date,
            required: false,
        },
        categoria: {
            type: String,
            required: true,
        },
        
    })
);

const produtoJoi = Joi.object({
    nome: Joi.string().required().messages({"any.required": "O campo 'nome' é obrigatório."}),
    descricao: Joi.string().required().messages({"any.required": "O campo 'descrição' é obrigatório."}),
    quantidade: Joi.number().required().messages({"any.required": "O campo 'quantidade' é obrigatório."}),
    preco: Joi.number().required().messages({"any.required": "O campo 'preço' é obrigatório."}),
    desconto: Joi.number().required().messages({"any.required": "O campo 'desconto' é obrigatório."}),
    dataDesconto: Joi.date().required().messages({"any.required": "A data de desconto é obrigatória."}),
    categoria: Joi.string().required().messages({"any.required": "O campo 'categoria' é obrigatório."}),
});

module.exports = { Produto, produtoJoi };
