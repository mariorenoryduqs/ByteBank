import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FormularioState {
    formData: { nome: string; email: string; senha: string };
    errors: { [key: string]: string };
}

class Formulario extends Component<{}, FormularioState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: { nome: "", email: "", senha: "" },
            errors: {}
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value }
        }));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validationErrors: { [key: string]: string } = {};

        if (!this.state.formData.nome) validationErrors.nome = "O nome é obrigatório";
        if (!this.state.formData.email) validationErrors.email = "O email é obrigatório";
        if (!this.state.formData.senha) validationErrors.senha = "A senha é obrigatória";

        this.setState({ errors: validationErrors });
        if (Object.keys(validationErrors).length === 0) {
            console.log("Formulário enviado com sucesso!", this.state.formData);
        }
    };



    

    render() {
        const { formData, errors } = this.state;
        return (
            <div className="container mt-5">
                <div className="card p-4 shadow">
                    <h2 className="mb-4">Cadastro</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                                name="nome"
                                value={formData.nome}
                                onChange={this.handleChange}
                            />
                            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                name="email"
                                value={formData.email}
                                onChange={this.handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                                name="senha"
                                value={formData.senha}
                                onChange={this.handleChange}
                            />
                            {errors.senha && <div className="invalid-feedback">{errors.senha}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Formulario;