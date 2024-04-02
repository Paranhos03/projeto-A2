//*********************************************
// UNISUL - Universidade cruzeiro do sul - Santo Amaro
// Curso: CTS Analise e desenvolvimento de sistemas
// Disciplina: topicos avançados de Si - I
// Autor:Daniel paranhos -  Data: 25/03/2024
// descrição: projeto de criar rota

// Importando os modulos:
const http = require('http');       // Modulo usado para uso do protocolo http
const url  = require('url');        // Modulo usara para tratar endereço url (ex: caminhos)

// Definição de variaveis do projeto
const PORT = 4800;

// Criação do Servidor:
const server = http.createServer((req, res) => { 
    // Utilização do modulo URL (Criar os caminhos - end point):
    const reqUrl = url.parse(req.url, true);  // Habilita o URL 
    const path   = reqUrl.pathname;           // Habilita o nome do caminho da URL
    const query  = reqUrl.query;              // Habilita receber variaveis pela URL

    if(path === '/'){
        res.writeHead(200, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("End-Point: INDEX ('/')");
    }else if(path === '/imc'){
        const valorPeso   = parseFloat(query.peso);
        const valorAltura = parseFloat(query.altura);
        
        if(isNaN(valorAltura) || isNaN(valorPeso)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido");
        }else{
            // Calculo do IMC:
            const imc = valorPeso / (valorAltura*valorAltura);

            // Analisar o resultado:
            if(imc <= 19.5){
                // Abaixo do Peso:
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Abaixo do Peso`);
            }else if(imc <= 25){
                // Peso normal:
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Peso Normal`);
            }else if(imc <= 30){
                // Sobre Peso
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Sobre Peso`);
            }else if(imc <= 35){
                // Obesidade I
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade I`);
            }else if(imc <= 40){
                // Obesidade II
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade II`);
            }else{
                // Obesidade III
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade III`);
            }
        }

    }else if(path === '/notas'){
        // Receber as variaveis pela URL:
        const notaA1 = parseFloat(query.a1);
        const notaA2 = parseFloat(query.a2);
        const media  = parseFloat(query.med);

        // Validar se as variaveis são validas:
        if (isNaN(notaA1) || isNaN(notaA2) || isNaN(media)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido");
        }else{
            // Calcular a media:
            calculo = (notaA1 + notaA2)/2;

            // Analisar se esta aprovado ou não
            if(calculo >= media){
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas: \nA1:${notaA1.toFixed(2)} \nA2:${notaA2.toFixed(2)} \nMedia = ${calculo.toFixed(2)} - Aprovado`);
            }else{
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas:\nA1:${notaA1.toFixed(2)} \nA2:${notaA2.toFixed(2)} \nMedia = ${calculo.toFixed(2)} - Reprovado`);
            }
        }

    }else if(path === '/dolar'){
        // Receber as variaveis digitadas na URL:
        const valorDolar = parseFloat(query.dolar);  // Recebe a variavel dolar da URL
        const valorReais = parseFloat(query.reais);  // Recebe a variavel reais da URL

        if(isNaN(valorDolar) || isNaN(valorReais)){
            res.writeHead(400, {'Context-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido ...")
        }else{
            // Calcula a conversão de Reais para Dolar
            const convertido = valorReais / valorDolar;

            // Mostra o resultado no navegador:
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(`R$${valorReais.toFixed(2)} por U$${valorDolar.toFixed(2)} 
                    é igual U$${convertido.toFixed(2)} convertidos`);
        }
    }else{
        res.writeHead(404, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("404 - Pagina não encontrada ...")
    }
});

// Configuração do Servidor:
server.listen(PORT, () => {          // Config a porta do servidor
    console.log(`[OK] - Servidor iniciado em porta: ${PORT}`);  // Sucesso mostra essa msg.
});