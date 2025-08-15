class Stack { 
  
    // Array is used to implement stack 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // Functions to be implemented 
    // push(item) 
    push(element) 
    { 
    this.items.push(element); 
    } 
    // pop() 
    pop() 
    { 
        if (this.items.length === 0) 
            return "Underflow"; 
        return this.items.pop(); 
    }
    // peek()
    peek() 
    { 
        return this.items[this.items.length - 1]; 
    } 
    // isEmpty() 
    isEmpty() 
    { 
    return this.items.length === 0; 
    }
    
} 
export function dfs(grid,startnode,finishnode){
    const visitedNodesInOrder = [];

    var stack = new Stack();
    stack.push(startnode);

    while( !stack.isEmpty()){
         var currentnode = stack.pop();
         if(currentnode.isVisited === true || currentnode.wall === true) continue;

         currentnode.isVisited = true;
         visitedNodesInOrder.push(currentnode);
         
         if(currentnode === finishnode) {
             return visitedNodesInOrder;
        }
         const {row, col} = currentnode;
        
        if (row < grid.length - 1 && grid[row+1][col].isVisited===false) {
            stack.push(grid[row + 1][col]);
            grid[row+1][col].previousNode = currentnode;
        }
        if (row > 0 &&  grid[row-1][col].isVisited===false) {
            stack.push(grid[row-1][col]);
            grid[row-1][col].previousNode = currentnode;
        }
        if (col > 0 && grid[row][col-1].isVisited===false) {
            stack.push(grid[row][col-1]);
            grid[row][col-1].previousNode = currentnode;
        }
        if (col < grid[0].length - 1 && grid[row][col+1].isVisited===false) {
            stack.push(grid[row][col+1]);
            grid[row][col+1].previousNode = currentnode;
        }
    } 
    return visitedNodesInOrder;
}
//the below function finds the shortest path by connecting the previous nodes which were found during the graph traversal algorithm
export function getNodesInShortestPathOrderDFS(finishnode,startnode){
    const nodesInShortestPathOrder = [];
    let current = finishnode;
    while(current != null){
        
        nodesInShortestPathOrder.unshift(current);
        //console.log(current);
      current = current.previousNode;
      
    }
    return nodesInShortestPathOrder;
}