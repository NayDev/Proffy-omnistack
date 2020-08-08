import React from 'react';
import logonImg from '../../assets/images/logon.svg';
import {Link} from 'react-router-dom';


import './styles.css';




function Register(){



    return (
        <div id="page-register">
          
            <section className="form">
                <form>
                    <fieldset>
                        <legend>Cadastro</legend>
                        <h5>Preencha os dados abaixo para começar</h5>
                            <input type="text" placeholder="Nome"/>
                            <input type="text" placeholder="Sobrenome"/>
                            <input type="text" placeholder="E-mail"/>
                            <input type="text" placeholder="Senha"/>
                        
                       
                        <br />
                        <Link to="/Landing" className="study"> 
                            Concluir cadastro
                        </Link>
                    
                    </fieldset>                  
                </form>
            </section>
            <img src={logonImg} alt="Register"/>
    </div>
          
    )
}

export default Register;