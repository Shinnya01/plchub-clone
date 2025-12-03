import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Post } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Image, MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useInitials } from "@/hooks/use-initials";

export default function Newsfeed({posts}: {posts: Post[]}) {
  const breadcrumb: BreadcrumbItem[] = [
    {
      title: "News Feed",
      href: "/news-feed",
    },
  ];

  const {data, setData, post: submit, processing, errors} = useForm({
        description: '',
        image: null as File | null
  })

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit('/news-feed');
  }

  return (
    <AppLayout breadcrumbs={breadcrumb}>
      <Head title="News Feed" />

      <div className="flex flex-col flex-1 overflow-x-auto gap-4 p-4 w-3xl mx-auto rounded-lg">

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full" size="lg">What's on your mind?</Button>
            </DialogTrigger>
            
            <DialogContent className="px-0 gap-0 pb-0">
              <form onSubmit={handlePost}>
                <DialogHeader>
                    <DialogTitle className="text-center">Create Post</DialogTitle>
                    <Separator className="my-1"/>
                </DialogHeader>
                <div>
                    <Textarea 
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border-none bg-none" 
                        placeholder="What's on your mind?"/>
                </div>
                <div className="m-2">
                  {data.image && (
                    <img
                      src={URL.createObjectURL(data.image)}
                      alt="Preview"
                      className="w-full rounded-md object-cover mt-2"
                    />
                  )}

                </div>
                <div className="m-2 p-2 rounded-lg flex items-center justify-between border">
                  <p>Add to your post</p>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <Image className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setData("image", e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                <DialogFooter className="p-2">
                    <Button type="submit" className="w-full">Post</Button>
                </DialogFooter>
              </form>
            </DialogContent>
            
        </Dialog>
        {posts.length <= 0 && (
            <p className="text-center text-sm text-muted-foreground">No Posts Yet.</p>
        )}
        {posts.map((post) => {
          const getInitials = useInitials();
          return (
          <Card key={post.id} className="pb-2 gap-2">
            
            {/* Header */}
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar className="size-10 rounded-lg overflow-hidden">
                  <AvatarImage src={post.user?.avatar || undefined} />
                  <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(post.user?.name ?? 'Unanymous User')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-medium">{post.user?.name ?? "Anonymous User"}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.created_at ?? "Undefined"}
                  </span>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-3">
              <p className="text-base leading-relaxed">
                {post.description ?? "Undefined"}
              </p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-md object-cover"
                />
              )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-3">
  
                {/* Like + Comment Count (Facebook style) */}
                <div className="flex justify-between items-center px-1 text-sm text-muted-foreground w-full">
                    <span>11 Likes</span>
                    <span>11 Comments</span>
                </div>

                {/* Buttons */}
                <div className="flex w-full gap-2">
                    <Button
                    variant="ghost"
                    className="flex-1 flex items-center gap-2 justify-center hover:bg-accent"
                    >
                    <ThumbsUp className="h-5 w-5" />
                    <span>Like</span>
                    </Button>

                    <Button
                    variant="ghost"
                    className="flex-1 flex items-center gap-2 justify-center hover:bg-accent"
                    >
                    <MessageCircle className="h-5 w-5" />
                    <span>Comment</span>
                    </Button>
                </div>

                </CardFooter>

          </Card>
      )})}
      </div>
    </AppLayout>
  );
}
