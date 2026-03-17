import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: "123456",
    },
  })

  await prisma.product.create({
    data: {
      name: "Producto prueba",
      description: "Esto es un producto de prueba",
      price: 1000,
      stock: 10,
      userId: user.id,
    },
  })
}

main()
  .then(() => {
    console.log("Seed ejecutado")
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })