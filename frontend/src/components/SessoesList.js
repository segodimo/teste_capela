import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SessoesList extends Component {

    state = {
        sessoes: [],
        filmes: [],
        cinemas: [],
        listSesVsDia: [],
        nomesDias: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        listUnqSemanas: []
    }

    async componentDidMount() {
        this.getSessao();
    }

    getSessao = async () => {
        // const res = await axios.get('http://localhost:4000/api/sessoes');
        // this.setState({ sessoes: res.data.sessoes });
        // if (!res.data.sessoes.length > 0) {
        //++++++++++++++++++++++++++++++++++++
        const res_fil = await axios.get('http://localhost:4000/api/filmes');
        // console.log(this.state.filmes)
        //++++++++++++++++++++++++++++++++++++
        if (!res_fil.data.filmes.length > 0) {
            alert('Precisa ter filmes cadastrados')
            window.location.href = '/editfilme';
        } else {
            this.setState({ filmes: res_fil.data.filmes });
            const res_cin = await axios.get('http://localhost:4000/api/cinemas');
            if (this.state.cinemas.length > 0) {
                alert('Precisa ter cinemas cadastradao')
                window.location.href = '/editcinema';
            } else {
                this.setState({ cinemas: res_cin.data.cinema });
                const res = await axios.get('http://localhost:4000/api/sessoes');
                // console.log(res.data.sessoes)
                if (!res.data.sessoes.length > 0) {
                    alert('Precisa ter sessões cadastradas')
                    window.location.href = '/editsessao';
                } else {
                    this.setState({ sessoes: res.data.sessoes });
                    // console.log(this.state.cinemas)
                    //++++++++++++++++++++++++++++++++++++
                    const listSesVsDia = this.state.sessoes.map(sessoes => {
                        const diaSessao = new Date(sessoes.date);
                        const dt = new Date(sessoes.date);
                        // console.log('dt', dt)
                        const diff = (dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1);
                        // return [sessoes.id, dt.setDate(diff)];
                        if (!this.getbyIdFilme(sessoes.id_filme)) {
                            // console.log('sessoes.id', sessoes.id)
                            this.deleteSessao(sessoes.id);
                            return console.log('id_cinema não esta na lista de filmes, seria bom remover esta sessção do banco de dados')
                        } else {
                            if (!this.getbyIdCinema(sessoes.id_cinema)) {
                                // console.log('sessoes.id', sessoes.id)
                                this.deleteSessao(sessoes.id);
                                return console.log('id_cinema não esta na lista de filmes, seria bom remover esta sessção do banco de dados')

                            } else {
                                return [dt.setDate(diff), sessoes.id, this.getbyIdFilme(sessoes.id_filme), this.getbyIdCinema(sessoes.id_cinema), sessoes.no_sala, diaSessao]
                            }
                        }
                    });

                    // console.log(listSesVsDia)
                    // console.log(listSesVsDia[0])
                    if (listSesVsDia[0]) {
                        this.setState({ listSesVsDia });
                        //+++++++++++++++++++++++++++++++ˇ+++++
                        const listSemanas = this.state.sessoes.map(sessoes => {
                            const dt = new Date(sessoes.date);
                            return dt.setDate((dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1));
                        });
                        const listUnqSemanas = listSemanas.filter((x, i, a) => a.indexOf(x) === i)
                        // console.log(listUnqSemanas)
                        this.setState({ listUnqSemanas });
                        //++++++++++++++++++++++++++++++++++++
                    } else {
                        console.log('PROBLEMA listSesVsDia INDEFINIDO', listSesVsDia)
                        
                    }

                    // // console.log(listSesVsDia)
                    // this.setState({ listSesVsDia });
                    // //++++++++++++++++++++++++++++++++++++
                    // const listSemanas = this.state.sessoes.map(sessoes => {
                    //     const dt = new Date(sessoes.date);
                    //     return dt.setDate((dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1));
                    // });
                    // const listUnqSemanas = listSemanas.filter((x, i, a) => a.indexOf(x) === i)
                    // // console.log(listUnqSemanas)
                    // this.setState({ listUnqSemanas });
                    // //++++++++++++++++++++++++++++++++++++

                }

            }
        }


    }

    getbyIdFilme = (id) => {
        return this.state.filmes.find(filmes => filmes.id === id);
    }
    getbyIdCinema = (id) => {
        return this.state.cinemas.find(cinema => cinema.id === id);
    }


    deleteSessao = async (id) => {
        await axios.delete('http://localhost:4000/api/sessoes/' + id);
        this.getSessao();
    }

    render() {

        const sessaoTit = (lus) => (
            // <h3>Sessão {(lus.toDateString())} </h3>
            <h3 className="text-white">Sessão <span className="span_tit_sesf text-white" >{this.state.nomesDias[(lus.getDay())]} {(lus.getDate())}/{(lus.getMonth())}/{(lus.getFullYear())} - Sabado {(new Date(lus.getTime() + 604800000).getDate())}/{(new Date(lus.getTime() + 604800000).getMonth())}/{(new Date(lus.getTime() + 604800000).getFullYear())} </span></h3>
            // <h3 className="text-white">Sessão <span className="span_tit_sesf text-white" >{this.state.nomesDias[(lus.getDay())]} {(lus.getDate())}/{(lus.getMonth())}/{(lus.getFullYear())} - Sabado * {(lus.getTime() + 604800000)}/{(lus.getMonth())}/{(lus.getFullYear())}</span></h3>
        );

        const filmeCard = (index, lsvd, datelsv) => (
            // <h4 key={index} >{Date(index)}</h4>
            <div className="card mt-4 border-primary" key={index}>
                <div className="card-header" key={index}><h5 className="mt-2">{lsvd[2].nome}</h5> <span className="text-primary">{lsvd[3].nome} - {lsvd[3].cidade} - Sala {lsvd[4]} - {this.state.nomesDias[(datelsv.getDay())]} - {(datelsv.toDateString())}</span> </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{lsvd[2].sinopse}</p>
                        <footer className="blockquote-footer text-primary">Genero: <cite title="Source Title">{lsvd[2].genero}</cite></footer>
                        <footer className="blockquote-footer text-primary">Lançamento: <cite title="Source Title">{lsvd[2].lancamento}</cite></footer>
                        <footer className="blockquote-footer text-primary">Duração: <cite title="Source Title">{lsvd[2].duracao} min.</cite></footer>
                        <footer className="blockquote-footer text-primary">Classificação: <cite title="Source Title">{lsvd[2].classificacao}</cite></footer>
                    </blockquote>
                </div>
                <div className="card-footer">
                    <Link to={"/editsessao/"} className="btn btn-outline-success"> <i className="material-icons">Criar</i> </Link>
                    <Link to={"/editsessao/" + lsvd[1]} className="btn btn-outline-warning  mx-4"> <i className="material-icons">Editar</i> </Link>
                    <button className="btn btn-outline-danger" onClick={() => this.deleteSessao(lsvd[1])}> Delete </button>
                </div>
            </div>

        );



        return (
            <div className="container-fluid">
                {
                    this.state.listUnqSemanas.map(lus => (
                        <div className="card my-4" key={lus}>
                            <div className="card-header bg-primary"> {sessaoTit(new Date(lus))} </div>
                            <div className="card-body">
                                {this.state.listSesVsDia.map((lsvd, index) => (lus === lsvd[0] ? filmeCard(index, lsvd, new Date(lsvd[5])) : null))}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
