import React, { Component } from 'react';
import {Link } from 'react-router-dom';

//custom components
import {PictureCarousel} from '../../custom_components/picture_carousel'
import {Menubar} from 'primereact/menubar';

export class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.header_carousel_items=[
            'img/sample-header.jpg', 'img/primereact-logo.png', 'img/moon.jpg', 'img/geswideful-small-300x60.png', 'img/sample-header.jpg'
        ]
        this.homeMenu=[
            {
                label:'Store',
                icon:'pi pi-fw pi-shopping-cart',
                items:[
                    {label:'Store Home',icon:'pi pi-fw pi-external-link', url:'./#/store/'},
                    {label:'Switches',icon:'pi pi-fw pi-angle-right', url:'./#/store/switches'},
                    {label:'Wire',icon:'pi pi-fw pi-angle-right', url:'./#/store/wire'},
                    {label:'Conduit',icon:'pi pi-fw pi-angle-right', url:'./#/store/conduit'},
                    {label:'Outlets',icon:'pi pi-fw pi-angle-right', url:'./#/store/outlets'},
                ]
            },
            {
                label:'Lamp Repair'
            },
            {
                label:'Materials Counter'
            },
            {
                label:'Lighting Department'
            },
            {label:'About Us',icon:'pi pi-fw pi-info',url:'./'},
            {label:'Contact',icon:'pi pi-fw pi-user',url:'./#/contact/'},



        ]
    }
    render(){

        return(
          <div className={'home'}>
              <div className="p-grid p-fluid">
                  <Menubar className={"homeMenu p-col-12"} model={this.homeMenu}/>
                  <div className="p-col-12">
                      <PictureCarousel itemCount={4} items={this.header_carousel_items}/>
                  </div>
              </div>
              <a>Home</a>
          </div>
        );
    }
}
