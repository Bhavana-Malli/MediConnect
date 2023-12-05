<?php
$host = 'localhost';
$dbname = 'your_database_name';
$user = 'your_username';
$pass = 'your_password';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $pdo->prepare("SELECT * FROM donor_info");
  $stmt->execute();

  $donors = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($donors);
} catch (PDOException $e) {
  echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
