import React, { Component } from 'react';
import {Route,Link,HashRouter} from 'react-router-dom';

export class CustomerWishlist extends Component{

    render(){
        return(
            <div className={"CustomerWishlists"}>
                <div className="section">
                    <div className="section-header">
                        <h3 className="section-header-title">Your Wishlists</h3>
                        <div className="section-header-border">
                            <div className="section-header-inner-border"/>
                        </div>
                    </div>
                    <div className="section-content">
                        CustomerWishlists
                    </div>
                </div>
            </div>
        );
    }


}
