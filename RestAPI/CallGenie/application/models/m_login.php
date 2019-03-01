<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_login extends CI_Model {
    public function login($username,$password)
    {
       $query="select * from users where username=? and password=?";
       $result=$this->db->query($query,array($username,$password));
       $data=array();
       foreach($result->result() as $row)
       {
           $data['valid'] = "true";
           $data['U_id']=$row->U_id;
       }
       $data['valid'] = "false";
       $data['U_id']=0;
       return $data;
    }
    public function checkUser($username)
    {
       $query="select * from users where username=?";
       $result=$this->db->query($query,array($username));
       $data=array();
       $data['valid'] = "false";
       $data['U_id']=0;
       foreach($result->result() as $row)
       {
           $data['valid'] = "true";
           $data['U_id']=$row->U_id;
       }
       
       return $data;
    }
    public function addUser($username,$password)
    {
        $data=$this->checkUser($username);
        $U_id=0;
        if($data['valid']=="false")
        {
            $query="insert into `users` (`username`,`password`) values(?,?)";
            $this->db->query($query,array($username,$password));
            $query="select max(U_id) as U_id from users";
            $res=$this->db->query($query);
            foreach($res->result() as $row)
            {
                $U_id =$row->U_id;
                break;
            }
        }
        
        return $U_id;
    }
    public function getCarOwnerProfile($U_id)
    {
        $query="select u.Username,u.Password,car.* from users u inner join carowner car on car.U_id=u.U_id where u.U_id=?";
        $res=$this->db->query($query,$U_id);
        $pass=array();
        foreach($res->result() as $row)
        {
            $pass['Username']=$row->Username;
            $pass['Password']=$row->Password;
            $pass['FullName']=$row->FullName;
            $pass['CNIC']=$row->CNIC;
            $pass['phoneNo']=$row->phoneNo;
            $pass['U_id']=$row->U_id;
            break;
        }
        return $pass;

    }
    public function getWorkshopOwnerProfile($U_id)
    {
        $query="select u.Username,u.Password,car.* from users u inner join workshopowner car on car.U_id=u.U_id where u.U_id=?";
        $res=$this->db->query($query,$U_id);
        $pass=array();
        foreach($res->result() as $row)
        {
            $pass['Username']=$row->Username;
            $pass['Password']=$row->Password;
            $pass['FullName']=$row->FullName;
            $pass['CNIC']=$row->CNIC;
            $pass['phoneNo']=$row->phoneNo;
            $pass['Email']=$row->Email;
            $pass['WorkshopName']=$row->WorkshopName;
            $pass['Latitude']=$row->Latitude;
            $pass['Longitude']=$row->Longitude;
            $pass['U_id']=$row->U_id;
            break;
        }
        return $pass;

    }
    public function addCarOwner($data)
    {
        $U_id=$this->addUser($data['username'],$data['password']);
        $pass=array();
        if($U_id==0)
        {
            $pass['status'] = "false";
            return $pass;
        }else{
            $query = "insert into `CarOwner` (`FullName`,`CNIC`,`phoneNo`,`U_id`) values (?,?,?,?)";
            $this->db->query($query,array($data['FullName'],$data['CNIC'],$data['PhoneNo'],$U_id));
            $pass['status'] = "true";
            return $pass;
        }
        
    }
    public function updateWorkshopOwnerLocation($data)
    {
        $query="update workshopowner set Latitude=?,Longitude=? where U_id=?";
        $this->db->query($query,array($data['Latitude'],$data['Longitude'],$data['U_id']));
        $pass=array();
        $pass['status'] = "true";
        return $pass;
    }
    public function addWorkshopOwner($data)
    {
        $U_id=$this->addUser($data['username'],$data['password']);
        $pass=array();
        if($U_id==0)
        {
            $pass['status'] = "false";
            return $pass;
        }else{
            $query = "insert into `WorkshopOwner` (`FullName`,`CNIC`,`phoneNo`,`Email`,`WorkshopName`,`Latitude`,`Longitude`,`U_id`) values (?,?,?,?,?,?,?,?)";
            $this->db->query($query,array($data['FullName'],$data['CNIC'],$data['PhoneNo'],$data['Email'],$data['WorkshopName'],$data['Latitude'],$data['Longitude'],$U_id));
            $pass['status'] = "true";
            return $pass;
        }
        
    }
}
?>
