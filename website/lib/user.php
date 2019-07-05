<?php

require_once '../lib/database.php';

class userClass extends database
{
    private $unid;
    private $user_obj=array(
        'email'=>'',
        'first_name'=>'',
        'last_name'=>'',
        'phone'=>'',
        'account_type'=>'',

    );
    public function __construct()
    {
        parent::__construct();

    }

    public function login($email,$password){

        $user_fields=$this->get_user($email);
        if($user_fields==false){
            return 'Not Registered';
        }
       // return $user_fields['password'];
        if($this->verify_password($password,$user_fields['password'])){
            $this->unid=$user_fields['unid'];
            $this->user_obj['first_name']=json_decode($user_fields['name'])->{'first'};
            $this->user_obj['last_name']=json_decode($user_fields['name'])->{'last'};
            $this->user_obj['email']=$user_fields['email'];
            $this->user_obj['phone']=$user_fields['phone'];
            return $this->user_obj;
        }
        else{
            return 'Invalid Login';
        }


    }
    private function get_user($email){
        $user_fields=$this->get_list('user','email',$email)->fetch();
        if(isset($user_fields)){
            return $user_fields;
        }
        else{
            return -1;
        }


    }
    public function create_user($email,$password,$name,$phone){
        $user_fields=$this->get_user($email);
        if($user_fields==false){

            $password= $this->encrypt_password($password);
            $data=[
                'email'=>$email,
                'password'=>$password,
                'name'=>json_encode($name),
                'phone'=>$phone
            ];
            //$this->activateTestOutput();
             return $this->add_object('user',$data);

           // return 'User does not exist';
        }
        return json_encode('User Exists');




    }





    public function encrypt_password($password){
        $options=[
            'cost'=>12
        ];
        $encrypted=password_hash($password,PASSWORD_BCRYPT,$options);
        return $encrypted;
    }
    public function verify_password($password,$hash){

        return password_verify($password,$hash);

    }
    public function alter_attribute($field,$value){

    }
    private function save_user(){
        return $this->save_object($this->unid,'user',$this->data);
    }
    public function display_error($error){
        $msg='';
        return $msg;
    }




    private function secure_password($password){
        return 'Not Secure-'.$password;
    }
    protected function update_field($field,$value){
        $this->user_obj[$field]=$value;

    }
    public function get_unid(){
        return $this->unid;
    }
    public function get_field($field){

    }

}
