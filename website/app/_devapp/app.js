import React, { Component, Fragment } from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import {InputMask} from 'primereact/inputmask';
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
    constructor(){
        super();
        this.state={
            mobileMenuActive:false,
            loginMenu:false,
        }
        this.onMenuButtonClick=this.onMenuButtonClick.bind(this);
        this.onMenuButtonKeyDown = this.onMenuButtonKeyDown.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
    }

    onMenuButtonClick(){
        this.toggleMenu();
    }
    onMenuButtonKeyDown(event){
        if (event.key === 'Enter') {
            this.toggleMenu();
        }
    }
    toggleMenu() {
        this.setState({
            mobileMenuActive: !this.state.mobileMenuActive
        }, () => {
            if (this.state.mobileMenuActive)
                this.bindMenuDocumentClickListener();
            else
                this.unbindMenuDocumentClickListener();
        });
    }
    bindMenuDocumentClickListener() {
        if (!this.menuDocumentClickListener) {
            this.menuDocumentClickListener = (event) => {
                if (!this.isMenuButtonClicked(event) && !this.sidebar.contains(event.target)) {
                    this.setState({mobileMenuActive: false});
                    this.unbindMenuDocumentClickListener();
                }
            };

            document.addEventListener('click', this.menuDocumentClickListener);
        }
    }

    unbindMenuDocumentClickListener() {
        if (this.menuDocumentClickListener) {
            document.removeEventListener('click', this.menuDocumentClickListener);
            this.menuDocumentClickListener = null;
        }
    }
    isMenuButtonClicked(event) {
        return event.target === this.menuButton || this.menuButton.contains(event.target);
    }
    onSidebarClick(event) {
        if (event.target.nodeName === 'A') {
            this.setState({ mobileMenuActive: false});
        }
    }


    render() {

        const { user : { name, email }, logged } = myApp;
        let layout_content;
        if(this.state.loginMenu===true){
            layout_content=<Login/>;
        }

        return (

            <div className="layout-wrapper">
                <div className="layout-header">
                    <span ref={el => this.menuButton = el} className="menu-button" tabIndex="0" onClick={this.onMenuButtonClick} onKeyDown={this.onMenuButtonKeyDown}>
                        <i className="pi pi-bars"></i>
                    </span>
                    <ul className="header-menu p-unselectable-text">
                        <li className="menu-highlight">
                            <a onClick={(e)=>this.setState({loginMenu:true})}>Login</a>
                        </li>
                    </ul>
                </div>
                <div id="layout-sidebar" ref={el => this.sidebar = el} className={classNames({'active': this.state.mobileMenuActive})} onClick={this.onSidebarClick}>
                    <div>SSSSS</div>
                </div>
                <div id="layout-content">
                    {layout_content}
                </div>
                <div className={classNames({'layout-mask': this.state.mobileMenuActive})}/>
                <div className="content-section layout-footer clearfix">
                    <span>PrimeReact {this.version} by <a href="http://www.primetek.com.tr" target="_blank" rel="noopener noreferrer">PrimeTek</a></span>
                    <div className="footer-links">
                        <a href="https://github.com/primefaces/primereact"><i className=" icon-github fa fa-github-square"></i></a>
                        <a href="https://twitter.com/primereact"><i className="icon-twitter fa fa-twitter-square"></i></a>
                    </div>
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
            phone:''

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

    }
    handlePassword(){

    }
    handleConfirmPassword(){

    }
    RegisterFields(){

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
            <div className='LoginForm p-grid p-fluid'>
                <Messages ref={(el) => this.messages = el} />
                <div id='LoginHeader' className='LoginField p-col-12 p-md-6 p-offset-3'>
                    <img alt="logo" src="./app/assets/img/primereact-logo.png" />
                </div>
                <div ref={node=>this.EmailField=node} id='LoginEmail' className='LoginField p-col-12 p-offset-6'>

                        <span className="p-float-label">
                            <InputText id="input-email" type="email" value={this.state.email} onChange={(e) => this.handleEmail(e)}/>
                            <label htmlFor="input-email">Email</label>
                        </span>
                </div>
                <div id='LoginPassword' className='LoginField p-col-12 p-offset-6'>
                    <span className="p-float-label">
                        <Password id="input-password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                        <label htmlFor="input-password">Password</label>
                    </span>
                </div>
                {/*{this.state.sign_up ?
                    this.RegisterFields()


                    :null

                }*/}
                <div id='RegisterPasswordConfirm' className='LoginField p-float-label p-col-12'>
                    <span className="p-float-label">
                        <Password id="input-confirm-password" value={this.state.password_confirm}
                                  onChange={(e) => this.setState({password_confirm: e.target.value})} feedback={this.state.sign_up}/>
                        <label htmlFor="input-confirm-password">Confirm Password</label>
                    </span>
                </div>
                <div id='RegisterFirstName' className='LoginField p-float-label p-col-6'>
                    <span className="p-float-label">
                        <InputText id="input-first-name" type="text" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                        <label htmlFor="input-first-name">First Name</label>
                    </span>
                </div>
                <div id='RegisterLastName' className='LoginField p-float-label p-col-6'>
                    <span className="p-float-label">
                        <InputText id="input-last-name" type="text" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})}/>
                        <label htmlFor="input-last-name">Last Name</label>
                    </span>
                </div>

                <div id='RegisterPhone' className='LoginField p-float-label p-col-12 '>
                     <span className="p-float-label">
                        <InputMask id="input-phone" mask="(999) 999-9999? x99999" value={this.state.phone}
                                   onChange={(e) => this.setState({phone: e.value})}/>
                       <label htmlFor="input-phone">Phone</label>
                     </span>


                </div>


                <div id='LoginSubmit' className='LoginField p-col-12 p-md-6'>
                    <Button ref={node=>this.Submit=node} className="submit-btn" onClick={this.loginClick} label={this.state.label} icon="pi pi-check"/>
                    <Button ref={node=>this.Cancel=node} className="cancel-btn" onClick={this.CancelClick} label="Cancel"/>
                </div>
            </div>

        );
    }
}

render(<HashRouter><Myapp/></HashRouter> ,document.getElementById('app'));
