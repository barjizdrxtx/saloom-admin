// components/SideBar/helper.js

export const siderbar = [
  {
    name: "Masters",
    icon: "apps",
    path: "/masters",
    children: [
      {
        name: "All Products",
        icon: "inventory_2",
        children: [{ text: "List All Products", path: "/masters/products" }],
      },
      {
        name: "All Categories",
        icon: "category",
        children: [
          { text: "List All Categories", path: "/masters/categories" },
          { text: "Create Categories", path: "/masters/categories/create" },
        ],
      },
      {
        name: "All Brands",
        icon: "add_business",
        children: [
          { text: "List All Brands", path: "/masters/brands" },
          { text: "Create Brands", path: "/masters/brands/create" },
        ],
      },
      {
        name: "All Gallery",
        icon: "image",
        children: [
          { text: "List All Gallery", path: "/masters/gallery" },
          { text: "Create Gallery", path: "/masters/gallery/create" },
        ],
      },
    ],
  },
];
