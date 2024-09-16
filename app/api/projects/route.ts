import { NextResponse } from "next/server";
import connect from "@/app/lib/connect"; // This is where MongoDB is connected
import Project from "@/app/Models/ProjectSchema";
import { v4 as uuidv4 } from "uuid";

// Function to handle POST request
export async function POST(req: Request) {
  try {
    const { name, icon, clerkUserId, components } = await req.json();

    // Connect to MongoDB
    await connect();

    const project = new Project({
      _id: uuidv4(), // Explicitly generate _id
      name,
      icon,
      clerkUserId,
      components: components.map((component: any) => ({
        _id: uuidv4(), // Generate _id for each component
        name: component.name,
        projectName: name,
        code: component.code,
        isFavorite: component.isFavorite || false,
      })),
    });

    const savedProject = await project.save();

    return NextResponse.json({ project: savedProject });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// Function to handle GET request
export async function GET(req: any) {
  try {
    const clerkUserId = req.nextUrl.searchParams.get("clerkUserId");

    // Connect to MongoDB
    await connect();

    console.log(clerkUserId);

    const res = await Project.find({ clerkUserId });
    return NextResponse.json({ projects: res });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// Function to handle DELETE request
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "project id is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    const projectToDelete = await Project.findOneAndDelete({ _id: projectId });

    if (!projectToDelete) {
      return NextResponse.json(
        { message: "project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}

// Function to handle PUT request
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");
    const componentId = url.searchParams.get("componentId");
    const { action, name, icon, component, isFavorite } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    let updatedProject;

    if (action === "addComponent") {
      updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $push: { components: component } },
        { new: true }
      );
    } else if (action === "updateComponent") {
      if (!componentId) {
        return NextResponse.json(
          { message: "Component ID is required for updating" },
          { status: 400 }
        );
      }
      updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, "components._id": componentId },
        { $set: { "components.$": component } },
        { new: true }
      );
    } else if (action === "deleteComponent") {
      if (!componentId) {
        return NextResponse.json(
          { message: "Component ID is required for deleting" },
          { status: 400 }
        );
      }
      updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $pull: { components: { _id: componentId } } },
        { new: true }
      );
    } else if (action === "updateFavoriteState") {
      if (!componentId) {
        return NextResponse.json(
          { message: "Component ID is required for updating favorite state" },
          { status: 400 }
        );
      }
      updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, "components._id": componentId },
        { $set: { "components.$.isFavorite": isFavorite } },
        { new: true }
      );
    } else {
      // Default action: update project details
      updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, icon },
        { new: true }
      );
    }

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}
