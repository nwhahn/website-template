<?PHP
include_once '../lib/user.php';

//
function validate_email($email){
    return (preg_match("/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/", $email) || !preg_match("/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/", $email)) ? false : true;
}

if (isset($_GET["email"])){
    if($_GET["email"]==""){
        die ("no email specified");
    }
    $email=$_GET["email"];

    if(validate_email($email)){
        $user=new userClass();
        if($user->is_user($email)){
            echo true;
        }
        echo false;
    }
    else{
        die('Invalid Email Address');
    }

    //echo json_encode($_GET["email"]);
    //echo json_encode();
}
else{
    die ("Email Not Passed");
}

//$user=new userClass();


//echo $user->is_user($_GET['email']);

