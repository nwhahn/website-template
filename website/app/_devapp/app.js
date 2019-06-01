import React, { Component, Fragment } from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import {HashRouter,Link} from 'react-router-dom';
require('jquery');
import classNames from 'classnames';
//import {Button,InputText,Password} from 'primereact';
import { render } from 'react-dom';
//import { asyncComponent } from 'react-async-component';

/** We are importing our index.php my app Vairaible */
import myApp from 'myApp';

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;

class Myapp extends Component {
    render() {

        const { user : { name, email }, logged } = myApp;

        return (

            <div className="layout-wrapper">
                <div className="layout-topbar">
                    <Link to="/" className="logo">
                        <img alt="logo" src="./app/assets/img/primereact-logo.png" />
                    </Link>
                </div>
            </div>

        )
    }
}


class Login extends Component{
    constructor(props){
        super(props);
        this.loginClick=this.loginClick.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.CancelClick=this.CancelClick.bind(this);
        document.addEventListener("mousedown", this.handleClick,false)
        this.state={
            label:'Sign In',
            icon:'',
            sign_up:false,
            email_checked:false,
            email:'',
            password:'',
            password_confirm:'',
            confirm:'',
            first_name:'',
            last_name:'',

        }

    }

    loginClick(){
        console.log('clicked');

    }

    successCleanup(){
        document.removeEventListener('mousedown',this.handleClick,false)
    }
    handleEmail(e){
        this.setState({email: e.target.value});


    }
    CancelClick(){
        console.log('Cancel');
    }
    handleClick=(e)=>{

        if(this.EmailField.contains(e.target)){
            this.state.email_checked=false;
           // console.log(this.state.email_checked);
        }
        else{
            //console.log(this.state.email_checked);
            if(!this.state.email_checked){
                $.ajax({
                    url: './ajax_php/ajax_user.php',
                    type: "GET",
                    data:{email:this.state.email},
                    success: function(data) {
                        console.log(data);
                        if(data==='1'){
                            console.log('here');
                            this.state.label='Sign In';
                            this.state.sign_up=false;
                        }
                        else{
                            this.state.label='Register';
                            this.state.sign_up=true;
                        }
                    }.bind(this),
                    error: function(xhr, status, err) {
                        //console.log('error')
                    }.bind(this)
                });
                //console.log(is_user);

                this.state.email_checked=true;


               // console.log(this.state.label);
              //  console.log(this.state.email_checked);

            }
        }


    }

    render(){


        return(
            <div className='LoginForm'>
                <Messages ref={(el) => this.messages = el} />
                <div id='LoginHeader' className='LoginField'>
                    <img alt="logo" src="./app/assets/img/primereact-logo.png" />
                </div>
                <div ref={node=>this.EmailField=node} id='LoginEmail' className='LoginField'>
                    <span className="p-float-label">
                        <InputText id="input-email" type="email" value={this.state.email} onChange={(e) => this.handleEmail(e)}/>
                        <label htmlFor="input-email">Email</label>
                    </span>
                </div>
                <div id='LoginPassword' className='LoginField p-float-label'>
                    <Password id="input-password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                    <label htmlFor="input-password">Password</label>
                </div>
                {this.state.sign_up ?
                    <div id="register-fieldset">
                        <div id='RegisterPasswordConfirm' className='LoginField p-float-label'>
                            <Password id="input-confirm-password" value={this.state.password_confirm}
                                      onChange={(e) => this.setState({password_confirm: e.target.value})} feedback={false}/>
                            <label htmlFor="input-confirm-password">Confirm Password</label>
                        </div>

                        <div id='RegisterFirstName' className='LoginField p-float-label'>
                            <InputText id="input-first-name" type="text" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                            <label htmlFor="input-first-name">First Name</label>
                        </div>
                        <div id='RegisterLastName' className='LoginField p-float-label'>
                            <InputText id="input-last-name" type="text" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})}/>
                            <label htmlFor="input-last-name">Last Name</label>
                        </div>
                        <div>

                        </div>

                    </div>


                    :null

                }

                <div id='LoginSubmit' className='LoginField'>
                    <Button ref={node=>this.Submit=node} className="submit-btn" onClick={this.loginClick} label={this.state.label} icon="pi pi-check"/>
                    <Button ref={node=>this.Cancel=node} className="cancel-btn" onClick={this.CancelClick} label="Cancel"/>
                </div>
            </div>

        );
    }
}

render(<HashRouter><Login/></HashRouter> ,document.getElementById('app'));
