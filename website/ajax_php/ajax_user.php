<?PHP
include_once '../lib/user.php';

//
function validate_email($email){
    return (preg_match("/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/", $email) || !preg_match("/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/", $email)) ? false : true;
}
//print_r($_POST);
if(isset($_POST['request_type'])){
    $user=new userClass();
    switch ($_POST['request_type']){
        case 'sign_in':
            if(isset($_POST['email']) || $_POST['email']!=''){
                 if(validate_email($_POST['email'])){
                     if(isset($_POST['password'])|| $_POST['password']!=''){
                         echo json_encode($user->login($_POST['email'],$_POST['password']));
                     }
                     else{
                         echo json_encode('no password');
                     }

                 }
                 else{
                     die('email invalid');
                 }
            }
            else{
                die('No Email Specified');
            }
            break;
        case 'register':
            if(isset($_POST['email'])&& $_POST['email']!=''){
                if(validate_email($_POST['email'])){
                    if(isset($_POST['password'])&& $_POST['password']!=''){
                        if(!isset($_POST['name']) || $_POST['name']['first']=='' || $_POST['name']['last']=='') {die('Missing name field');}
                        if(!isset($_POST['phone']) || ($_POST['phone'])=='') {die('No phone number');}
                        echo json_encode($user->create_user($_POST['email'],$_POST['password'],$_POST['name'],$_POST['phone']));
                    }
                    else{
                        echo json_encode('no password');
                    }

                }
                else{
                    die('email invalid');
                }
            }
            else{
                die('No Email Specified');
            }
            break;
        default:
            die('Invalid Request');
            break;
    }

}
else{
    die("No request type");
}
/*
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
}*/

//$user=new userClass();


//echo $user->is_user($_GET['email']);

