// Helper function to create a new password hash. Replace password with your login password, then need to update your
// hash password value in the Database.

const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'testpassword123';

    try {
        const hash = await bcrypt.hash(password, 12);
        console.log('Password:', password);
        console.log('Hash:', hash);

        // Test the hash
        const isValid = await bcrypt.compare(password, hash);
        console.log('\nHash verification:', isValid ? '✅ Valid' : '❌ Invalid');

    } catch (error) {
        console.error('Error generating hash:', error);
    }
}

generateHash();