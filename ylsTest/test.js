const regex_password = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[A-Za-z]).*$/;
console.log(regex_password.test('1aa1aa123456789'))
