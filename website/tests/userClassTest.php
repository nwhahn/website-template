<?php


use PHPUnit\Framework\TestCase;
require_once '../lib/user.php';


class userClassTest extends TestCase
{

    public function testIs_user()
    {
        $user=new userClass();
        $this->assertTrue($user->is_user('nathan@nwhahn.com'));
        unset($user);
    }
    public function testPassword_Changed()
    {
        $password='testing';
        $user=new userClass();
        $this->assertTrue($password!=$user->encrypt_password($password));
        unset($user);
    }
    public function testEncrypt(){
        $password='testing';
        $user=new userClass();
        $encrypted=$user->encrypt_password($password);
        $this->assertTrue($user->verify_password($password,$encrypted));
        unset($user);
    }




}
