function  InputField({label, type, name, placeholder, value, onChange, qualReferencia}){
    return(
        <div>
            <label>{label}</label>
            <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref= {qualReferencia}
            />
        </div>
    )
}

export default InputField