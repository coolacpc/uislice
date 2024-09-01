const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  _id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  projectName: {
    type: String,
    required: true,
    default: "",
  },
  code: {
    type: String,
    required: true,
    default: "",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSchema = new Schema({
  _id: {
    type: String,
    default: "",
  },
  clerkUserId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "Untitled Project",
  },
  icon: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  components: [ComponentSchema],
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
