"server-only";
import * as bcrypt from "bcryptjs";
import prisma from "@/db";

export async function GET() {
  const { name, password } = {
    name: "RRIAdmin",
    password: "RRI@CBE",
  };
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  await prisma.user.deleteMany({ where: { name: name } });

  await prisma.user.create({
    data: {
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      isAdmin: true,
    },
  });
  return new Response();
}
