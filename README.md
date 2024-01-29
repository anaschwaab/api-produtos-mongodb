# API CRUD Produtos

## Objetivo
O objetivo desse projeto foi desenvolver uma API para realizar operações CRUD (Create, Read, Update, Delete) em produtos, utilizando MongoDB como banco de dados.

## Tecnologias Utilizadas
- MongoDB: Banco de dados NoSQL para armazenamento;
- Joi: Biblioteca para validaçaõ de dados, garantindo a integridade das informações;
- Swagger: Feramenta de documentação que facilita a compreensão e utilização da API.

## Funcionalidades
- **Operações CRUD:**
    - A API oferece endpoints para criar, visualizar, atualizar e excluir registros de produtos. 
- **Diversos filtros por queries:**
    - Rotas com diversas queries para filtragem por nome, quantidade, preço e categoria, proporcionando flexibilidade na busca de informações específicas.
- **Validações com Joi:**
    - A biblioteca Joi foi utilizada para garantir a validação dos campos dos produtos, incluindo validação de desconto (se está vencido ou não) a partir da data atual.
- **Documentação Swagger:** 
    - A API conta com uma documentação completa implementada usando o Swagger. Rode esse projeto localmente e acesse [aqui](http://localhost:3000/api-docs/) para explorar os endpoints disponíveis, parâmetros aceitos e formatos de resposta.


## Executando o Projeto Localmente

Para seguir o passo a passo será necessário ter o [Node.js](https://nodejs.org/en) e o [GIT](https://git-scm.com/downloads) instalados em sua máquina.

1. **Clone o Repositório:**

   - Copie o link do repositório no [Github](https://github.com/anaschwaab/api-produtos-mongodb)
   - Abra o terminal e navegue até a pasta onde você deseja clonar o projeto.
   - Execute o comando abaixo, substituindo `link` pelo link do repositório que você copiou:

     ```bash
     git clone link
     ```

2. **Acesse o Diretório do Projeto:**

   - Navegue para o diretório do projeto usando o terminal. Você pode fazer isso com o comando:

     ```bash
     cd nome-do-projeto
     ```

   Substitua `nome-do-projeto` pelo nome da pasta onde o projeto foi clonado.

3. **Instale as Dependências:**

   - Execute o seguinte comando para instalar as dependências do projeto:

     ```bash
     npm install
     ```

4. **Configure o Banco de Dados:**

   - Certifique-se de ter uma instância do MongoDB instalada localmente ou utilize o serviço [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register);
   - Crie um banco de dados para a aplicação e configure as informações de conexão no arquivo .env. Substitua <seu-usuario>, <sua-senha>, <seu_host> e <seu-banco-de-dados> pelas informações reais da sua instância MongoDB.

     ```bash
     MONGODB_URL="mongodb+srv://<seu-usuario>:<sua-senha>@<seu-host>/<seu-banco-de-dados>?retryWrites=true&w=majority",
     ```
     
5. **Inicie o Aplicativo:**

   - Após as configurações acima, rode a API localmente:

     ```bash
     npm start
     ```
6. **Acesse o Swagger:**

    - Clique [aqui](http://localhost:3000/api-docs) e acesse e explore de forma fácil e intuitiva todas as funcionalidades oferecidas pela API.
