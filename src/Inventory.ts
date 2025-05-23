export class Inventory {
  items: String[] = []

  project(date: Date): String[] {
    return this.items
  }

  add(date: Date, item: String): void {
    this.items.push(item)
  }
}
