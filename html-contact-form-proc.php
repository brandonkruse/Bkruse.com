<?php 
session_start();
$to = "brandon@bkruse.com";
$subject = "Contact Us Mail (bkruse.com)";//$_REQUEST['subject'];

if($_REQUEST['fname'])
 $fname = $_REQUEST['fname'];
else
 $fname = "Not Specified";
 
if($_REQUEST['lname'])
 $lname = $_REQUEST['lname'];
else
 $lname = "Not Specified";
 
 if($_REQUEST['Address'])
 $Address = $_REQUEST['Address'];
else
 $Address = "Not Specified";
 
 if($_REQUEST['City'])
 $City = $_REQUEST['City'];
else
 $City = "Not Specified";
 
 if($_REQUEST['State'])
 $State = $_REQUEST['State'];
else
 $State = "Not Specified";
 
 if($_REQUEST['Zip'])
 $Zip = $_REQUEST['Zip'];
else
 $Zip = "Not Specified";
 
  
if($_REQUEST['Email'])
 $email = $_REQUEST['Email'];
else
 $email = "Not Specified";


 if($_REQUEST['Phone'])
 $contact = $_REQUEST['Phone'];
else
 $contact = "Not Specified";

if($_REQUEST['Comments'])
 $comments = $_REQUEST['Comments'];
else
 $comments = "Not Specified";


 
$msgg='<table width="100%" border="0" cellspacing="5" cellpadding="5">
                            <tr>
                                <td width="50%" align="left" class="blacktext01">First Name : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$fname.'</span></td>
                              </tr>
							  <tr>
                                <td width="50%" align="left" class="blacktext01">Last Name : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$lname.'</span></td>
                              </tr>
							   <tr>
                                <td width="50%" align="left" class="blacktext01">Address : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$Address.'</span></td>
                              </tr>
							   <tr>
                                <td width="50%" align="left" class="blacktext01">City : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$City.'</span></td>
                              </tr>
							   <tr>
                                <td width="50%" align="left" class="blacktext01">State : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$State.'</span></td>
                              </tr>
							   <tr>
                                <td width="50%" align="left" class="blacktext01">Zip : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$Zip.'</span></td>
                              </tr> 
                              <tr>
                                <td width="50%" align="left" class="blacktext01">Email : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$email.'</span></td>
                              </tr>
                              <tr>
                                <td width="50%" align="left" class="blacktext01">Phone : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$contact.'</span></td>
                              </tr>							 
                              <tr>
                                <td align="left" class="blacktext01">comments :</td>
                                <td align="left"><span class="blacktext01">'.$comments.'</span></td>
                              </tr>
                             
                             </table>';//=$_REQUEST['msgg']
        $message=$msgg;

        $headers  = "MIME-Version: 1.0\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\n";
		$headers .= "X-Priority: 3\n";
		$headers .= "X-MSMail-Priority: Normal\n";
		$headers .= "X-Mailer: php\n";
		$headers .="From:".$name."<".$email.">\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		mail($to, $subject, $message, $headers);
		
?>
<script language="javascript">
  window.document.location.href='thanks.html';
</script>	
