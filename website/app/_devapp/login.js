import React, { Component} from 'react';

import {Link} from 'react-router-dom';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import {InputMask} from 'primereact/inputmask';
import {TabView,TabPanel} from 'primereact/tabview';
require('jquery');


export class Login extends Component{
    constructor(props){
        super(props);

        this.handleEmail=this.handleEmail.bind(this);
        document.addEventListener("mousedown", this.handleClick,false)
        this.state={
            activePage:0,
            pages:['Sign In','Register'],
            icon:'',
            email:'',
            password:'',
            password_confirm:'',
            first_name:'',
            last_name:'',
            phone:'',
            confirm:false

        }
        this.submitClick=this.submitClick.bind(this);

    }



    successCleanup(){
        document.removeEventListener('mousedown',this.handleClick,false)
    }
    handleEmail(e){
        this.setState({email: e.target.value});
    }

    handlePassword(){

    }
    handleConfirmPassword(){

    }
    submitClick(){
        let request_type;
        let request;
       // console.log(this.state.activePage);
        if(this.state.activePage===0){
            request_type='sign_in';
            request={request_type:request_type,email:this.state.email,password:this.state.password}
            //console.log('Sign In');
        }
        else{
            request_type='register';
            if(this.state.password===this.state.password_confirm){
                request={request_type:request_type,
                    email:this.state.email,
                    password:this.state.password,
                    name:{
                        first:this.state.first_name,
                        last:this.state.last_name,
                        display:this.state.first_name+' '+this.state.last_name
                    },
                    phone:this.state.phone

                }

            }

            else{
                this.messages.show({ severity: 'error', summary: 'Error', detail: 'passwords dont match'});

                return;
            }

            //console.log('Register');
        }
        let this_obj=this;
        $.ajax({
            url: './ajax_php/ajax_user.php',
            type: "POST",
            data:request,
            success : function(data)
            {
                if(data[0]==='{'){
                    console.log(JSON.parse(data));
                    //do stuff
                    this_obj.messages.show({ severity: 'success', summary: 'Welcome '+JSON.parse(data).first_name})
                }
                else{
                    while(data.includes('"')){
                        data=data.replace("\"",'');
                    }

                    console.log(data);
                    this_obj.setState({activePage:1});
                    this_obj.messages.show({ severity: 'error', summary: 'Error', detail: data })
                }

            },
            error: function(xhr, status, err) {
                console.log('xhr:'+xhr+' status:'+status+' err:'+err);
            }.bind(this)
        });
        //console.log(class_obj);


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
        let shared=<div className='p-grid p-fluid'>

            <Messages className={"p-col-12 p-md-12"} ref={(el) => this.messages = el} />

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
        </div>;
        let register=<div className='p-grid p-fluid'>
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
        </div>;

        return(
            <Dialog className='LoginForm' visible={this.props.visible} onHide={(e) => this.props.hide()} maximizable>
                <div  className='p-grid p-fluid'>



                    <div id='LoginHeader' className='LoginField p-col-12 p-md-6 p-offset-3'>
                        <img alt="logo" src="./app/assets/img/primereact-logo.png" />
                    </div>
                    <TabView className='p-md-12' activeIndex={this.state.activePage} onTabChange={(e) => this.setState({activePage: e.index})}>
                        <TabPanel header="Sign In">
                            {shared}
                        </TabPanel>
                        <TabPanel header="Register">
                            {shared}
                            {register}
                        </TabPanel>
                    </TabView>
                    <div id='LoginSubmit' className='LoginField p-col-12 p-md-6'>
                        <div className={'p-grid'}>
                            <div className={'p-col'}>
                                <Button ref={node=>this.Submit=node} className="submit-btn" onClick={this.submitClick} label={this.state.pages[this.state.activePage]} icon="pi pi-check"/>
                            </div>
                            <div className={'p-col'}>
                                <Button ref={node=>this.Cancel=node} className="cancel-btn" onClick={(e) => this.props.hide()} label="Cancel"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

        );
    }
}


