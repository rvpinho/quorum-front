# Estágio 1: Compilar a aplicação Angular
FROM node:14 as builder

WORKDIR /usr/src/app

# Copiar os arquivos de configuração do Angular para o diretório de trabalho
COPY angular.json package.json tsconfig.json ./

# Instalar as dependências do Angular
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY src ./src

# Compilar a aplicação Angular
RUN npm run build --prod

# Estágio 2: Executar o aplicativo usando um servidor HTTP
FROM nginx:alpine

# Copiar os arquivos de build do estágio 1 para o diretório do servidor HTTP do Nginx
COPY --from=builder /usr/src/app/dist/qr-front /usr/share/nginx/html

# Arquivo de configuração personalizada para o servidor HTTP do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta que o servidor HTTP do Nginx está escutando (por padrão, a porta 80)
EXPOSE 80

# Comando para iniciar o servidor HTTP do Nginx
CMD ["nginx", "-g", "daemon off;"]
