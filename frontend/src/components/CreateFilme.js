import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateFilme extends Component {

    // async componentDidMount() {
    //     const res = await axios.get('http://localhost:4000/api/filmes');
    //     console.log(res)
    // }

    state = {
        filmes: [],
        nomefilme: '',
        genero: '',
        duracao: '',
        classificacao: '',
        lancamento: '',
        sinopse: '',
        urlfilme: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        this.getFilmes();
    }

    getFilmes = async () => {
        const res = await axios.get('http://localhost:4000/api/filmes');
        this.setState({ filmes: res.data.filmes });
        // console.log(this.state.filmes)
        // console.log(filmes)
    }

    onChangeFilmeNome = e => {
        // console.log(e.target.value)
        this.setState({ nomefilme: e.target.value })
    }

    onChangeGenero = e => {
        // console.log(e.target.value)
        this.setState({ genero: e.target.value })
    }

    onChangeDuracao = e => {
        // console.log(e.target.value)
        this.setState({ duracao: e.target.value })
    }

    onChangeClassificacao = e => {
        // console.log(e.target.value)
        this.setState({ classificacao: e.target.value })
    }

    onChangeLancamento = date => {
        // console.log('date', date)
        const newDate = new Date(date)
        this.setState({ lancamento: newDate });
        // console.log(this.state)
    }

    onChangeSinopse = e => {
        // console.log(e.target.value)
        this.setState({ sinopse: e.target.value })
    }

    onChangeFilmeUrl = e => {
        // console.log(e.target.value)
        this.setState({ urlfilme: e.target.value })
    }


    onSubmit = async (e) => {
        e.preventDefault();
        const enviarFilme= {
            nome: this.state.nomefilme,
            genero: this.state.genero,
            duracao: this.state.duracao,
            classificacao: this.state.classificacao,
            lancamento: this.state.lancamento,
            sinopse: this.state.sinopse,
            urlfilme: this.state.urlfilme
        };

        if (this.state.editing) {
            const res = await axios.put('http://localhost:4000/api/filmes/' + this.state._id, enviarFilme)
            console.log(res)
        }else{
            // console.log(enviarFilme)
            const res = await axios.post('http://localhost:4000/api/filmes', enviarFilme);
            console.log(res)
        }

        // this.setState({ nomefilme: '' });
        this.setState({
            nomefilme: '',
            genero: '',
            duracao: '',
            classificacao: '',
            lancamento: '',
            sinopse: '',
            urlfilme: '',
            editing: false,
            _id: ''
        });
        console.log(this.state)
        this.getFilmes();
    }

    onClickDeletaFilme = async (id) => {
        const res = await axios.get('http://localhost:4000/api/sessoes');
        // console.log(res.data.sessoes)
        const sesDel = res.data.sessoes.find(sess => sess.id_filme === id);
        if(sesDel){ await axios.delete('http://localhost:4000/api/sessoes/' + sesDel.id) }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        await axios.delete('http://localhost:4000/api/filmes/' + id);
        this.getFilmes();
    }

    onClickEditarFilme = async (id) => {
        const res = await axios.get('http://localhost:4000/api/filmes/' + id);
        // console.log('res', res.data.filme)
        // const newdata = new Data("2019-01-01 12:00:00");
        const newdata =  new Date(res.data.filme.lancamento);
        this.setState({
            editing: true,
            _id: id,
            nomefilme: res.data.filme.nome,
            genero: res.data.filme.genero,
            duracao: res.data.filme.duracao,
            classificacao: res.data.filme.classificacao,
            lancamento: newdata,
            sinopse: res.data.filme.sinopse
            // urlfilme: res.data.filme.urlfilme
        });
        // console.log(this.state)
        this.getFilmes();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header"><h4>FILME <span className="spanFilmes">(Criar / Editar)</span></h4></div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>

                                {/*  FILME */}
                                <div className="form grup">
                                    <p className="txt_form">Nome do Filme</p>
                                    <input
                                        type="text"
                                        value={this.state.nomefilme}
                                        className="form-control"
                                        onChange={this.onChangeFilmeNome}
                                    />
                                </div>

                                {/* GENERO */}
                                <div className="form grup">
                                    <p className="txt_form">Genero</p>
                                    <input
                                        type="text"
                                        value={this.state.genero}
                                        className="form-control"
                                        onChange={this.onChangeGenero}
                                    />
                                </div>

                                {/* DURAÇÃO */}
                                <div className="form grup">
                                    <p className="txt_form">Duração</p>
                                    <input
                                        type="number"
                                        value={this.state.duracao}
                                        className="form-control"
                                        onChange={this.onChangeDuracao}
                                    />
                                </div>

                                {/* SELECT CLASSIFICAÇÃO */}
                                <div className="form-group">
                                    <p className="txt_form">Classificação</p>
                                    <select
                                        className="form-control"
                                        value={this.state.classificacao}
                                        onChange={this.onChangeClassificacao}
                                        name="userSelected" >
                                        <option key={""} value={""}></option>
                                        <option key={"1"} value={"L"}> L </option>
                                        <option key={"2"} value={"10"}> 10 </option>
                                        <option key={"3"} value={"12"}> 12 </option>
                                        <option key={"4"} value={"14"}> 14 </option>
                                        <option key={"5"} value={"16"}> 16 </option>
                                        <option key={"6"} value={"18"}> 18 </option>
                                    </select>
                                </div>

                                {/* LANÇAMENTO */}
                                <div className="form-group">
                                    <p className="txt_form">Lançamento</p>
                                    <DatePicker className="form-control input-lg"
                                        selected={this.state.lancamento}
                                        onChange={this.onChangeLancamento}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="yyyy-MM-dd hh:mm:ss"
                                    />
                                </div>

                                {/* SINOPSE */}
                                <div className="form-group">
                                    <p className="txt_form">Sinopse</p>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Content"
                                        name="content"
                                        onChange={this.onChangeSinopse}
                                        value={this.state.sinopse}
                                        required>
                                    </textarea>
                                </div>

                                {/*  URL */}
                                {/* 
                                <div className="form grup">
                                    <p className="txt_form">URL Imagem</p>
                                    <input
                                        type="text"
                                        value={this.state.urlfilme}
                                        className="form-control"
                                        onChange={this.onChangeFilmeUrl}
                                    />
                                </div>
                                 */}


                                <button type="submit" className="btn btn-outline-primary btn-block my-2">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-grou">
                        {
                            this.state.filmes.map(filme => (
                            <li className="list-group-item list-group-item-action mb-4" key={filme.id}>
                                <h4>{filme.nome}</h4>
                                <p>{filme.genero}</p>
                                <p>Duração: {filme.duracao}min, Classificação: {filme.classificacao}, Lançamento: { (new Date( filme.lancamento ).toLocaleString()) } </p>
                                <p>Sinopse: {filme.sinopse}</p>
                                <button type="button" className="btn btn-outline-warning ml-auto" onClick={() => this.onClickEditarFilme(filme.id)} >Editar</button>
                                <button type="button" className="btn btn-outline-danger ml-4" onClick={() => this.onClickDeletaFilme(filme.id)} >Deletar</button>
                            </li>
                            ))
                        } 
                    </ul>
                </div>
            </div>
        )
    }
}
