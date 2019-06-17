import React, { Component} from 'react';

import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu'
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"


export class SidebarMenu extends Component{
    constructor(props){
        super(props);

    }


    render() {
        let items=[
            {label:'Home',icon:'pi pi-fw pi-home',url:'./'},
            {label:'About',icon:'pi pi-fw pi-info',url:'./'},
            {label:'Contact',icon:'pi pi-fw pi-user',url:'./#/contact/'},
        ];

        if(this.props.loggedIn){
            items.push({
                label: 'Account',
                items: [{label: 'Account Settings', icon: 'pi pi-fw pi-cog', url:'./#/account', command:()=>{this.props.hide();}},
                    {label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', command:()=>{this.props.hide(); this.props.logOut();}}
                ]
            });
        }
        else{
            items.push({
                    label: 'Account',
                    items:[{label: 'Sign In/Register', icon: 'pi pi-fw pi-user', command:()=>{this.props.login();}}]

                });

        }


        //{this.props.login()}
        return(
            <Sidebar id='sidebarMenu' visible={this.props.visible} onHide={(e) => this.props.hide()}>
                <div className="p-inputgroup">
                    <InputText placeholder="Search"/>
                    <Button icon="pi pi-search" className="p-button-success"/>
                </div>
                <Menu model={items}/>

            </Sidebar>
        );
    }


}
