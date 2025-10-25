import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// DELETE HANDLER
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

// PUT HANDLER
export async function PUT(
  req: Request, 
  context: {params: Promise<{ id: string }>}
) 
{
  try {
    const { userId } = await auth();
    const { id } = await context.params;
    const { title, description, date, completed, important } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedTask = await prisma.task.update({
      where: {id},
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}