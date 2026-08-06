# Usa uma imagem oficial, pequena e rápida do Nginx
FROM nginx:alpine

# Copia todos os arquivos do diretório do projeto (HTML, CSS, Imagens) 
# para a pasta raiz onde o Nginx serve os arquivos estáticos
COPY . /usr/share/nginx/html

# Expõe a porta 80, padrão do HTTP
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]
