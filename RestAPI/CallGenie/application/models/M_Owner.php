<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_Owner extends CI_Model {
    public function getCarServices()
    {
        $query="select * from CarServices";
        $result=$this->db->query($query);
        $pass=array();
        $data=array();
        $i=0;
        foreach($result->result() as $row)
        {
            $pass[$i]['C_id'] = $row->C_id;
            $pass[$i]['ServiceName'] = $row->ServiceName;
            $pass[$i]['ServiceCharges'] = $row->ServiceCharges;
            $i++;
        }
        $data['results']=$pass;
        return $data;
    }
    
    public function getAppointmentDetails($iApptid)
    {
        $query="select CS.ServiceName,ad.Amount FROM AppointmentDetails ad INNER JOIN CarServices CS on CS.C_iD=ad.iDetailID WHERE  ad.iApptid=?";
        $result=$this->db->query($query,array($iApptid));
        $pass=array();
        $data=array();
        $i=0;
        foreach($result->result() as $row)
        {
            $pass[$i]['ServiceName'] = $row->ServiceName;
            $pass[$i]['TotalAmount'] = "Rs. ".$row->Amount;
            $i++;
        }
        $data['results']=$pass;
        return $data;
    }
    public function getCarOwnerAppointments($C_id)
    {
        $query="select appt.TotalDistance,appt.iApptid,appt.AppointmentDate,appt.AppointmentTime,SUM(ad.Amount) as TotalAmount FROM Appointments appt INNER join AppointmentDetails ad on appt.iApptid=ad.iApptid where CarOwnerId=? GROUP by appt.iApptid,appt.AppointmentDate,appt.AppointmentTime,appt.TotalDistance";
        $result=$this->db->query($query,array($C_id));
        $pass=array();
        $data=array();
        $i=0;
        foreach($result->result() as $row)
        {
            $pass[$i]['iApptid'] = $row->iApptid;
            $pass[$i]['AppointmentDate'] = str_replace("/","-",$row->AppointmentDate);
            $pass[$i]['AppointmentTime'] = $row->AppointmentTime;
            $pass[$i]['TotalAmount'] = $row->TotalAmount;
            $pass[$i]['TotalDistance'] = $row->TotalDistance;
            $pass[$i]['DistanceCharges'] = $row->TotalDistance*20;
            $i++;
        }
        $data['results']=$pass;
        return $data;
    }
    public function getWorkshopServices($pass)
    {
        $query="select cs.ServiceName,cs.ServiceCharges,WOS.C_id,WOS.WO_id,WO.FullName from CarServices cs inner join  WorkshopServices WOS on WOS.C_id=cs.C_id inner join WorkshopOwner wo on WOS.WO_id=wo.WO_id where WOS.WO_id=?";
        $result=$this->db->query($query,$pass['WO_id']);
        $pass=array();
        $i=0;
        foreach($result->result() as $row)
        {
            $pass[$i]['C_id'] = $row->C_id;
            $pass[$i]['ServiceName'] = $row->ServiceName;
            $pass[$i]['ServiceCharges'] = $row->ServiceCharges;
            $pass[$i]['WO_id'] = $row->WO_id;
            $pass[$i]['WorkshopName'] = $row->FullName;
            $i++;
        }
        return $pass;
    }
    public function AddWorkshopServices($data)
    {
        $query="insert into  WorkshopServices(`C_id`,`WO_id`) values (?,?)";
        $result=$this->db->query($query,array($data['C_id'],$data['WO_id']));
        $pass=array();
        $pass['status']='true';
        return $pass;
    }
    public function DeleteWorkshopServices($data)
    {
        $query="delete from WorkshopServices where C_id=? and WO_id=?";
        $result=$this->db->query($query,array($data['C_id'],$data['WO_id']));
        $pass=array();
        $pass['status']='true';
        return $pass;
    }
}
?>