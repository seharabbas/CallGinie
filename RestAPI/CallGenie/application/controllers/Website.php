<?php

defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	exit;
}

//required for REST API
echo APPPATH . 'libraries/REST_Controller.php';
//require APPPATH . 'libraries/REST_Controller.php';
use Libraries\REST_Controller;
require APPPATH . 'libraries/Format.php';


class Website extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('M_Website', 'wm');
    }
	
	function websites_get() {
        $websites = $this->wm->get_website_list();

        if ($websites) {
            $this->response($websites, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function website_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }

        $website = $this->wm->get_website($this->get('id'));

        if ($website) {
            $this->response($website, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_website_post() {
        $website_title = $this->post('title');
        $website_url = $this->post('url');
        
        $result = $this->wm->add_website($website_title, $website_url);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function update_website_put() {
        $website_id = $this->put('id');
        $website_title = $this->put('title');
        $website_url = $this->put('url');

        $result = $this->wm->update_website($website_id, $website_title, $website_url);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
	function delete_website_delete($website_id) { //path parameter, example, /delete/1

        $result = $this->wm->delete_website($website_id);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
}