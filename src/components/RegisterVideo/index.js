import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm(){
            setValues({});
        }
    }
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });
    const [formVisible, setFormVisible] = React.useState(false);
    

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}>+</button>
            {formVisible && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setFormVisible(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button  type="button" className="close-modal" onClick={() => setFormVisible(false)}>X</button>
                        <input placeholder="Título do Vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}></input>
                        <input placeholder="URL" value={formCadastro.values.url} name="url" onChange={formCadastro.handleChange}></input>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}

        </StyledRegisterVideo>
    )
}