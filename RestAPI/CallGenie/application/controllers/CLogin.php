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
class CLogin extends REST_Controller {
    function __construct()
    {
        
        // Construct the parent class
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('M_Login', 'l');
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }
    public function login_get()
    {
        $username = $this->get('Username');
        $password = $this->get('Password');
        $this->response($this->l->login($username,$password), 200);
        
    }
    public function getCarOwnerProfile_get()
    {
        $U_id = $this->get('U_id');
        $this->response($this->l->getCarOwnerProfile($U_id), 200);
        
    }
    public function getWorkshopOwnerProfile_get()
    {
        $U_id = $this->get('U_id');
        $this->response($this->l->getWorkshopOwnerProfile($U_id), 200);
        
    }
    public function addCarOwner_post()
    {
        $data=array();
        $data['username']= $this->post('Username');
        $data['password']= $this->post('Password');
        $data['FullName']= $this->post('FullName');
        $data['CNIC']= $this->post('CNIC');
        $data['PhoneNo']= $this->post('PhoneNo');
        // $data['username']= "arslan";
        // $data['password']= "123456";
        // $data['FullName']= "Arslan Bilal";
        // $data['CNIC']= "3501270883771";
        // $data['PhoneNo']= "03000437817";
        $this->response($this->l->addCarOwner($data), 200);

    }
    public function updateWorkshopOwnerLocation_put()
    {
        $data=array();
        $data['Latitude']= $this->post('Latitude');
        $data['Longitude']= $this->post('Longitude');
        $data['U_id']= $this->post('U_id');
        $this->response($this->l->updateWorkshopOwnerLocation($data), 200);

    }
    public function addWorkshopOwner_post()
    {
        $data=array();
        // $data['username']= "sehar";
        // $data['password']= "123456";
        // $data['FullName']= "Arslan Bilal";
        // $data['CNIC']= "3501270883771";
        // $data['PhoneNo']= "03000437817";
        // $data['Email']= "arslan";
        // $data['WorkshopName']= "asdasd";
        // $data['Latitude']= "123123";
        // $data['Longitude']= "23123";

        $data['username']= $this->post('Username');
        $data['password']= $this->post('Password');
        $data['FullName']= $this->post('FullName');
        $data['CNIC']= $this->post('CNIC');
        $data['PhoneNo']= $this->post('PhoneNo');
        $data['Email']= $this->post('Email');
        $data['WorkshopName']= $this->post('WorkshopName');
        $data['Latitude']= $this->post('Latitude');
        $data['Longitude']= $this->post('Longitude');
        
        $this->response($this->l->addWorkshopOwner($data), 200);

    }
}
