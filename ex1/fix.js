var fs = require('fs');
var batismos = require('./batismos.json');

batismos.forEach(b => {
    b._id = b.ref.replace(/\//g, '_')

    var split1 = b.title.split("Pai: ");
    var split2 = split1[1].split("; Mãe: ")

    b.pai = split2[0]
    b.mae = split2[1]
})

fs.writeFile('batismos.json', JSON.stringify(batismos, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});