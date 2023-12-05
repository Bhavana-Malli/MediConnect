<?php
$host = 'localhost';
$dbname = 'your_database_name';
$user = 'your_username';
$pass = 'your_password';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $organs = implode(', ', $_POST['organs']);
  $otherOrgansInput = $_POST['otherOrgansInput'];
  // ... Extract other form field data ...

  $stmt = $pdo->prepare("INSERT INTO donor_info (organs, other_organs, ...) VALUES (:organs, :otherOrgans, ...)");
  $stmt->execute(['organs' => $organs, 'otherOrgans' => $otherOrgansInput, ...]);

  echo json_encode(['message' => 'Data saved successfully']);
} catch (PDOException $e) {
  echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
