const Blog = require("../models/blog");

module.exports = class BlogService {
  async createBlog(blog) {
    return await Blog.query().insertGraph(blog);
  }

  async findAllBlogs() {
    return await Blog.query();
  }

  async findBlogById(id) {
    return await Blog.query().findById(id);
  }
};
