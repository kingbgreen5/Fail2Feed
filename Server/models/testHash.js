const bcrypt = require('bcryptjs');

const enteredPassword = "Limegreengbc";  
const storedHash = "$2b$10$aWXEAOu0eIxGwp7cdvx29.h/v3j4666rjwD7CKkZ71uIhUW.P.npa"; // Copy the actual hash

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
    if (err) throw err;
    console.log("Manual bcrypt compare result:", result);
});
