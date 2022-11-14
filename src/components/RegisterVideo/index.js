import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

// Custom Hook
function useForm(propsDoForm) {
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
        clearForm() {
            setValues({});
        }
    }
}

const PROJECT_URL = 'https://vqxegtyyoklzqnvwmxuo.supabase.co'
const PROJECT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxeGVndHl5b2tsenFudndteHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk4NzAsImV4cCI6MTk4Mzg2NTg3MH0.6UQ1N9abxDUdFpjAPuiH0Y5Jd2gIVmkH9WF8WGU4lAc';
const supabase = createClient(PROJECT_URL, PROJECT_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("be/")[1]}/hqdefault.jpg`;
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
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: formCadastro.values.playlist
                    })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    setFormVisible(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisible(false)}>X</button>
                        <input placeholder="Título do Vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}></input>
                        <input placeholder="URL" value={formCadastro.values.url} name="url" onChange={formCadastro.handleChange}></input>
                        <input placeholder="Playlist" value={formCadastro.values.playlist} name="playlist" onChange={formCadastro.handleChange}></input>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}

        </StyledRegisterVideo>
    )
}