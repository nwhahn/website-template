<?php


//print_r($_GET);
if($_GET['request_type']=='home') {

    $items = [
        'Indoor Lights' => [
            "Type 1"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 2"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 3"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
        ],
        'Outdoor Lights' => [
            "Type 1"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 2"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 3"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
        ],
        'Conduit' => [
            "Type 1"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 2"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 3"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
        ],
        'Wire' => [
            "Type 1"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 2"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
            "Type 3"=>[
                'link' => '#',
                'img'=>'',
                'types' => [
                    '1' => '#',
                    '2' => '#',
                    '3' => '#',
                ],
            ],
        ],


    ];
    $accordion='<Accordion>';
    foreach ($items as $header => $sub_items) {
        $accordion.='<AccordionTab header="'.$header.'">';
        $accordion.='<div className="p-grid p-fluid">';
        foreach($sub_items as $sub_name=>$sub_item){
            $accordion.='<div className="p-col-12 p-md-6 p-lg-3">';
            $accordion.='<Card title="'.$sub_name.'">';
            $accordion.='<ul>';
            //print_r($sub_item);
            foreach($sub_item['types'] as $key=>$value){
                $accordion.='<li>'.$key.'</li>';
            }
            $accordion.='</ul>';

            $accordion.='</Card>';
            $accordion.='</div>';
        }
        $accordion.='</div>';
        $accordion.='</AccordionTab>';

        /*
                        <Card title="Title" subTitle="SubTitle">
            Content
                        </Card>
                    </AccordionTab>*/
    }
    $accordion.='</Accordion>';
    echo $accordion;



}
