<?php

require APP_PATH . 'other/password.php';

class UserModel extends CI_Model{
	var $email = "";
	var $passwordHash = "";
	
	function __construct(){
    	parent::__construct();
    }
    
    function createUser(){
    	$this->email = $this->input->post( 'email' );
    	$pass1 = $this->input->post( 'password' );
    	$pass2 = $this->input->post( 'password-repeat' );
    	if( strcmp( $pass1, $pass2 ) ){
    		// error
    		return;
    	}
    	
    	$passwordHash = password_hash( $pass1, PASSWORD_DEFAULT );
    	$this->db->insert( 'users', $this );
    	$randomStr = generateRandomString( 128 );
    	$userId = $this->db->insert_id();
    	$data = array(
    		'user_id' => $userId,
    		'registration_code' => $randomStr
    	);
    	$this->db->insert( 'users_additional', $data );
    }
    
    function authenticateUser(){
    	$this->email = $this->input->post( 'email' );
    	$query = $this->db->select( 'user_id, password' )->where( 'email', $email );
    	
    	if( password_verify( $real_password, $attempt ) )
    		// ok
    	else
    		// not
    }
}

?>
