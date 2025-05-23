import { describe, it, expect } from "vitest"
import { Inventory } from "./Inventory.js"

describe("Inventory", () => {
  it("should return empty when nothing is added to the inventory", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()

    expect(inventory.project(today)).toEqual([])
  })

  it("should return the item when it is added to the inventory", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()

    inventory.add(today, "🍌")

    expect(inventory.project(today)).toEqual(["🍌"])
  })

  it("should not return any item when the consulted date has no items added in that date", () => {
    const today = new Date("2025-05-23")
    const yesterday = new Date("2025-05-22")
    yesterday.setDate(today.getDate() - 1)

    const inventory = new Inventory()

    inventory.add(today, "🍌")

    expect(inventory.project(yesterday)).toEqual([])
  })

  it("can store more than one item in the same day", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()

    inventory.add(today, "🍌")
    inventory.add(today, "🍌")

    expect(inventory.project(today)).toEqual(["🍌", "🍌"])
  })

  it("can remove a previously stored item", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()
    const tomorrow = new Date("2025-05-24")
    inventory.add(today, "🍌")

    inventory.remove(tomorrow, "🍌")

    expect(inventory.project(tomorrow)).toEqual([])
  })

  it("can remove a previously stored item 2", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()
    const tomorrow = new Date("2025-05-24")

    inventory.add(today, "🍌")
    inventory.add(today, "🍌")

    inventory.remove(tomorrow, "🍌")

    expect(inventory.project(tomorrow)).toEqual(["🍌"])
  })

  it("can remove a previously stored item 3", () => {
    const today = new Date("2025-05-23")
    const inventory = new Inventory()
    const tomorrow = new Date("2025-05-24")
    inventory.add(today, "🍌")

    inventory.remove(tomorrow, "🍌")

    expect(inventory.project(today)).toEqual(["🍌"])
  })
})
