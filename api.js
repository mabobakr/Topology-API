const Topology = require("./topology");

let topologies = [];

exports.readJSON = function (fileName) {
  try {
    topologies.push(new Topology(fileName));
  } catch (err) {
    console.log(err.message);
	// return result
  }
};

exports.queryTopologies = function () {
  return topologies;
};

exports.writeJSON = function (topologyId) {
  let topology = topologies.find((topology) => topology.id == topologyId);
  if (topology) topology.writeToFile();
  // return result
};

exports.deleteTopology = function (topologyId) {
	topologies.splice(topologies.findIndex(topology => topology.id == topologyId), 1)
	// return result
}


// DeviceList queryDevices(TopologyID);
// DeviceList queryDevicesWithNetlistNode(TopologyID, NetlistNodeID);
