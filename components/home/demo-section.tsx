import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../ui/common/motion-wrapper";
import SummaryViewer from "../summaries/summary-viewer";

// Demo summary for a computer science lecture on algorithms
const DEMO_SUMMARY = `# Introduction to Algorithms

• 🧠 Algorithms are step-by-step procedures for solving problems or performing tasks, forming the foundation of computer science.

• 💡 Key characteristics of algorithms include:
  - Finiteness: Must terminate after a finite number of steps
  - Definiteness: Each step must be precisely defined
  - Input: Takes zero or more inputs
  - Output: Produces one or more outputs
  - Effectiveness: Operations must be basic enough to be performed exactly

• 🔄 Algorithm analysis focuses on efficiency in terms of time complexity (how runtime scales with input size) and space complexity (memory usage).

# Big O Notation

• 📊 Big O notation describes the upper bound of an algorithm's growth rate, helping us understand how it scales with larger inputs.

• 🚀 Common time complexities (from fastest to slowest):
  - O(1): Constant time - operations take the same time regardless of input size
  - O(log n): Logarithmic time - divides the problem in half each time (e.g., binary search)
  - O(n): Linear time - runtime grows linearly with input size
  

• ⚖️ When analyzing algorithms, we focus on the dominant term and worst-case scenario to ensure reliability.

# Sorting Algorithms

• 🔄 Bubble Sort: Simple but inefficient (O(n²)) algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if needed.

• 🔍 Merge Sort: Efficient divide-and-conquer algorithm (O(n log n)) that divides the array in half, sorts each half, then merges them back together.

• ⚡ Quick Sort: Another efficient divide-and-conquer algorithm (average O(n log n)) that picks a "pivot" element and partitions the array around it.

• 📚 Selection Sort: Simple O(n²) algorithm that repeatedly finds the minimum element from the unsorted portion and puts it at the beginning.

• 🧮 Heap Sort: Efficient O(n log n) algorithm that builds a heap data structure from the array and repeatedly extracts the maximum element.

# Search Algorithms

• 🔎 Linear Search: Simple O(n) algorithm that checks each element sequentially until finding the target or reaching the end.

• 🎯 Binary Search: Efficient O(log n) algorithm for sorted arrays that repeatedly divides the search interval in half.

• 🌳 Tree-based Search: Algorithms like those used in Binary Search Trees can provide efficient O(log n) search, insert, and delete operations.

• 📈 Hashing: Can provide O(1) average-case lookup time using hash functions to map keys to array indices.

# Graph Algorithms

• 🌐 Breadth-First Search (BFS): Explores all neighbors at the current depth before moving to nodes at the next depth level.

• 🔍 Depth-First Search (DFS): Explores as far as possible along each branch before backtracking.

• 🛣️ Dijkstra's Algorithm: Finds the shortest path between nodes in a graph with non-negative edge weights.

• 🌉 Minimum Spanning Tree Algorithms: Kruskal's and Prim's algorithms find the minimum set of edges that connect all vertices.`;

export default function DemoSection() {
  return (
    <section className=" relative">
      <div
        className=" py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
     lg:px-8 lg:pt-12"
      >
        <div className=" flex flex-col items-center text-center space-y-4 ">
          <div
            className=" inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80
           backdrop-blur-xs border border-gray-500/20 mb-4"
          >
            <Pizza className="  w-6 h-6 text-rose-500" />
          </div>
          <div className=" text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className=" font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how sommaire transforms this{" "}
              <span className=" bg-linear-to-r  from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
                Computer Science lecture
              </span>{" "}
              into an{" "}
              <span className=" bg-linear-to-r  from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
                insta-story
              </span>{" "}
              like summary
            </MotionH3>
          </div>

          <div
            className=" flex justify-center items-center px-2
          sm:px-4 lg:px-6
          "
          >
            {/**Summery viewer here */}
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SummaryViewer summary={DEMO_SUMMARY} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
