// passwordGenerator.js

function generatePassword() {
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%&*_?";
  
    const allCharacters =
      lowerCaseLetters +
      upperCaseLetters +
      numbers +
      specialCharacters;
  
    let password = "";
  
    for (let i = 0; i < 8; i++) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
  
    // for (let i = 8; i < 20; i++) {
    //   password +=
    //     lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)] +
    //     upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)] +
    //     numbers[Math.floor(Math.random() * numbers.length)] +
    //     specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    // }
  
    return password.slice(0, Math.floor(Math.random() * 21));
  }
  
  export default generatePassword;