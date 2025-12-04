import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Post } from "@/types";
import { Head } from "@inertiajs/react";
import { CreatePost } from "./create-post";
import { PostCard } from "./post-card";

export default function Newsfeed({posts}: {posts: Post[]}) {
  const breadcrumb: BreadcrumbItem[] = [
    {
      title: "News Feed",
      href: "/news-feed",
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumb}>
      <Head title="News Feed" />

      <div className="flex flex-col flex-1 overflow-x-auto gap-4 p-4 w-3xl mx-auto rounded-lg">

        <CreatePost />

        {posts.length <= 0 && (
            <p className="text-center text-sm text-muted-foreground">No Posts Yet.</p>
        )}
        
        {posts.map((post) => (
            <PostCard post = {post}/>
        ))}
      </div>
    </AppLayout>
  );
}
