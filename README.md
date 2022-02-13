<div align="center"> 
  <img src="readme/nodejs_animation.gif" width="300">
  <h1> GoShirts - ApolloServer </h1>
</div>

## 🧑🏻‍💻🧑🏻‍💻Desenvolvido por

@[AdaoBJr](https://github.com/AdaoBJr/)
@[PollyanaOliveira](https://github.com/PollyanaOliveira/)
<br>

---

## 💡 Sobre o Projeto

O Projeto GoShirts é uma POC com o intuito de montar um servidor nodejs que atenda as necessidades básicas de uma API para um e-Commerce de venda de roupas com a tecnologia Apollo Server, com a finalidade de realizar o fluxo de comunicação entre o Front-end e o Back-end, cacheando no Redis os dados de pesquisas contínuas dos usuários.

A partir dessas demandas, nesta POC os usuários poderão:

- Usar o Apollo-Studio e realizar queries e mutations;
- Iniciar o fluxo de login dentro da plataforma com a API retornando um token de autenticacao;
- E por fim, cachear esses dados no Redis a fim de receber essas informações em nova busca
  com uma latência menor.

## 🛠 Tecnologias Usadas

- NodeJS
- Express
- Apollo-Server
- GraphQL
- Redis
- MongoDB
- Babel
- GraphQL-Requests / Genql / Axios

## 🧙‍♂️ Como Iniciar o Projeto

Primeiro faça a clonagem do projeto em algum diretorio do seu computador:

```bash
> cd ~
> cd Documents/Mcx
> git clone git@github.com:AdaoBJr/GoShirts_ApolloServer.git
> cd GoShirts_ApolloServer
```

Depois disso instale as dependências:

```bash
> yarn ou npm install
```

Caso vc não tenha o Docker instalado em sua máquina, realize a instalação
de acordo com a documentação: https://www.docker.com/get-started

Com o docker devidamente instalado e dentro da pasta do projeto
inicie os docker containers do Redis e MongoDB rodando:

```bash
> make up
```

Após rodar o comando "make up" deverá aparecer a seguinte mensagem no
terminal:

![img](readme/created_containers_docker.png)

Por fim, rode o seguinte script para iniciar o projeto:

```bash
> yarn dev
```

O projeto vai iniciar em http://localhost:4000/graphql.
