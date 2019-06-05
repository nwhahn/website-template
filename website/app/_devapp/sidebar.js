import React, { Component} from 'react';

import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu'


export class SidebarMenu extends Component{
    constructor(props){
        super(props);


    }


    render() {
        let items;
        if(this.props.loggedIn){
            items=[
                {label:'Home',icon:'pi pi-fw pi-home',url:'./'},
                {
                    label: 'Account',
                    items: [{label: 'Account Settings', icon: 'pi pi-fw pi-cog', url:'./#/account', command:()=>{this.props.hide();}},
                        {label: 'Sign Out', icon: 'pi pi-fw pi-power-off', command:()=>{this.props.hide(); this.props.logOut();}}
                    ]
                }
            ];
        }
        else{
            items=[
                {label:'Home',icon:'pi pi-fw pi-home',url:'./'},
                {
                    label: 'Account',
                    items:[
                    {label: 'Sign In/Register', icon: 'pi pi-fw pi-user', command:()=>{this.props.login();}}
                    ]
                }
            ];

        }

        //{this.props.login()}
        return(
            <Sidebar id='sidebarMenu' visible={this.props.visible} onHide={(e) => this.props.hide()}>
                <Menu model={items}/>

            </Sidebar>
        );
    }


}
