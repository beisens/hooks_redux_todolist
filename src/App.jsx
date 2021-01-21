import React, { Component } from 'react'
import Header from "./containers/Header";
import Main from "./containers/Main";
import Footer from "./containers/Footer";
import './base.css'
// 总的组件
export default class App extends Component {
  
    render() {    
        return (
            <div className='container'>
                <div className='title'>todos</div>
                <Header/>
                <Main />
                <Footer />
            </div>   
        )
    }
}