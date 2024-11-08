---

# Solução Digital para Documentos

Este projeto é uma aplicação Next.js escrita em TypeScript para gerenciar documentos digitalmente.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados **ou**
- **Node.js** versão 18.x (ou superior) e **npm**

## Primeiros Passos

### Estrutura do Projeto

- **Frontend**: Utiliza Next.js com TypeScript e Tailwind CSS.
- **Backend** (opcional): Dependendo das necessidades do projeto, pode incluir uma API.

---

## Instruções para Rodar com Docker

### 1. Configurar o Ambiente Docker

Certifique-se de que você tenha o **Docker** e o **Docker Compose** instalados em sua máquina. Para instalar o Docker, [siga as instruções oficiais](https://docs.docker.com/get-docker/).

### 2. Executar o Projeto com Docker

No diretório raiz do projeto, onde está localizado o arquivo `docker-compose.yml`, execute:

```bash
docker-compose up --build
```

Esse comando:
- Constrói a imagem Docker usando o Dockerfile.
- Instala as dependências e inicia o servidor Next.js.

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### 3. Parar o Projeto Docker

Para encerrar o projeto, pressione `CTRL + C` no terminal onde o comando `docker-compose up` está sendo executado. Para garantir que os containers sejam completamente parados, execute:

```bash
docker-compose down
```

---

## Instruções para Rodar com Node.js (Sem Docker)

### 1. Instalar Dependências

No diretório raiz do projeto, onde estão localizados os arquivos `package.json`, execute:

```bash
npm install
```

Isso instalará todas as dependências do projeto.

### 2. Rodar o Servidor em Desenvolvimento

Após instalar as dependências, execute o servidor:

```bash
npm run dev
```

O projeto estará acessível em [http://localhost:3000](http://localhost:3000).

### 3. Rodar o Build de Produção

Para rodar o projeto em modo de produção, você pode criar o build e, em seguida, iniciar o servidor com os seguintes comandos:

```bash
npm run build
npm start
```

---

## Variáveis de Ambiente

Este projeto pode precisar de variáveis de ambiente. Crie um arquivo `.env.local` na raiz do projeto e adicione variáveis conforme necessário:

```env
NEXT_PUBLIC_API_URL=https://sua-api-url.com
OUTRA_VARIAVEL=valor
```

---

## Estrutura dos Arquivos Importantes

- **src/app/page.tsx**: Página inicial do projeto, onde são exibidas as opções de criar, assinar e consultar documentos.
- **Dockerfile**: Define as instruções para construir a imagem Docker da aplicação.
- **docker-compose.yml**: Arquivo de configuração para o Docker Compose, que orquestra a construção e execução dos serviços Docker.
- **package.json**: Arquivo que lista as dependências e scripts de execução do projeto.
- **.dockerignore**: Arquivo para ignorar arquivos e pastas durante o build Docker.

---

## Tecnologias Utilizadas

- **Next.js** com **TypeScript**
- **Docker** e **Docker Compose**
- **Tailwind CSS**
- Ícones da biblioteca **@heroicons/react**

---

## Problemas Comuns e Soluções

1. **Erro com Cache no Docker**: Execute `docker builder prune --force` para limpar o cache de build do Docker.
2. **Problemas de Conexão do Docker no Windows**: Certifique-se de que o Docker Desktop esteja em execução e configurado para utilizar containers Linux.

---

## Contribuições

Sinta-se à vontade para contribuir com melhorias e sugestões. Faça um fork do projeto e abra um Pull Request com sua contribuição!

---
