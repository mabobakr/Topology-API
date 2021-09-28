const {
  readJSON,
  writeJSON,
  queryDevices,
  getDevicesWithNode,
  queryTopologies,
  deleteTopology,
} = require("../src/api");

// Test queryTopologies functionality
describe("queryTopologies", () => {
  it("Should return an empty array if no file were read", () => {
    expect(queryTopologies()).toHaveLength(0);
  });

  it("Should return array containing the topology of the read file", () => {
    readJSON("topology.json");
    expect(queryTopologies()).toHaveLength(1);
    expect(queryTopologies()[0]).toMatchObject({ id: "top1" });
  });
});

// Test queryDevices functionality
describe("queryDevices", () => {
  it("Should throw an error if topology doesn't exist", () => {
    expect(() => {
      queryDevices("non-existent ID");
    }).toThrow();
  });

  it("Should return array of components of given topology", () => {
    let topologies = queryTopologies();
    expect(queryDevices(topologies[0].id)).toHaveLength(2);
    expect(queryDevices(topologies[0].id)[0]).toMatchObject({ id: "res1" });
  });
});

// Test getDevicesWithNode 
describe("getDevicesWithNode", () => {
  it("Should throw an error if the topology doesn't exist", () => {
    expect(() => {
      getDevicesWithNode("non-existent id");
    }).toThrow();
  });

  it("Should return array of devices connected to the given netlist node", () => {
    let topologies = queryTopologies();
    expect(getDevicesWithNode(topologies[0].id, "n1")).toHaveLength(2);
    expect(
      getDevicesWithNode(topologies[0].id, "n1")[0]
    ).toMatchObject({ id: "res1" });
  });

  it("Should return an empty list if no devices are connected to the given node", () => {
    let topologies = queryTopologies();
    expect(
      getDevicesWithNode(topologies[0].id, "non-existent")
    ).toHaveLength(0);
  });
});


describe("deleteTopology", () => {
  it("Should throw an error if the topology doesn't exist", () => {
    expect(() => {
      deleteTopology("non-existentId").toThrow();
    });
  });

  it("Should delete the topology with given ID", () => {
    // topologies array contains 1 element from previous tests
    expect(queryTopologies()).toHaveLength(1);
    deleteTopology(queryTopologies()[0].id);
    expect(queryTopologies()).toHaveLength(0);
  });
});


describe("readJSON", () => {
  it("Should throw if given a non existent file", () => {
    expect(() => {
      readJSON("non existing file");
    }).toThrow();
  });

  it("Should add a topology to topologies array", () => {
    expect(() => {
      readJSON("topology.json");
    }).not.toThrow();
    expect(queryTopologies()).toHaveLength(1);
  });
});


describe("writeJSON", () => {
  it("Should throw an error if the topology doesn't exist", () => {
    expect(() => {
      writeJSON("non-existentId").toThrow();
    });
  });
});
