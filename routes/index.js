const {comparePassword, hashPassword} = require('../utils/myBcrypt');
(async () => {
    const hash = await hashPassword('');
    console.log(hash);
    console.log(await(comparePassword('', '$2b$10$WIUSh5Dl990n/zt.cJp88eV2Rie8be5aEPvVwDIuyoMENE0CQt9Aq')));
})();