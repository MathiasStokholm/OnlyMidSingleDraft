import React from 'react';
import ReactDOM from 'react-dom';
import MainScreen from './MainScreen';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import * as serviceWorker from './serviceWorker';

const Main = styled.div`
  max-width: 1024px;
  margin: 0 auto; // Center in website
`;

ReactDOM.render((
        <Main>
            <MainScreen/>
        </Main>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
