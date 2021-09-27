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
  topologies.splice(
    topologies.findIndex((topology) => topology.id == topologyId),
    1
  );
  // return result
};

exports.queryDevices = function (topologyId) {
  let topology = topologies.find((topology) => topology.id == topologyId);
  if (topology) return topology.components;
};

exports.queryDevicesWithNetlistNode = function (topologyId, NetlistNodeId) {
  let components = this.queryDevices(topologyId);

  var nodes;
  return components.filter((component) => {
    nodes = Object.values(component.netlist);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] == NetlistNodeId) return true;
    }
    return false;
  });
};
