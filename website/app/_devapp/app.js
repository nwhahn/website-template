//Dependencies
import React, { Component} from 'react';
import {Route,Link,HashRouter} from 'react-router-dom';
import classNames from 'classnames';
require('jquery');

//Global Components - react
import {Menu} from 'primereact/menu'
import {Button} from 'primereact/button'
import { render } from 'react-dom';
import {Growl} from 'primereact/growl';

//Global Components - user defined
import { Login } from './login';
import {SidebarMenu} from './sidebar';

//Pages
import {HomeComponent} from './pages/home/HomeComponent'
import {AccountSettings} from './pages/account/account_settings'
//import { asyncComponent } from 'react-async-component';

/** We are importing our index.php my app Vairaible */
import myApp from 'myApp';

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;

class Myapp_old extends Component {
    constructor(){
        super();
        this.state={
            mobileMenuActive:false,
        }
        this.onMenuButtonClick=this.onMenuButtonClick.bind(this);
        this.onMenuButtonKeyDown = this.onMenuButtonKeyDown.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.ActivateMenu=this.ActivateMenu.bind(this);
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
                if (!this.isMenuButtonClicked(event)){
                    if(this.sidebar==null || !this.sidebar.contains(event.target)) {
                        this.setState({mobileMenuActive: false});
                        this.unbindMenuDocumentClickListener();
                    }
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
    ActivateMenu(menu){
        this.setState({previous:'main'});
        this.setState({page:menu});
    }



    render() {

        const { user : { name, email }, logged } = myApp;
        let layout_content;
        if(this.state.page==='login'){
            layout_content=<Login handler = {this.cancel}/>;
        }
        let layout_sidebar=
            <div id="layout-sidebar" ref={el => this.sidebar = el} onClick={this.onSidebarClick}>
                <div className="layout-menu">
                    <a onClick={(e)=>this.ActivateMenu('login')}>Login</a>
                </div>
            </div>;


        return (

            <div className="layout-wrapper">
                <div className="layout-header">
                    <span ref={el => this.menuButton = el} className="menu-button" tabIndex="0" onClick={this.onMenuButtonClick} onKeyDown={this.onMenuButtonKeyDown}>
                        <i className="pi pi-bars"></i>
                    </span>
                    <ul className="header-menu p-unselectable-text">
                        <li className="menu-highlight">
                            <a onClick={(e)=>this.ActivateMenu('login')}>Login</a>
                        </li>
                    </ul>
                </div>
                {this.state.mobileMenuActive ?
                    layout_sidebar :null
                }

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

class Myapp extends Component{
    constructor() {
        super();
        this.state ={
            mobileMenuActive:false,
            sidebarActive:false,
            contentPage:'main',
            loginScreen:false,
            loggedIn:true,
        }
        this.initialState={
            mobileMenuActive:false,
            sidebarActive:false,
            contentPage:'main',
            loginScreen:false,
            loggedIn:true,
        }
        this.onMenuButtonClick=this.onMenuButtonClick.bind(this);
        this.onMenuButtonKeyDown = this.onMenuButtonKeyDown.bind(this);
        this.onLoginButtonClick=this.onLoginButtonClick.bind(this);
        this.onLoginButtonKeyDown = this.onLoginButtonKeyDown.bind(this);
        this.loginBtn=this.loginBtn.bind(this);
        this.logOut=this.logOut.bind(this);
        this.showMessage=this.showMessage.bind(this);
        this.clearMessages=this.clearMessages.bind(this);

    }
    onMenuButtonClick(){
        this.toggleMenu();
    }
    isMenuButtonClicked(event) {
        return event.target === this.menuButton || this.menuButton.contains(event.target);
    }
    onMenuButtonKeyDown(event){
        if (event.key === 'Enter') {
            this.toggleMenu();
        }
    }

    toggleMenu() {
        this.setState({
            mobileMenuActive: !this.state.mobileMenuActive,
            sidebarActive:!this.state.sidebarActive
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
                if (!this.isMenuButtonClicked(event)){
                    if(this.sidebar==null || !this.sidebar.contains(event.target)) {
                        this.setState({mobileMenuActive: false});
                        this.unbindMenuDocumentClickListener();
                    }
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
    hideSidebar(){
        this.setState({
            sidebarActive:false
        })
    }
    showLogin(){

        this.setState({
            loginScreen:true,sidebarActive:false
        })
    }
    hideLogin(){
        this.setState({
            loginScreen:false
        })
    }
    onLoginButtonClick(){
        this.showLogin();
    }
    onLoginButtonKeyDown(event){
        if (event.key === 'Enter') {
            this.showLogin();
        }
    }
    loginBtn(){

        return <a ref={el => this.loginButton = el} onClick={this.onLoginButtonClick} onKeyDown={this.onLoginButtonKeyDown}>
            Login
        </a>;
    }
    logOut(){

        this.setState({loggedIn:false})
        this.showMessage('info','Status Message','You have been logged out');
    }
    showMessage(severity,summary,text){
        this.messages.show({severity:severity,summary:summary,detail:text})
    }
    clearMessages(){
        this.messages.clear();
    }

    render() {
        let loginPage=<Login visible={this.state.loginScreen} hide={this.hideLogin.bind(this)}/>;
        let login_button= <a ref={el => this.loginButton = el} onClick={this.onLoginButtonClick} onKeyDown={this.onLoginButtonKeyDown}>
                            Login
                        </a>;
        let layout_content;
        let sidebarMenu=<SidebarMenu id='layout-sidebar' visible={this.state.sidebarActive} loggedIn={this.state.loggedIn} hide={this.hideSidebar.bind(this)} logOut={this.logOut.bind(this)} login={this.onLoginButtonClick.bind(this)}/>;
        let account_field;
        if(this.state.loggedIn) {
            let account_items=[
                {label: 'Account Settings', icon: 'pi pi-fw pi-cog', command:()=>{ window.location.hash="/account"; }},
                {label: 'Sign Out', icon: 'pi pi-fw pi-power-off', command:()=>{this.logOut();}}
            ];
            account_field=<div className={"account-button"}>
                            <Menu model={account_items} popup={true} ref={el => this.accountMenu = el}/>
                            <Button icon="pi pi-user" onClick={(event) => this.accountMenu.toggle(event)}/>
                        </div>;

        }
        else{
            account_field=<li className="menu-highlight">
                {login_button}
            </li>;
        }
        return(
            <div className="layout-wrapper">
                <div className="layout-header">
                    <span ref={el => this.menuButton = el} className="menu-button" tabIndex="0" onClick={this.onMenuButtonClick} onKeyDown={this.onMenuButtonKeyDown}>
                        <i className="pi pi-bars"/>
                    </span>
                    <div id='HeaderImg'>
                        <Link to="/">
                            <img alt="logo" src="./app/assets/img/primereact-logo.png" />
                        </Link>
                    </div>
                    <ul className="header-menu p-unselectable-text">
                        {account_field}
                    </ul>
                </div>
                
                <div id="layout-content" className="p-growl-container">

                    <Growl ref={(el) => this.messages = el} />

                    <Route exact path="/" component={HomeComponent}/>
                    <Route path="/account" component={AccountSettings} message={this.showMessage}/>
                    {sidebarMenu}
                </div>
                {loginPage}


            </div>
        );
    }
}


render(<HashRouter><Myapp/></HashRouter> ,document.getElementById('app'));
