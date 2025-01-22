import React, { memo } from "react";
import Image from "next/image";
import { Search, Calendar, Tag } from "lucide-react";

type Post = {
    image: string;
    title: string;
    date: string;
    author: string;
    tag: string;
    excerpt: string;
};

type Category = {
    name: string;
    count: number;
};

type RecentPost = {
    image: string;
    title: string;
    date: string;
};

const BlogPost = memo(({ post }: { post: Post }) => (
    <div className="bg-white rounded-lg overflow-hidden">
        <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={250}
            className="w-full object-cover"
        />
        <div className="flex items-center text-sm text-gray-500 mt-3 pl-5">
            <Calendar className="mr-2 w-4 h-4" />
            {post.date}
            <Tag className="ml-4 mr-2 w-4 h-4" />
            {post.tag}
        </div>
        <div className="p-3">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <p className="mt-4 text-gray-600 w-[90%] overflow-hidden">{post.excerpt}</p>
            <button className="mt-4 text-black font-regular underline text-sm">
                Read More
            </button>
        </div>
    </div>
));

BlogPost.displayName = 'BlogPost'; 

const CategoryItem = memo(({ category }: { category: Category }) => (
    <li className="flex justify-between items-center text-gray-600 hover:text-gray-800 cursor-pointer">
        <span>{category.name}</span>
        <span className="text-gray-400">{category.count}</span>
    </li>
));

CategoryItem.displayName = 'CategoryItem'; 


const RecentPostItem = memo(({ post }: { post: RecentPost }) => (
    <li className="flex items-center space-x-4">
        <Image
            src={post.image}
            alt={post.title}
            width={60}
            height={60}
            className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
            <h4 className="text-gray-800 font-medium text-sm hover:text-blue-500 cursor-pointer">
                {post.title}
            </h4>
            <p className="text-gray-400 text-xs">{post.date}</p>
        </div>
    </li>
));
RecentPostItem.displayName = 'RecentPostItem';


/* Explanation:
By setting the displayName property, you're explicitly giving a name to the component that is wrapped by memo.
The displayName property is a way to explicitly name your component, especially 
when it is wrapped by higher-order components (like memo).

*/

export default function Blogs() {
    const posts: Post[] = [
        {
            image: "/images/blog1.png",
            title: "Going all-in with millennial design",
            date: "14 Oct 2022",
            author: "Admin",
            tag: "Wood",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        },
        {
            image: "/images/blog2.png",
            title: "Exploring new ways of decorating",
            date: "14 Oct 2022",
            author: "Admin",
            tag: "Wood",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        },
        {
            image: "/images/blog3.png",
            title: "Handmade pieces that took time to make",
            date: "14 Oct 2022",
            author: "Admin",
            tag: "Wood",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        },
    ];

    const categories: Category[] = [
        { name: "Crafts", count: 2 },
        { name: "Design", count: 8 },
        { name: "Handmade", count: 7 },
        { name: "Interior", count: 1 },
        { name: "Wood", count: 6 },
    ];

    const recentPosts: RecentPost[] = [
        {
            image: "/images/recent1.png",
            title: "Going all-in with millennial design",
            date: "03 Aug 2022",
        },
        {
            image: "/images/recent2.png",
            title: "Exploring new ways of decorating",
            date: "03 Aug 2022",
        },
        {
            image: "/images/recent3.png",
            title: "Handmade pieces that took time to make",
            date: "03 Aug 2022",
        },
        {
            image: "/images/recent4.png",
            title: "Modern home in Milan",
            date: "03 Aug 2022",
        },
        {
            image: "/images/recent5.png",
            title: "Colorful office redesign",
            date: "03 Aug 2022",
        },
    ];

    return (
        <div className="container mx-auto px-4 lg:px-16 py-12">
            <div className="grid lg:grid-cols-4 gap-8">
                {/* Blog Posts Section */}
                <div className="lg:col-span-3 space-y-12">
                    {posts.map((post, index) => (
                        <BlogPost key={index} post={post} />
                    ))}
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-8">
                    {/* Search Section */}
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute top-2.5 right-3 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <CategoryItem key={index} category={category} />
                            ))}
                        </ul>
                    </div>

                    {/* Recent Posts Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Posts</h3>
                        <ul className="space-y-4">
                            {recentPosts.map((post, index) => (
                                <RecentPostItem key={index} post={post} />
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
