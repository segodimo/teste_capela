import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navegador extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">CINEMA</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item active"> <Link className="navbar-brand" to="/filmes">Filmes</Link> </li> */}
                            <li className="nav-item"> <Link className="navbar-brand" to="/">Home</Link> </li>
                            <li className="nav-item"> <Link className="navbar-brand" to="/editfilme">Filme</Link> </li>
                            <li className="nav-item"> <Link className="navbar-brand" to="/editcinema">Cinema</Link> </li>
                            <li className="nav-item"> <Link className="navbar-brand" to="/sessaoce">Sessão</Link> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
