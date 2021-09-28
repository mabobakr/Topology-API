const fs = require("fs");

/**
 * Topology Class
 */
class Topology {
  /**
   * @constructor
   * @param {String} fileName
   */
  constructor(fileName) {
    let file = fs.readFileSync(fileName);

    // Convert json string to Object
    file = JSON.parse(file);

    this.id = file.id;
    this.components = file.components;
  }

  /**
   * @function writeToFile
   * @description Write this topology to a file
   */
  writeToFile() {
    fs.writeFileSync(
      "topology_" + this.id + ".json",
      JSON.stringify(this, null, 2)
    );
  }

  /**
   * @function getNodeDevices
   * @param {String} NetlistNodeId
   * @description  Get devices of this topology that are connected to the given netlist node
   * @returns {Object[]} array of devices of this topology that are connected to the given netlist node
   */
  getNodeDevices(NetlistNodeId) {
	var nodes;
    // Only return components that are connected to NetlistNode
    return this.components.filter((component) => {
      // Get values of netlist object
      nodes = Object.values(component.netlist);

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] == NetlistNodeId) return true;
      }
      return false;
    });
  }
}

module.exports = Topology;
