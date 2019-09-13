import React, { Component } from 'react'
import axios from 'axios'

export default class CreateCinema extends Component {


    state = {
        cinemas: [],
        nome: '',
        cidade: '',
        salas: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        this.getCinema();
    }

    getCinema = async () => {
        const res = await axios.get('http://localhost:4000/api/cinemas');
        this.setState({ cinemas: res.data.cinema });
        // console.log(this.state.filmes)
        console.log(res)
    }

    onChangeCinemaNome = e => {
        // console.log(e.target.value)
        this.setState({ nome: e.target.value })
    }

    onChangeCidade = e => {
        // console.log(e.target.value)
        this.setState({ cidade: e.target.value })
    }

    onChangeSalas = e => {
        // console.log(e.target.value)
        this.setState({ salas: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const enviarFilme = {
            nome: this.state.nome,
            cidade: this.state.cidade,
            salas: this.state.salas
        };

        if (this.state.editing) {
            const res = await axios.put('http://localhost:4000/api/cinemas/' + this.state._id, enviarFilme)
            console.log(res)
        } else {
            // console.log(enviarFilme)
            const res = await axios.post('http://localhost:4000/api/cinemas', enviarFilme);
            console.log(res)
        }

        // this.setState({ nomefilme: '' });
        this.setState({
            nome: '',
            cidade: '',
            salas: '',
            editing: false,
            _id: ''
        });
        // console.log(this.state)
        this.getCinema();
    }


    onClickDeletaCinema = async (id) => {
        const res = await axios.get('http://localhost:4000/api/sessoes');
        // console.log(res.data.sessoes)
        const sesDel = res.data.sessoes.find(sess => sess.id_filme === id);
        if(sesDel){ await axios.delete('http://localhost:4000/api/sessoes/' + sesDel.id) }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++        
        await axios.delete('http://localhost:4000/api/cinemas/' + id);
        this.getCinema();
    }

    onClickEditarCinema = async (id) => {
        // console.log(id)
        const res = await axios.get('http://localhost:4000/api/cinemas/' + id);
        // console.log(res)
        this.setState({
            editing: true,
            _id: id,
            nome: res.data.cinema.nome,
            cidade: res.data.cinema.cidade,
            salas: res.data.cinema.salas
        });
        // console.log(this.state)
        this.getCinema();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header"><h4>CINEMA <span className="spanFilmes">(Criar / Editar)</span></h4></div>
                        <div className="card card-body">
                            <form onSubmit={this.onSubmit}>

                                {/* NOME */}
                                <div className="form grup">
                                    <p className="txt_form">Nome do Cinema</p>
                                    <input
                                        type="text"
                                        value={this.state.nome}
                                        className="form-control"
                                        onChange={this.onChangeCinemaNome}
                                    />
                                </div>

                                {/* CIDADE */}
                                <div className="form grup">
                                    <p className="txt_form">Cidade</p>
                                    <input
                                        type="text"
                                        value={this.state.cidade}
                                        className="form-control"
                                        onChange={this.onChangeCidade}
                                    />
                                </div>

                                {/* SELECT SALAS */}
                                <div className="form grup">
                                    <p className="txt_form">No. de Salas</p>
                                    <input
                                        type="number"
                                        value={this.state.salas}
                                        className="form-control"
                                        onChange={this.onChangeSalas}
                                    />
                                </div>

                                <button type="submit" className="btn btn-outline-primary btn-block mt-4">Envair</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-grou">
                        {
                            this.state.cinemas.map(cinema => (
                                <li className="list-group-item list-group-item-action mb-4" key={cinema.id}>
                                    <h4>{cinema.nome}</h4>
                                    <p>Cidade: {cinema.cidade}, No de Salas: {cinema.salas}</p>
                                    <button type="button" className="btn btn-outline-warning ml-auto" onClick={() => this.onClickEditarCinema(cinema.id)} >Editar</button>
                                    <button type="button" className="btn btn-outline-danger ml-4" onClick={() => this.onClickDeletaCinema(cinema.id)} >Deletar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}