// MOCK DB PROVIDER - Use this until Prisma generation is fixed
export const mockDb = {
  server: {
    create: async (data: any) => {
      console.log("Mock DB: Creating server", data)
      return { id: "mock-id", ...data.data }
    },
    findMany: async () => []
  }
}

const prisma = mockDb as any
export default prisma
