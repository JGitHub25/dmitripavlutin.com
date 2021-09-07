---
title: "unknown vs any in TypeScript"
description: "What is the difference between unknown and any types in TypeScript."
published: "2021-09-07T12:00Z"
modified: "2021-08-07T12:00Z"
thumbnail: "./images/cover-3.png"
slug: typescript-unknown-vs-any
tags: ['typescript', 'unknown', 'any']
recommended: ['javascript-null', '7-tips-to-handle-undefined-in-javascript']
type: post
---

A variable of type `any` can be assigned with anything:

```typescript
let myVar: any = 0;
myVar = '1';
myVar = false;
```

Many TypeScript guides discourage the use of `any` because using it throws away the type restrictions &mdash; the first reason why you use TypeScript!

TypeScript (version 3.0 and above) also provides a special type `unknown` that is similar to `any`. You can assign any value to an `unknown` type variable:

```typescript
let myVar: unknown = 0;
myVar = '1';
myVar = false;
```

Now... the big question is: what is the difference between using `any` and `unknown`? 

Let's find out in this post.  

## 1. *unknown* vs *any*

To better understand the difference between `unknown` and `any`, let's start with writing a function that wants to invoke its only argument which can be any value.    

The first approach is to make the only parameter of `invokeAnything()` as `any`:

```typescript
function invokeAnything(callback: any) {
  callback();
}

invokeAnything(1); // throws "TypeError: callback is not a function"
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5EqCBKRAbwChEianUbNynANx8Avnz4p02PIRJgKARkmIA9NsTEATnADuAZ0QAiACr4ADlgCiBowbbCGTDMnNg4UdoigkLAIFkA)

Because `callback` param is of `any` type, the statement `callback()` *won't trigger type errors*. You can do anything with a variable of type `any`.  

But running the script *throws a runtime error*: `TypeError: callback is not a function` is thrown. `1` is a number and cannot be invoked as a function &mdash; and TypeScript hasn't protected you from this error!

How to allow `invokeAnything()` function to accept any kind of argument, but force a type check on that argument, for example, if invoking it as a function? 

Welcome `unknown`!

An `unknown` type variable, same as `any`, accepts any value. But when trying to use the variable of `unknown`, TypeScript enforces a type check. Exactly what you need!

Let's change the type of `callback` param from `any` to `unknown`, and see what happens:

```typescript{3}
function invokeAnything(callback: unknown) {
  callback();
  // Object is of type 'unknown'
}

invokeAnything(1);
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5FwMw4B3MASkQBvAFCJE1Oo2bk+AbmEBfYcJTpseQiTAUAjHKA)

Because the `callback` argument is of type `unknown`, the statement `callback()` has a type error `Object is of type 'unknown'`.  

You need to perform type checking before using a variable of type `unknown`. In the example, you would simply need to check if `callback` is a function type:

```typescript
function invokeAnything(callback: unknown) {
  if (typeof callback === 'function') {
    callback();
  }
}

invokeAnything(1);
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5FwMw4B3MASkQBvAFCJkwROSj4ADljgTqdRs0QBeDYgDkoSLARaBIsWKUMmGcnwDcoxAF9hj4SnTY8hEmAoBGG0A)

Having added `typeof callback === 'function'` check, you can safely invoke `callback()`. No type errors and no runtime errors! Great!

## 2. The mental model of *unknown* vs *any*

To be honest, I had difficulties understanding `unknown`. Why does it make a difference from `any`, since both types accept any value?  

Here's the rule that had helped me understand the difference:

* You can assign anything to `unknown` type *but you cannot operate on `unknown` before doing a type check or type assertion*
* You can assign anything to `any` type *and you can perform any operation on `any`*

The example above has demonstrated exactly the similarity and difference between `unknown` and `any`.  

The case of `unknown`:

```typescript
function invokeAnything(callback: unknown) {
  // you cannot operate on `unknown` type 
  // before doing a type check or type assertion
  if (typeof callback === 'function') {
    callback();
  }
}

invokeAnything(1); // You can assign anything to `unknown` type
```

The type check here is `typeof callback === 'function'` &mdash; checking whether the `callback` is a function. The type of `callback` norrows to function type.  

The case of `any`:

```typescript
function invokeAnything(callback: any) {
  // you can perform any operation on `any` type
  callback();
}

invokeAnything(1); // // You can assign anything to `any` type
```

`callback` being `any`, TypeScript doesn't enforce any type checking.  

## 3. Conclusion

`unknown` and `any` are 2 special types that can hold any value.  

`unknown` is recommended over `any` because it provides safer typing &mdash; you have to use type assertion or narrow to a specific type if you want to perform operations on `unknown`.  