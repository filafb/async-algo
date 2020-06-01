/* eslint-disable no-console */
/**
 * PROMPT:
 *
 * Create a function that checks if there is any duplicate element in a given array.
 */

/**
 * REPEAT
 *
 * Function will take an array as the argument, and has to chack if there is any element duplicated
 *
 * Q. What the function should return?
 * A. true if it has duplicate, false if not
 *
 * Q. Only integers or any other element?
 * A. Integers and strings
 *
 * Q. It should check senstive cases?
 * A. S !== s
 *
 * Q. Is there a maximum size for the array?
 * A. This case is irrelevant
 *
 * Edge cases:
 * Empty array? -> No. At least two elements
 *
 */

/**
 * EXAMPLES
 *
 * Input: [1,2,3,4,5] // Output: false
 * Input: ["a", "A", 1, 4, 5] // Output: false
 * Input: [1,2,3,4,1] // Output true
 * Input: ["a", "b","a"] // Output true
 */

/**
 * APROACH
 *
 * There might be a better approach, is that ok if I start with a naive solution and try to optimize it later?
 *
 * So, the function has to compare pairs. That said, I would loop over the array, fixing an element, then loop over it again from the element index up to the end.
 *
 * 1. Create a for loop, from 0 to N, N being the length
 * 2. fix the current element.
 * 3. Create a new for loop, fron i + 1 to N.
 * 4. Compare the current element with the fixed one.
 *  4.1 If they are the same, return true
 * 5. When the for loop breaks, return false
 *
 */


// Code

function hasDuplicate(arr) {
  // 1. Create a for loop, from 0 to N, N being the length
  for (let i = 0; i < arr.length; i++) {
    // 2. fix the current element.
    const fixed = arr[i]
    // 3. Create a new for loop, fron i + 1 to N.
    for (let j = i+1; j < arr.length; j++) {
      // 4. Compare the current element with the fixed one.
      const current = arr[j]
      //  4.1 If they are the same, return true
      if(fixed === current) return true
    }
  }
  // 5. When the for loop breaks, return false
  return false
}

//TEST

console.log(hasDuplicate([1,2,3,4,5]))
console.log(hasDuplicate(["a", "b","a"]))



  //O(nˆ2)

/**
 * Optimize
 *
 * Nested for loop
 * time: O(n2)
 * Space: O(1)
 *
 * Better approach:
 * 1. create a Map to hold the values visited.
 * 2. for every element visited, check if it's already present in the Map.
 *  2.1 If so, return true
 *  2.2. else, update the map with the current value
 * 3. when loop breaks, return false
 *
 * time: O(n)
 * space: O(n)
 */

// Optimized solution:

function hasDuplicateOptm(arr) {
  const map = {}
  for(let i = 0; i < arr.length; i++){
    if(map[arr[i]]) {
      return true
    } else {
      map[arr[i]] = true
    }
  }
  return false
}

console.log(hasDuplicateOptm([1,2,3,4,5]))
console.log(hasDuplicateOptm(["a", "b","a"]))
