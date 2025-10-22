import axios from "axios"
import { useEffect, useState } from "react"
export const LandingContent = () => {

    const [frase, setFrase] = useState("")

    function CargarFraseDelDia() {
        axios.get("http://localhost:2000/").then(resp => {
            setFrase(resp.data.frase)
        })
    }
    
    useEffect(() => {
        CargarFraseDelDia()
    },[])
    return (
        <div class="h-full">
            Este es el contenido de la pagina
            <div>La fase del dia es:</div>
            <p>{frase}</p>
            <button className="p-2 bg-green-400 rounded-lg cursor-pointer" onClick={CargarFraseDelDia}>Obtener Frase</button>
        </div>
    )
}