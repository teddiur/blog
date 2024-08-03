---
title: "Introdução Funcional à React-Redux"
pubDate: 2021-03-26
description: "This is the first post of my new Astro blog."
author: "Rodrigo Queiroz"
tags: ["react", "redux", "learning in public"]
---

## Disclaimer

> Esse é um artigo introdutório e apresenta uma forma de utilização, com hooks. O objetivo desse artigo é mostrar como usar, se a sua pergunta é quando olhe as referências.
> As dependências desse artigo são Javascript vanilla, React e noção de estado.
> As recomendações que escrevo são para uma aplicação padrão, existem casos que fogem a regra.

## Introdução

Ok, vamos por partes: Redux é uma biblioteca JavaScript de gerenciamento de estados. A partir dela foi construída a biblioteca React Redux, que implementa facilidades como hooks.

Mas por que usa-la?

1. torna a sua aplicação mais fácil de ser testada e;

2. poder separar a lógica de gerenciamento de estados da UI;

3. elimina a necessidade de "props drilling", ou seja, passar props para uma sequência de filhos, para que filhos em ramos diferentes da árvore de componentes possam usa-las.

Você pode encontrar um exemplo de aplicação que aplica props drilling aqui (movie tem que ser definido em Home) e uma alternativa dos mesmo components com redux aqui (Home não precisa saber do estado movie).
Como funciona?

O mínimo necessário para um redux é:

### 1- Store

A store é o estado global da aplicação, deve haver apenas uma por aplicação e ela nunca deve ser alterada diretamente, para alterações utilize os reducers. Para criar uma store utilize `createStore()` passando como argumento o reducer. Para a store estar disponível à toda a aplicação envolva-a com o componente Provider de 'react-redux', `<Provider store={store}>`. Esse Provider age como um `<Context.Provider>` (por baixo dos panos é!!), mas com a conveniência de não ter que passar o contexto nos elementos filhos.

### 2- Reducer

O reducer é quem alterar a store. Ele é uma função Javascript que recebe dois argumentos e retorna um estado (geralmente um objeto). É possível criar diversos reducers e combina-los através de `combineReducers()`, passando-os como argumento dentro de um objeto. As chaves desse objeto serão utilizadas para nomear o estado de cada reducer. As alterações devem ser feitas de maneira imutável.

```js
// /src/store/user.js
export const userReducer = (state = { name: '' }, action) => {
    switch(action.type) {
        /* Nomear os tipos com o padrão domínio/ação é indicado
            pelo guia de estilos do redux */
        case: 'user/setUser':
            return { name: action.payload };
        case: 'user/deleteUser':
            return { name: '' };
        default:
            return { ..state };
    };
};

// /src/App.js
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { formReducer } from './store/form.js';
import { userReducer } from './store/user.js';

import Home from './pages/Home';

const App = () => {
    const store = createStore(combineReducers({
    form: formReducer,
    user: userReducer,
    }));

    return (
    <Provider store={store}>
        <Home />
        {/* outros componentes */}
    </Provider>
    );
};
```

Ok, agora temos uma store e ela está disponível para toda a aplicação. Mas como podemos usar os valores contidos nela? Como, de fato, mudo o estado? Bom, pra isso você vai precisar de mais três coisas:

### 3- Selector

O papel do selector é expor o estado armazenado na store para a sua aplicação. Caso tenha utilizado apenas um reducer é possível faze-lo com `store.getState()`, sendo store o objeto retornado por `createStore()`. Caso tenha utilizado `combineReducers()`, opte por useSelector de 'react-redux'. Esse função espera uma função de callback que será chamada com o estado global e um parametro opcional (bateu a curiosidade? olha as referências).

```js
// /src/pages/Home/index.js
import { useSelector } from 'react-redux';

export default const Home = () => {
    const user = useSelector((state) => state.user);

    return (
    <header>
        <p>{`Olá, ${user.name}`}</p>
        {/* resto da página */}
    </header>
    );
};
```

### 4- Dispatch

O dispatch é a função que chamará o reducer. Ele é o retorno de useDispatch() de 'react-redux'

### 5- Action

São as instruções que o dispatch enviará para o reducer. Ela é um objeto que contem, tradicionalmente, as chaves type e payload. Type informará que tipo de ação o reducer deverá fazer e payload conterá as informações relevantes para essa ação. Abaixo um exemplo de utilização:

```js
// /src/pages/Home/index.js
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  //repare que a chave declarada em combineReducers é usada aqui
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "user/setUser", payload: "Sergio" });
  };
  return (
    <header>
      <p>{`Olá, ${user.name}`}</p>
      <button onClick={handleClick}>Meu nome é Sergio</button>
    </header>
  );
};
```

Uma boa prática é utilizar um action creator, que é uma função que retorna um objeto action. Pode parecer desnecessário, mas deixa o código mais legível e torna a manutenção mais simples.

```js
// /src/store/user.actions.js
export function doSetUser(payload) {
  return { type: "user/setUser", payload };
}

export function doDeleteUser() {
  return { type: "user/deleteUser" };
}

// /src/pages/Home/index.js
import { useSelector, useDispatch } from "react-redux";

import { doSetUser } from "../../store/user.actions.js";

const Home = () => {
  //repare que a chave usada em combineReducers é usada aqui
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    // código mais limpo
    dispatch(doSetUser("Sergio"));
  };
  return (
    <header>
      <p>{`Olá, ${user.name}`}</p>
      <button onClick={handleClick}>Meu nome é Sergio</button>
    </header>
  );
};
```

## Recapitulando

A store é quem guarda o estado e é criada a partir de `createStore(reducer)`. Para modificar um estado, chama-se o dispatch (do useDispatch()) com uma action (objeto com a forma {type, payload}) e o estado será modificado segundo a lógica definida no reducer (função que retorna um estado). Para ter acesso ao estado utiliza-se um selector (podendo ser `useSelector(callbac`)`ou`store.getState())`.

Redux foi nomeado assim porque age como um `Array.prototipe.reduce()`, no sentido que, ambos, a cada iteração, recebem dois parâmetros (estado e ação, no caso do redux) e retornam um novo estado. No reduce itera-se por um array e no redux itera-se pelo tempo de vida da aplicação.

Reduce

```js
const incrementOrDecrement = [true, false, true, true];

const total = incrementOrDecrement.reduce((accumulator, current) => {
  if (current) {
    return accumulator + 1;
  } else {
    return accumulator - 1;
  }
}, 0);
```

O reduce vai iterar por cada elemento do array incrementOrDecrement, sendo que a cada iteração o elemento será o current e o que foi retornado pelo iteração anterior, o accumulator.

Então total = 2.

Analogamente, poderiamos ter o seguinte reducer:

```js
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;
  }
};
```

E durante o ciclo de vida da aplicação, um usuário clicar em botões que disparem a seguinte sequência de dispatchs:

```js
dispatch({ type: "increment" });
dispatch({ type: "decrement" });
dispatch({ type: "increment" });
dispatch({ type: "increment" });
```

E de novo chegaríamos a `store.getState() = 2`

Sob essa ótica, o conjunto de todas as interações do usuário com a sua aplicação poderia ser entendido como um grande array de actions, que é reduzido pelo Redux ao estado final pós interação com usuário.

---

Quer saber mais sobre o assunto?

- [React Redux Provider](https://react-redux.js.org/using-react-redux/accessing-store#understanding-context-usage)
- [Combinando Reducers](https://www.youtube.com/watch?v=BVvBa18o8Es)
- [Guia de estilo do Redux](https://redux.js.org/style-guide/style-guide)
- [Mudanças de forma imutável](https://www.youtube.com/watch?v=e-5obm1G_FY)
- [Parâmetro opcional para useSelector](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates)
- [Quando usar Redux](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)
