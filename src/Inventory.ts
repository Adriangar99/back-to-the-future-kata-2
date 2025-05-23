export class Inventory {
  items: InventoryItem[] = []

  project(date: Date): String[] {
    return this.items.filter((item) => item.addedAt <= date).map((item) => item.product)
  }

  add(date: Date, product: String): void {
    this.items.push(new InventoryItem(product, date))
  }
}

export class InventoryItem {
  product: String
  addedAt: Date

  constructor(product: String, addedAt: Date) {
    this.product = product
    this.addedAt = addedAt
  }
}
