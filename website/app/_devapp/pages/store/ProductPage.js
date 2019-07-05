import React, { Component } from 'react';

import {SelectButton} from 'primereact/selectbutton';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton"
import {Rating} from 'primereact/rating';
import {Dialog} from 'primereact/dialog';
import {InputText} from "primereact/inputtext";

const NEW_QUOTE=0;
const NEW_WISHLIST=1;
const IMPORT_QUOTE=2;
const IMPORT_WISHLIST=3;

export class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            product_name:'',
            color:30,
            price:47.99,
            rating:4,
            per:'ea',
            new_label:'',
            DialogVisible:false,
            DialogType:'',
            add_submenu:[
                {
                    label:'Quotes',
                    command: ()=>{window.location.hash="/store/quotes"}
                },
                {
                    label:'New Quote',
                    icon: 'pi pi-plus',
                    command:(e)=>{this.onClickNew(NEW_QUOTE)}
                },
                {
                    label:'WishLists',
                    command: ()=>{window.location.hash="/store/wishlists"}
                },{
                    label:'New Wishlist',
                    icon: 'pi pi-plus',
                    command:(e)=>{this.onClickNew(NEW_WISHLIST)}
                },

            ]
        };
        this.add_to_submenu=this.add_to_submenu.bind(this);
        this.onHideDialog=this.onHideDialog.bind(this);
        this.ConfirmAdd=this.ConfirmAdd.bind(this);

    }
    add_to_submenu(type){
        Array.prototype.insert=function(index,item){
            this.join();
            this.splice( index, 0, item );
            this.join();
        };
        console.log(type);
        let curmenu=this.state.add_submenu;
        let item;
        let index;
        switch(type){
            case NEW_QUOTE:

                item={label:this.state.new_label,icon:'pi pi-comment'};
                for(index=1;index<curmenu.length;index++){
                    if(curmenu[index].label==='New Quote'){
                        index++;
                        break;
                    }
                }
               /* curmenu.join();
                curmenu.splice(index,0,item);
                curmenu.join();*/
                break;
            case NEW_WISHLIST:
                for(index=1;index<curmenu.length;index++){
                    if(curmenu[index].label==='New Wishlist'){
                        index++;
                        break;
                    }
                }
                item={label:this.state.new_label,icon:'pi pi-tags'};
                //console.log('new wishlist');
                break;
            case IMPORT_QUOTE:
                console.log('import quote');
                break;
            case IMPORT_WISHLIST:
                console.log('import wishlist');
                break;
            default:
                break;
        }
        if(item!==null){
            curmenu.insert(index,item);
        }

        this.setState({add_submenu:curmenu});

    }
    onHideDialog() {
        this.setState({DialogVisible: false});
        this.setState({new_label: ''});
        this.setState({DialogType: ''});

    }
    ConfirmAdd(){
        this.setState({DialogVisible: false});
        if(this.state.DialogType==='Quote'){
            this.add_to_submenu(NEW_QUOTE);
        }
        else if(this.state.DialogType==='Wishlist'){
            this.add_to_submenu(NEW_WISHLIST);
        }
        this.setState({new_label: ''});
        this.setState({DialogType: ''});
    }
    onClickNew(type){
        if(type===NEW_QUOTE){
            this.setState({DialogType:'Quote'})
        }
        else if(type===NEW_WISHLIST){
            this.setState({DialogType:'Wishlist'})
        }
        this.setState({DialogVisible:true});

    }

    render(){
        let color_options=[
            {label: '30K', value: '30'},
            {label: '35K', value: '35'},
            {label: '40K', value: '40'},
        ];
        let this_obj=this;
        const footer=<div>
            <Button label="Ok" icon="pi pi-check" onClick={this.ConfirmAdd} className="p-button-success"/>
            <Button label="Cancel" icon="pi pi-times" onClick={this.onHideDialog} className="p-button-secondary" />
        </div>;
        return(
            <div className={"product"}>
                <div className={"p-grid p-fluid"}>
                    <div className={"product-img-box p-col-12 p-align-center p-justify-center"}>
                        <img src="./app/assets/img/sampleproduct.jpg"/>
                    </div>
                    <div className={"pricing p-col-6 p-md-4 p-col-offset-6 p-md-offset-4"}>
                        <Rating value={this.state.rating} onChange={(e) => this.setState({rating: e.value})} stars={5} cancel={false} />
                        <div className={"price"}>
                            ${this.state.price}/{this.state.per}
                        </div>
                        <SplitButton label="Add to Cart" icon="pi pi-shopping-cart" model={this.state.add_submenu} className={"p-button-success"}/>
                    </div>

                </div>
                <div className={"section"}>
                    <div className="section-header">
                        <h3 className="section-header-title">Insert Product Name Here</h3>
                        <div className="section-header-border">
                            <div className="section-header-inner-border"/>
                        </div>
                    </div>
                    <div className="section-content">
                        <div id={"product-num"}>
                            {this.state.product_name}
                        </div>
                        <div id={"product-description"} className={"description"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <div className={"product-options p-grid p-fluid"}>
                            <div className={"product-option"}>
                                <div className="option-header">
                                    <h3>Color Temp</h3>
                                </div>
                                <SelectButton value={this.state.color} options={color_options} onChange={(e) => this.setState({color: e.value})} />
                            </div>

                        </div>
                        <Accordion>
                            <AccordionTab header="Files">
                                <a href={"#"}>CutSheet.pdf</a>
                            </AccordionTab>
                        </Accordion>
                    </div>

                </div>
                <div className={"section"}>
                    <div className="section-header">
                        <h3 className="section-header-title">Reviews</h3>
                        <div className="section-header-border">
                            <div className="section-header-inner-border"/>
                        </div>
                    </div>

                </div>
                <Dialog header={"New "+this.state.DialogType} visible={this.state.DialogVisible} footer={footer} onHide={this.onHideDialog} style={{width: '30vw'}} maximizable>
                    <div className={"p-grid"}>
                        <div className={"p-col-3"}>
                            Name
                        </div>
                        <div className={"p-col-9"}>
                            <span className="p-float-label">
                                <InputText id="addQuoteNameInput" value={this.state.new_label} onChange={(e) => this.setState({new_label: e.target.value})} />
                                <label htmlFor="addQuoteNameInput">Enter Quote Name</label>
                            </span>
                        </div>
                    </div>

                </Dialog>
            </div>

        );
    }




}
