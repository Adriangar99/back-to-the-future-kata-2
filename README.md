# Back to the Future Kata

> Complete name: Back to the Future in the Grocery Store Kata

This kata is about managing a special grocery store inventory. The task is to keep track of fruits and vegetables, organize and sort them, but with a twist—we need to manage the inventory over time!

Every method in this kata requires a date parameter to indicate when the changes should take effect.

Your job is to create a system that can accept changes to the inventory at any date, and then allow us to see the state of the inventory at any given date.

In each iteration, there will be examples. Let's use these variables for all of them:

```ts
const yesterday = new Date("2024-11-14");
const today = new Date("2024-11-15");
const tomorrow = new Date("2024-11-16");
const future = new Date("2025-01-01");
```

> ⚠️ The signatures of the methods in the examples might be questionable. You might come up with better interfaces, use IDs for things that doesn't have in the example, wharever you want.

# Iteration 1

User Should Be Able To (USBAT from now on): Add products to the inventory

```ts
inventory.add(today, "🍌");
inventory.add(today, "🥝");
inventory.add(tomorrow, "🍊");

inventory.project(yesterday); // <empty>
inventory.project(today); // 🍌🥝
inventory.project(tomorrow); // 🍌🥝🍊
```

# Iteration 2

USBAT: Remove previously added products

```ts
inventory.add(today, "🍌");
inventory.add(today, "🥝");
inventory.remove(tomorrow, "🍌");

inventory.project(yesterday); // <empty>
inventory.project(today); // 🍌🥝
inventory.project(tomorrow); // 🥝
```

# Iteration 3

USBAT: Create groups of products

- If there is a group, the string representation should include "|"
- If products are separated from each other, the group must be created where the first product is located.
- Groups cannot be empty
  - If you start removing elements from a group, the group must disappear
- You can only create groups of elements that are present at that moment

Simple example:

```ts
inventory.add(today, "🍌");
inventory.add(today, "🥝");
inventory.add(today, "🍊");
inventory.add(today, "🍎");

inventory.project(future); // 🍌🥝🍊🍎

inventory.group(tomorrow, ["🥝", "🍊"]);

inventory.project(future); // 🍌|🥝🍊|🍎
```

Example with products separated from each other:

```ts
inventory.add(today, "🍌");
inventory.add(today, "🥝");
inventory.add(today, "🍊");
inventory.add(today, "🍎");

inventory.project(future); // 🍌🥝🍊🍎

inventory.group(tomorrow, ["🍌", "🍎"]);

inventory.project(future); // |🍌🍎|🥝🍊
```

Example with temporal complications:

```ts
inventory.add(today, "🍌");
inventory.add(today, "🥝");
inventory.add(today, "🍊");
inventory.add(today, "🍎");

inventory.project(future); // 🍌🥝🍊🍎

inventory.group(tomorrow, ["🍌", "🍎"]);

inventory.project(future); // |🍌🍎|🥝🍊

inventory.remove(today, "🍎"); // we are removing an item today, but the group was created tomorrow

inventory.project(future); // |🍌|🥝🍊

inventory.remove(today, "🍌");

inventory.project(future); // 🥝🍊
```

# Iteration 4

So far, we have been managing the inventory from a time perspective at a "global" level, without specifying any particular country. However, each country can have its own overrides. Generally, there will only be a few changes for specific countries, while the main management will still be at the global level.

```ts
inventory.add({ date: today }, "🍌"); // Global
inventory.add({ date: today }, "🥝"); // Global
inventory.add({ date: tomorrow, country: "spain" }, "🍊"); // Specific to Spain
inventory.add({ date: tomorrow, country: "uk" }, "🍎"); // Specific to the UK

inventory.project({ date: future }); // 🍌🥝
inventory.project({ date: future, country: "spain" }); // 🍌🥝🍊
inventory.project({ date: future, country: "uk" }); // 🍌🥝🍎
```

Ensure that all previous scenarios continue to work. We should be able to add/remove products, create groups, and move items at any time at any scope level.


# Iteration 5

USBAT: Move products and groups in the inventory

- Both groups and products can be moved at the "root" level of the inventory
- Only products can be moved inside groups

```ts
inventory.add({date: today}, "🍌");
inventory.add({date: today}, "🥝");
inventory.add({date: today}, "🍊");
inventory.add({date: today}, "🍎");
inventory.group({date: today}, ["🍌", "🍎"]);
inventory.project({date: future}); // |🍌🍎|🥝🍊

inventory.move({date: today}, "🥝", 0); // Move kiwi to index 0
inventory.project({date: future}); // 🥝|🍌🍎|🍊

inventory.move({date: today}, "🥝", 1); // Move kiwi to index 1
inventory.project({date: future}); // |🍌🥝🍎|🍊
```
