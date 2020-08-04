<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Entity\User;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\DateTime;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $security ;

    private $invoiceRepository ;

    public function __construct(Security $security , InvoiceRepository $invoiceRepository)
    {

        $this->security = $security ;
        $this->invoiceRepository = $invoiceRepository ;

    }

    public static function getSubscribedEvents()
    {
        // TODO: Implement getSubscribedEvents() method.
        
        return [
            KernelEvents::VIEW => ["setChronoForInvoice" , EventPriorities::PRE_VALIDATE]
        ] ;
    }

    public function setChronoForInvoice(ViewEvent $viewEvent)
    {

        $invoice = $viewEvent->getControllerResult();
        $method = $viewEvent->getRequest()->getMethod();

        /**
         * @var User $user
         */
        $user = $this->security->getUser();

        if($invoice instanceof Invoice && $method === "POST"){

          $invoice->setChrono($this->invoiceRepository->findNextChrono($user)) ;

          //TODO : A déplacer dans une class dédié

           if (empty($invoice->getSentAt()))
           {
               $invoice->setSentAt(new \DateTime()) ;
           }

        }

    }


}