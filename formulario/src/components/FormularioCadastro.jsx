import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useEffect, useState, useRef } from "react"

function FormularioCadastro() {
    const [validacao, setValidacao] = useState({ erro: '', sucesso: false })
    const [user, setUser] = useState({ nome: '', email: '', telefone: '' })
    const [coisas, setCoisas] = useState([]) 
    const [atualizar, setAtualizar] = useState(false)
    const [editandoi, setEditandoI] = useState(null)
    const [podeusar, setPodeUsar] = useState({pode: true, carregando: editandoi !== null ? 'Enviando' : 'CalmaMizera'})
    const nomeRef = useRef(null)

    const buscarcoisas = async () => {
        const resposta = await fetch('http://localhost:3000/registros')
        const dados = await resposta.json() 
        setCoisas(dados)
    }

    useEffect(() => {
        buscarcoisas() 
        console.log('ref antes do focus:', nomeRef.current)
        nomeRef.current.focus()
        console.log('ref antes do focus:', nomeRef.current)

    }, [atualizar])

    useEffect(() => {
        
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user.nome.trim() === "") {
            return setValidacao({erro: "Nome é obrigatório", sucesso: false})
        }

        if (user.telefone.length !== 11) {
            return setValidacao({erro: "Número de telefone inválido", sucesso: false})
        }

        
    setPodeUsar({ pode: false, carregando: 'CalmaMizera' })
    setTimeout(() => {
        setPodeUsar({ pode: true, carregando: 'Enviando' })
        }, 3000)


        try {
            const url = editandoi !== null ? `http://localhost:3000/registros/${editandoi}` : 'http://localhost:3000/registros'
            const method = editandoi !== null ? 'PUT': 'POST'
            const resposta = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })


            const resultado = await resposta.json()
            console.log(resposta)
            const statusCode = resposta.status; 
            if (statusCode == 409) {
                setValidacao({erro: 'Erro de Conflito' }) 
            }

            if (statusCode === 201 || statusCode === 200) {
                setAtualizar(!atualizar)
            }

            setValidacao({erro: '', sucesso: true})
            setUser({nome: '', email: '', telefone: ''})

            setEditandoI(null) 
            buscarcoisas()


        } catch (error) {
            //def
            console.log('Errou', error) 
        }
        
    } 
    const handleDeletar = async (index) => {
        console.log(index)
        const confirmou = window.confirm('Deseja remover este registro?') 
        if (!confirmou) return

        try{
            const resposta = await fetch(`http://localhost:3000/registros/${index}`, {method: 'DELETE'})
            if (!resposta.ok) {
                const dados = await resposta.json()
                setValidacao({erro: dados.erro})
                return
            }
            buscarcoisas()
        } catch {
            setValidacao({erro: 'Erro ao remover. Verifique o servidor', sucesso: false})
        }
    }

    const handleEditar = (index) => {
        const registro = coisas[index]

        setUser({nome: registro.nome, email: registro.email, telefone: registro.telefone})
        setEditandoI(index)

        nomeRef.current.focus()
    }
    
   
    return (
        <form onSubmit={handleSubmit}>
            {validacao.erro && <p style={{ color: 'red' }}>{validacao.erro}</p>}
            {validacao.sucesso && <p style={{ color: 'green' }}>Cadastrado com Sucesso</p>}
            <InputField
                label={"Nome: "}
                type={"text"}
                name={"nome"}
                placeholder={"Digite seu nome"}
                value={user.nome}
                onChange={(e) => {
                    setUser((dados) => ({ ...dados, nome: e.target.value, telefone: user.telefone, email: user.email }))
                    setValidacao({erro: ''})
                }
            }
                qualReferencia={nomeRef}
            />
            <InputField
                label={"Email: "}
                type={"email"}
                name={"email"}
                placeholder={"email@empresa.com"}
                value={user.email}
                onChange={(e) => setUser((dados) => ({ ...dados, nome: user.nome, telefone: user.telefone, email: e.target.value }))}
            />
            <InputField
                label={"Telefone: "}
                type={"number"}
                name={"numero"}
                placeholder={"Digite seu número: "}
                value={user.telefone}
                onChange={(e) => setUser((dados) => ({ ...dados, nome: user.nome, telefone: e.target.value, email: user.email }))}

            />
            <InputField
                label={"Nascimento: "}
                type={"date"}
                name={"data"}
            />
            <InputField
                label={"Masculino: "}
                type={"checkbox"}
                name={"masculino"}
            />
            <InputField
                label={"Feminino: "}
                type={"checkbox"}
                name={"feminino"}
            />
            <InputField
                label={"Indeterminado: "}
                type={"checkbox"}
                name={"indeterminado"}
            />
            <BotaoEnviar
                texto={podeusar.carregando} 
                disabled={!podeusar.pode}
            />     
            {editandoi !== null && (
                <button type='button' onClick={() => {
                    setEditandoI(null) // desliga a edissaum
                    setUser({nome: '', email: '', telefone:''})
                }}>
                    Cancelar edissaum
                </button>
            )}
            <div id= "registros">
                <p>
                    Nome do usuário:  {user.nome}
                </p>
                {coisas.length > 0 && 
                    (<ul>
                        {coisas.map((item, i) => (
                            <li key={i}>
                                {i}
                                <hr/>
                                {item.nome} - {item.email}
                                <div style={{border:    '2px solid #F4FF5B',
                                    borderRadius:'4px', padding:'4px',
                                    boxShadow:"0 0 10px #F4FF5B"
                                }} >
                                    <button onClick={() => handleDeletar(i)}>
                                        Deletar
                                    </button>
                                    <button onClick={() => handleEditar(i)}> Editar </button>
                                </div>
                            </li>
                        ))}
                    </ul>)
                }

            </div>
            
        </form>
    )
}

export default FormularioCadastro