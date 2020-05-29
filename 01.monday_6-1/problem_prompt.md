# **Fibonacci Sequence**

- This ia a simple problem, but it has some nuance, since it deals  with recursion, and the most common approach to solve it has a terrible time complexity.

### **PROMPT**
The Fibonacci sequence is defined as follows: the first number of the sequence is 0, the second number is 1, and the nth number is the sum of the (n-1)th and (n-2)th numbers. Write a function that takes in an integer `n` and returns the Fibonacci number, where:

`Fn = Fn-1 + Fn-2` and `F0 = 0 && F1 = 1`

**test cases**

```js
fib(6) return 8
fib(3) return 2
fib(8) return 21
fib(1) return 1
```

### Interviewer Strategy Guide

- Guide them toward the naive case - We don't need to optimize it for the very first solution. Also, this is a important step to see if them know how recursion works. If not, it's a great opportunity to teach them.
- During the `Examples` phase, guide them to draw the sequence we are looking for.

`n` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
--- | --- | --- | --- | --- | --- | --- | --- | ---
`Fn` | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13

- If it is taking too long to reach the naive solution, give them more hints so they can reach the `Optimize` phase.

- During the `Optimize` phase, ask them about the time complexity for the naive solution and discuss why it's so bad.
- Ask them to devise a solution with a better time complexity. You can mention [Memoization](https://en.wikipedia.org/wiki/Memoization) as a possible strategy.


## **Solutions**

**Naive solution**

```js
function fib(n) {
  // base cases
  if(n === 0) {
    return 0
  }
  if(n === 1) {
    return 1
  }

  //recursive case
  return fib(n-2) + fib(n-1)
}
```

**Complexity analysis**

- Time: O(2^n)
- Space: O(n)

<hr>

**Memoization Solution**
```js
function fib(n, memo = {0: 0, 1: 1}) {
  if(n in memo) {
    return memo[n]
  } else {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
  }
}
```
**Complexity analysis**

- Time: O(n)
- Space: O(n)

<hr>

**Optimized Memoization Solution**

```js
function fib(n) {
  const lastTwo = [0,1]
  if(n < 2) {
    return lastTwo[n]
  }
  for(let i = 2; i <= n; i++) {
    const previousLastTwo = [...lastTwo]
    lastTwo[0] = previousLastTwo[1]
    lastTwo[1] = previousLastTwo[1] + previousLastTwo[0]
  }
  return lastTwo[1]
}
```

**Complexity analysis**

- Time: O(n)
- Space: O(1)

<br>

Other solutions for Fibonacci problem:
https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
