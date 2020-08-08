import React from 'react';
import logonImg from '../../assets/images/logon.svg';
import {Link} from 'react-router-dom';
import Input from '../../components/Input';


import './styles.css';



function Logon(){



    return (
        <div id="page-logon">
            <img src={logonImg} alt="Logon"/>
            <section className="form">
                <form>
                    <fieldset>
                        <legend>Fazer login</legend>
                            <Input name="email" label="E-mail"/>
                            <Input name="senha" label="Senha"/>
                            <label>Lembrar-me</label>
                            <br />
                        <Link to="/reset" className="study">
                            Esqueci minha senha
                        </Link>
                        <br />
                        <Link to="/Landing" className="study"> 
                            Entrar
                        </Link>
                    
                    </fieldset>
                    
                    <Link className="back-link" to="/register">
                        Não tem conta?
                    </ Link>

                    
                </form>
            </section>
            
    </div>
          
    )
}

export default Logon;