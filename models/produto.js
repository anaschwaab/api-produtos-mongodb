const { model, Schema } = require("mongoose");

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
module.exports = Produto;