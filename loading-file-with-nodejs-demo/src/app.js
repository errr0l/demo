const fs = require("fs");
const path = require("path");
const { print } = require("./util/common");
const data = require("../data.json");

print("require: ");
print("---");
print(data);

print("\n");

// fs.readFile("../data.json", { encoding: 'utf-8' }, (error, data) => {
//     if (error) {
//         throw error;
//     }

//     print("fs.readFile：");
//     print("---")
//     print(data);
// });

fs.readFile(path.resolve(__dirname, "../data.json"), { encoding: 'utf-8' }, (error, data) => {
    if (error) {
        throw error;
    }

    print("fs.readFile：");
    print("---")
    print(data);
});