<?php


namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{

    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer le user
        $user = $event->getUser() ;

        // 2. Enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData() ;
        $data["firstName"] = $user->getFirstName() ;
        $data["LastName"] = $user->getLastName() ;

        $event->setData($data) ;


    }

}