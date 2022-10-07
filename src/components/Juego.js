import React, { Component } from 'react';
import './Juego.css';
import { palabraRandom } from './Palabras';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Juego extends Component {
    static defaultProps = {
        maxError: 6,
        images: [step0, step1, step2, step3, step4, step5, step6]
    }

    constructor(props) {
        super(props);
        this.state = {
            error: 0,
            acierto: new Set([]),
            respuesta: palabraRandom()
        }
    }
    verificarAciertos = e => {
        let letter = e.target.value;
        this.setState(st => ({
            acierto: st.acierto.add(letter),
            error: st.error + (st.respuesta.includes(letter) ? 0 : 1)
        }));
    }

    letraAcertada() {
        return this.state.respuesta.split("").map(letter => (this.state.acierto.has(letter) ? letter : " _ "));
    }
    generarBotones() {
        return "abcdefghijklmnñopqrstuvwxyz".split("").map(letter => (
            <button
                class='btn btn-lg btn-success m-2'
                key={letter}
                value={letter}
                onClick={this.verificarAciertos}
                disabled={this.state.acierto.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            error: 0,
            acierto: new Set([]),
            respuesta: palabraRandom()
        });
    }

    render() {
        const gameOver = this.state.error >= this.props.maxError;
        const isWinner = this.letraAcertada().join("") === this.state.respuesta;
        let gameStat = this.generarBotones();

        if (isWinner) {
            gameStat = "Ganaste!!"
        }

        if (gameOver) {
            gameStat = "Perdiste:("
        }



        return (
            < div className="Juego container" >
                <h1 className='text-center'>Ahorcadito</h1>
                <div className="float-right">Fallaste: {this.state.error} de {this.props.maxError}</div>
                <div className="text-center">
                    <img src={this.props.images[this.state.error]} alt="" />
                </div>
                <div className="text-center">
                    <p>Adivina el lenguaje de programación:</p>
                    <p>
                        {!gameOver ? this.letraAcertada() : this.state.respuesta}
                    </p>
                    <p>{gameStat}</p>
                    <button className='btn btn-info' onClick={this.resetButton}>Reset</button>


                </div>

            </div>
        )
    }
}
export default Juego;