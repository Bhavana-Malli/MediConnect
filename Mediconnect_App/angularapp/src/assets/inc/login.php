<?php
// Retrieve the form data
$email = $_POST['email'];
$password = $_POST['password'];

// Connect to the MySQL database
$host = 'localhost';
$dbname = 'mediconnect';
$user = 'root';
$pass = '';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Prepare and execute the SQL query
  $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND password = :password");
  $stmt->execute(['email' => $email, 'password' => $password]);

  // Check if the login credentials are valid
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($user) {
    // Successful login
    // Redirect to dashboard.html
    header("Location: /dashboard.html");
    exit();
  } else {
    // Invalid credentials
    echo "Invalid email or password.";
  }
} catch (PDOException $e) {
  // Handle database connection errors
  echo "Database connection error: " . $e->getMessage();
}
?>
