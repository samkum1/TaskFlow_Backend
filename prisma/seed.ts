import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.comment.deleteMany();
    await prisma.task.deleteMany();
    await prisma.column.deleteMany();
    await prisma.board.deleteMany();
    await prisma.workspaceMember.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.user.deleteMany();


    const sahil = await prisma.user.create({
        data: {
            name: "Sahil Kumar",
            email: "sam@g.com",
            password: "something"
        }
    })

    const priya = await prisma.user.create({
        data: {
            name: "Priya Rani",
            email: "priya@g.com",
            password: "priya"
        }
    })

    const workspace = await prisma.workspace.create({
        data: {
            name: "Team taskflow",
            description: "dkns",
            ownerId: sahil.id,
            members: {
                create: [{ userId: priya.id, role: "member" }]
            }
        }
    });


    const board = await prisma.board.create({
        data: {
            name: "Product launch",
            workspaceId: workspace.id,
        }
    });

    // ===== COLUMNS (separate steps, so we get their ids) =====
    const todo = await prisma.column.create({
        data: { name: "Todo", type: "todo", position: 0, boardId: board.id }
    });
    const inProgress = await prisma.column.create({
        data: { name: "In Progress", type: "in_progress", position: 1, boardId: board.id }
    });
    const review = await prisma.column.create({
        data: { name: "Review", type: "review", position: 2, boardId: board.id }
    });
    const done = await prisma.column.create({
        data: { name: "Done", type: "done", position: 3, boardId: board.id }
    });

    // ===== TASK (now we have both ids, so we can pass them) =====
    await prisma.task.create({
        data: {
            title: "Write landing page copy",
            description: "Draft hero + pricing section",
            position: 0,
            priority: "high",
            dueDate: new Date(Date.now() + 3 * 86400000),
            boardId: board.id,       // ← both parents, explicitly
            columnId: todo.id,
            assigneeId: priya.id,    // ← your fix, still here
            comments: {
                create: [
                    {
                        content: "Let's get this done before the review.",
                        authorId: sahil.id,
                    },
                ],
            },
        }
    });
    console.log("Seeded! workspace id:", workspace.id);

}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})
.finally(() => prisma.$disconnect());