import { PlusCircle } from 'lucide-react'
import { Button } from './components/ui/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table'
import { Dialog, DialogTrigger } from './components/ui/dialog'
import { ProductsFilters } from './components/products-filters'
import CreateProductDialog from './components/create-product-dialog'
import { getProducts } from './data/products'
import formatCurrency from './lib/formatCurrency'
import { useQuery } from '@tanstack/react-query'

export function App() {
  const { data: products } = useQuery({
    queryKey: ['products'], // Declare a global key to identify the request across the application.
    queryFn: getProducts, // Function to fetch data
  })

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="flex items-center justify-between">
        <ProductsFilters />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2 " />
              New product
            </Button>
          </DialogTrigger>

          <CreateProductDialog />
        </Dialog>
      </div>

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
