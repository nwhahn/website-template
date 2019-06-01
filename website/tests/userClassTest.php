<?php


use PHPUnit\Framework\TestCase;
require_once '../lib/user.php';

class userClassTest extends TestCase
{


    public function testIs_user()
    {
        $user=new userClass();
        $this->assertTrue($user->is_user('nathan@nwhahn.com'));
    }
    public function testInvalidEmail()
    {

    }


}
