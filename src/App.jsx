import React, {useEffect} from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TopHeader from './Components/TopHeader';
import Routing from './Features/Routing';
import axios from "axios";

function App() {

    useEffect(()=>{
        axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

    }, [])

    return (
        <div className="">
            <div className="container ml-auto mr-auto">
                <TopHeader/>
            </div>
            <Header/>
            <div className="container ml-auto mr-auto">
                <Routing/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
