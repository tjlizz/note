module.exports = {
  title: "帮助文档", // 设置网站标题
  repo: "", // 添加 github 链接
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: "OS",
        items: [
          {
            text: "Ubuntu",
            link: "/linux/ubuntu/user",
          },
        ],
      },
      { text: "Nginx", link: "/nginx/cache" }
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      "/linux/ubuntu/": [
        {
          title: "用户管理",
          collapsable: false,
          path: "/linux/ubuntu/user",
        },
        {
          title: "群组管理",
          collapsable: false,
          path: "/linux/ubuntu/groups",
        },
      ],
      "/nginx/": [
        {
          title: "反向代理",
          collapsable: false,
          path: "/nginx/proxy",
        },
        {
            title: "缓存",
            collapsable: false,
            path: "/nginx/cache",
          },
        
        
        
        
      ],
    },
  },
};
