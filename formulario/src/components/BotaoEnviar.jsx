function BotaoEnviar({texto, disabled}) {
    return(
        <button type={"submit"} id="meuButao" disabled={disabled}>{texto}</button>
    )
}

export default BotaoEnviar