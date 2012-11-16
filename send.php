<?
$num = "1" . $POST['1'] . $_POST['2'] . $_POST['3'];

/*
$num = "1" . $POST['1'] . $_POST['2'] . $_POST['3'];

$socket = fsockopen("38.107.220.160",443, $errno, $errstr, $timeout);
fputs($socket, "Action: Login\r\n");
fputs($socket, "UserName: calls\r\n");
fputs($socket, "Secret: Lamd#OAD0zfmdlmf\r\n\r\n");
sleep(1);
fputs($socket, "Action: Originate\r\n");
fputs($socket, "Channel: SIP/flow/12566526584\r\n");
fputs($socket, "Exten: $num\r\n");
fputs($socket, "Priority: 1\r\n");
fputs($socket, "Context: call\r\n");
fputs($socket, "CallerID: $num\r\n");
fputs($socket, "Variable: phone=$num\r\n\r\n");
$wrets=fgets($socket,128); 
echo "wrets is $wrets";
*/

session_start();
$to = "brandon@bkruse.com";
$subject = "Contact Us Mail (bkruse.com)";//$_REQUEST['subject'];

 
$msgg='<table width="100%" border="0" cellspacing="5" cellpadding="5">
                            <tr>
                                <td width="50%" align="left" class="blacktext01">Number : </td>
                                <td width="50%" align="left"><span class="blacktext01">'.$num.'</span></td>
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

?>
