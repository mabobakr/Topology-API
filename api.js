const Topology = require("./topology");

let topologies = [];

/**
 * @function readJSON
 * @param {String} fileName
 * @description Read a topology from given json file  
 * @returns {Boolean} True if the operation was successful and false otherwise
 */
exports.readJSON = function (fileName) {
  try {
	// Create new topology and add it to topologies array
    topologies.push(new Topology(fileName));
    return true;
  } catch (err) {
	// In case of error, log the error and return false
    console.error(err);
    return false;
  }
};

/**
 * @function writeJSON
 * @param {String} topologyId
 * @description Write topology specified by topologyId to json file  
 * @returns {Boolean} True if the operation was successful and false otherwise
 */
exports.writeJSON = function (topologyId) {
  try {
	// Find required topology
    let topology = topologies.find((topology) => topology.id == topologyId);
    
	// Throw error if topology doesn't exist
	if (!topology) throw new Error("The given topology doesn't exist");
    
	// Write topology to json file
	topology.writeToFile();
    return true;
  } catch (err) {
	// In case of error, log the error and return false
	console.error(err);
    return false;
  }
};

/**
 * @function queryTopologies
 * @description Get topologies are currently in memory  
 * @returns {Topology[]} Array of topologies that are currently in memory
 */
exports.queryTopologies = function () {
  return topologies;
};

/**
 * @function deleteTopology
 * @param {String} topologyId
 * @description Delete topology specified by topologyId   
 * @returns {Boolean} True if the operation was successful and false otherwise
 */
 exports.deleteTopology = function (topologyId) {
  try {
	// Find index of topology
    let index = topologies.findIndex((topology) => topology.id == topologyId);
    
	// Throw error if topology doesn't exist
	if (index == -1) throw new Error("The given topology doesn't exist");
    
	// Remove topology from memory
	topologies.splice(index, 1);
    return true;
  } catch (err) {
	// In case of error, log the error and return false
    console.error(err);
    return false;
  }
};

/**
 * @function queryDevices
 * @param {String} topologyId
 * @description Get devices of the topology specified by topologyId   
 * @returns {Object[]} Array of objects representing devices in the topology
 * @returns {null} If topology doesn't exist
 */
exports.queryDevices = function (topologyId) {
  // Find required topology
  let topology = topologies.find((topology) => topology.id == topologyId);
  
  // If found return its components 
  if (topology) return topology.components;
  
  // If not found log the error and return null
  console.error("The given topology doesn't exist");
  return null;
};

/**
 * @function queryDevicesWithNetlistNode
 * @param {String} topologyId
 * @param {String} NetlistNodeId
 * @description Get devices of the topology specified by topologyId that are connected to given netlist node  
 * @returns {Object[]} Array of objects representing required devices in the topology
 * @returns {null} If topology doesn't exist
 */

exports.queryDevicesWithNetlistNode = function (topologyId, NetlistNodeId) {
  // Find required topology
  let topology = topologies.find((topology) => topology.id == topologyId);
  
  // If not found, log the error and return null
  if (!topology) {
    console.error("The given topology doesn't exist");
    return null;
  }

  // If found, return array of devices
  let devices = topology.getNodeDevices(NetlistNodeId);
  return devices;
};
