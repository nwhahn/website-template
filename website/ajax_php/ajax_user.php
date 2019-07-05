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

