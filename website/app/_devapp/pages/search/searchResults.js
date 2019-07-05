import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Paginator} from 'primereact/paginator';

export class SearchResult extends Component{

}

export class searchResults extends Component{
    constructor(props){
        super(props);
        this.state={
            search:this.props.match.params['search'],
            first:0,rows:10
        };
        this.onSearchBtnClick=this.onSearchBtnClick.bind(this)
    }

    onSearchBtnClick(){

        let location='#/search/'+this.state.search.toString();
        //console.log(location);

        window.location.href = location;


    }


    render(){

        return(
            <div className={'searchResultsPage'}>
                <div className={"section"}>
                    <div className="section-header">
                        <div className={'search-field'}>

                            <InputText className={'search-input'} placeholder={'Search'} value={this.state.search} onChange={(e) => this.setState({search:e.target.value})}/>
                            <Button icon="pi pi-search" className="p-button-success" onClick={this.onSearchBtnClick}/>
                        </div>
                        <h3 className="section-header-title">Search Results</h3>

                        <div className="section-header-border">
                            <div className="section-header-inner-border"/>
                        </div>
                    </div>
                    <div className="section-content p-grid p-fluid">


                        <div className="resultNav p-col-12">
                            <Paginator first={this.state.first} rows={this.state.rows} totalRecords={60} rowsPerPageOptions={[5,10,25,50]} onPageChange={(e) => this.setState({first: e.first})}>

                            </Paginator>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}
