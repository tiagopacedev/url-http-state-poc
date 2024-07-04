import { z } from 'zod'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, createProduct } from '../data/products'

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number().positive(),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

function CreateProductDialog() {
  const queryClient = useQueryClient()

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(_, variables) {
      // const cached = queryClient.getQueryData(['products'])

      // Update cache
      queryClient.setQueryData(['products'], (data: Product[]) => {
        return [
          ...data,
          {
            id: Math.floor(Math.random() * 100),
            name: variables.name,
            price: variables.price,
          },
        ]
      })
    },
  })

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      })

      alert('Product created successfully')
    } catch (err) {
      alert('Oops! Could not create product')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Product</DialogTitle>
        <DialogDescription>Add a product to your catalog</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Name</Label>
          <Input className="col-span-3" id="name" {...register('name')} />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Price</Label>
          <Input className="col-span-3" id="name" {...register('price')} />
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
  )
}

export default CreateProductDialog
