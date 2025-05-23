import { describe, it, expect } from "vitest"
import { Inventory } from "./Inventory.js"

describe("Inventory", () => {
  it("should return empty when nothing is added to the inventory", () => {
    const today = new Date()
    const inventory = new Inventory()

    expect(inventory.project(today)).toEqual([])
  })

  it("should return the item when it is added to the inventory", () => {
    const today = new Date()
    const inventory = new Inventory()

    inventory.add(today, "🍌")

    expect(inventory.project(today)).toEqual(["🍌"])
  })

  it("should not return any item when the consulted date has no items added in that date", () => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const inventory = new Inventory()

    inventory.add(today, "🍌")

    expect(inventory.project(yesterday)).toEqual([])
  })

  it("can store more than one item in the same day", () => {
    const today = new Date()
    const inventory = new Inventory()
    inventory.add(today, "🍌")
    inventory.add(today, "🍌")

    expect(inventory.project(today)).toEqual(["🍌", "🍌"])
  })
})
