<!--send the user search term to the database-->

<?php
include 'db_connection.php';
$location = $_GET['location_name'];


$sql = " INSERT INTO zoekgeschiedenis (`zoekterm`) VALUES ('".$location."')";

echo $sql;

if ($conn->query($sql)===TRUE){
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

