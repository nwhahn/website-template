import React, { Component } from 'react';
import {Link } from 'react-router-dom';

//Components
import {Button} from 'primereact/button'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {InputMask} from "primereact/inputmask";

export class AccountSettings extends Component
{
    constructor(props){
        super(props);
        this.state={
            user_email:'',
            user_first_name:'',
            user_last_name:'',
            user_phone:'',
            user_type:''



        }
        this.saveData=this.saveData.bind(this);
        document.title=document.title.split('-')[0]+'- Account';
    }
    saveData(){
        let success=true;
        let msg_type='Account';
        console.log(this.props);
        if(success){
            this.props.message('success',msg_type,'Settings saved successfully');
        }
        else{
            this.props.message('error',msg_type,'Error Saving');
        }

    }
    render(){
        return(
            <div className={'account-settings'}>
                <div className={'form-fieldset p-grid p-fluid'}>
                    <div ref={node=>this.EmailField=node} id='AccountEmail' className='AccountField p-col-12'>

                                <span className="p-float-label">
                                    <InputText id="input-email" type="email" value={this.state.user_email} onChange={(e) => this.setState({user_email: e.target.value})}/>
                                    <label htmlFor="input-email">Email</label>
                                </span>
                    </div>
                    <div id='AccountFirstName' className='AccountField p-float-label p-col-6'>
                            <span className="p-float-label">
                                <InputText id="input-first-name" type="text" value={this.state.user_first_name} onChange={(e) => this.setState({user_first_name: e.target.value})}/>
                                <label htmlFor="input-first-name">First Name</label>
                            </span>
                    </div>
                    <div id='AccountLastName' className='AccountField p-float-label p-col-6'>
                            <span className="p-float-label">
                                <InputText id="input-last-name" type="text" value={this.state.user_last_name} onChange={(e) => this.setState({user_last_name: e.target.value})}/>
                                <label htmlFor="input-last-name">Last Name</label>
                            </span>
                    </div>

                    <div id='AccountPhone' className='AccountField p-float-label p-col-12'>
                             <span className="p-float-label">
                                <InputMask id="input-phone" mask="(999) 999-9999? x99999" value={this.state.user_phone}
                                           onChange={(e) => this.setState({user_phone: e.value})}/>
                               <label htmlFor="input-phone">Phone</label>
                             </span>


                    </div>
                </div>
                <div className={'save-page'}>
                    <Button label="Save" className="p-button-raised p-button-success" icon="pi pi-check" onClick={(e) => this.saveData()}/>
                </div>
            </div>
        );
    }
}
