

<?php
$user = (object) [];
$title='Website';


?>
<!doctype html>
    <html lang="en">
        <head>
            <title><?php echo $title?></title>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="./app/assets/css/app.css" type="text/css">
            <link rel="stylesheet" href="./app/node_modules/primereact/resources/themes/nova-light/theme.css" type="text/css">
            <link rel="stylesheet" href="./app/node_modules/primereact/resources/primereact.min.css" type="text/css">
            <link rel="stylesheet" href="./app/node_modules/primeicons/primeicons.css" type="text/css">
            <link rel="stylesheet" href="./app/node_modules/primeflex/primeflex.css" type="text/css">
        </head>
        <script type="text/javascript">
            var STATIC_URL = 'http://localhost/website/';
            var myApp = {
                user : <?php echo json_encode($user); ?>,
            };
        </script>
        <body>

            <div id="app"></div>
            <script type="text/javascript" src="./app/node_modules/jquery/dist/jquery.min.js"></script>
            <script type="text/javascript" src="./app/assets/bundle/main.bundle.js"></script>

        </body>
</html>
