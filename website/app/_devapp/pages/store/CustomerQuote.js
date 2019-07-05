import React, { Component } from 'react';
import {Route,Link,HashRouter} from 'react-router-dom';

export class CustomerQuote extends Component{

    render(){
        return(

            <div className="section CustomerQuote">
                <div className="section-header">
                    <h3 className="section-header-title">Your Quotes</h3>
                    <div className="section-header-border">
                        <div className="section-header-inner-border"/>
                    </div>
                </div>
                <div className="section-content">
                    CustomerQuote
                </div>
            </div>
        );
    }


}
