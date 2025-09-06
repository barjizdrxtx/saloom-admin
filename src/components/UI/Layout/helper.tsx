// components/SideBar/helper.js

export const siderbar = [
  {
    name: "Masters",
    icon: "apps",
    path: "/masters",
    children: [
      {
        name: "All Categoris & Products",
        icon: "inventory_2",
        children: [
          { text: "List All Products", path: "/masters/products" },
          { text: "Create Products", path: "/masters/products/create" },
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
      {
        name: "Banner",
        icon: "ad",
        children: [
          { text: "List All   Banner", path: "/masters/banner" },
          { text: "Create Banner", path: "/masters/banner/create" },
        ],
      },
    ],
  },
];
