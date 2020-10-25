var head: number[] = new Array(99999);
var rescap: number[] = new Array(99999);
var edgeFirst: number[] = new Array(99999);
var edgeNext: number[] = new Array(99999);
var m: number;
var n: number;
var source: number;
var target: number;

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

console.log(flowNetworkInput());
console.log(head);
console.log(rescap);

console.log(flowIncidenceListConstruct());
console.log(edgeNext);
console.log(edgeFirst);
