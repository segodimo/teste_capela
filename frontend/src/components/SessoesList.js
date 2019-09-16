import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SessoesList extends Component {

    state = {
        sessoes: [],
        filmes: [],
        cinemas: [],
        listSesVsDia: [],
        nomesMes: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        nomesDias: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        listUnqSemanas: []
    }

    async componentDidMount() {
        this.getSessao();
        // console.log(this.state);
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
                alert('Precisa ter cinemas cadastradaos')
                window.location.href = '/editcinema';
            } else {
                this.setState({ cinemas: res_cin.data.cinema });
                const res = await axios.get('http://localhost:4000/api/sessoes');
                // console.log(this.state.cinemas)
                // console.log(res.data.sessoes)
                if (!res.data.sessoes.length > 0) {
                    alert('Precisa ter sessões cadastradas')
                    window.location.href = '/editsessao';
                } else {
                    this.setState({ sessoes: res.data.sessoes });
                    // console.log(this.state.sessoes);
                    //++++++++++++++++++++++++++++++++++++
                    const listSesVsDia = this.state.sessoes.map(sessoes => {
                        // const dt = new Date(sessoes.date).getTime();
                        const dt = new Date(sessoes.date);
                        const diff = (dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1);
                        // return [diff, sessoes.id_filme];
                        //++++++++++++++++++++++++++++++++++++
                        if (!this.getbyIdFilme(sessoes.id_filme))
                        {
                            this.deleteSessao(sessoes.id);
                            return console.log('id_filme não esta na lista de filmes')
                        }
                        else if (!this.getbyIdCinema(sessoes.id_cinema)) 
                        {
                            this.deleteSessao(sessoes.id);
                            return console.log('id_cinema não esta na lista de cinemas')
                        }
                        else{
                            const filme = this.getbyIdFilme(sessoes.id_filme);
                            const cinema = this.getbyIdCinema(sessoes.id_cinema);
                            //++++++++++++++++++++++++++++++++++++
                            const newDomDat = (new Date(dt.setDate(diff))).toDateString()
                            const sesDat =  (new Date(sessoes.date)).toLocaleString();
                            const arr_sessoes = {
                                dt_id: sessoes.id,
                                dt_dom: newDomDat,
                                dt_dat: sesDat,
                                dt_filme: filme,
                                dt_cinema: cinema,
                                dt_sala: sessoes.no_sala
                                // ses: sessoes
                            }
                            return arr_sessoes;
                            //++++++++++++++++++++++++++++++++++++
                        }
                    })
                    console.log(listSesVsDia);
                    this.setState({ listSesVsDia });
                    //++++++++++++++++++++++++++++++++++++
                    
                    //++++++++++++++++++++++++++++++++++++
                    const listSemanas = listSesVsDia.map(svd => svd.dt_dom);
                    const listUnqSemanas = listSemanas.filter((x, i, a) => a.indexOf(x) === i)
                    console.log(listUnqSemanas);
                    this.setState({ listUnqSemanas });
                    //++++++++++++++++++++++++++++++++++++
                    
                    //++++++++++++++++++++++++++++++++++++
                    // TESTES
                    // const mostrar = this.state.listSesVsDia.map(lsvd => lsvd.dt_dom)
                    // console.log('mostrar', mostrar)
                    //++++++++++++++++++++++++++++++++++++
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
        const res = await axios.delete('http://localhost:4000/api/sessoes/' + id);
        if(res.status === 200){
            console.log('res', res)
            await this.getSessao();
        }

    }

    render() {

        const sessaoTit = (lus) => (
            // let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 5;
            <h3 className="text-white">Sessão <span className="span_tit_sesf text-white" >{this.state.nomesDias[(lus.getDay())]} {(lus.toLocaleString())} - Sabado {(new Date(lus.getTime() + 518400000).toLocaleString())}</span></h3>
        );

        const filmeCard = (index, lsvd) => (
            <div className="card mt-4 border-primary" key={index}>
                <div className="card-header" key={index}><h5 className="mt-2">{lsvd.dt_filme.nome}</h5> <span className="text-primary">{lsvd.dt_cinema.nome}, {lsvd.dt_cinema.cidade}, Sala({lsvd.dt_sala}), Data: {lsvd.dt_dat}</span></div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{lsvd.dt_filme.sinopse}</p>
                        <footer className="blockquote-footer text-primary">Genero: <cite title="Source Title">{lsvd.dt_filme.genero}</cite></footer>
                        <footer className="blockquote-footer text-primary">Lançamento: <cite title="Source Title">{(new Date(lsvd.dt_filme.lancamento).toLocaleString())}</cite></footer>
                        <footer className="blockquote-footer text-primary">Duração: <cite title="Source Title">{lsvd.dt_filme.duracao} min.</cite></footer>
                        <footer className="blockquote-footer text-primary">Classificação: <cite title="Source Title">{lsvd.dt_filme.classificacao}</cite></footer>
                    </blockquote>
                </div>
                <div className="card-footer">
                    <Link to={"/editsessao/"} className="btn btn-outline-success"> <i className="material-icons">Criar</i> </Link>
                    <Link to={"/editsessao/" + lsvd.dt_id} className="btn btn-outline-warning  mx-4"> <i className="material-icons">Editar</i> </Link>
                    <button className="btn btn-outline-danger" onClick={() => this.deleteSessao(lsvd.dt_id)}> Delete </button>
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
                                {this.state.listSesVsDia.map((lsvd, index) => (lus === lsvd.dt_dom ? filmeCard(index, lsvd) : null))}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
