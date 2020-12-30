import App from 'next/app'
import {Provider} from 'react-redux';
import { createWrapper } from 'next-redux-wrapper'
import React from 'react'
import store from '../redux/store';

import '../styles/global.scss'

// export default function App({ Component, pageProps }) {
//     return <Component {...pageProps} />
// }
  
class MyApp extends App {


    static async getStaticProps({Component, ctx}){
        const appProps = Component.getStaticProps ? await Component.getStaticProps(ctx) : {};
        return { appProps: appProps };
    }
    
    render(){
        const { Component, appProps } = this.props

        return(
            <Provider store={store}>
                <Component {...appProps} />
            </Provider>

        
        )
    }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)