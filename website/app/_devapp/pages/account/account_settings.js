import React, { Component } from 'react';
import {Link } from 'react-router-dom';

export class AccountSettings extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={'account-settings'}>
                Account
            </div>
        );
    }
}
