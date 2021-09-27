const api = require("./api");


console.log("the empty array")
let result = api.queryTopologies()
console.log (result)

api.readJSON("topology.json");
api.readJSON("not_top1.json")
console.log("ok now we've read it")

result = api.queryTopologies()
result.forEach(value => console.log(value))


console.log("writing to file...")
api.writeJSON(result[1].id)

console.log("now deleting one item")
api.deleteTopology(result[1].id)

console.log("remaining is")
result = api.queryTopologies()
result.forEach(value => console.log(value))

