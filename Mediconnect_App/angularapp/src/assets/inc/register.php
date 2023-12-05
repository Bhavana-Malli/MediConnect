<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mediconnect";

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the form data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$gender = $_POST['gender'];
$dateOfBirth = $_POST['dateOfBirth'];
$bloodGroup = $_POST['bloodGroup'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$password = $_POST['password'];

// Prepare and execute the SQL statement to insert the data into the database
$stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, gender, dateOfBirth, bloodGroup, address, city, state, zipcode, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssssss", $firstName, $lastName, $email, $gender, $dateOfBirth, $bloodGroup, $address, $city, $state, $zipcode, $password);
$stmt->execute();

// Close the statement and database connection
$stmt->close();
$conn->close();

// Display registration success message
echo "Registration successful. You will be redirected to the login page in 5 seconds.";

// Redirect the user to the login page after 5 seconds
header("refresh:5;url=/login.html");
exit();

?>