import { PlusCircle, Search } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Label } from './components/ui/label'

export function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2">
          <Input name="id" placeholder="Product ID" className="w-auto" />
          <Input name="name" placeholder="Product name" />
          <Button type="submit" variant="link">
            <Search className="w-4 h-4 mr-2 " />
            Search
          </Button>
        </form>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2 " />
              New product
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <DialogDescription>Add a product to your catalog</DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="name">Name</Label>
                <Input className="col-span-3" id="name" />
              </div>

              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="price">Price</Label>
                <Input className="col-span-3" id="name" />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={() => {}}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
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
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>Product {i + 1}</TableCell>
                  <TableCell>$100.99</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
