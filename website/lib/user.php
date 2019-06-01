<?php


class userClass
{
    private $unid;
    private $username;
    private $first_name;
    private $diaplay_name;
    private $display_name;
    public function __construct($username=null, $password=null)
    {
        if($username=='null'){
            if(create_user($username,$password)){
                return;
            }
            else{
                die ('failed to create user please try again');
            }
        }


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
        if($field=='first_name'){
            $display_name=$this->first_name.''.$this->last_name;
        }
    }
    public function get_field($field){

    }

}
