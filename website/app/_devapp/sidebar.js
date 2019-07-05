import React, { Component} from 'react';

import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu'
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"


export class SidebarMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            search:''
        }
        this.onSearchBtnClick=this.onSearchBtnClick.bind(this);
    }
    onSearchBtnClick(){
        let location='#/search/'+this.state.search.toString();
        //console.log(location);

        window.location.href = location;

    }

    render() {
        let items=[
            {label:'Home',icon:'pi pi-fw pi-home',url:'./'},
            {label:'Store',icon:'pi pi-fw pi-shopping-cart',url:'./#/store/'},
            {label:'Lamp Repair',icon:'pi pi-fw pi-angle-right'},
            {label:'Materials Counter',icon:'pi pi-fw pi-angle-right'},
            {label:'Lighting Department',icon:'pi pi-fw pi-angle-right'},
            {label:'About',icon:'pi pi-fw pi-info',url:'./'},
            {label:'Contact',icon:'pi pi-fw pi-user',url:'./#/contact/'},
        ];

        if(this.props.loggedIn){
            items.push({
                label: 'Account',
                items: [
                    {label:'My Cart', icon: 'pi pi-fw pi-shopping-cart'},
                    {label:'My Quotes',icon: 'pi pi-fw pi-comment',url:'./#/store/quotes', command:()=>{this.props.hide();}},
                    {label:'My Wishlists',icon:'pi pi-tags',url:'./#/store/wishlists', command:()=>{this.props.hide();}},
                    {label: 'Account Settings', icon: 'pi pi-fw pi-cog', url:'./#/account', command:()=>{this.props.hide();}},
                    {label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', command:()=>{this.props.hide(); if(window.location.hash==='#/account') window.location.hash='#/'; this.props.logOut();}}
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
                    <InputText placeholder="Search" value={this.state.search} onChange={(e) => this.setState({search:e.target.value})}/>
                    <Button icon="pi pi-search" className="p-button-success" onClick={this.onSearchBtnClick}/>
                </div>
                <Menu model={items}/>

            </Sidebar>
        );
    }


}
