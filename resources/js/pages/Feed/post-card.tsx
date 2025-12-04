import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, Image, MessageCircle, ThumbsUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog, // 2. Import Dialog components
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Post } from "@/types";
import { useInitials } from "@/hooks/use-initials";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { router, useForm } from "@inertiajs/react";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";

export function PostCard({post}: {post: Post}){
    const getInitials = useInitials();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const {data, setData, put, processing, errors} = useForm({
        description: post.description || '',
        image: post.image || ''
    })

    const handleUpdate = (e: any, post: Post) => {
        e.preventDefault();
        
        put(`/news-feed/${post.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenEdit(false);
            }
        });
    }

    const handleDelete = (e: any, post: Post) => {
        e.preventDefault();
        router.delete(`/news-feed/${post.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDelete(false);
            }
        })
    }

    return (
        <>
        <Card key={post.id} className="pb-2 gap-2">
              {/* Header */}
              <CardHeader>
                <div className="flex justify-between items-start">
                  {/* USER INFO */}
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
                  {/* ACTION BUTTON */}
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon-sm" variant="ghost">
                          <Ellipsis/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setOpenEdit(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
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
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => handleUpdate(e, post)}>
                        <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                            <DialogDescription>
                            Make changes to your post here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        {/*
                            *** Content for the Edit Form goes here ***
                            You would typically put a form with inputs pre-filled with post.description and post.image
                        */}
                        <div className="py-4">
                            {/* Placeholder for the actual edit form */}
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="w-full mt-2 p-2 border rounded-md"
                                rows={5}
                            />
                            {data.image && (
                            <img
                            src={data.image}
                            alt="Preview"
                            className="w-full rounded-md object-cover mt-2"
                            />
                        )}
                        </div>
                        {/* You would add a Save/Cancel button here */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpenEdit(false)}>
                            Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>Delete Post</DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                    <AlertDialogFooter>
                        <Button variant="destructive" onClick={(e) => handleDelete(e, post)}>Delete</Button>
                    </AlertDialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}