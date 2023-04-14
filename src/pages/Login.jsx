import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';
import Logo from '../images/Logo.png';
import background from '../images/Background.png';

export default function Login() {
  // Declaração dos estados e variáveis úteis.
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [bttnDisabled, setButton] = useState({
    disabled: true,
  });
  const passwMin = 6;
  const history = useHistory();

  // Função que irá conferir as condições de login e habilitar o botão de Entrar.
  useEffect(() => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-_]+\.[A-Za-z]{2,}$/;
    const validaty = user.password.length > passwMin && regex.test(user.email);
    setButton({
      disabled: !validaty,
    });
  }, [user.password, user.email]);

  // Funsção para lidar com os campos de digitação do formulário.
  function handleChange({ target: { name, value } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  // Função para lidar com o botão de Entrar.
  function handleClick() {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  }

  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-evenly max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      {/* Estrutura do formulário */}
      <div
        className="shadow-2xl  bg-white rounded-md text-center m-2 opacity-90"
      >
        <header
          className="
        text-center m-2 flex flex-col justify-evenly"
        >
          <img className="w-60 m-auto" src={ Logo } alt="App icon" />
          <p className="font-pacifico text-orange-400 text-3xl m-2">App de Receitas</p>
          <p className="font-pacifico text-orange-400 text-3xl m-2">TRYBE</p>
        </header>
        <form
          onSubmit={ handleClick }
          className="flex flex-col
       m-2
       items-center"
        >
          <TextField
            id="input-with-sx"
            label="Email"
            variant="outlined"
            className="m-3 bg-white"
            name="email"
            type="email"
            data-testid="email-input"
            color="warning"
            value={ user.email }
            onChange={ handleChange }
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="m-3 bg-white "
            name="password"
            type="password"
            data-testid="password-input"
            color="warning"
            value={ user.password }
            onChange={ handleChange }
          />
          <button
            type="submit"
            disabled={ bttnDisabled.disabled }
            data-testid="login-submit-btn"
            className="m-4 w-44 rounded-full text-xl
              shadow-md bg-orange-300 hover:bg-orange-400 py-2 px-4
              disabled:bg-orange-200 disabled:text-white"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {}.isRequired;
