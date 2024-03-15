class GeradorArquivo {
    constructor(divisoes, N, alfabeto, tamanhoMin, tamanhoMax) {
        this.divisoes = divisoes;
        this.N = N;
        this.alfabeto = alfabeto;
        this.tamanhoMin = tamanhoMin;
        this.tamanhoMax = tamanhoMax;
    }

    gerarPalavraAleatoria() {
        const tamanhoPalavra = Math.floor(Math.random() * (this.tamanhoMax - this.tamanhoMin + 1)) + this.tamanhoMin;
        let palavra = '';
        for (let i = 0; i < tamanhoPalavra; i++) {
            const indiceAleatorio = Math.floor(Math.random() * this.alfabeto.length);
            palavra += this.alfabeto[indiceAleatorio];
        }
        return palavra;
    }

    gerarArquivo() {
        const palavras = [];
        for (let i = 0; i < this.N; i++) {
            palavras.push(this.gerarPalavraAleatoria());
        }
        const partes = [];
        const tamanhoParte = Math.ceil(this.N / this.divisoes);
        for (let i = 0; i < this.divisoes; i++) {
            const indiceInicio = i * tamanhoParte;
            const indiceFim = Math.min((i + 1) * tamanhoParte, this.N);
            partes.push(palavras.slice(indiceInicio, indiceFim).join(' '));
        }
        return partes;
    }
}

function funcaoMap(dados) {
    const palavras = dados.split(/\s+/);
    const contagemPalavras = {};
    palavras.forEach(palavra => {
        if (contagemPalavras[palavra]) {
            contagemPalavras[palavra]++;
        } else {
            contagemPalavras[palavra] = 1;
        }
    });
    return Object.entries(contagemPalavras);
}

function funcaoReduce(chave, valores) {
    const soma = valores.reduce((acc, curr) => acc + parseInt(curr), 0);
    return ${ chave } : "${soma}";
}

function controleMapReduce(partesTexto) {
    const resultadosMapeados = partesTexto.map(parte => funcaoMap(parte));
    const chavesTemporarias = new Set();
    resultadosMapeados.forEach(resultadoMapeado => {
        resultadoMapeado.forEach(par => {
            chavesTemporarias.add(par[0]);
        });
    });

    const entradasReduzidas = Array.from(chavesTemporarias).map(chave => {
        const valores = resultadosMapeados.flatMap(resultado => resultado.filter(par => par[0] === chave).map(par => par[1]));
        return [chave, valores];
    });

    entradasReduzidas.forEach(entrada => {
        const [chave, valores] = entrada;
        console.log(Reduce(${ chave }, [${ valores }]));
    });
}

const geradorArquivo = new GeradorArquivo(3, 100, ['a', 'b', 'c', 'd', 'e'], 3, 8);
const partesArquivo = geradorArquivo.gerarArquivo();
console.log("Arquivo dividido em partes:");
partesArquivo.forEach((parte, indice) => {
    console.log(Parte ${ indice + 1}: ${ parte });
});

console.log("\nExecutando o MapReduce:");
controleMapReduce(partesArquivo);