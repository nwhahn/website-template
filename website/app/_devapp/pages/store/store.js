import React, { Component } from 'react';
import {Route,Link,HashRouter} from 'react-router-dom';

import {ProductPage} from './ProductPage';

import {Card} from 'primereact/card';
import {Accordion,AccordionTab} from 'primereact/accordion';
import {HomeComponent} from "../home/HomeComponent";
import {AccountSettings} from "../account/account_settings";

export class StoreHome extends Component{
    constructor(props) {
        super(props);
        this.state={
            accordion:''
        }
        this.buildAccordion();
    }
    buildAccordion(){

        let items= {
            'Indoor Lights': {
                'Type 1': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 2': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 3': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
            },
            'Outdoor Lights': {
                'Type 1': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 2': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 3': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
            },
            'Conduit': {
                'Type 1': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 2': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 3': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
            },
            'Wire': {
                'Type 1': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 2': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
                'Type 3': {
                    'link': '#',
                    'types': {
                        '1': '#',
                        '2': '#',
                        '3': '#'
                    },
                },
            },

        };


        let accordion;
        $.ajax({
            url: './ajax_php/get_store_items.php',
            type: "GET",
            data:{request_type:'home'},
            dataType:"html",
            success:function(data){
                this.setState({accordion:data});

            }.bind(this),
            error: function(xhr, status, err) {
                console.log('error');
            }.bind(this)
        });


    }

    render() {

        return (
            <div className="section">
                <div className="section-header">
                    <h3 className="section-header-title">Store</h3>
                    <div className="section-header-border">
                        <div className="section-header-inner-border"/>
                    </div>
                </div>
                <div className="section-content">
                    <Accordion multiple={"true"}>
                        <AccordionTab header="Indoor Lights">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-md-6 p-lg-4">
                                    <Card title="Type 1">
                                        <ul>
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                        </ul>
                                    </Card>
                                </div>
                                <div className="p-col-12 p-md-6 p-lg-4">
                                    <Card title="Type 2">
                                        <ul>
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                        </ul>
                                    </Card>
                                </div>
                                <div className="p-col-12 p-md-6 p-lg-4">
                                    <Card title="Type 3">
                                        <ul>
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                        </ul>
                                    </Card>
                                </div>
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Outdoor Lights">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-md-6 p-lg-4">
                                    <Card title="Type 1">
                                        <ul>
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                        </ul>
                                    </Card>
                                </div>
                                <div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 2"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 3"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div></div></AccordionTab><AccordionTab header="Conduit"><div className="p-grid p-fluid"><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 1"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 2"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 3"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div></div></AccordionTab><AccordionTab header="Wire"><div className="p-grid p-fluid"><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 1"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 2"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div><div className="p-col-12 p-md-6 p-lg-4"><Card title="Type 3"><ul><li>1</li><li>2</li><li>3</li></ul></Card></div></div></AccordionTab></Accordion>
                </div>

            </div>
        );
    }
}
export class Store extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id={'store'}>
                <Route exact path="/store" component={StoreHome}/>
                <Route exact path="/store/product/" component={ProductPage}/>
            </div>

        );
    }
}
