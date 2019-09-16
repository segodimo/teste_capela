import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateSessao extends Component {

    state = {
        cinemas: [],
        filmes: [],
        id_cinema: '',
        id_filme: '',
        no_sala: '',
        date: new Date(),
        nwedate: new Date(),
        editing: false,
        _id: ''
    }

    getCinemas = async () => {
        const res = await axios.get('http://localhost:4000/api/cinemas');
        this.setState({ cinemas: res.data.cinema });
        // this.setState({ cinemas: res.data.map(cinema => cinema.name });
        // console.log(this.state.cinemas)
    }

    getFilmes = async () => {
        const res = await axios.get('http://localhost:4000/api/filmes');
        this.setState({ filmes: res.data.filmes });
        // console.log(this.state.filmes)
    }

    async componentDidMount() {
        await this.getCinemas();
        await this.getFilmes();

        // const res = await axios.get('http://localhost:4000/api/sessoes');
        // console.log(res.data.sessoes )
        // this.setState({ 
        //     sessoes: res.data.sessoes 
        // });
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/sessoes/' + this.props.match.params.id);
            // console.log(res.data.sessoes)
            this.setState({
                id_cinema: res.data.sessoes.id_cinema,
                id_filme: res.data.sessoes.id_filme,
                no_sala: res.data.sessoes.no_sala,
                date: new Date(res.data.sessoes.date),
                _id: this.props.match.params.id,
                editing: true
            });
        } else {
            // console.log(this.state.cinemas)

            // this.setState({
            //     id_cinema: '',
            //     id_filme: '',
            //     no_sala: '',
            //     date: new Date(),
            //     editing: false,
            //     _id: ''
            // });


            if (this.state.cinemas.length > 0) {
                this.setState({ date: new Date(), no_sala: '1', id_cinema: this.state.cinemas[0].id })
            } else {
                alert('Precisa ter cinemas cadastrados');
                window.location.href = '/editcinema';
            }

            if (this.state.filmes.length > 0) {
                this.setState({ date: new Date(), no_sala: '1', id_filme: this.state.filmes[0].id })
            } else {
                alert('Precisa ter filmes cadastrados')
                window.location.href = '/editfilme';
            }

        }
        // console.log(this.state)
    }

    onCinemaChange = (e) => {
        // console.log(e.target.value)
        this.setState({ id_cinema: e.target.value })
        console.log(this.state)
    }

    onFilmeChange = (e) => {
        // console.log(e.target.value)
        this.setState({ id_filme: e.target.value })
    }

    onSalaChange = (e) => {
        // console.log(e.target.value)
        this.setState({ no_sala: e.target.value })
    }

    onChangeDate = async date => {
        // console.log('date', date)
        const newDate = new Date(date).getTime();
        // console.log('newDate', newDate)
        // this.setState({ date: newDate, nwedate: Date(newDate * 1000) });
        this.setState({ date: newDate, nwedate: newDate });
        // console.log(this.state)
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const novaSessao = {
            id_filme: this.state.id_filme,
            id_cinema: this.state.id_cinema,
            no_sala: this.state.no_sala,
            date: this.state.nwedate
        };
        console.log(this.state.nwedate)
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/sessoes/' + this.state._id, novaSessao)
        } else {
            // console.log("novaSessao"); console.log(novaSessao)
            const res = await axios.post('http://localhost:4000/api/sessoes', novaSessao);
            console.log(res)
        }
        window.location.href = '/';
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h3>Sessão <span className="spanFilmes">(Criar / Editar)</span></h3>
                    </div>
                    <div className="card card-body">
                        <form onSubmit={this.onSubmit} >
                            {/* SELECT THE CINEMA */}
                            <div className="form-group">
                                <h4>Escolha um Cinema</h4>
                                <select
                                    className="form-control"
                                    value={this.state.id_cinema}
                                    onChange={this.onCinemaChange}
                                    name="userSelected"
                                    required> {this.state.cinemas.map(cinema => (<option key={cinema.id} value={cinema.id}> {cinema.nome} </option>))}
                                </select>
                            </div>

                            {/* SELECT THE FILME */}
                            <div className="form-group">
                                <h4>Escolha um Filme</h4>
                                <select
                                    className="form-control"
                                    value={this.state.id_filme}
                                    onChange={this.onFilmeChange}
                                    name="userSelected"
                                    required> {this.state.filmes.map(filme => (<option key={filme.id} value={filme.id}> {filme.nome} </option>))}
                                </select>
                            </div>

                            {/* SELECT THE SALA */}

                            <div className="form grup">
                                <h4>Escolha uma Sala</h4>
                                <input
                                    type="number"
                                    value={this.state.no_sala}
                                    className="form-control"
                                    onChange={this.onSalaChange}
                                />
                            </div>

                            {/* Note Date */}
                            <div className="form-group">
                                <h4>Escolha uma Data e um Horario</h4>
                                <DatePicker className="form-control input-lg"
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="yyyy-MM-dd hh:mm:ss"
                                />
                            </div>

                            <button className="btn btn-outline-primary btn-block">Salvar</button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}
