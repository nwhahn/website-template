import React, { Component } from 'react';

import {SelectButton} from 'primereact/selectbutton';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";

export class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            product_name:'',
            color:30,
            price:47.99
        };

    }
    render(){
        let color_options=[
            {label: '30K', value: '30'},
            {label: '35K', value: '35'},
            {label: '40K', value: '40'},
        ];

        return(
            <div className={"product"}>
                <div className={"p-grid p-fluid"}>
                    <div className={"product-img-box p-col-12 p-align-center p-justify-center"}>
                        <img src="./app/assets/img/sampleproduct.jpg"/>
                    </div>
                    <div className={"pricing p-col-12 p-md-4 p-md-offset-4"}>
                        <div className={"price"}>
                            ${this.state.price}
                        </div>
                        <Button label="Add to Cart" icon="pi pi-shopping-cart" className={"p-button-success"}/>
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
            </div>

        );
    }




}
