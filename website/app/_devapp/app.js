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
import {BreadCrumb} from 'primereact/breadcrumb';

//Global Components - user defined
import { Login } from './login';
import {SidebarMenu} from './sidebar';


//Pages
import {HomeComponent} from './pages/home/HomeComponent'
import {AccountSettings} from './pages/account/account_settings'
import {Contact} from './pages/contact/contact'
import {Store} from './pages/store/store'
import {searchResults} from './pages/search/searchResults'
//import { asyncComponent } from 'react-async-component';

/** We are importing our index.php my app Vairaible */
import myApp from 'myApp';
import {InputText} from "primereact/inputtext";

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;



class Myapp extends Component{
    constructor(props) {
        super(props);
        this.state ={
            mobileMenuActive:false,
            sidebarActive:false,
            contentPage:'main',
            loginScreen:false,
            loggedIn:true,
            search:''
        }
        this.initialState={
            mobileMenuActive:false,
            sidebarActive:false,
            contentPage:'main',
            loginScreen:false,
            loggedIn:true,
        }
        document.addEventListener("mousedown", this.handleClick,false)
        this.onMenuButtonClick=this.onMenuButtonClick.bind(this);
        this.onMenuButtonKeyDown = this.onMenuButtonKeyDown.bind(this);
        this.onLoginButtonClick=this.onLoginButtonClick.bind(this);
        this.onLoginButtonKeyDown = this.onLoginButtonKeyDown.bind(this);
        this.loginBtn=this.loginBtn.bind(this);
        this.logOut=this.logOut.bind(this);
        this.showMessage=this.showMessage.bind(this);
        this.clearMessages=this.clearMessages.bind(this);
        this.onSearchBtnClick=this.onSearchBtnClick.bind(this);
        this.getNavItems=this.getNavItems.bind(this);


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
    onSearchBtnClick(){
        if(this.searchBarDiv.classList.contains('active')){
            let location='./#/search/'+this.state.search.toString();
           // console.log(location);
            this.searchBarDiv.classList.remove('active');
            window.location.href = location;

        }
        else{
            this.searchBarDiv.classList.add('active');
        }
    }

    getNavItems(){
        let nav_items=[];
        if(window.location.hash==='#/'){
            return null;
        }

        let location=window.location.hash.split('/');
        let tracker='./' + location[0]+'/';
        for(let i=1;i<location.length;i++){
            tracker+=location[i]+'/';
            nav_items.push({label:location[i],url:tracker});
        }

        return nav_items;
    }
    handleClick=(e)=>{
        if(this.searchBarDiv.classList.contains('active') && !this.searchBarDiv.contains(e.target)){
            this.searchBarDiv.classList.remove('active');
        }
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
                {label: 'My Cart', icon: 'pi pi-fw pi-shopping-cart'},
                {label: 'My Quotes', icon: 'pi pi-fw pi-comment'},
                {label: 'My Wishlists', icon: 'pi pi-fw pi-tags'},
                {label: 'Account Settings', icon: 'pi pi-fw pi-cog', command:()=>{ window.location.hash="/account"; }},
                {label: 'Sign Out', icon: 'pi pi-fw pi-power-off', command:()=>{this.logOut();}}
            ];
            account_field=<li className={"account-button"}>
                            <Menu model={account_items} popup={true} ref={el => this.accountMenu = el}/>
                            <Button className="p-button-success" icon="pi pi-user" onClick={(event) => this.accountMenu.toggle(event)}/>
                        </li>;

        }
        else{
            account_field=<li className="menu-highlight">
                {login_button}
            </li>;
        }


        const home={icon:'pi pi-home',url:'./'}
        let navmenu=<BreadCrumb id={'nav-menu'} model={this.getNavItems()} home={home}/>;
        return(
            <div className="layout-wrapper">
                <div className="layout-header">
                    <span ref={el => this.menuButton = el} className="menu-button" tabIndex="0" onClick={this.onMenuButtonClick} onKeyDown={this.onMenuButtonKeyDown}>
                        <i className="pi pi-bars"/>
                    </span>
                    <div id='HeaderImg'>
                        <Link to="/">
                            <img alt="logo" src="./app/assets/img/geswideful-small-300x60.png" />
                        </Link>
                    </div>

                    <ul className="header-menu p-unselectable-text">
                        <li ref={el => this.searchBarDiv = el} className={'search-bar'}>
                            <div className={'search-field'}>

                                <InputText id={'search-input'} placeholder={'Search'}  value={this.state.search} onChange={(e) => this.setState({search:e.target.value})}/>

                            </div>
                        </li>
                        <li className={'search-icon'}>
                            <span ref={el => this.searchButton = el}>
                                <i className="pi pi-search" onClick={this.onSearchBtnClick}/>
                            </span>
                        </li>

                        {account_field}

                    </ul>
                </div>
                {window.location.hash==='#/' ? null: navmenu}

                <div id="layout-content" className="p-growl-container">

                    <Growl ref={(el) => this.messages = el} />

                    <Route exact path="/" component={HomeComponent}/>
                    <Route path="/account" component={AccountSettings} message={this.showMessage}/>
                    <Route path="/contact" component={Contact} message={this.showMessage}/>
                    <Route path="/store" component={Store}/>
                    <Route path={"/search/:search"} component={searchResults}/>
                    {sidebarMenu}
                </div>
                {loginPage}


            </div>
        );
    }
}


render(<HashRouter><Myapp/></HashRouter> ,document.getElementById('app'));
