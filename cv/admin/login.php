<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login</title>
  <link rel="stylesheet" href="./login.css" />
</head>

<body>
  <div class="login-container">
    <form action="./php/login.php" method="post">
      <h2>Admin Login</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <button type="submit" name="submit">Login</button>
      <?php if (isset($error_message)): ?>
        <div class="error-message"><?php echo $error_message; ?></div>
      <?php endif; ?>
    </form>
  </div>
</body>

</html>