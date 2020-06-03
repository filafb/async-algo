# Intersection

---

# Prompt

Given two sorted arrays of numbers, return an array containing all values that appear in *both* arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they needn't be sorted.

You can assume that each array has only unique values (no duplicates within the array).

---

# Examples

Example involving two sorted arrays:


```js
intersection([1,4,9,10,11], [2,3,4,5,8,10]); // should return [4, 10]
//(numbers can be in any order)
```

---

# Brute-Force Solution

A naive, brute-force solution is to loop over the elements of one array, and within that loop, to loop over elements of the other array. For each pair of elements (one from each array) that are equal, push that value to a resultant array. This ends up being `O(n*m)` time complexity where `n` and `m` are the size of the given arrays. Below is an implementation:

```js
function intersection (arrA, arrB) {
  const shared = [];
  arrA.forEach(elemA => {
    arrB.forEach(elemB => {
      if (elemA == elemB) {
        shared.push(elemA);
      }
    });
  });
  return shared;
}
```
---

# Optimal Approach

A more optimal approach involves "ratcheting" forward through both arrays. You can start an index for each array at zero, incrementing each index whenever its corresponding element is less than its counterpart in the other array. Whenever two elements are equal, add that value to the resulting array (and increment both indexes).

```
 i             j
[1,4,9,10,11] [2,3,4,5,8,10]
left[i] < right[j] so i++

   i           j
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

   i             j
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

   i               j
[1,4,9,10,11] [2,3,4,5,8,10]
left[i] == right[j] so include 4 in result, and i++, j++

     i               j
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

...etc
```
---

# Optimal Solution

This solution is only possible because both arrays are **sorted**. The resulting algorithm is `O(n+m)` time complexity. Here's an implementation:

```js
function intersection (arrA, arrB) {
  const shared = [];
  let idxA = 0;
  let idxB = 0;
  while (idxA < arrA.length && idxB < arrB.length) {
    const elemA = arrA[idxA];
    const elemB = arrB[idxB];
    if (elemA == elemB) {
      shared.push(elemA);
    }
    if (elemA <= elemB) {
      idxA++;
    }
    if (elemA >= elemB) {
      idxB++;
    }
  }
  return shared;
}
```
---

# Solution Using Map

```js
function intersection (arrA, arrB) {
  const smaller = arrB.length < arrA.length ? arrB : arrA;
  const larger = arrB.length >= arrA.length ? arrB : arrA;

  const hashSmaller = {};
  smaller.forEach(elem => hashSmaller[elem] = true);

  return larger.filter(elem => hashSmaller.hasOwnProperty(elem));
}
```
---
