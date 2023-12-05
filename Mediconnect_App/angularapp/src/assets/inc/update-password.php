<?php
$host = 'localhost'; // Database host
$username = 'root'; // Database username
$password = ''; // Database password
$database = 'mediconnect'; // Database name

// Create a connection to the database
$connection = mysqli_connect($host, $username, $password, $database);

// Check if the connection was successful
if (mysqli_connect_errno()) {
  die('Failed to connect to the database: ' . mysqli_connect_error());
}

// Retrieve user input from the forgot password form
$firstName = $_POST['firstName'];
$email = $_POST['email'];
$dateOfBirth = $_POST['dateOfBirth'];

// Validate user input (e.g., check if the fields are not empty)

// Query the database to check if the provided information is correct
$query = "SELECT * FROM users WHERE firstName = '$firstName' AND email = '$email' AND dateOfBirth = '$dateOfBirth'";
$result = mysqli_query($connection, $query);

if ($result) {
  if (mysqli_num_rows($result) == 1) {
    // User is found in the database, generate a new password and update it
    $newPassword = generateNewPassword(); // Function to generate a new password

    // Update the user's password in the database
    $updateQuery = "UPDATE users SET password = '$newPassword' WHERE email = '$email'";
    $updateResult = mysqli_query($connection, $updateQuery);

    if ($updateResult) {
      // Display the new password to the user or send it via email
      echo "Your password has been reset. Your new password is: $newPassword";
    } else {
      // Handle the error occurred during the password update
      echo "Error updating password: " . mysqli_error($connection);
    }
  } else {
    // User is not found in the database or the provided information is incorrect
    echo "Invalid credentials. Please make sure you entered the correct information.";
  }
} else {
  // Handle the error occurred during the query execution
  echo "Error executing query: " . mysqli_error($connection);
}

// Close the database connection
mysqli_close($connection);

// Function to generate a new random password
function generateNewPassword() {
  $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  $passwordLength = 10;
  $newPassword = '';

  for ($i = 0; $i < $passwordLength; $i++) {
    $index = rand(0, strlen($characters) - 1);
    $newPassword .= $characters[$index];
  }

  return $newPassword;
}
?>
