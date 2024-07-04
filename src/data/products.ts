export interface Product {
  id: number
  name: string
  price: number
}

export async function getProducts() {
  // Simulating a delay of 1 second for demonstration purposes.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    { id: 1, name: 'Blue Chair', price: 30 },
    { id: 2, name: 'Orange Table', price: 50 },
    { id: 3, name: 'Green Lamp', price: 40 },
    { id: 4, name: 'Yellow Desk', price: 60 },
    { id: 5, name: 'Red Bookshelf', price: 80 },
    { id: 6, name: 'Purple Sofa', price: 70 },
    { id: 7, name: 'Pink Bed', price: 90 },
    { id: 8, name: 'Green Chair', price: 25 },
    { id: 9, name: 'Blue Lamp', price: 45 },
    { id: 10, name: 'Orange Desk', price: 85 },
  ]
}

interface CreateProductRequest {
  name: string
  price: number
}

export async function createProduct(_: CreateProductRequest) {
  // Simulating a delay of 1 second for demonstration purposes.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return
}
