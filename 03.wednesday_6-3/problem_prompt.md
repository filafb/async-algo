# Best Time to Buy and Sell Stock
---
## Interviewer Prompt

Say you have an array for which the *ith* element is the price of a given stock on day *i*.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

---

## Example Output

```javascript
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

---

## Interviewer Guide

---

### RE

Coaching advice for the interviewer to make sure that their interviewee is asking the right questions

#### Example:
* If your interviewee continues without asking questions, stop them and ask, "Do you have any questions about the result?"

---

### AC

Coaching for the interviewer for how to help the interviewee while they're forming their approach and coding

#### Example:
* If your interviewee is struggling, have them think about what a possible naive solution could be.

---

### TO

Coaching on what to do if interviewees finish, or additional questions/optimization prompts

#### Example:
* If your interviewee finishes, but has not reached the optimal solution, ask them:
  * What is the time complexity of their naive solution.
  * How can we optimize this approach?

---

### Answers to Common Questions

#### Example:
* What if the array is empty?
  * Return 0, there was no transactions made.
* Can the result array contain elements other than integers?
  * No, we will only be dealing with positive integers.

---

## Solution and Explanation (a)

## Brute force solution

For the naive solution, we want to first start off by intializing a variable that stores the greatest profit margin we've encountered in our prices array so far. In the beginning, we would start maxProfit at 0 because we haven't done a comparison between price-points yet. We can utilize a nested for loop in order to compare the current price-point I'm at with every other element in our prices array. This is not efficient, however, because it requires us to do a price comparison with each element still left in our prices array against our current price-point.

---

# Solution Code

```javascript
const maxProfit = function(prices) {
    //intialize a variable to keep count of the current highest profit
    let maxProfit = 0;
    //create a loop to iterate through the prices until the second to last element
    for (let i = 0; i < prices.length - 1; i++){
        //the inner loop compares the prices[i] to every future price point to see if there is a higher profit
        for (let j = i + 1; j < prices.length; j++){
            let profit = prices[j] - prices[i]
            if (profit > maxProfit){
                maxProfit = profit
            }
        }
    }
    return maxProfit
};
```
#### Complexity Analysis

Time complexity : O(n^2)

Space complexity : O(1)

---

## Solution and Explanation (b)

## Optimized Solution

For the optimal solution, we will get the greatest profit with only one continous loop through our array. We will keep track of the smallest price-point we have seen so far. If we find a smaller price-point, we will swap out our minimum and continue comparing the remaining elements in our array with that new minimum. This saves us time complexity because we are always moving foward without having to create a nested for loop.

---

## Solution Code

```javascript
const maxProfit = function(prices) {
    //intialize a variable to keep count of the current highest profit
    let maxProfit = 0;
    //we can also initialize minPrice at prices[0] because the starting value of minPrice will most likely be reassigned when we see a lower price-point
    let minPrice = Infinity;
    for (let i = 0; i < prices.length; i++){
        //if the current price is less than the lowest price point we've seen so far, reassign the minPrice
        if (prices[i] < minPrice){
            minPrice = prices[i]
        }
        let profit = prices[i] - minPrice
        if (profit > maxProfit){
                maxProfit = profit
        }
    }
    return maxProfit
};
```
#### Complexity Analysis

Time complexity : O(n)

Space complexity : O(1)

---

## Summary

* In conclusion, often times when we are dealing with 1-dimensional arrays, O(n^2) or nested for loops are usually not our optimal solution. However, once we create a naive approach, we can start building a more optimal solution.

---
