import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const addUser = async (req, res) => {
  try {
    //Use createMany for create multiple record at a time
    await prisma.user.create({
      data: {
        name: req?.body?.name,
        email: req?.body?.email,
        profile: {
          create: {
            age: req?.body?.age,
            address: req?.body?.address,
            role: req?.body?.role,
          },
        },
      },
      include: {
        profile: true,
      },
    })
    return res.status(200).json({ message: 'User added successfully' })
  } catch (error) {
    console.log('error :>> ', error)
    return res.status(500).json({ error: error.message })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    //Use createMany for create multiple record at a time
    const userProfile = await prisma.user.findFirst({
      where: {
        email: req?.body?.email,
      },
      // include: {
      //   profile: true,
      // },
      select: {
        id: true,
        email: true,
        name: true,
        profile: {
          select: {
            id: true,
            age: true,
            address: true,
            role: true,
          },
        },
      },
    })
    return res
      .status(200)
      .json({ message: 'User added successfully', data: userProfile })
  } catch (error) {
    console.log('error :>> ', error)
    return res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    //Use createMany for create multiple record at a time
    const a = await prisma.user.update({
      where: {
        email: req?.body?.email,
      },
      data: {
        name: req?.body?.name,
        profile: {
          update: {
            age: req?.body?.age,
            address: req?.body?.address,
          },
        },
      },
    })
    console.log('a :>> ', a)
    return res
      .status(200)
      .json({ message: 'User details updated successfully' })
  } catch (error) {
    console.log('error :>> ', error)
    return res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    //Use createMany for create multiple record at a time
    await prisma.profile.delete({
      where: {
        userId: req?.body?.userId,
      },
    })
    await prisma.user.delete({
      where: {
        id: req?.body?.userId,
      },
    })
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.log('error :>> ', error)
    return res.status(500).json({ error: error.message })
  }
}
