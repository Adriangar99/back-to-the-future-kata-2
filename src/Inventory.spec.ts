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
})
