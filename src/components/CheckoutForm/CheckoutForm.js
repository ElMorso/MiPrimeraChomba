import { useState } from "react"



const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleConfirm = (event) => {
        event.preventDefault()
        const userData = {
            name, phone, email
        }
        onConfirm(userData)
    }
    return (
        <div className="formulario">
            <div className="formulario2">
                <h1>Complete con datos</h1>
            <form onSubmit={handleConfirm} method="post">
                <div className="userName">
                    <input type="text" required value={name} onChange={({ target }) => setName(target.value)} />
                    <label>Nombre</label>
                </div>

                <div className="userName">
                    <input type="text" required value={phone} onChange={({ target }) => setPhone(target.value)} />
                    <label>phone</label>
                </div>

                <div className="userName">
                    <input type="text" value={email} onChange={({ target }) => setEmail(target.value)} />
                    <label>Email</label>
                </div>
                <input type="submit" value="Crear compra"/>                
            </form>
            </div>
        </div>
    )
}
export default CheckoutForm;