<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
//To Solve File REST_Controller not found
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class COwner extends REST_Controller {
    function __construct()
    {
        
        // Construct the parent class
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('M_Owner', 'o');
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }
    public function getCarServices_get()
    {
        $this->response($this->o->getCarServices(), 200);
    }
    public function getCarOwnerAppointments_get()
    {
        $this->response($this->o->getCarOwnerAppointments($this->get('CarOwnerId')), 200);
    }
    public function getAppointmentDetails_get()
    {
        $this->response($this->o->getAppointmentDetails($this->get('iApptid')), 200);
    }
    public function AddWorkshopServices_post()
    {
        $pass=array();
        $pass['C_id']=$this->post('CarServiceId');
        $pass['WO_id']=$this->post('WorkshopOwnerId');
        $this->response($this->o->AddWorkshopServices($pass), 200);
    }
    public function DeleteWorkshopServices_post()
    {
        $pass=array();
        $pass['C_id']=$this->post('CarServiceId');
        $pass['WO_id']=$this->post('WorkshopOwnerId');
        $this->response($this->o->DeleteWorkshopServices($pass), 200);
    }
    public function getWorkshopServices_get()
    {
        $pass=array();
        $pass['WO_id']=$this->get('WorkshopOwnerId');
        $this->response($this->o->getWorkshopServices($pass), 200);
    }
}
