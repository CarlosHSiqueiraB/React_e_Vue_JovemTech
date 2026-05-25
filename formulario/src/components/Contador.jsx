import { useState } from "react";

function Contador() {
    const [count, setCount] = useState(0)
    return(
        <div>
            <p>contando: {count}</p>
            <button onClick={() => setCount(count + 1)}>Somar</button>
        </div>
    )
}
export default Contador 