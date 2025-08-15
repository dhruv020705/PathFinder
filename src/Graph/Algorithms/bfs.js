export function bfs(grid,startnode,finishnode) {
    const visitedNodesInOrder = [];
    const queue = [];

    queue.push(startnode);
    
    console.log("inside the bfs function");
    while(queue.length!==0){
        
        const currentnode = queue.shift();
        if (currentnode.wall) continue;
        if (currentnode.isVisited === true) continue;
         

        currentnode.isVisited = true;
        visitedNodesInOrder.push(currentnode);
        if(currentnode === finishnode) {
            return visitedNodesInOrder;
        }
        
        const {row, col} = currentnode;
        
        if (row < grid.length - 1 && grid[row+1][col].isVisited===false) {
            queue.push(grid[row + 1][col]);
            grid[row+1][col].previousNode = currentnode;
        }
        if (row > 0 &&  grid[row-1][col].isVisited===false) {
            queue.push(grid[row-1][col]);
            grid[row-1][col].previousNode = currentnode;
        }
        if (col > 0 && grid[row][col-1].isVisited===false) {
            queue.push(grid[row][col-1]);
            grid[row][col-1].previousNode = currentnode;
        }
        if (col < grid[0].length - 1 && grid[row][col+1].isVisited===false) {
            queue.push(grid[row][col+1]);
            grid[row][col+1].previousNode = currentnode;
        }
    }
 
    return visitedNodesInOrder;

}
//the below function finds the shortest path by connecting the previous nodes which were found during the graph traversal algorithm
export function getNodesInShortestPathOrderBFS(finishnode){
    const nodesInShortestPathOrder = [];
    let current = finishnode;
    while(current != null){
        nodesInShortestPathOrder.unshift(current);
        //console.log(current);
      current = current.previousNode;
      
    }
    return nodesInShortestPathOrder;
}