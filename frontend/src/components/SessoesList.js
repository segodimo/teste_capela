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



    // getbyIdFilme(id) {
    //     // const inventory = [
    //     //     { name: 'maças', quantity: 2 },
    //     //     { name: 'bananas', quantity: 0 },
    //     //     { name: 'cerejas', quantity: 5 }
    //     // ];
    //     // const result = inventory.find(fruit => fruit.name === 'cerejas');
    //     // console.log(result) // { name: 'cerejas', quantity: 5 }
    //     return this.state.filmes.find(filme => filme.id_filme === id);
    // }

    getbyIdFilme = (id) => {
        return this.state.filmes.find(filmes => filmes.id === id);
    }
    getbyIdCinema = (id) => {
        return this.state.cinemas.find(cinema => cinema.id === id);
    }

    async componentDidMount() {
        this.getSessao();
    }

    // async getSessao() {
    //     const res = await axios.get('http://localhost:4000/api/notes')
    //     this.setState({
    //         notes: res.data
    //     });
    // }

    getSessao = async () => {
        const res = await axios.get('http://localhost:4000/api/sessoes');
        this.setState({ sessoes: res.data.sessoes });
        //++++++++++++++++++++++++++++++++++++
        const res_fil = await axios.get('http://localhost:4000/api/filmes');
        this.setState({ filmes: res_fil.data.filmes });
        // console.log(this.state.filmes)
        //++++++++++++++++++++++++++++++++++++
        const res_cin = await axios.get('http://localhost:4000/api/cinemas');
        this.setState({ cinemas: res_cin.data.cinema });
        // console.log(this.state.cinemas)
        //++++++++++++++++++++++++++++++++++++
        const listSesVsDia = this.state.sessoes.map(sessoes => {
            const diaSessao = new Date(sessoes.date);
            const dt = new Date(sessoes.date);
            console.log('dt', dt)
            const diff = (dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1);
            // return [sessoes.id, dt.setDate(diff)];
            return [dt.setDate(diff), sessoes.id, this.getbyIdFilme(sessoes.id_filme), this.getbyIdCinema(sessoes.id_cinema), sessoes.no_sala, diaSessao]
        });
        console.log(listSesVsDia)
        this.setState({ listSesVsDia });
        //++++++++++++++++++++++++++++++++++++
        const listSemanas = this.state.sessoes.map(sessoes => {
            const dt = new Date(sessoes.date);
            return dt.setDate((dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1) - 1));
        });
        const listUnqSemanas = listSemanas.filter((x, i, a) => a.indexOf(x) === i)
        console.log(listUnqSemanas)
        this.setState({ listUnqSemanas });
        //++++++++++++++++++++++++++++++++++++
        // const listaFinal = listUnqSemanas.map(semana => (
        //     listSesVsDia.map(lsvd => (
        //         lsvd[0] === semana()
        //     ))
        // ))

        //++++++++++++++++++++++++++++++++++++

        // function isBigEnough(value) { return value >= 10; }

        // var filtered = [12, 5, 8, 130, 44]
        // var asdf = filtered.filter(isBigEnough);
        // // filtrado é [12, 130, 44]
        // console.log(asdf)
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
                    <Link to={"/sessaoce/" } className="btn btn-outline-success">
                        <i className="material-icons">Criar</i>
                    </Link>
                    <Link to={"/sessaoce/" + lsvd[1]} className="btn btn-outline-warning  mx-4">
                        <i className="material-icons">Editar</i>
                    </Link>
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
                                {/* <h5 className="card-title">Special title treatment</h5> */}
                                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                {/* {this.state.listSesVsDia.map(lsv => { lsv[1] === lus[0] ? filmeCard() : filmeCard() })} */}
                                {this.state.listSesVsDia.map((lsvd, index) => (lus === lsvd[0] ? filmeCard(index, lsvd, new Date(lsvd[5])) : null))}
                                {/* {this.state.io_stt === 1 ? nav_on() : filmeCard()} */}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
