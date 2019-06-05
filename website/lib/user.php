<?php

require_once '../lib/database.php';

class userClass extends database
{
    private $unid;
    private $user_obj=array(
        'email'=>'',
        'first_name'=>'',
        'last_name'=>'',
        'account_type'=>''

    );
    public function __construct($email=null, $password=null,$options=null)
    {

        if($email=='null'){
            if(create_user($email,$password)){
                return;
            }
            else{
                die ('failed to create user please try again');
            }
        }



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
    public function is_user($email){
        $users=['nathan@nwhahn.com','nathanh@generationelectricalsupply.com'];

        return in_array($email,$users);

    }
    private function create_user($username,$password){

        echo $this->secure_password($password);
    }
    private function secure_password($password){
        return 'Not Secure-'.$password;
    }
    protected function update_field($field,$value){
        $this->$field=$value;

    }
    public function get_field($field){

    }

}
