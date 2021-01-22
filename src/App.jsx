import React from 'react'
import Header from "./containers/Header";
import Main from "./containers/Main";
import Footer from "./containers/Footer";
import './base.css'
// 总的组件
const App = () => {
    return (
        <div className='container'>
            <div className='title'>todos</div>
            <Header/>
            <Main />
            <Footer />
        </div>   
    )
}
export default App