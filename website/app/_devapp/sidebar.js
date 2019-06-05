import React, { Component} from 'react';

import {Sidebar} from 'primereact/sidebar';


export class SidebarMenu extends Component{
    constructor(props){
        super(props);


    }


    render() {

        return(
            <Sidebar id='sidebarMenu' visible={this.props.visible} onHide={(e) => this.props.hide()}>
                {this.props.login()}
            </Sidebar>
        );
    }


}
