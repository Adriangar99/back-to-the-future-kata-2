export class Inventory {
  items: InventoryItem[] = []

  project(date: Date): String[] {
    return this.items
      .filter((item) => item.addedAt <= date)
      .filter((item) => item.isActive(date))
      .map((item) => item.product)
  }

  add(date: Date, product: String): void {
    this.items.push(new InventoryItem(product, date))
  }

  remove(date: Date, product: String): void {
    const firstItem = this.items.findIndex((item) => item.product === product)
    this.items[firstItem].removedAt = date
  }
}

export class InventoryItem {
  product: String
  addedAt: Date
  removedAt?: Date

  constructor(product: String, addedAt: Date, removedAt?: Date) {
    this.product = product
    this.addedAt = addedAt
    this.removedAt = removedAt
  }

  isActive(date: Date): boolean {
    if (this.removedAt && this.removedAt <= date) {
      return false
    }

    return true
  }
}
