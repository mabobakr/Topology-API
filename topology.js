const fs = require("fs");

class Topology {
  constructor(fileName) {
    let file = fs.readFileSync(fileName);
    file = JSON.parse(file);
    this.id = file.id;
    this.components = file.components;
  }

  writeToFile() {
    fs.writeFileSync("topology_" + this.id +".json", JSON.stringify(this, null, 2));
  }
}


module.exports = Topology