const cors = require('cors')
const express = require('express');
const bananaSplit = express(); 
bananaSplit.use(cors())
bananaSplit.use(express.json()); 

const PORT = 3000;

const registros = []; 

bananaSplit.get('/registros', (req, res) => {
    res.status(200).json(registros)
});

bananaSplit.get('/   ', (req, res) => {
    const dados = req.body;
    res.status(200).json({
        sucesso: true,
        mensagem: 'OK!',
        dados: dados
    })
})
bananaSplit.post('/registros', (req, res) => {
    const dados = req.body
    if (!dados.nome.trim()){
       return res.status(400).json({
            erro:"Campo de nome é Obrigatório!"
        })
    }

    if (dados.nome.length > 100) {
        return res.status(400).json({
            erro: 'Nome muito grande, tem que ser menor que 100 caracteres'
        })
    }

    //Def - 1
    const email = registros.find(ProfessorVictor => ProfessorVictor.email === dados.email)
    const telefone = registros.find(ProfessorVictor => ProfessorVictor.telefone === dados.telefone)
    const nome = registros.find(JailsonMendes => JailsonMendes.nome.toLowerCase() === dados.nome.trim().toLowerCase())
    if (email) {
        return res.status(409).json({
            erro: "Email já existe, tem que ser diferente"
        }) 
    }
    if (telefone) {
        return res.status(409).json({
            erro: 'Telefone já existe, tem que ser diferente'
        })
    }
    if (nome) {
        return res.status(409).json({
            erro: "Nome já existe, tem que ser diferente"
        })
    }
   registros.push(dados) 

    return res.status(201).json( {
        sucesso: true,
        mensagem: "Registro criado com sucesso",
        dados: dados
    })

})
//rota put
//rota put
bananaSplit.put('/registros/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const dados = req.body
    if (id < 0 || id >= registros.length) {
        return res.status(404).json({erro: 'Registro não encontrado'})
    }

    registros[id] = dados
    res.status(200).json({mensagem: 'Registro atualizado com sucesso', dados: registros[id]})
    
})

// rota delete
bananaSplit.delete('/registros/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (id < 0 || id >= registros.length) {
        return res.status(404).json( {erro: 'Registro não encontrado'})
    }

    registros.splice(id, 1)
    res.status(200).json({mensagem: 'Registro removido'})
})


bananaSplit.listen(PORT, () => {
    console.log("Caldo de cana com pastel")
}); 