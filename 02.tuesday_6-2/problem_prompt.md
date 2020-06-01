# Dictionary Word Finder

# Interviewer Prompt

_Feel free to share the prompt with the interviewee:_ https://repl.it/@FiladelfoBraz/Dictionary-Word-Finder#index.js

Given an alphabetical array of dictionary entries and a word to search for, find that word's definition (if it exists). A dictionary entry is just a string where the word's name appears first, followed by ` - [definition]`.

**It's totally fine to share the example below with the interviewee so they can understand the input example**

```javascript
const dictionary = [
  'a - Used when mentioning someone or something for the first time in a text or conversation',
  'and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly',
  'be - Exist',
  'in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else',
  'of - Expressing the relationship between a part and a whole',
  'that - Used to identify a specific person or thing observed or heard by the speaker',
  'the - Denoting one or more people or things already mentioned or assumed to be common knowledge',
  'to - Expressing motion in the direction of (a particular location)'
];
definitionOf('be', dictionary); // should return 'Exist'
definitionOf('that', dictionary); // should return 'Used to identify a specific person or thing observed or heard by the speaker'
definitionOf('to', dictionary); // should return 'Expressing motion in the direction of (a particular location)'
definitionOf('wizbing', dictionary); // should return undefined
```



# Interviewer Guide

## Primary focuses

- Time / space complexity analysis
- Identify how/where to use a `Binary search`


# Complexity analysis

- *Push* your candidate to analyze the time and/or space complexity
- Do so when they're going over a possible approach
- ...but leave them an option to cover it later

---

# Binary search

- If your candidate quickly comes up with the naive solution, push them to come up with other approaches **before** they start implementing the naive approach
- If they don't come up with binary search, suggest it


# Solutions


# Brute force solution

The naive (brute force) solution is to loop down the dictionary each time, looking for an entry that starts with the search word. This is `O(s * p)` time and `O(1)` space complexity, where `s` is the size of the dictionary and `p` is the average size of an entire entry.

--

If we consider the length of a definable word an "input that can grow arbitrarily large", then the time complexity is `O(s * p)`, where `p` is average word length.

In reality, we know that the longest word is no longer than, say, 100 letters. That means `p` doesn't grow arbitrarily large. Since `s` tends to be dominant over `p`, we could drop the `p`, leading to a `O(s)` time complexity.

---

# Brute force solution

```javascript
function definitionOf(word, dictionary) {
  // for loop for s, where s is dictionary.length
  for(let i = 0; i < dictionary.length; i++) {
    const entry = dictionary[i]
    // slice loops over the string. It will have word.length steps
    const checkEntry = entry.slice(0,word.length)
    if(checkEntry === word) {
      return entry.slice(word.length + 3)
    }
  }
  return undefined
}
```

It's possible to use other JS methods to solve this problem, as `.startsWith`, `.substring`, `substr`, `.find`. It's fine if the interviewee uses any of them, but it's important to note that we also have to consider the time complexity for these methods.

---

# Interviewer note

Your candidate might get stuck figuring out the *precise* code for confirming a dictionary match, e.g.:

```javascript
entry.slice(0,word.length)
```

...and/or for getting the definition *only* from an entire entry:

```javascript
entry.slice(word.length + 3)
```

You can freely decide to let them struggle with these parts or to help them out (depending on how you want to challenge your candidate).

---

# Binary search solution

The optimized binary search solution can be `O(p * log s)` time (`s` is dict array length, `p` is word length) and `O(1)` space. Again, we can consider time complexity as `O(log s)` since word length doesn't grow arbitrarily large.

---

# Interviewer note

The less than `<` and greater than `>` operators can compare strings by alphabetical order (or really by character code, but that's close enough for what we're doing here). If a candidate goes down a rabbit-hole trying to implement a `compareByAlphabeticalOrder` function, just let them know that they can use `<`/`>`.

---

# Binary search solution

```javascript
function definitionOf (word, dict) {
  // initialize indexes at the beginning and end of the dictionary, these define the bounds of our "search window"
  let indexAtLeft = 0;
  let indexAtRight = dict.length - 1;
  let index;
  // continue until the index has not changed from the previous cycle
  while (index !== indexAtLeft && index !== indexAtRight) {
    // find the middle of the existing search window
    index = Math.floor((indexAtLeft + indexAtRight) / 2);
    if (dict[index].slice(0,word.length) === word) { // slice takes O(p) time
      return dict[index].slice(word.length + 3); // "subtract" the word itself (plus the ' - ' part)
    }
    if (word < dict[index]) {
      // "shrink" the right half of the search window
      indexAtRight = index - 1;
    } else {
      // "shrink" the left half of the search window
      indexAtLeft = index + 1;
    }
  }
  return undefined
}
```

---
---

## Binary search visualization:

```js
const dictExample = ["an", "bee", "car", "door", "entry", "floor", "gif"]
const word = "car"
```

# First loop

Indexes | 0 | 1 | 2 | 3 | 4 | 5 | 6
--- | --- | --- | --- | --- | --- | --- | ---
Pointers | LP | --- | --- | MP | --- | --- | RP

```js
dict[MP] = "door"
word = "car"
word < dict[MP]
indexAtRight = index - 1
```

# Second loop

Indexes | 0 | 1 | 2 | 3 | 4 | 5 | 6
--- | --- | --- | --- | --- | --- | --- | ---
Pointers | LP | MP | RP | --- | --- | --- | ---

```js
dict[MP] = "bee"
word = "car"
word > dict[MP]
indexAtLeft = index + 1
```

# Third loop

Indexes | 0 | 1 | 2 | 3 | 4 | 5 | 6
--- | --- | --- | --- | --- | --- | --- | ---
Pointers | --- | LP === MP | RP | --- | --- | --- | ---

```js
dict[MP] = "car"
word = "car"
word === dict[MP]
```
