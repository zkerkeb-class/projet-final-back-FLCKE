import bcrypt from 'bcryptjs';
function verifyDataNotFound(data, res) {
    if (!data) {
        return res.status(404).json({ message: 'Data not  found now' });
    }
    res.status(200).json(data);
}
async function hashData(data) {
    if (!data) {
        return;
    }
    const passwordHash = await bcrypt.hash(data, 10);
    return passwordHash;
}
async function compareData(data, hash) {
    if (!data || !hash) {
        return false;
    }
    const isMatch = await bcrypt.compare(data, hash);
    return isMatch;
}
async function generatePassword(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    console.log("Generated password:", password);
    return password;
}
export default {
    verifyDataNotFound,
    hashData,
    generatePassword,
};