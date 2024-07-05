import { PlusCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogTrigger } from '../components/ui/dialog'
import { ProductsFilters } from '../components/products-filters'
import CreateProductDialog from '../components/create-product-dialog'
import formatCurrency from '../lib/formatCurrency'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getFilteredProducts } from '../data/products'

export function Products() {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')

  const { data: products } = useQuery({
    queryKey: id || name ? ['products', id, name] : ['products'],
    queryFn: () => {
      return id || name ? getFilteredProducts({ id, name }) : getProducts()
    },
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
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
