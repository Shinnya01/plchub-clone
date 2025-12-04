import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
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
import { useForm } from "@inertiajs/react";
import { Image } from "lucide-react";
import { useState } from "react";

export function CreatePost(){
    const [open, setOpen] = useState(false);

    const {data, setData, post: submit, processing, errors, reset} = useForm({
        description: '',
        image: null as File | null
    })

    const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit('/news-feed', {
            onSuccess: () => {
                setOpen(false);
                reset();
            }
        });
    }

    return (
        <>
        <Button variant="outline" className="rounded-full" size="lg" onClick={() => setOpen(true)}>What's on your mind?</Button>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="px-0 gap-0 pb-0">
              <form onSubmit={handlePost}>
                <DialogHeader>
                    <DialogTitle className="text-center">Create Post</DialogTitle>
                    <Separator className="my-1"/>
                </DialogHeader>
                <div className="m-2">
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border-none bg-none" 
                        placeholder="What's on your mind?"/>
                    <InputError message={errors.description} />
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
                  <InputError message={errors.image} />
                </div>
                <DialogFooter className="p-2">
                    <Button type="submit" className="w-full" disabled={processing}>Post</Button>
                </DialogFooter>
              </form>
            </DialogContent>
            
        </Dialog>
        </>
    )
}