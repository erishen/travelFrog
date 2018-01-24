import './index.less';
import React from 'react'
import ReactDOM from 'react-dom'
import Test from '../../js/redux/test';
import Home from '../../js/redux/home';

ReactDOM.render(
    <div><Home/><Test/></div>,
    document.getElementById('app')
);