var head: number[] = new Array(99999);
var rescap: number[] = new Array(99999);
var edgeFirst: number[] = new Array(99999);
var edgeNext: number[] = new Array(99999);
var m: number;
var n: number;
var source: number;
var target: number;
var t_found: boolean;
var counter: number;

const vertexMaxSize = 100;
const edgeMaxSize = 400;
const edge2MaxSize = 800;
const unvisited: number = -1;

var scanf = require('scanf');

function flowNetworkInput() {
  const process = require('process');

  let edgeForward: number;
  let edgeBackward: number;

  console.log("please input size of the vertex set.");
  n = scanf('%d');
  console.log("please input size of the edge set.");
  m = scanf('%d');

  for (var edge = 1; edge <= m; edge++) {
    console.log('edge: ' + edge);
    edgeForward = edge * 2;
    edgeBackward = edgeForward - 1;
    console.log("please input the head of the backward edge.");
    let headEdgeBackward: number = scanf('%d');
    console.log("please input the head of the forward edge.");
    let headEdgeForward: number = scanf('%d');
    console.log("please input the rescap of the head of the forward edge.");
    let rescapEdgeForward: number = scanf('%d');
    head[edgeBackward] = headEdgeBackward;
    head[edgeForward] = headEdgeForward;
    rescap[edgeForward] = rescapEdgeForward;
    rescap[edgeBackward] = 0;
  }

  console.log('please input the source and the target');
  source = scanf('%d');
  target = scanf('%d');
  console.log('the size of vertex set: ' + n);
  console.log('the size of edge set: ' + n);
}

function flowIncidenceListConstruct() {
  let edge: number;
  let edgeForward: number;
  let edgeBackward: number;
  let vertex: number;
  let vertex1: number;
  let vertex2: number;

  for (vertex = 1; vertex <= n; vertex++) {
    edgeFirst[vertex] = 0;
  }
  for (edge = m; edge >= 1; edge--) {
    edgeForward = edge * 2;
    edgeBackward = edgeForward - 1;
    vertex1 = head[edgeBackward];
    edgeNext[edgeForward] = edgeFirst[vertex1];
    edgeFirst[vertex1] = edgeForward;
    vertex2 = head[edgeForward];
    edgeNext[edgeBackward] = edgeFirst[vertex2];
    edgeFirst[vertex2] = edgeBackward;
  }
}

function flowIncidenceListOutput() {
  let a: number;
  let k: number;
  let vertex: number;

  for (vertex = 1; vertex <= n; vertex++) {
    a = edgeFirst[vertex];
    k = 0;
    while (a != 0) {
      console.log(a + " (" + head[a] + ")");
      k++;
      if ( k % 10 == 0) {
        console.log("\n");
      }
      a = edgeNext[a];
    }
    console.log("\n");
  }
}

function maxFlowOutput() {
  let edge: number;
  let capacity: number;
  let value: number = 0;
  console.log("the max flow from source: " + source + ", target: " + target);
  for (edge = 1; edge <= m; edge++) {
    capacity = rescap[2 * edge- 1] + rescap[2 * edge];
    
    console.log("edge:" + edge + ", source of the edge: " +  head[2 * edge - 1]+ ", sink og the edge: " + head[2 * edge]);
    console.log("capacity of the edge: " + capacity + ", f(" + edge + ") = " + rescap[2 * edge - 1]);

    if (head[2 * edge - 1] == source) {
      value = value + rescap[2 * edge - 1];
    }
  }
  console.log("the value of the max flow: " + value);
}

function minCutOuput(path: number[]) {
  let edge: number;
  let capacity: number;
  let capacitySum: number;
  let vertex: number;

  console.log("min" + source + "-" + target + " cut");
  console.log("X={");
  for (vertex = 1; vertex <= n; vertex++) {
    if (path[vertex] != unvisited) {
      console.log("vertex: " + vertex);
    }
  }
  console.log("}");
  capacitySum = 0;
  for (edge = 1; edge <= m; edge++) {
    if (path[head[2 * edge - 1]] != unvisited && path[head[2 * edge]] == unvisited) {
      capacity = rescap[2 * edge - 1] + rescap[2 * edge];
      console.log("capacity of the edge: " + capacity + ", f(" + edge + ") = " + rescap[2 * edge - 1]);
      capacitySum = capacitySum + capacity;
    }
  }
  console.log("the capacity of the min" + source + "-" + target + " cut X: " + capacitySum);
}

function dfs(vertex: number, path: number[]) {
  let arcForward: number;
  let arcBackward: number;
  let w: number;

  arcForward = edgeFirst[vertex];

  while (arcForward != 0 && rescap[arcForward] == 0) {
    arcForward = edgeNext[arcForward]
  }

  while (t_found == false && arcForward != 0) {
    w = head[arcForward];
    if (path[w] == unvisited) {
      arcForward = arcForward + 1;
      if (arcForward %2 == 0) {
        arcBackward = arcForward - 1;
      }
      if (w != target) {
        dfs(w, path)
      } else {
	t_found = true;
      }
    }
    if (t_found == false) {
      arcForward = edgeNext[arcForward]
      while (arcForward != 0 && rescap[arcForward] == 0) {
        arcForward = edgeNext[arcForward]
      }
    }
  }
}

function augmentation(path: number[]) {
  let arcForward: number;
  let arcBackward: number;
  let vertex: number;
  let w: number;
  let delta: number;
  let capacity: number;

  for (vertex = 1; vertex <= n; vertex++) {
    path[vertex] = unvisited;
  }
  path[source] = 0;
  dfs(source, path);
  if (t_found) {
    counter++;
    arcBackward = path[target];
    arcForward = arcBackward + 1;
    if (arcBackward %2 == 0) {
      arcForward= arcBackward - 1;
    }
    delta = rescap[arcForward];
    vertex = head[arcBackward];
    while (vertex != source) {
      arcBackward = path[vertex];
      vertex = head[arcBackward];
      arcForward = arcBackward + 1;
      if (arcBackward % 2 == 0) {
        arcForward = arcBackward - 1;
      }
      if (delta > rescap[arcBackward]) {
        delta = rescap[arcForward];
      }
      console.log("\n");
      console.log("delta: (P" + counter + ") = " + delta);
      vertex = target;
      while (vertex != source) {
        arcBackward = path[vertex];
	vertex = head[arcBackward];
	arcForward = arcBackward + 1;
	if (arcBackward % 2 == 0) {
	  console.log("edge: " + arcForward / 2 + ", soruce: " + head[arcBackward] + ", sink: " + head[arcForward]);
	  console.log("capacity: " + capacity + ", f(" + arcForward / 2 + "):" + (rescap[arcBackward] - delta) +  "--> " + rescap[arcBackward]);
	} else {
	  console.log("edge: " + arcBackward + ", soruce: " + head[arcForward] + ", sink: " + head[arcBackward]);
	  console.log("capacity: " + capacity + ", f(" + arcBackward / 2 + "):" + (rescap[arcForward] - delta) +  "--> " + rescap[arcForward]);
	}

      }
    }
  }

}

console.log(flowNetworkInput());
console.log(head);
console.log(rescap);

console.log(flowIncidenceListConstruct());
console.log(edgeNext);
console.log(edgeFirst);
