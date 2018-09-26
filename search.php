<?php
require_once('connectvars.php');
 $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$q = $_REQUEST["q"];
//$hint = "";
if ($q !== "") {
	$q = strtolower($q);
	$query = mysqli_query($dbc,"SELECT OFFICE_ADDRESS, MEMBERSHIP_NUMBER, NAMES,PHONE_NUMBER,EMAIL_ADDRESS FROM nba_ph_data WHERE NAMES LIKE '%$q%'")
		or die('error to death');
if(mysqli_num_rows($query) >0){
	while($row=mysqli_fetch_array($query)) {
        $mem_no = explode("/",$row['MEMBERSHIP_NUMBER']);
        echo "<h6>Name: ".$row['NAMES']."</h6><ul class='lisd'><li>Year Of Call: ".$mem_no[0]."</li><li>SCEN:</li><li>Office: ".$row['OFFICE_ADDRESS']."</li><li>Phone:".$row['PHONE_NUMBER']."</li><li>Email: ".$row['EMAIL_ADDRESS']."</li></ul>$";
        
		}
	}
    else{
        echo "$<h6>no match found please check name and search again</h6>";
    }
}
//echo'<a href="#" id="x" onclick="ccv()">Close</a>';
//echo $hint;
?>