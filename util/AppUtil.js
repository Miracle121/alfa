const path = require('path');
const fs = require('fs')

exports.isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;

}


module.exports.checkPath = async (dirPath) => {

    const directory = path.resolve(process.cwd(), 'public', dirPath);

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true});
    }
    return directory;
};

module.exports.parseFullName = function (name) {
    try {

        let spaceCountInName = name.split(' ').length;

        let l_name = name.split(' ')[0];
        let f_name = name.split(' ')[1];
        let m_name = name.split(' ')[2];

        let last_name = l_name.split('/')[1];
        let last_name_cr = l_name.split('/')[0];

        if (spaceCountInName > 3) {
            m_name = '';
            let i = 2;
            while (i < spaceCountInName) {
                if (m_name === '')
                    m_name = m_name + name.split(' ')[i];
                else
                    m_name = m_name + ' ' + name.split(' ')[i];
                i++;
            }
        }
        let middle_name = m_name.split('/')[1];
        let middle_name_cr = m_name.split('/')[0];

        let first_name = f_name.split('/')[1];
        let first_name_cr = f_name.split('/')[0];

        return {
            first_name,
            middle_name,
            last_name,
            first_name_cr,
            middle_name_cr,
            last_name_cr
        };
    } catch (err) {
        return {};
    }

}

module.exports.parsePassport = function (passport) {
    try {
        let serial_number = passport.split('  ')[0];
        let dates = passport.split('  ')[1];

        dates = dates.replace('(', '');
        dates = dates.replace(')', '');

        let given_date = dates.split(' ')[0];
        let expire_date = dates.split(' ')[1];

        expire_date = expire_date.replace('E', '')
        expire_date = expire_date.replace('X', '')
        expire_date = expire_date.replace('P', '')
        expire_date = expire_date.replace(':', '')

        return {
            serial_number,
            given_date,
            expire_date
        };
    } catch (err) {
        console.log(err);
        return {};
    }

}
